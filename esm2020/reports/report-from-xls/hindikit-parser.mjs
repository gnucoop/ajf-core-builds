/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
// firstToken returns the first token in s.
// s must not begin with whitespace characters.
function firstToken(s) {
    if (s.length === 0) {
        return { type: 0 /* END */, text: '' };
    }
    let m;
    const c = s.charAt(0);
    switch (c) {
        case '(':
            return { type: 1 /* LParen */, text: '(' };
        case ')':
            return { type: 2 /* RParen */, text: ')' };
        case '[':
            return { type: 3 /* LBracket */, text: '[' };
        case ']':
            return { type: 4 /* RBracket */, text: ']' };
        case ',':
            return { type: 5 /* Comma */, text: ',' };
        case '+':
            return { type: 6 /* Plus */, text: '+' };
        case '-':
            return { type: 7 /* Minus */, text: '-' };
        case '*':
            return { type: 8 /* Mul */, text: '*' };
        case '/':
            return { type: 9 /* Div */, text: '/' };
        case '<':
            if (s.length > 1 && s.charAt(1) === '=') {
                return { type: 11 /* LessOrEq */, text: '<=' };
            }
            return { type: 10 /* Less */, text: '<' };
        case '>':
            if (s.length > 1 && s.charAt(1) === '=') {
                return { type: 13 /* GreaterOrEq */, text: '>=' };
            }
            return { type: 12 /* Greater */, text: '>' };
        case '=':
            return { type: 14 /* Equal */, text: '=' };
        case '!':
            if (s.length > 1 && s.charAt(1) === '=') {
                return { type: 15 /* NotEqual */, text: '!=' };
            }
            return { type: 16 /* Not */, text: '!' };
        case '$':
            m = s.match(/^\$[a-zA-Z_]\w*/);
            if (m === null) {
                throw new Error('invalid field name in: ' + s);
            }
            return { type: 20 /* Name */, text: m[0] };
        case '"':
            m = s.match(/^"(\\\\|\\"|[^"])*"/);
            if (m === null) {
                throw new Error('unterminated string literal in: ' + s);
            }
            return { type: 17 /* String */, text: m[0] };
        case "'":
            m = s.match(/^'(\\\\|\\'|[^'])*'/);
            if (m === null) {
                throw new Error('unterminated string literal in: ' + s);
            }
            return { type: 17 /* String */, text: m[0] };
    }
    if (c >= '0' && c <= '9') {
        m = s.match(/^\d+(\.\d+)?([eE][\+\-]?\d+)?/);
        if (m === null) {
            throw new Error('impossible');
        }
        return { type: 18 /* Number */, text: m[0] };
    }
    m = s.match(/^[a-zA-Z_]\w*/);
    if (m !== null) {
        return { type: 19 /* Indent */, text: m[0] };
    }
    if (s.match(/^\s/) !== null) {
        throw new Error('string s has a leading whitespace');
    }
    throw new Error('unrecognized token in: ' + s);
}
function tokenize(s) {
    const toks = [];
    while (true) {
        s = s.trim();
        const t = firstToken(s);
        toks.push(t);
        if (t.type === 0 /* END */) {
            return toks;
        }
        s = s.slice(t.text.length);
    }
}
export function indicatorToJs(formula) {
    return parseExpression(tokenize(formula).reverse(), 0 /* END */);
}
function unexpectedTokenError(tok, rest) {
    if (tok.type === 0 /* END */) {
        return new Error('unexpected end of token stream');
    }
    rest.push(tok);
    return new Error('unexpected token at the start of: ' + printTokens(rest));
}
function printTokens(revToks) {
    let s = '';
    while (revToks.length > 0) {
        const tok = revToks.pop();
        if (tok.type >= 6 /* Plus */ && tok.type <= 15 /* NotEqual */) {
            // binary operators
            s += ' ' + tok.text + ' ';
        }
        else if (tok.type === 5 /* Comma */) {
            s += ', ';
        }
        else {
            s += tok.text;
        }
    }
    return s;
}
function consume(revToks, expectedType) {
    const tok = revToks.pop();
    if (tok.type !== expectedType) {
        throw unexpectedTokenError(tok, revToks);
    }
    return tok;
}
// parseExpression parses the first expression in revToks
// and returns its JavaScript/ajf translation.
// revToks is reversed, the first token of the expression being at index length-1;
// this way, tokens can be consumed efficiently with revToks.pop().
// After the expression, the function expects to find the token expectedEnd.
function parseExpression(revToks, expectedEnd) {
    if (expectedEnd !== 0 /* END */ &&
        expectedEnd !== 2 /* RParen */ &&
        expectedEnd !== 5 /* Comma */ &&
        expectedEnd !== 4 /* RBracket */) {
        throw new Error('invalid expectedEnd');
    }
    let js = '';
    while (true) {
        // Expression.
        let tok = revToks.pop();
        let next;
        switch (tok.type) {
            case 19 /* Indent */:
                next = revToks[revToks.length - 1];
                if (next.type === 1 /* LParen */) {
                    js += parseFunctionCall(tok.text, revToks);
                }
                else if (next.type === 3 /* LBracket */) {
                    consume(revToks, 3 /* LBracket */);
                    const index = parseExpression(revToks, 4 /* RBracket */);
                    consume(revToks, 4 /* RBracket */);
                    js += `${tok.text}[${index}]`;
                }
                else {
                    js += tok.text;
                }
                break;
            case 20 /* Name */:
                js += tok.text.slice(1);
                break;
            case 17 /* String */:
            case 18 /* Number */:
                js += tok.text;
                break;
            case 6 /* Plus */:
            case 7 /* Minus */:
                next = revToks[revToks.length - 1];
                if (next.type === 6 /* Plus */ || next.type === 7 /* Minus */) {
                    throw unexpectedTokenError(revToks.pop(), revToks);
                }
                js += tok.text;
                continue;
            case 16 /* Not */:
                js += '!';
                continue;
            case 1 /* LParen */:
                js += '(' + parseExpression(revToks, 2 /* RParen */) + ')';
                consume(revToks, 2 /* RParen */);
                break;
            case 3 /* LBracket */:
                js += '[' + parseList(revToks, 4 /* RBracket */) + ']';
                consume(revToks, 4 /* RBracket */);
                break;
            default:
                throw unexpectedTokenError(tok, revToks);
        }
        // Possible end of expression. expectedEnd can be:
        // END,
        // RParen for expressions between parentheses,
        // Comma for function arguments, in which case we also accept RParen,
        // RBracket for array elements,  in which case we also accept Comma.
        // Note that we don't consume the end token.
        const type = revToks[revToks.length - 1].type;
        if (type === expectedEnd ||
            (expectedEnd === 5 /* Comma */ && type === 2 /* RParen */) ||
            (expectedEnd === 4 /* RBracket */ && type === 5 /* Comma */)) {
            return js;
        }
        // Operator.
        tok = revToks.pop();
        if (tok.type >= 6 /* Plus */ && tok.type <= 13 /* GreaterOrEq */) {
            js += ' ' + tok.text + ' ';
            continue;
        }
        switch (tok.type) {
            case 19 /* Indent */:
                if (tok.text === 'AND') {
                    js += ' && ';
                    break;
                }
                if (tok.text === 'OR') {
                    js += ' || ';
                    break;
                }
                throw unexpectedTokenError(tok, revToks);
            case 14 /* Equal */:
                js += ' === ';
                break;
            case 15 /* NotEqual */:
                js += ' !== ';
                break;
            default:
                throw unexpectedTokenError(tok, revToks);
        }
    }
}
// parseList parses a comma-separated list of expressions.
// expectedEnd is Comma for function arguments and RBracket for arrays,
// according to the behavior of parseExpression.
function parseList(revToks, expectedEnd) {
    if (expectedEnd !== 5 /* Comma */ && expectedEnd !== 4 /* RBracket */) {
        throw new Error('invalid expectedEnd');
    }
    let next = revToks[revToks.length - 1];
    if (next.type === 2 /* RParen */ || next.type === 4 /* RBracket */) {
        // empty list
        return '';
    }
    let js = '';
    while (true) {
        js += parseExpression(revToks, expectedEnd);
        next = revToks[revToks.length - 1];
        if (next.type === 2 /* RParen */ || next.type === 4 /* RBracket */) {
            return js;
        }
        consume(revToks, 5 /* Comma */);
        js += ', ';
    }
}
// parseFunctionCall parses a function call expression.
// The list of supported functions is here:
// https://github.com/gnucoop/ajf/blob/master/src/core/models/utils/expression-utils.ts
// The function name has already been scanned.
function parseFunctionCall(name, revToks) {
    let js;
    switch (name) {
        case 'SUM':
        case 'MEAN':
        case 'MAX':
        case 'MEDIAN':
        case 'MODE':
            return parseMathFunction(name, revToks);
        case 'ALL_VALUES_OF':
            return parseFieldFunction(name, revToks, true, false);
        case 'COUNTFORMS':
            return parseFieldFunction(name, revToks, false, true);
        case 'COUNTFORMS_UNIQUE':
            return parseFieldFunction(name, revToks, true, true);
        case 'INCLUDES':
            consume(revToks, 1 /* LParen */);
            js = '(' + parseExpression(revToks, 5 /* Comma */) + ').includes(';
            consume(revToks, 5 /* Comma */);
            js += parseExpression(revToks, 5 /* Comma */) + ')';
            consume(revToks, 2 /* RParen */);
            return js;
        case 'PERCENT':
            consume(revToks, 1 /* LParen */);
            js = 'PERCENT(' + parseExpression(revToks, 5 /* Comma */) + ', ';
            consume(revToks, 5 /* Comma */);
            js += parseExpression(revToks, 5 /* Comma */) + ')';
            consume(revToks, 2 /* RParen */);
            return js;
        case 'LAST':
            return parseLast(revToks);
        case 'REPEAT':
            return parseRepeat(revToks);
        default:
            throw new Error('unsupported function: ' + name);
    }
}
// Parses a function with parameters: form, expression, condition?
function parseMathFunction(name, revToks) {
    consume(revToks, 1 /* LParen */);
    const form = parseExpression(revToks, 5 /* Comma */);
    consume(revToks, 5 /* Comma */);
    const exp = parseExpression(revToks, 5 /* Comma */);
    const tok = revToks.pop();
    switch (tok.type) {
        case 2 /* RParen */:
            return `${name}(${form}, \`${exp}\`)`;
        case 5 /* Comma */:
            const condition = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 2 /* RParen */);
            return `${name}(${form}, \`${exp}\`, \`${condition}\`)`;
        default:
            throw unexpectedTokenError(tok, revToks);
    }
}
// Parses a function with parameters: form, fieldName?, condition?
function parseFieldFunction(name, revToks, hasField, canHaveCond) {
    consume(revToks, 1 /* LParen */);
    let js = name + '(' + parseExpression(revToks, 5 /* Comma */);
    if (hasField) {
        consume(revToks, 5 /* Comma */);
        const fieldName = consume(revToks, 20 /* Name */).text.slice(1);
        js += `, \`${fieldName}\``;
    }
    const tok = revToks.pop();
    if (tok.type === 2 /* RParen */) {
        return js + ')';
    }
    if (!canHaveCond || tok.type !== 5 /* Comma */) {
        throw unexpectedTokenError(tok, revToks);
    }
    const condition = parseExpression(revToks, 5 /* Comma */);
    consume(revToks, 2 /* RParen */);
    return js + `, \`${condition}\`)`;
}
// LAST has parameters: form, expression, date?
// where date is a string constant.
function parseLast(revToks) {
    consume(revToks, 1 /* LParen */);
    const form = parseExpression(revToks, 5 /* Comma */);
    consume(revToks, 5 /* Comma */);
    const exp = parseExpression(revToks, 5 /* Comma */);
    const tok = revToks.pop();
    switch (tok.type) {
        case 2 /* RParen */:
            return `LAST(${form}, \`${exp}\`)`;
        case 5 /* Comma */:
            const date = consume(revToks, 17 /* String */).text;
            consume(revToks, 2 /* RParen */);
            return `LAST(${form}, \`${exp}\`, ${date})`;
        default:
            throw unexpectedTokenError(tok, revToks);
    }
}
// REPEAT has parameters: form, array, funcIndent, expression, condition?
function parseRepeat(revToks) {
    consume(revToks, 1 /* LParen */);
    const form = parseExpression(revToks, 5 /* Comma */);
    consume(revToks, 5 /* Comma */);
    const array = parseExpression(revToks, 5 /* Comma */);
    consume(revToks, 5 /* Comma */);
    const funcIdent = consume(revToks, 19 /* Indent */).text;
    consume(revToks, 5 /* Comma */);
    const exp = parseExpression(revToks, 5 /* Comma */);
    const tok = revToks.pop();
    switch (tok.type) {
        case 2 /* RParen */:
            return `REPEAT(${form}, ${array}, ${funcIdent}, \`${exp}\`)`;
        case 5 /* Comma */:
            const condition = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 2 /* RParen */);
            return `REPEAT(${form}, ${array}, ${funcIdent}, \`${exp}\`, \`${condition}\`)`;
        default:
            throw unexpectedTokenError(tok, revToks);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGluZGlraXQtcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy9yZXBvcnQtZnJvbS14bHMvaGluZGlraXQtcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQW1DSCwyQ0FBMkM7QUFDM0MsK0NBQStDO0FBQy9DLFNBQVMsVUFBVSxDQUFDLENBQVM7SUFDM0IsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNsQixPQUFPLEVBQUMsSUFBSSxhQUFlLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQyxDQUFDO0tBQ3hDO0lBQ0QsSUFBSSxDQUEwQixDQUFDO0lBQy9CLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEIsUUFBUSxDQUFDLEVBQUU7UUFDVCxLQUFLLEdBQUc7WUFDTixPQUFPLEVBQUMsSUFBSSxnQkFBa0IsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDN0MsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksZ0JBQWtCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQzdDLEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLGtCQUFvQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUMvQyxLQUFLLEdBQUc7WUFDTixPQUFPLEVBQUMsSUFBSSxrQkFBb0IsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDL0MsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksZUFBaUIsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDNUMsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksY0FBZ0IsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDM0MsS0FBSyxHQUFH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LGVBQWUsQ0FBQyxPQUFPLGdCQUFrQixDQUFDO0lBQ3hELE9BQU8sQ0FBQyxPQUFPLGdCQUFrQixDQUFDO0lBQ2xDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLGtCQUFtQixDQUFDLElBQUksQ0FBQztJQUMxRCxPQUFPLENBQUMsT0FBTyxnQkFBa0IsQ0FBQztJQUNsQyxNQUFNLEdBQUcsR0FBRyxlQUFlLENBQUMsT0FBTyxnQkFBa0IsQ0FBQztJQUN0RCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFXLENBQUM7SUFDbkMsUUFBUSxHQUFHLENBQUMsSUFBSSxFQUFFO1FBQ2hCO1lBQ0UsT0FBTyxVQUFVLElBQUksS0FBSyxLQUFLLEtBQUssU0FBUyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQy9EO1lBQ0UsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDLE9BQU8sZ0JBQWtCLENBQUM7WUFDNUQsT0FBTyxDQUFDLE9BQU8saUJBQW1CLENBQUM7WUFDbkMsT0FBTyxVQUFVLElBQUksS0FBSyxLQUFLLEtBQUssU0FBUyxPQUFPLEdBQUcsU0FBUyxTQUFTLEtBQUssQ0FBQztRQUNqRjtZQUNFLE1BQU0sb0JBQW9CLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzVDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuY29uc3QgZW51bSBUb2tlblR5cGUge1xuICBFTkQsXG4gIExQYXJlbixcbiAgUlBhcmVuLFxuICBMQnJhY2tldCxcbiAgUkJyYWNrZXQsXG4gIENvbW1hLFxuXG4gIC8vIEJpbmFyeSBvcGVyYXRvcnMgZnJvbSBQbHVzIHRvIEdyZWF0ZXJPckVxIGhhdmUgdGhlIHNhbWUgcmVwcmVzZW50YXRpb25cbiAgLy8gaW4gaW5kaWNhdG9yIGZvcm11bGFzIGFuZCBKYXZhU2NyaXB0IGFuZCBkb24ndCBuZWVkIGEgdHJhbnNsYXRpb24uXG4gIFBsdXMsXG4gIE1pbnVzLFxuICBNdWwsXG4gIERpdixcbiAgTGVzcyxcbiAgTGVzc09yRXEsXG4gIEdyZWF0ZXIsXG4gIEdyZWF0ZXJPckVxLFxuXG4gIEVxdWFsLFxuICBOb3RFcXVhbCxcbiAgTm90LFxuICBTdHJpbmcsXG4gIE51bWJlcixcbiAgSW5kZW50LFxuICBOYW1lLCAvLyBUaGUgbmFtZSBvZiBhIGZpZWxkOiBhbiBpZGVudGlmaWVyIHN0YXJ0aW5nIHdpdGggJFxufVxuXG5pbnRlcmZhY2UgVG9rZW4ge1xuICB0eXBlOiBUb2tlblR5cGU7XG4gIHRleHQ6IHN0cmluZztcbn1cblxuLy8gZmlyc3RUb2tlbiByZXR1cm5zIHRoZSBmaXJzdCB0b2tlbiBpbiBzLlxuLy8gcyBtdXN0IG5vdCBiZWdpbiB3aXRoIHdoaXRlc3BhY2UgY2hhcmFjdGVycy5cbmZ1bmN0aW9uIGZpcnN0VG9rZW4oczogc3RyaW5nKTogVG9rZW4ge1xuICBpZiAocy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5FTkQsIHRleHQ6ICcnfTtcbiAgfVxuICBsZXQgbTogUmVnRXhwTWF0Y2hBcnJheSB8IG51bGw7XG4gIGNvbnN0IGMgPSBzLmNoYXJBdCgwKTtcbiAgc3dpdGNoIChjKSB7XG4gICAgY2FzZSAnKCc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5MUGFyZW4sIHRleHQ6ICcoJ307XG4gICAgY2FzZSAnKSc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5SUGFyZW4sIHRleHQ6ICcpJ307XG4gICAgY2FzZSAnWyc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5MQnJhY2tldCwgdGV4dDogJ1snfTtcbiAgICBjYXNlICddJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLlJCcmFja2V0LCB0ZXh0OiAnXSd9O1xuICAgIGNhc2UgJywnOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuQ29tbWEsIHRleHQ6ICcsJ307XG4gICAgY2FzZSAnKyc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5QbHVzLCB0ZXh0OiAnKyd9O1xuICAgIGNhc2UgJy0nOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTWludXMsIHRleHQ6ICctJ307XG4gICAgY2FzZSAnKic6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5NdWwsIHRleHQ6ICcqJ307XG4gICAgY2FzZSAnLyc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5EaXYsIHRleHQ6ICcvJ307XG4gICAgY2FzZSAnPCc6XG4gICAgICBpZiAocy5sZW5ndGggPiAxICYmIHMuY2hhckF0KDEpID09PSAnPScpIHtcbiAgICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTGVzc09yRXEsIHRleHQ6ICc8PSd9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTGVzcywgdGV4dDogJzwnfTtcbiAgICBjYXNlICc+JzpcbiAgICAgIGlmIChzLmxlbmd0aCA+IDEgJiYgcy5jaGFyQXQoMSkgPT09ICc9Jykge1xuICAgICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5HcmVhdGVyT3JFcSwgdGV4dDogJz49J307XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5HcmVhdGVyLCB0ZXh0OiAnPid9O1xuICAgIGNhc2UgJz0nOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuRXF1YWwsIHRleHQ6ICc9J307XG4gICAgY2FzZSAnISc6XG4gICAgICBpZiAocy5sZW5ndGggPiAxICYmIHMuY2hhckF0KDEpID09PSAnPScpIHtcbiAgICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTm90RXF1YWwsIHRleHQ6ICchPSd9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTm90LCB0ZXh0OiAnISd9O1xuICAgIGNhc2UgJyQnOlxuICAgICAgbSA9IHMubWF0Y2goL15cXCRbYS16QS1aX11cXHcqLyk7XG4gICAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZmllbGQgbmFtZSBpbjogJyArIHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTmFtZSwgdGV4dDogbVswXX07XG4gICAgY2FzZSAnXCInOlxuICAgICAgbSA9IHMubWF0Y2goL15cIihcXFxcXFxcXHxcXFxcXCJ8W15cIl0pKlwiLyk7XG4gICAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VudGVybWluYXRlZCBzdHJpbmcgbGl0ZXJhbCBpbjogJyArIHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuU3RyaW5nLCB0ZXh0OiBtWzBdfTtcbiAgICBjYXNlIFwiJ1wiOlxuICAgICAgbSA9IHMubWF0Y2goL14nKFxcXFxcXFxcfFxcXFwnfFteJ10pKicvKTtcbiAgICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW50ZXJtaW5hdGVkIHN0cmluZyBsaXRlcmFsIGluOiAnICsgcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5TdHJpbmcsIHRleHQ6IG1bMF19O1xuICB9XG4gIGlmIChjID49ICcwJyAmJiBjIDw9ICc5Jykge1xuICAgIG0gPSBzLm1hdGNoKC9eXFxkKyhcXC5cXGQrKT8oW2VFXVtcXCtcXC1dP1xcZCspPy8pO1xuICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ltcG9zc2libGUnKTtcbiAgICB9XG4gICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTnVtYmVyLCB0ZXh0OiBtWzBdfTtcbiAgfVxuICBtID0gcy5tYXRjaCgvXlthLXpBLVpfXVxcdyovKTtcbiAgaWYgKG0gIT09IG51bGwpIHtcbiAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5JbmRlbnQsIHRleHQ6IG1bMF19O1xuICB9XG4gIGlmIChzLm1hdGNoKC9eXFxzLykgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0cmluZyBzIGhhcyBhIGxlYWRpbmcgd2hpdGVzcGFjZScpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHRva2VuIGluOiAnICsgcyk7XG59XG5cbmZ1bmN0aW9uIHRva2VuaXplKHM6IHN0cmluZyk6IFRva2VuW10ge1xuICBjb25zdCB0b2tzOiBUb2tlbltdID0gW107XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgcyA9IHMudHJpbSgpO1xuICAgIGNvbnN0IHQgPSBmaXJzdFRva2VuKHMpO1xuICAgIHRva3MucHVzaCh0KTtcbiAgICBpZiAodC50eXBlID09PSBUb2tlblR5cGUuRU5EKSB7XG4gICAgICByZXR1cm4gdG9rcztcbiAgICB9XG4gICAgcyA9IHMuc2xpY2UodC50ZXh0Lmxlbmd0aCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluZGljYXRvclRvSnMoZm9ybXVsYTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHBhcnNlRXhwcmVzc2lvbih0b2tlbml6ZShmb3JtdWxhKS5yZXZlcnNlKCksIFRva2VuVHlwZS5FTkQpO1xufVxuXG5mdW5jdGlvbiB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2s6IFRva2VuLCByZXN0OiBUb2tlbltdKTogRXJyb3Ige1xuICBpZiAodG9rLnR5cGUgPT09IFRva2VuVHlwZS5FTkQpIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKCd1bmV4cGVjdGVkIGVuZCBvZiB0b2tlbiBzdHJlYW0nKTtcbiAgfVxuICByZXN0LnB1c2godG9rKTtcbiAgcmV0dXJuIG5ldyBFcnJvcigndW5leHBlY3RlZCB0b2tlbiBhdCB0aGUgc3RhcnQgb2Y6ICcgKyBwcmludFRva2VucyhyZXN0KSk7XG59XG5cbmZ1bmN0aW9uIHByaW50VG9rZW5zKHJldlRva3M6IFRva2VuW10pIHtcbiAgbGV0IHMgPSAnJztcbiAgd2hpbGUgKHJldlRva3MubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gICAgaWYgKHRvay50eXBlID49IFRva2VuVHlwZS5QbHVzICYmIHRvay50eXBlIDw9IFRva2VuVHlwZS5Ob3RFcXVhbCkge1xuICAgICAgLy8gYmluYXJ5IG9wZXJhdG9yc1xuICAgICAgcyArPSAnICcgKyB0b2sudGV4dCArICcgJztcbiAgICB9IGVsc2UgaWYgKHRvay50eXBlID09PSBUb2tlblR5cGUuQ29tbWEpIHtcbiAgICAgIHMgKz0gJywgJztcbiAgICB9IGVsc2Uge1xuICAgICAgcyArPSB0b2sudGV4dDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHM7XG59XG5cbmZ1bmN0aW9uIGNvbnN1bWUocmV2VG9rczogVG9rZW5bXSwgZXhwZWN0ZWRUeXBlOiBUb2tlblR5cGUpOiBUb2tlbiB7XG4gIGNvbnN0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gIGlmICh0b2sudHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgdGhyb3cgdW5leHBlY3RlZFRva2VuRXJyb3IodG9rLCByZXZUb2tzKTtcbiAgfVxuICByZXR1cm4gdG9rO1xufVxuXG4vLyBwYXJzZUV4cHJlc3Npb24gcGFyc2VzIHRoZSBmaXJzdCBleHByZXNzaW9uIGluIHJldlRva3Ncbi8vIGFuZCByZXR1cm5zIGl0cyBKYXZhU2NyaXB0L2FqZiB0cmFuc2xhdGlvbi5cbi8vIHJldlRva3MgaXMgcmV2ZXJzZWQsIHRoZSBmaXJzdCB0b2tlbiBvZiB0aGUgZXhwcmVzc2lvbiBiZWluZyBhdCBpbmRleCBsZW5ndGgtMTtcbi8vIHRoaXMgd2F5LCB0b2tlbnMgY2FuIGJlIGNvbnN1bWVkIGVmZmljaWVudGx5IHdpdGggcmV2VG9rcy5wb3AoKS5cbi8vIEFmdGVyIHRoZSBleHByZXNzaW9uLCB0aGUgZnVuY3Rpb24gZXhwZWN0cyB0byBmaW5kIHRoZSB0b2tlbiBleHBlY3RlZEVuZC5cbmZ1bmN0aW9uIHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzOiBUb2tlbltdLCBleHBlY3RlZEVuZDogVG9rZW5UeXBlKTogc3RyaW5nIHtcbiAgaWYgKFxuICAgIGV4cGVjdGVkRW5kICE9PSBUb2tlblR5cGUuRU5EICYmXG4gICAgZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5SUGFyZW4gJiZcbiAgICBleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLkNvbW1hICYmXG4gICAgZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5SQnJhY2tldFxuICApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZXhwZWN0ZWRFbmQnKTtcbiAgfVxuXG4gIGxldCBqcyA9ICcnO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIC8vIEV4cHJlc3Npb24uXG4gICAgbGV0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gICAgbGV0IG5leHQ6IFRva2VuO1xuICAgIHN3aXRjaCAodG9rLnR5cGUpIHtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLkluZGVudDpcbiAgICAgICAgbmV4dCA9IHJldlRva3NbcmV2VG9rcy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLkxQYXJlbikge1xuICAgICAgICAgIGpzICs9IHBhcnNlRnVuY3Rpb25DYWxsKHRvay50ZXh0LCByZXZUb2tzKTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5MQnJhY2tldCkge1xuICAgICAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkxCcmFja2V0KTtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuUkJyYWNrZXQpO1xuICAgICAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJCcmFja2V0KTtcbiAgICAgICAgICBqcyArPSBgJHt0b2sudGV4dH1bJHtpbmRleH1dYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBqcyArPSB0b2sudGV4dDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk5hbWU6XG4gICAgICAgIGpzICs9IHRvay50ZXh0LnNsaWNlKDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLlN0cmluZzpcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk51bWJlcjpcbiAgICAgICAganMgKz0gdG9rLnRleHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUb2tlblR5cGUuUGx1czpcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk1pbnVzOlxuICAgICAgICBuZXh0ID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAobmV4dC50eXBlID09PSBUb2tlblR5cGUuUGx1cyB8fCBuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5NaW51cykge1xuICAgICAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHJldlRva3MucG9wKCkgYXMgVG9rZW4sIHJldlRva3MpO1xuICAgICAgICB9XG4gICAgICAgIGpzICs9IHRvay50ZXh0O1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk5vdDpcbiAgICAgICAganMgKz0gJyEnO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLkxQYXJlbjpcbiAgICAgICAganMgKz0gJygnICsgcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pICsgJyknO1xuICAgICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLkxCcmFja2V0OlxuICAgICAgICBqcyArPSAnWycgKyBwYXJzZUxpc3QocmV2VG9rcywgVG9rZW5UeXBlLlJCcmFja2V0KSArICddJztcbiAgICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUkJyYWNrZXQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gICAgfVxuXG4gICAgLy8gUG9zc2libGUgZW5kIG9mIGV4cHJlc3Npb24uIGV4cGVjdGVkRW5kIGNhbiBiZTpcbiAgICAvLyBFTkQsXG4gICAgLy8gUlBhcmVuIGZvciBleHByZXNzaW9ucyBiZXR3ZWVuIHBhcmVudGhlc2VzLFxuICAgIC8vIENvbW1hIGZvciBmdW5jdGlvbiBhcmd1bWVudHMsIGluIHdoaWNoIGNhc2Ugd2UgYWxzbyBhY2NlcHQgUlBhcmVuLFxuICAgIC8vIFJCcmFja2V0IGZvciBhcnJheSBlbGVtZW50cywgIGluIHdoaWNoIGNhc2Ugd2UgYWxzbyBhY2NlcHQgQ29tbWEuXG4gICAgLy8gTm90ZSB0aGF0IHdlIGRvbid0IGNvbnN1bWUgdGhlIGVuZCB0b2tlbi5cbiAgICBjb25zdCB0eXBlID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdLnR5cGU7XG4gICAgaWYgKFxuICAgICAgdHlwZSA9PT0gZXhwZWN0ZWRFbmQgfHxcbiAgICAgIChleHBlY3RlZEVuZCA9PT0gVG9rZW5UeXBlLkNvbW1hICYmIHR5cGUgPT09IFRva2VuVHlwZS5SUGFyZW4pIHx8XG4gICAgICAoZXhwZWN0ZWRFbmQgPT09IFRva2VuVHlwZS5SQnJhY2tldCAmJiB0eXBlID09PSBUb2tlblR5cGUuQ29tbWEpXG4gICAgKSB7XG4gICAgICByZXR1cm4ganM7XG4gICAgfVxuXG4gICAgLy8gT3BlcmF0b3IuXG4gICAgdG9rID0gcmV2VG9rcy5wb3AoKSBhcyBUb2tlbjtcbiAgICBpZiAodG9rLnR5cGUgPj0gVG9rZW5UeXBlLlBsdXMgJiYgdG9rLnR5cGUgPD0gVG9rZW5UeXBlLkdyZWF0ZXJPckVxKSB7XG4gICAgICBqcyArPSAnICcgKyB0b2sudGV4dCArICcgJztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRvay50eXBlKSB7XG4gICAgICBjYXNlIFRva2VuVHlwZS5JbmRlbnQ6XG4gICAgICAgIGlmICh0b2sudGV4dCA9PT0gJ0FORCcpIHtcbiAgICAgICAgICBqcyArPSAnICYmICc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRvay50ZXh0ID09PSAnT1InKSB7XG4gICAgICAgICAganMgKz0gJyB8fCAnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gICAgICBjYXNlIFRva2VuVHlwZS5FcXVhbDpcbiAgICAgICAganMgKz0gJyA9PT0gJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRva2VuVHlwZS5Ob3RFcXVhbDpcbiAgICAgICAganMgKz0gJyAhPT0gJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2ssIHJldlRva3MpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBwYXJzZUxpc3QgcGFyc2VzIGEgY29tbWEtc2VwYXJhdGVkIGxpc3Qgb2YgZXhwcmVzc2lvbnMuXG4vLyBleHBlY3RlZEVuZCBpcyBDb21tYSBmb3IgZnVuY3Rpb24gYXJndW1lbnRzIGFuZCBSQnJhY2tldCBmb3IgYXJyYXlzLFxuLy8gYWNjb3JkaW5nIHRvIHRoZSBiZWhhdmlvciBvZiBwYXJzZUV4cHJlc3Npb24uXG5mdW5jdGlvbiBwYXJzZUxpc3QocmV2VG9rczogVG9rZW5bXSwgZXhwZWN0ZWRFbmQ6IFRva2VuVHlwZSk6IHN0cmluZyB7XG4gIGlmIChleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLkNvbW1hICYmIGV4cGVjdGVkRW5kICE9PSBUb2tlblR5cGUuUkJyYWNrZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZXhwZWN0ZWRFbmQnKTtcbiAgfVxuICBsZXQgbmV4dCA9IHJldlRva3NbcmV2VG9rcy5sZW5ndGggLSAxXTtcbiAgaWYgKG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLlJQYXJlbiB8fCBuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5SQnJhY2tldCkge1xuICAgIC8vIGVtcHR5IGxpc3RcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgbGV0IGpzID0gJyc7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAganMgKz0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIGV4cGVjdGVkRW5kKTtcbiAgICBuZXh0ID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdO1xuICAgIGlmIChuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5SUGFyZW4gfHwgbmV4dC50eXBlID09PSBUb2tlblR5cGUuUkJyYWNrZXQpIHtcbiAgICAgIHJldHVybiBqcztcbiAgICB9XG4gICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgIGpzICs9ICcsICc7XG4gIH1cbn1cblxuLy8gcGFyc2VGdW5jdGlvbkNhbGwgcGFyc2VzIGEgZnVuY3Rpb24gY2FsbCBleHByZXNzaW9uLlxuLy8gVGhlIGxpc3Qgb2Ygc3VwcG9ydGVkIGZ1bmN0aW9ucyBpcyBoZXJlOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2dudWNvb3AvYWpmL2Jsb2IvbWFzdGVyL3NyYy9jb3JlL21vZGVscy91dGlscy9leHByZXNzaW9uLXV0aWxzLnRzXG4vLyBUaGUgZnVuY3Rpb24gbmFtZSBoYXMgYWxyZWFkeSBiZWVuIHNjYW5uZWQuXG5mdW5jdGlvbiBwYXJzZUZ1bmN0aW9uQ2FsbChuYW1lOiBzdHJpbmcsIHJldlRva3M6IFRva2VuW10pOiBzdHJpbmcge1xuICBsZXQganM6IHN0cmluZztcbiAgc3dpdGNoIChuYW1lKSB7XG4gICAgY2FzZSAnU1VNJzpcbiAgICBjYXNlICdNRUFOJzpcbiAgICBjYXNlICdNQVgnOlxuICAgIGNhc2UgJ01FRElBTic6XG4gICAgY2FzZSAnTU9ERSc6XG4gICAgICByZXR1cm4gcGFyc2VNYXRoRnVuY3Rpb24obmFtZSwgcmV2VG9rcyk7XG4gICAgY2FzZSAnQUxMX1ZBTFVFU19PRic6XG4gICAgICByZXR1cm4gcGFyc2VGaWVsZEZ1bmN0aW9uKG5hbWUsIHJldlRva3MsIHRydWUsIGZhbHNlKTtcbiAgICBjYXNlICdDT1VOVEZPUk1TJzpcbiAgICAgIHJldHVybiBwYXJzZUZpZWxkRnVuY3Rpb24obmFtZSwgcmV2VG9rcywgZmFsc2UsIHRydWUpO1xuICAgIGNhc2UgJ0NPVU5URk9STVNfVU5JUVVFJzpcbiAgICAgIHJldHVybiBwYXJzZUZpZWxkRnVuY3Rpb24obmFtZSwgcmV2VG9rcywgdHJ1ZSwgdHJ1ZSk7XG4gICAgY2FzZSAnSU5DTFVERVMnOlxuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTFBhcmVuKTtcbiAgICAgIGpzID0gJygnICsgcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnKS5pbmNsdWRlcygnO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAganMgKz0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnKSc7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgcmV0dXJuIGpzO1xuICAgIGNhc2UgJ1BFUkNFTlQnOlxuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTFBhcmVuKTtcbiAgICAgIGpzID0gJ1BFUkNFTlQoJyArIHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpICsgJywgJztcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgIGpzICs9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpICsgJyknO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUlBhcmVuKTtcbiAgICAgIHJldHVybiBqcztcbiAgICBjYXNlICdMQVNUJzpcbiAgICAgIHJldHVybiBwYXJzZUxhc3QocmV2VG9rcyk7XG4gICAgY2FzZSAnUkVQRUFUJzpcbiAgICAgIHJldHVybiBwYXJzZVJlcGVhdChyZXZUb2tzKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBmdW5jdGlvbjogJyArIG5hbWUpO1xuICB9XG59XG5cbi8vIFBhcnNlcyBhIGZ1bmN0aW9uIHdpdGggcGFyYW1ldGVyczogZm9ybSwgZXhwcmVzc2lvbiwgY29uZGl0aW9uP1xuZnVuY3Rpb24gcGFyc2VNYXRoRnVuY3Rpb24obmFtZTogc3RyaW5nLCByZXZUb2tzOiBUb2tlbltdKTogc3RyaW5nIHtcbiAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTFBhcmVuKTtcbiAgY29uc3QgZm9ybSA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gIGNvbnN0IGV4cCA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICBjb25zdCB0b2sgPSByZXZUb2tzLnBvcCgpIGFzIFRva2VuO1xuICBzd2l0Y2ggKHRvay50eXBlKSB7XG4gICAgY2FzZSBUb2tlblR5cGUuUlBhcmVuOlxuICAgICAgcmV0dXJuIGAke25hbWV9KCR7Zm9ybX0sIFxcYCR7ZXhwfVxcYClgO1xuICAgIGNhc2UgVG9rZW5UeXBlLkNvbW1hOlxuICAgICAgY29uc3QgY29uZGl0aW9uID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgcmV0dXJuIGAke25hbWV9KCR7Zm9ybX0sIFxcYCR7ZXhwfVxcYCwgXFxgJHtjb25kaXRpb259XFxgKWA7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gIH1cbn1cblxuLy8gUGFyc2VzIGEgZnVuY3Rpb24gd2l0aCBwYXJhbWV0ZXJzOiBmb3JtLCBmaWVsZE5hbWU/LCBjb25kaXRpb24/XG5mdW5jdGlvbiBwYXJzZUZpZWxkRnVuY3Rpb24oXG4gIG5hbWU6IHN0cmluZyxcbiAgcmV2VG9rczogVG9rZW5bXSxcbiAgaGFzRmllbGQ6IGJvb2xlYW4sXG4gIGNhbkhhdmVDb25kOiBib29sZWFuLFxuKTogc3RyaW5nIHtcbiAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTFBhcmVuKTtcbiAgbGV0IGpzID0gbmFtZSArICcoJyArIHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICBpZiAoaGFzRmllbGQpIHtcbiAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgY29uc3QgZmllbGROYW1lID0gY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTmFtZSkudGV4dC5zbGljZSgxKTtcbiAgICBqcyArPSBgLCBcXGAke2ZpZWxkTmFtZX1cXGBgO1xuICB9XG4gIGNvbnN0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gIGlmICh0b2sudHlwZSA9PT0gVG9rZW5UeXBlLlJQYXJlbikge1xuICAgIHJldHVybiBqcyArICcpJztcbiAgfVxuICBpZiAoIWNhbkhhdmVDb25kIHx8IHRvay50eXBlICE9PSBUb2tlblR5cGUuQ29tbWEpIHtcbiAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2ssIHJldlRva3MpO1xuICB9XG4gIGNvbnN0IGNvbmRpdGlvbiA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICByZXR1cm4ganMgKyBgLCBcXGAke2NvbmRpdGlvbn1cXGApYDtcbn1cblxuLy8gTEFTVCBoYXMgcGFyYW1ldGVyczogZm9ybSwgZXhwcmVzc2lvbiwgZGF0ZT9cbi8vIHdoZXJlIGRhdGUgaXMgYSBzdHJpbmcgY29uc3RhbnQuXG5mdW5jdGlvbiBwYXJzZUxhc3QocmV2VG9rczogVG9rZW5bXSk6IHN0cmluZyB7XG4gIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkxQYXJlbik7XG4gIGNvbnN0IGZvcm0gPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICBjb25zdCBleHAgPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgY29uc3QgdG9rID0gcmV2VG9rcy5wb3AoKSBhcyBUb2tlbjtcbiAgc3dpdGNoICh0b2sudHlwZSkge1xuICAgIGNhc2UgVG9rZW5UeXBlLlJQYXJlbjpcbiAgICAgIHJldHVybiBgTEFTVCgke2Zvcm19LCBcXGAke2V4cH1cXGApYDtcbiAgICBjYXNlIFRva2VuVHlwZS5Db21tYTpcbiAgICAgIGNvbnN0IGRhdGUgPSBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5TdHJpbmcpLnRleHQ7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgcmV0dXJuIGBMQVNUKCR7Zm9ybX0sIFxcYCR7ZXhwfVxcYCwgJHtkYXRlfSlgO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2ssIHJldlRva3MpO1xuICB9XG59XG5cbi8vIFJFUEVBVCBoYXMgcGFyYW1ldGVyczogZm9ybSwgYXJyYXksIGZ1bmNJbmRlbnQsIGV4cHJlc3Npb24sIGNvbmRpdGlvbj9cbmZ1bmN0aW9uIHBhcnNlUmVwZWF0KHJldlRva3M6IFRva2VuW10pOiBzdHJpbmcge1xuICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MUGFyZW4pO1xuICBjb25zdCBmb3JtID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgY29uc3QgYXJyYXkgPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICBjb25zdCBmdW5jSWRlbnQgPSBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5JbmRlbnQpLnRleHQ7XG4gIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgY29uc3QgZXhwID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gIGNvbnN0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gIHN3aXRjaCAodG9rLnR5cGUpIHtcbiAgICBjYXNlIFRva2VuVHlwZS5SUGFyZW46XG4gICAgICByZXR1cm4gYFJFUEVBVCgke2Zvcm19LCAke2FycmF5fSwgJHtmdW5jSWRlbnR9LCBcXGAke2V4cH1cXGApYDtcbiAgICBjYXNlIFRva2VuVHlwZS5Db21tYTpcbiAgICAgIGNvbnN0IGNvbmRpdGlvbiA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUlBhcmVuKTtcbiAgICAgIHJldHVybiBgUkVQRUFUKCR7Zm9ybX0sICR7YXJyYXl9LCAke2Z1bmNJZGVudH0sIFxcYCR7ZXhwfVxcYCwgXFxgJHtjb25kaXRpb259XFxgKWA7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gIH1cbn1cbiJdfQ==