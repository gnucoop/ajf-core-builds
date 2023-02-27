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
        return { type: 0 /* TokenType.END */, text: '' };
    }
    let m;
    const c = s.charAt(0);
    switch (c) {
        case '(':
            return { type: 1 /* TokenType.LParen */, text: '(' };
        case ')':
            return { type: 2 /* TokenType.RParen */, text: ')' };
        case '[':
            return { type: 3 /* TokenType.LBracket */, text: '[' };
        case ']':
            return { type: 4 /* TokenType.RBracket */, text: ']' };
        case ',':
            return { type: 5 /* TokenType.Comma */, text: ',' };
        case '+':
            return { type: 6 /* TokenType.Plus */, text: '+' };
        case '-':
            return { type: 7 /* TokenType.Minus */, text: '-' };
        case '*':
            return { type: 8 /* TokenType.Mul */, text: '*' };
        case '/':
            return { type: 9 /* TokenType.Div */, text: '/' };
        case '<':
            if (s.length > 1 && s.charAt(1) === '=') {
                return { type: 11 /* TokenType.LessOrEq */, text: '<=' };
            }
            return { type: 10 /* TokenType.Less */, text: '<' };
        case '>':
            if (s.length > 1 && s.charAt(1) === '=') {
                return { type: 13 /* TokenType.GreaterOrEq */, text: '>=' };
            }
            return { type: 12 /* TokenType.Greater */, text: '>' };
        case '=':
            return { type: 14 /* TokenType.Equal */, text: '=' };
        case '!':
            if (s.length > 1 && s.charAt(1) === '=') {
                return { type: 15 /* TokenType.NotEqual */, text: '!=' };
            }
            return { type: 16 /* TokenType.Not */, text: '!' };
        case '$':
            m = s.match(/^\$[a-zA-Z_]\w*/);
            if (m === null) {
                throw new Error('invalid field name in: ' + s);
            }
            return { type: 20 /* TokenType.Name */, text: m[0] };
        case '"':
            m = s.match(/^"(\\\\|\\"|[^"])*"/);
            if (m === null) {
                throw new Error('unterminated string literal in: ' + s);
            }
            return { type: 17 /* TokenType.String */, text: m[0] };
        case "'":
            m = s.match(/^'(\\\\|\\'|[^'])*'/);
            if (m === null) {
                throw new Error('unterminated string literal in: ' + s);
            }
            return { type: 17 /* TokenType.String */, text: m[0] };
    }
    if (c >= '0' && c <= '9') {
        m = s.match(/^\d+(\.\d+)?([eE][\+\-]?\d+)?/);
        if (m === null) {
            throw new Error('impossible');
        }
        return { type: 18 /* TokenType.Number */, text: m[0] };
    }
    m = s.match(/^[a-zA-Z_]\w*/);
    if (m !== null) {
        return { type: 19 /* TokenType.Indent */, text: m[0] };
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
        if (t.type === 0 /* TokenType.END */) {
            return toks;
        }
        s = s.slice(t.text.length);
    }
}
export function indicatorToJs(formula) {
    switch (typeof formula) {
        case 'string':
            if (formula.startsWith('js:')) {
                return formula.slice(3).trim();
            }
            break;
        case 'number':
        case 'boolean':
            formula = String(formula);
            break;
        default:
            throw new Error('formula is not a string');
    }
    return parseExpression(tokenize(formula).reverse(), 0 /* TokenType.END */);
}
function unexpectedTokenError(tok, rest) {
    if (tok.type === 0 /* TokenType.END */) {
        return new Error('unexpected end of token stream');
    }
    rest.push(tok);
    return new Error('unexpected token at the start of: ' + printTokens(rest));
}
function printTokens(revToks) {
    let s = '';
    while (revToks.length > 0) {
        const tok = revToks.pop();
        if (tok.type >= 6 /* TokenType.Plus */ && tok.type <= 15 /* TokenType.NotEqual */) {
            // binary operators
            s += ' ' + tok.text + ' ';
        }
        else if (tok.type === 5 /* TokenType.Comma */) {
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
    if (expectedEnd !== 0 /* TokenType.END */ &&
        expectedEnd !== 2 /* TokenType.RParen */ &&
        expectedEnd !== 5 /* TokenType.Comma */ &&
        expectedEnd !== 4 /* TokenType.RBracket */) {
        throw new Error('invalid expectedEnd');
    }
    let js = '';
    while (true) {
        // Expression.
        let tok = revToks.pop();
        let next;
        switch (tok.type) {
            case 19 /* TokenType.Indent */:
                next = revToks[revToks.length - 1];
                if (next.type === 1 /* TokenType.LParen */) {
                    js += parseFunctionCall(tok.text, revToks);
                }
                else if (next.type === 3 /* TokenType.LBracket */) {
                    consume(revToks, 3 /* TokenType.LBracket */);
                    const index = parseExpression(revToks, 4 /* TokenType.RBracket */);
                    consume(revToks, 4 /* TokenType.RBracket */);
                    js += `${tok.text}[${index}]`;
                }
                else {
                    js += tok.text;
                }
                break;
            case 20 /* TokenType.Name */:
                js += tok.text.slice(1);
                break;
            case 17 /* TokenType.String */:
            case 18 /* TokenType.Number */:
                js += tok.text;
                break;
            case 6 /* TokenType.Plus */:
            case 7 /* TokenType.Minus */:
                next = revToks[revToks.length - 1];
                if (next.type === 6 /* TokenType.Plus */ || next.type === 7 /* TokenType.Minus */) {
                    throw unexpectedTokenError(revToks.pop(), revToks);
                }
                js += tok.text;
                continue;
            case 16 /* TokenType.Not */:
                js += '!';
                continue;
            case 1 /* TokenType.LParen */:
                js += '(' + parseExpression(revToks, 2 /* TokenType.RParen */) + ')';
                consume(revToks, 2 /* TokenType.RParen */);
                break;
            case 3 /* TokenType.LBracket */:
                js += '[' + parseList(revToks, 4 /* TokenType.RBracket */) + ']';
                consume(revToks, 4 /* TokenType.RBracket */);
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
            (expectedEnd === 5 /* TokenType.Comma */ && type === 2 /* TokenType.RParen */) ||
            (expectedEnd === 4 /* TokenType.RBracket */ && type === 5 /* TokenType.Comma */)) {
            return js;
        }
        // Operator.
        tok = revToks.pop();
        if (tok.type >= 6 /* TokenType.Plus */ && tok.type <= 13 /* TokenType.GreaterOrEq */) {
            js += ' ' + tok.text + ' ';
            continue;
        }
        switch (tok.type) {
            case 19 /* TokenType.Indent */:
                if (tok.text === 'AND') {
                    js += ' && ';
                    break;
                }
                if (tok.text === 'OR') {
                    js += ' || ';
                    break;
                }
                throw unexpectedTokenError(tok, revToks);
            case 14 /* TokenType.Equal */:
                js += ' === ';
                break;
            case 15 /* TokenType.NotEqual */:
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
    if (expectedEnd !== 5 /* TokenType.Comma */ && expectedEnd !== 4 /* TokenType.RBracket */) {
        throw new Error('invalid expectedEnd');
    }
    let next = revToks[revToks.length - 1];
    if (next.type === 2 /* TokenType.RParen */ || next.type === 4 /* TokenType.RBracket */) {
        // empty list
        return '';
    }
    let js = '';
    while (true) {
        js += parseExpression(revToks, expectedEnd);
        next = revToks[revToks.length - 1];
        if (next.type === 2 /* TokenType.RParen */ || next.type === 4 /* TokenType.RBracket */) {
            return js;
        }
        consume(revToks, 5 /* TokenType.Comma */);
        js += ', ';
    }
}
// parseFunctionCall parses a function call expression.
// The list of supported functions is in
//   projects/core/models/utils/expression-utils.ts
// The function name has already been scanned.
function parseFunctionCall(name, revToks) {
    const params = functionParams[name];
    if (params) {
        return parseFunctionWithParams(name, revToks, ...params);
    }
    switch (name) {
        case 'INCLUDES':
            consume(revToks, 1 /* TokenType.LParen */);
            let js = '(' + parseExpression(revToks, 5 /* TokenType.Comma */) + ').includes(';
            consume(revToks, 5 /* TokenType.Comma */);
            js += parseExpression(revToks, 5 /* TokenType.Comma */) + ')';
            consume(revToks, 2 /* TokenType.RParen */);
            return js;
        case 'TODAY':
            consume(revToks, 1 /* TokenType.LParen */);
            consume(revToks, 2 /* TokenType.RParen */);
            return 'TODAY()';
        default:
            throw new Error('unsupported function: ' + name);
    }
}
/*
  Parses a function call expression.
  stringifyParams tells how many parameters the function has
  and if they need to be stringified.
  For example, the indicator function
    SUM(forms[0], $age, $gender = 'male')
  can be parsed with
    parseFunctionWithParams('SUM', revToks, false, true, true)
  resulting in the following JavaScript:
    SUM(forms[0], `age`, `gender === 'male'`)
  stringifyParams.length >= 2 and the last parameter is considered optional.
*/
function parseFunctionWithParams(name, revToks, ...stringifyParams) {
    if (stringifyParams.length < 2) {
        throw new Error('parseFunctionWithParams only works with at least 2 parameters');
    }
    consume(revToks, 1 /* TokenType.LParen */);
    let js = name + '(';
    const firstParam = parseExpression(revToks, 5 /* TokenType.Comma */);
    js += stringifyParams[0] ? `\`${firstParam}\`` : firstParam;
    for (let i = 1; i < stringifyParams.length - 1; i++) {
        consume(revToks, 5 /* TokenType.Comma */);
        const param = parseExpression(revToks, 5 /* TokenType.Comma */);
        js += stringifyParams[i] ? `, \`${param}\`` : `, ${param}`;
    }
    // Last parameter, optional:
    const tok = revToks.pop();
    switch (tok.type) {
        case 2 /* TokenType.RParen */:
            return js + ')';
        case 5 /* TokenType.Comma */:
            const lastParam = parseExpression(revToks, 5 /* TokenType.Comma */);
            consume(revToks, 2 /* TokenType.RParen */);
            const stringify = stringifyParams[stringifyParams.length - 1];
            return js + (stringify ? `, \`${lastParam}\`)` : `, ${lastParam})`);
        default:
            throw unexpectedTokenError(tok, revToks);
    }
}
const functionParams = {
    SUM: [false, true, true],
    MEAN: [false, true, true],
    MAX: [false, true, true],
    MEDIAN: [false, true, true],
    MODE: [false, true, true],
    COUNT_FORMS: [false, true],
    COUNT_REPS: [false, true],
    COUNT_FORMS_UNIQUE: [false, true, true],
    ALL_VALUES_OF: [false, true],
    PERCENT: [false, false],
    LAST: [false, true, false],
    REPEAT: [false, false, false, true, true],
    EVALUATE: [false, false, false],
    FILTER_BY_VARS: [false, false],
    FILTER_BY: [false, true],
    APPLY: [false, true, true],
    GET_AGE: [false, false],
    LEN: [false, false],
    CONCAT: [false, false],
    REMOVE_DUPLICATES: [false, false],
    CONSOLE_LOG: [false, false],
    JOIN_FORMS: [false, false, true, true],
    JOIN_REPEATING_SLIDES: [false, false, true, true, true, true],
    FROM_REPS: [false, false],
    ISIN: [false, false],
    OP: [false, false, true],
    GET_LABELS: [false, false],
    APPLY_LABELS: [false, false, false],
    BUILD_DATASET: [false, false],
    ROUND: [false, false],
    IS_BEFORE: [false, false],
    IS_AFTER: [false, false],
    IS_WITHIN_INTERVAL: [false, false, false],
    COMPARE_DATE: [false, false, false, false],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGluZGlraXQtcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9yZXBvcnRzL3NyYy94bHMtcmVwb3J0L2hpbmRpa2l0LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFtQ0gsMkNBQTJDO0FBQzNDLCtDQUErQztBQUMvQyxTQUFTLFVBQVUsQ0FBQyxDQUFTO0lBQzNCLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDbEIsT0FBTyxFQUFDLElBQUksdUJBQWUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUM7S0FDeEM7SUFDRCxJQUFJLENBQTBCLENBQUM7SUFDL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QixRQUFRLENBQUMsRUFBRTtRQUNULEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLDBCQUFrQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUM3QyxLQUFLLEdBQUc7WUFDTixPQUFPLEVBQUMsSUFBSSwwQkFBa0IsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDN0MsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksNEJBQW9CLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQy9DLEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLDRCQUFvQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUMvQyxLQUFLLEdBQUc7WUFDTixPQUFPLEVBQUMsSUFBSSx5QkFBaUIsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDNUMsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksd0JBQWdCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQzNDLEtBQUssR0FB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SSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO0lBQzdELFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7SUFDekIsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUNwQixFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQztJQUN4QixVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO0lBQzFCLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO0lBQ25DLGFBQWEsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7SUFDN0IsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUNyQixTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO0lBQ3pCLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7SUFDeEIsa0JBQWtCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUN6QyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7Q0FDM0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuY29uc3QgZW51bSBUb2tlblR5cGUge1xuICBFTkQsXG4gIExQYXJlbixcbiAgUlBhcmVuLFxuICBMQnJhY2tldCxcbiAgUkJyYWNrZXQsXG4gIENvbW1hLFxuXG4gIC8vIEJpbmFyeSBvcGVyYXRvcnMgZnJvbSBQbHVzIHRvIEdyZWF0ZXJPckVxIGhhdmUgdGhlIHNhbWUgcmVwcmVzZW50YXRpb25cbiAgLy8gaW4gaW5kaWNhdG9yIGZvcm11bGFzIGFuZCBKYXZhU2NyaXB0IGFuZCBkb24ndCBuZWVkIGEgdHJhbnNsYXRpb24uXG4gIFBsdXMsXG4gIE1pbnVzLFxuICBNdWwsXG4gIERpdixcbiAgTGVzcyxcbiAgTGVzc09yRXEsXG4gIEdyZWF0ZXIsXG4gIEdyZWF0ZXJPckVxLFxuXG4gIEVxdWFsLFxuICBOb3RFcXVhbCxcbiAgTm90LFxuICBTdHJpbmcsXG4gIE51bWJlcixcbiAgSW5kZW50LFxuICBOYW1lLCAvLyBUaGUgbmFtZSBvZiBhIGZpZWxkOiBhbiBpZGVudGlmaWVyIHN0YXJ0aW5nIHdpdGggJFxufVxuXG5pbnRlcmZhY2UgVG9rZW4ge1xuICB0eXBlOiBUb2tlblR5cGU7XG4gIHRleHQ6IHN0cmluZztcbn1cblxuLy8gZmlyc3RUb2tlbiByZXR1cm5zIHRoZSBmaXJzdCB0b2tlbiBpbiBzLlxuLy8gcyBtdXN0IG5vdCBiZWdpbiB3aXRoIHdoaXRlc3BhY2UgY2hhcmFjdGVycy5cbmZ1bmN0aW9uIGZpcnN0VG9rZW4oczogc3RyaW5nKTogVG9rZW4ge1xuICBpZiAocy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5FTkQsIHRleHQ6ICcnfTtcbiAgfVxuICBsZXQgbTogUmVnRXhwTWF0Y2hBcnJheSB8IG51bGw7XG4gIGNvbnN0IGMgPSBzLmNoYXJBdCgwKTtcbiAgc3dpdGNoIChjKSB7XG4gICAgY2FzZSAnKCc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5MUGFyZW4sIHRleHQ6ICcoJ307XG4gICAgY2FzZSAnKSc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5SUGFyZW4sIHRleHQ6ICcpJ307XG4gICAgY2FzZSAnWyc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5MQnJhY2tldCwgdGV4dDogJ1snfTtcbiAgICBjYXNlICddJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLlJCcmFja2V0LCB0ZXh0OiAnXSd9O1xuICAgIGNhc2UgJywnOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuQ29tbWEsIHRleHQ6ICcsJ307XG4gICAgY2FzZSAnKyc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5QbHVzLCB0ZXh0OiAnKyd9O1xuICAgIGNhc2UgJy0nOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTWludXMsIHRleHQ6ICctJ307XG4gICAgY2FzZSAnKic6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5NdWwsIHRleHQ6ICcqJ307XG4gICAgY2FzZSAnLyc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5EaXYsIHRleHQ6ICcvJ307XG4gICAgY2FzZSAnPCc6XG4gICAgICBpZiAocy5sZW5ndGggPiAxICYmIHMuY2hhckF0KDEpID09PSAnPScpIHtcbiAgICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTGVzc09yRXEsIHRleHQ6ICc8PSd9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTGVzcywgdGV4dDogJzwnfTtcbiAgICBjYXNlICc+JzpcbiAgICAgIGlmIChzLmxlbmd0aCA+IDEgJiYgcy5jaGFyQXQoMSkgPT09ICc9Jykge1xuICAgICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5HcmVhdGVyT3JFcSwgdGV4dDogJz49J307XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5HcmVhdGVyLCB0ZXh0OiAnPid9O1xuICAgIGNhc2UgJz0nOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuRXF1YWwsIHRleHQ6ICc9J307XG4gICAgY2FzZSAnISc6XG4gICAgICBpZiAocy5sZW5ndGggPiAxICYmIHMuY2hhckF0KDEpID09PSAnPScpIHtcbiAgICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTm90RXF1YWwsIHRleHQ6ICchPSd9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTm90LCB0ZXh0OiAnISd9O1xuICAgIGNhc2UgJyQnOlxuICAgICAgbSA9IHMubWF0Y2goL15cXCRbYS16QS1aX11cXHcqLyk7XG4gICAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZmllbGQgbmFtZSBpbjogJyArIHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTmFtZSwgdGV4dDogbVswXX07XG4gICAgY2FzZSAnXCInOlxuICAgICAgbSA9IHMubWF0Y2goL15cIihcXFxcXFxcXHxcXFxcXCJ8W15cIl0pKlwiLyk7XG4gICAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VudGVybWluYXRlZCBzdHJpbmcgbGl0ZXJhbCBpbjogJyArIHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuU3RyaW5nLCB0ZXh0OiBtWzBdfTtcbiAgICBjYXNlIFwiJ1wiOlxuICAgICAgbSA9IHMubWF0Y2goL14nKFxcXFxcXFxcfFxcXFwnfFteJ10pKicvKTtcbiAgICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW50ZXJtaW5hdGVkIHN0cmluZyBsaXRlcmFsIGluOiAnICsgcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5TdHJpbmcsIHRleHQ6IG1bMF19O1xuICB9XG4gIGlmIChjID49ICcwJyAmJiBjIDw9ICc5Jykge1xuICAgIG0gPSBzLm1hdGNoKC9eXFxkKyhcXC5cXGQrKT8oW2VFXVtcXCtcXC1dP1xcZCspPy8pO1xuICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ltcG9zc2libGUnKTtcbiAgICB9XG4gICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTnVtYmVyLCB0ZXh0OiBtWzBdfTtcbiAgfVxuICBtID0gcy5tYXRjaCgvXlthLXpBLVpfXVxcdyovKTtcbiAgaWYgKG0gIT09IG51bGwpIHtcbiAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5JbmRlbnQsIHRleHQ6IG1bMF19O1xuICB9XG4gIGlmIChzLm1hdGNoKC9eXFxzLykgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0cmluZyBzIGhhcyBhIGxlYWRpbmcgd2hpdGVzcGFjZScpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHRva2VuIGluOiAnICsgcyk7XG59XG5cbmZ1bmN0aW9uIHRva2VuaXplKHM6IHN0cmluZyk6IFRva2VuW10ge1xuICBjb25zdCB0b2tzOiBUb2tlbltdID0gW107XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgcyA9IHMudHJpbSgpO1xuICAgIGNvbnN0IHQgPSBmaXJzdFRva2VuKHMpO1xuICAgIHRva3MucHVzaCh0KTtcbiAgICBpZiAodC50eXBlID09PSBUb2tlblR5cGUuRU5EKSB7XG4gICAgICByZXR1cm4gdG9rcztcbiAgICB9XG4gICAgcyA9IHMuc2xpY2UodC50ZXh0Lmxlbmd0aCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluZGljYXRvclRvSnMoZm9ybXVsYTogc3RyaW5nKTogc3RyaW5nIHtcbiAgc3dpdGNoICh0eXBlb2YgZm9ybXVsYSkge1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBpZiAoZm9ybXVsYS5zdGFydHNXaXRoKCdqczonKSkge1xuICAgICAgICByZXR1cm4gZm9ybXVsYS5zbGljZSgzKS50cmltKCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdudW1iZXInOlxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgZm9ybXVsYSA9IFN0cmluZyhmb3JtdWxhKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm11bGEgaXMgbm90IGEgc3RyaW5nJyk7XG4gIH1cbiAgcmV0dXJuIHBhcnNlRXhwcmVzc2lvbih0b2tlbml6ZShmb3JtdWxhKS5yZXZlcnNlKCksIFRva2VuVHlwZS5FTkQpO1xufVxuXG5mdW5jdGlvbiB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2s6IFRva2VuLCByZXN0OiBUb2tlbltdKTogRXJyb3Ige1xuICBpZiAodG9rLnR5cGUgPT09IFRva2VuVHlwZS5FTkQpIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKCd1bmV4cGVjdGVkIGVuZCBvZiB0b2tlbiBzdHJlYW0nKTtcbiAgfVxuICByZXN0LnB1c2godG9rKTtcbiAgcmV0dXJuIG5ldyBFcnJvcigndW5leHBlY3RlZCB0b2tlbiBhdCB0aGUgc3RhcnQgb2Y6ICcgKyBwcmludFRva2VucyhyZXN0KSk7XG59XG5cbmZ1bmN0aW9uIHByaW50VG9rZW5zKHJldlRva3M6IFRva2VuW10pIHtcbiAgbGV0IHMgPSAnJztcbiAgd2hpbGUgKHJldlRva3MubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gICAgaWYgKHRvay50eXBlID49IFRva2VuVHlwZS5QbHVzICYmIHRvay50eXBlIDw9IFRva2VuVHlwZS5Ob3RFcXVhbCkge1xuICAgICAgLy8gYmluYXJ5IG9wZXJhdG9yc1xuICAgICAgcyArPSAnICcgKyB0b2sudGV4dCArICcgJztcbiAgICB9IGVsc2UgaWYgKHRvay50eXBlID09PSBUb2tlblR5cGUuQ29tbWEpIHtcbiAgICAgIHMgKz0gJywgJztcbiAgICB9IGVsc2Uge1xuICAgICAgcyArPSB0b2sudGV4dDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHM7XG59XG5cbmZ1bmN0aW9uIGNvbnN1bWUocmV2VG9rczogVG9rZW5bXSwgZXhwZWN0ZWRUeXBlOiBUb2tlblR5cGUpOiBUb2tlbiB7XG4gIGNvbnN0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gIGlmICh0b2sudHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgdGhyb3cgdW5leHBlY3RlZFRva2VuRXJyb3IodG9rLCByZXZUb2tzKTtcbiAgfVxuICByZXR1cm4gdG9rO1xufVxuXG4vLyBwYXJzZUV4cHJlc3Npb24gcGFyc2VzIHRoZSBmaXJzdCBleHByZXNzaW9uIGluIHJldlRva3Ncbi8vIGFuZCByZXR1cm5zIGl0cyBKYXZhU2NyaXB0L2FqZiB0cmFuc2xhdGlvbi5cbi8vIHJldlRva3MgaXMgcmV2ZXJzZWQsIHRoZSBmaXJzdCB0b2tlbiBvZiB0aGUgZXhwcmVzc2lvbiBiZWluZyBhdCBpbmRleCBsZW5ndGgtMTtcbi8vIHRoaXMgd2F5LCB0b2tlbnMgY2FuIGJlIGNvbnN1bWVkIGVmZmljaWVudGx5IHdpdGggcmV2VG9rcy5wb3AoKS5cbi8vIEFmdGVyIHRoZSBleHByZXNzaW9uLCB0aGUgZnVuY3Rpb24gZXhwZWN0cyB0byBmaW5kIHRoZSB0b2tlbiBleHBlY3RlZEVuZC5cbmZ1bmN0aW9uIHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzOiBUb2tlbltdLCBleHBlY3RlZEVuZDogVG9rZW5UeXBlKTogc3RyaW5nIHtcbiAgaWYgKFxuICAgIGV4cGVjdGVkRW5kICE9PSBUb2tlblR5cGUuRU5EICYmXG4gICAgZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5SUGFyZW4gJiZcbiAgICBleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLkNvbW1hICYmXG4gICAgZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5SQnJhY2tldFxuICApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZXhwZWN0ZWRFbmQnKTtcbiAgfVxuXG4gIGxldCBqcyA9ICcnO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIC8vIEV4cHJlc3Npb24uXG4gICAgbGV0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gICAgbGV0IG5leHQ6IFRva2VuO1xuICAgIHN3aXRjaCAodG9rLnR5cGUpIHtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLkluZGVudDpcbiAgICAgICAgbmV4dCA9IHJldlRva3NbcmV2VG9rcy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLkxQYXJlbikge1xuICAgICAgICAgIGpzICs9IHBhcnNlRnVuY3Rpb25DYWxsKHRvay50ZXh0LCByZXZUb2tzKTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5MQnJhY2tldCkge1xuICAgICAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkxCcmFja2V0KTtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuUkJyYWNrZXQpO1xuICAgICAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJCcmFja2V0KTtcbiAgICAgICAgICBqcyArPSBgJHt0b2sudGV4dH1bJHtpbmRleH1dYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBqcyArPSB0b2sudGV4dDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk5hbWU6XG4gICAgICAgIGpzICs9IHRvay50ZXh0LnNsaWNlKDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLlN0cmluZzpcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk51bWJlcjpcbiAgICAgICAganMgKz0gdG9rLnRleHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUb2tlblR5cGUuUGx1czpcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk1pbnVzOlxuICAgICAgICBuZXh0ID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAobmV4dC50eXBlID09PSBUb2tlblR5cGUuUGx1cyB8fCBuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5NaW51cykge1xuICAgICAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHJldlRva3MucG9wKCkgYXMgVG9rZW4sIHJldlRva3MpO1xuICAgICAgICB9XG4gICAgICAgIGpzICs9IHRvay50ZXh0O1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk5vdDpcbiAgICAgICAganMgKz0gJyEnO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLkxQYXJlbjpcbiAgICAgICAganMgKz0gJygnICsgcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pICsgJyknO1xuICAgICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLkxCcmFja2V0OlxuICAgICAgICBqcyArPSAnWycgKyBwYXJzZUxpc3QocmV2VG9rcywgVG9rZW5UeXBlLlJCcmFja2V0KSArICddJztcbiAgICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUkJyYWNrZXQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gICAgfVxuXG4gICAgLy8gUG9zc2libGUgZW5kIG9mIGV4cHJlc3Npb24uIGV4cGVjdGVkRW5kIGNhbiBiZTpcbiAgICAvLyBFTkQsXG4gICAgLy8gUlBhcmVuIGZvciBleHByZXNzaW9ucyBiZXR3ZWVuIHBhcmVudGhlc2VzLFxuICAgIC8vIENvbW1hIGZvciBmdW5jdGlvbiBhcmd1bWVudHMsIGluIHdoaWNoIGNhc2Ugd2UgYWxzbyBhY2NlcHQgUlBhcmVuLFxuICAgIC8vIFJCcmFja2V0IGZvciBhcnJheSBlbGVtZW50cywgIGluIHdoaWNoIGNhc2Ugd2UgYWxzbyBhY2NlcHQgQ29tbWEuXG4gICAgLy8gTm90ZSB0aGF0IHdlIGRvbid0IGNvbnN1bWUgdGhlIGVuZCB0b2tlbi5cbiAgICBjb25zdCB0eXBlID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdLnR5cGU7XG4gICAgaWYgKFxuICAgICAgdHlwZSA9PT0gZXhwZWN0ZWRFbmQgfHxcbiAgICAgIChleHBlY3RlZEVuZCA9PT0gVG9rZW5UeXBlLkNvbW1hICYmIHR5cGUgPT09IFRva2VuVHlwZS5SUGFyZW4pIHx8XG4gICAgICAoZXhwZWN0ZWRFbmQgPT09IFRva2VuVHlwZS5SQnJhY2tldCAmJiB0eXBlID09PSBUb2tlblR5cGUuQ29tbWEpXG4gICAgKSB7XG4gICAgICByZXR1cm4ganM7XG4gICAgfVxuXG4gICAgLy8gT3BlcmF0b3IuXG4gICAgdG9rID0gcmV2VG9rcy5wb3AoKSBhcyBUb2tlbjtcbiAgICBpZiAodG9rLnR5cGUgPj0gVG9rZW5UeXBlLlBsdXMgJiYgdG9rLnR5cGUgPD0gVG9rZW5UeXBlLkdyZWF0ZXJPckVxKSB7XG4gICAgICBqcyArPSAnICcgKyB0b2sudGV4dCArICcgJztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRvay50eXBlKSB7XG4gICAgICBjYXNlIFRva2VuVHlwZS5JbmRlbnQ6XG4gICAgICAgIGlmICh0b2sudGV4dCA9PT0gJ0FORCcpIHtcbiAgICAgICAgICBqcyArPSAnICYmICc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRvay50ZXh0ID09PSAnT1InKSB7XG4gICAgICAgICAganMgKz0gJyB8fCAnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gICAgICBjYXNlIFRva2VuVHlwZS5FcXVhbDpcbiAgICAgICAganMgKz0gJyA9PT0gJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRva2VuVHlwZS5Ob3RFcXVhbDpcbiAgICAgICAganMgKz0gJyAhPT0gJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2ssIHJldlRva3MpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBwYXJzZUxpc3QgcGFyc2VzIGEgY29tbWEtc2VwYXJhdGVkIGxpc3Qgb2YgZXhwcmVzc2lvbnMuXG4vLyBleHBlY3RlZEVuZCBpcyBDb21tYSBmb3IgZnVuY3Rpb24gYXJndW1lbnRzIGFuZCBSQnJhY2tldCBmb3IgYXJyYXlzLFxuLy8gYWNjb3JkaW5nIHRvIHRoZSBiZWhhdmlvciBvZiBwYXJzZUV4cHJlc3Npb24uXG5mdW5jdGlvbiBwYXJzZUxpc3QocmV2VG9rczogVG9rZW5bXSwgZXhwZWN0ZWRFbmQ6IFRva2VuVHlwZSk6IHN0cmluZyB7XG4gIGlmIChleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLkNvbW1hICYmIGV4cGVjdGVkRW5kICE9PSBUb2tlblR5cGUuUkJyYWNrZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZXhwZWN0ZWRFbmQnKTtcbiAgfVxuICBsZXQgbmV4dCA9IHJldlRva3NbcmV2VG9rcy5sZW5ndGggLSAxXTtcbiAgaWYgKG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLlJQYXJlbiB8fCBuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5SQnJhY2tldCkge1xuICAgIC8vIGVtcHR5IGxpc3RcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgbGV0IGpzID0gJyc7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAganMgKz0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIGV4cGVjdGVkRW5kKTtcbiAgICBuZXh0ID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdO1xuICAgIGlmIChuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5SUGFyZW4gfHwgbmV4dC50eXBlID09PSBUb2tlblR5cGUuUkJyYWNrZXQpIHtcbiAgICAgIHJldHVybiBqcztcbiAgICB9XG4gICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgIGpzICs9ICcsICc7XG4gIH1cbn1cblxuLy8gcGFyc2VGdW5jdGlvbkNhbGwgcGFyc2VzIGEgZnVuY3Rpb24gY2FsbCBleHByZXNzaW9uLlxuLy8gVGhlIGxpc3Qgb2Ygc3VwcG9ydGVkIGZ1bmN0aW9ucyBpcyBpblxuLy8gICBwcm9qZWN0cy9jb3JlL21vZGVscy91dGlscy9leHByZXNzaW9uLXV0aWxzLnRzXG4vLyBUaGUgZnVuY3Rpb24gbmFtZSBoYXMgYWxyZWFkeSBiZWVuIHNjYW5uZWQuXG5mdW5jdGlvbiBwYXJzZUZ1bmN0aW9uQ2FsbChuYW1lOiBzdHJpbmcsIHJldlRva3M6IFRva2VuW10pOiBzdHJpbmcge1xuICBjb25zdCBwYXJhbXMgPSBmdW5jdGlvblBhcmFtc1tuYW1lXTtcbiAgaWYgKHBhcmFtcykge1xuICAgIHJldHVybiBwYXJzZUZ1bmN0aW9uV2l0aFBhcmFtcyhuYW1lLCByZXZUb2tzLCAuLi5wYXJhbXMpO1xuICB9XG4gIHN3aXRjaCAobmFtZSkge1xuICAgIGNhc2UgJ0lOQ0xVREVTJzpcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkxQYXJlbik7XG4gICAgICBsZXQganMgPSAnKCcgKyBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKSArICcpLmluY2x1ZGVzKCc7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBqcyArPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKSArICcpJztcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICByZXR1cm4ganM7XG4gICAgY2FzZSAnVE9EQVknOlxuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTFBhcmVuKTtcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICByZXR1cm4gJ1RPREFZKCknO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIGZ1bmN0aW9uOiAnICsgbmFtZSk7XG4gIH1cbn1cblxuLypcbiAgUGFyc2VzIGEgZnVuY3Rpb24gY2FsbCBleHByZXNzaW9uLlxuICBzdHJpbmdpZnlQYXJhbXMgdGVsbHMgaG93IG1hbnkgcGFyYW1ldGVycyB0aGUgZnVuY3Rpb24gaGFzXG4gIGFuZCBpZiB0aGV5IG5lZWQgdG8gYmUgc3RyaW5naWZpZWQuXG4gIEZvciBleGFtcGxlLCB0aGUgaW5kaWNhdG9yIGZ1bmN0aW9uXG4gICAgU1VNKGZvcm1zWzBdLCAkYWdlLCAkZ2VuZGVyID0gJ21hbGUnKVxuICBjYW4gYmUgcGFyc2VkIHdpdGhcbiAgICBwYXJzZUZ1bmN0aW9uV2l0aFBhcmFtcygnU1VNJywgcmV2VG9rcywgZmFsc2UsIHRydWUsIHRydWUpXG4gIHJlc3VsdGluZyBpbiB0aGUgZm9sbG93aW5nIEphdmFTY3JpcHQ6XG4gICAgU1VNKGZvcm1zWzBdLCBgYWdlYCwgYGdlbmRlciA9PT0gJ21hbGUnYClcbiAgc3RyaW5naWZ5UGFyYW1zLmxlbmd0aCA+PSAyIGFuZCB0aGUgbGFzdCBwYXJhbWV0ZXIgaXMgY29uc2lkZXJlZCBvcHRpb25hbC5cbiovXG5mdW5jdGlvbiBwYXJzZUZ1bmN0aW9uV2l0aFBhcmFtcyhcbiAgbmFtZTogc3RyaW5nLFxuICByZXZUb2tzOiBUb2tlbltdLFxuICAuLi5zdHJpbmdpZnlQYXJhbXM6IGJvb2xlYW5bXVxuKTogc3RyaW5nIHtcbiAgaWYgKHN0cmluZ2lmeVBhcmFtcy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwYXJzZUZ1bmN0aW9uV2l0aFBhcmFtcyBvbmx5IHdvcmtzIHdpdGggYXQgbGVhc3QgMiBwYXJhbWV0ZXJzJyk7XG4gIH1cbiAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTFBhcmVuKTtcbiAgbGV0IGpzID0gbmFtZSArICcoJztcbiAgY29uc3QgZmlyc3RQYXJhbSA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICBqcyArPSBzdHJpbmdpZnlQYXJhbXNbMF0gPyBgXFxgJHtmaXJzdFBhcmFtfVxcYGAgOiBmaXJzdFBhcmFtO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IHN0cmluZ2lmeVBhcmFtcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgY29uc3QgcGFyYW0gPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICBqcyArPSBzdHJpbmdpZnlQYXJhbXNbaV0gPyBgLCBcXGAke3BhcmFtfVxcYGAgOiBgLCAke3BhcmFtfWA7XG4gIH1cbiAgLy8gTGFzdCBwYXJhbWV0ZXIsIG9wdGlvbmFsOlxuICBjb25zdCB0b2sgPSByZXZUb2tzLnBvcCgpIGFzIFRva2VuO1xuICBzd2l0Y2ggKHRvay50eXBlKSB7XG4gICAgY2FzZSBUb2tlblR5cGUuUlBhcmVuOlxuICAgICAgcmV0dXJuIGpzICsgJyknO1xuICAgIGNhc2UgVG9rZW5UeXBlLkNvbW1hOlxuICAgICAgY29uc3QgbGFzdFBhcmFtID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgY29uc3Qgc3RyaW5naWZ5ID0gc3RyaW5naWZ5UGFyYW1zW3N0cmluZ2lmeVBhcmFtcy5sZW5ndGggLSAxXTtcbiAgICAgIHJldHVybiBqcyArIChzdHJpbmdpZnkgPyBgLCBcXGAke2xhc3RQYXJhbX1cXGApYCA6IGAsICR7bGFzdFBhcmFtfSlgKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgdW5leHBlY3RlZFRva2VuRXJyb3IodG9rLCByZXZUb2tzKTtcbiAgfVxufVxuXG5jb25zdCBmdW5jdGlvblBhcmFtczoge1tuYW1lOiBzdHJpbmddOiBib29sZWFuW119ID0ge1xuICBTVU06IFtmYWxzZSwgdHJ1ZSwgdHJ1ZV0sXG4gIE1FQU46IFtmYWxzZSwgdHJ1ZSwgdHJ1ZV0sXG4gIE1BWDogW2ZhbHNlLCB0cnVlLCB0cnVlXSxcbiAgTUVESUFOOiBbZmFsc2UsIHRydWUsIHRydWVdLFxuICBNT0RFOiBbZmFsc2UsIHRydWUsIHRydWVdLFxuICBDT1VOVF9GT1JNUzogW2ZhbHNlLCB0cnVlXSxcbiAgQ09VTlRfUkVQUzogW2ZhbHNlLCB0cnVlXSxcbiAgQ09VTlRfRk9STVNfVU5JUVVFOiBbZmFsc2UsIHRydWUsIHRydWVdLFxuICBBTExfVkFMVUVTX09GOiBbZmFsc2UsIHRydWVdLFxuICBQRVJDRU5UOiBbZmFsc2UsIGZhbHNlXSxcbiAgTEFTVDogW2ZhbHNlLCB0cnVlLCBmYWxzZV0sXG4gIFJFUEVBVDogW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIHRydWVdLFxuICBFVkFMVUFURTogW2ZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICBGSUxURVJfQllfVkFSUzogW2ZhbHNlLCBmYWxzZV0sXG4gIEZJTFRFUl9CWTogW2ZhbHNlLCB0cnVlXSxcbiAgQVBQTFk6IFtmYWxzZSwgdHJ1ZSwgdHJ1ZV0sXG4gIEdFVF9BR0U6IFtmYWxzZSwgZmFsc2VdLFxuICBMRU46IFtmYWxzZSwgZmFsc2VdLFxuICBDT05DQVQ6IFtmYWxzZSwgZmFsc2VdLFxuICBSRU1PVkVfRFVQTElDQVRFUzogW2ZhbHNlLCBmYWxzZV0sXG4gIENPTlNPTEVfTE9HOiBbZmFsc2UsIGZhbHNlXSxcbiAgSk9JTl9GT1JNUzogW2ZhbHNlLCBmYWxzZSwgdHJ1ZSwgdHJ1ZV0sXG4gIEpPSU5fUkVQRUFUSU5HX1NMSURFUzogW2ZhbHNlLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZV0sXG4gIEZST01fUkVQUzogW2ZhbHNlLCBmYWxzZV0sXG4gIElTSU46IFtmYWxzZSwgZmFsc2VdLFxuICBPUDogW2ZhbHNlLCBmYWxzZSwgdHJ1ZV0sXG4gIEdFVF9MQUJFTFM6IFtmYWxzZSwgZmFsc2VdLFxuICBBUFBMWV9MQUJFTFM6IFtmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgQlVJTERfREFUQVNFVDogW2ZhbHNlLCBmYWxzZV0sXG4gIFJPVU5EOiBbZmFsc2UsIGZhbHNlXSxcbiAgSVNfQkVGT1JFOiBbZmFsc2UsIGZhbHNlXSxcbiAgSVNfQUZURVI6IFtmYWxzZSwgZmFsc2VdLFxuICBJU19XSVRISU5fSU5URVJWQUw6IFtmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgQ09NUEFSRV9EQVRFOiBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxufTtcbiJdfQ==