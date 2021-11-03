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
// The list of supported functions is documented here:
// https://docs.google.com/document/d/1O55G_7En1NvYcdiw8-Ngo_lxXYwiaQ4JviifF4E-dTA/
// The function name has already been scanned.
function parseFunctionCall(name, revToks) {
    let js;
    switch (name) {
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
        case 'COUNTFORMS':
        case 'COUNTFORMS_UNIQUE':
        case 'LAST':
            return parseCountForms(name, revToks);
        case 'SUM':
        case 'MEAN':
            return parseAggregationFunction(name, revToks);
        case 'ALL_VALUES_OF':
        case 'MAX':
        case 'MEDIAN':
            return parseStatFunction(name, revToks);
        default:
            throw new Error('unsupported function: ' + name);
    }
}
function parseCountForms(name, revToks) {
    consume(revToks, 1 /* LParen */);
    const form = parseExpression(revToks, 5 /* Comma */);
    const tok = revToks.pop();
    switch (tok.type) {
        case 2 /* RParen */:
            return `${name}(${form})`;
        case 5 /* Comma */:
            const condition = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 2 /* RParen */);
            return `${name}(${form}, \`${condition}\`)`;
        default:
            throw unexpectedTokenError(tok, revToks);
    }
}
function parseAggregationFunction(name, revToks) {
    consume(revToks, 1 /* LParen */);
    const form = parseExpression(revToks, 5 /* Comma */);
    consume(revToks, 5 /* Comma */);
    const fields = parseExpression(revToks, 5 /* Comma */);
    const tok = revToks.pop();
    switch (tok.type) {
        case 2 /* RParen */:
            return `${name}(${form}, \`${fields}\`)`;
        case 5 /* Comma */:
            const condition = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 2 /* RParen */);
            return `${name}(${form}, \`${fields}\`, \`${condition}\`)`;
        default:
            throw unexpectedTokenError(tok, revToks);
    }
}
function parseStatFunction(name, revToks) {
    consume(revToks, 1 /* LParen */);
    const form = parseExpression(revToks, 5 /* Comma */);
    consume(revToks, 5 /* Comma */);
    const fieldName = parseExpression(revToks, 2 /* RParen */);
    consume(revToks, 2 /* RParen */);
    return `${name}(${form}, ${fieldName})`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGluZGlraXQtcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy9yZXBvcnQtZnJvbS14bHMvaGluZGlraXQtcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQW1DSCwyQ0FBMkM7QUFDM0MsK0NBQStDO0FBQy9DLFNBQVMsVUFBVSxDQUFDLENBQVM7SUFDM0IsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNsQixPQUFPLEVBQUMsSUFBSSxhQUFlLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQyxDQUFDO0tBQ3hDO0lBQ0QsSUFBSSxDQUEwQixDQUFDO0lBQy9CLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEIsUUFBUSxDQUFDLEVBQUU7UUFDVCxLQUFLLEdBQUc7WUFDTixPQUFPLEVBQUMsSUFBSSxnQkFBa0IsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDN0MsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksZ0JBQWtCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQzdDLEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLGtCQUFvQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUMvQyxLQUFLLEdBQUc7WUFDTixPQUFPLEVBQUMsSUFBSSxrQkFBb0IsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDL0MsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksZUFBaUIsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDNUMsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksY0FBZ0IsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDM0MsS0FBSyxHQUFH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QUMsT0FBTyxnQkFBa0IsQ0FBQztJQUN6RCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFXLENBQUM7SUFDbkMsUUFBUSxHQUFHLENBQUMsSUFBSSxFQUFFO1FBQ2hCO1lBQ0UsT0FBTyxHQUFHLElBQUksSUFBSSxJQUFJLE9BQU8sTUFBTSxLQUFLLENBQUM7UUFDM0M7WUFDRSxNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUMsT0FBTyxnQkFBa0IsQ0FBQztZQUM1RCxPQUFPLENBQUMsT0FBTyxpQkFBbUIsQ0FBQztZQUNuQyxPQUFPLEdBQUcsSUFBSSxJQUFJLElBQUksT0FBTyxNQUFNLFNBQVMsU0FBUyxLQUFLLENBQUM7UUFDN0Q7WUFDRSxNQUFNLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUM1QztBQUNILENBQUM7QUFFRCxTQUFTLGlCQUFpQixDQUFDLElBQVksRUFBRSxPQUFnQjtJQUN2RCxPQUFPLENBQUMsT0FBTyxpQkFBbUIsQ0FBQztJQUNuQyxNQUFNLElBQUksR0FBRyxlQUFlLENBQUMsT0FBTyxnQkFBa0IsQ0FBQztJQUN2RCxPQUFPLENBQUMsT0FBTyxnQkFBa0IsQ0FBQztJQUNsQyxNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUMsT0FBTyxpQkFBbUIsQ0FBQztJQUM3RCxPQUFPLENBQUMsT0FBTyxpQkFBbUIsQ0FBQztJQUVuQyxPQUFPLEdBQUcsSUFBSSxJQUFJLElBQUksS0FBSyxTQUFTLEdBQUcsQ0FBQztBQUMxQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5jb25zdCBlbnVtIFRva2VuVHlwZSB7XG4gIEVORCxcbiAgTFBhcmVuLFxuICBSUGFyZW4sXG4gIExCcmFja2V0LFxuICBSQnJhY2tldCxcbiAgQ29tbWEsXG5cbiAgLy8gQmluYXJ5IG9wZXJhdG9ycyBmcm9tIFBsdXMgdG8gR3JlYXRlck9yRXEgaGF2ZSB0aGUgc2FtZSByZXByZXNlbnRhdGlvblxuICAvLyBpbiBpbmRpY2F0b3IgZm9ybXVsYXMgYW5kIEphdmFTY3JpcHQgYW5kIGRvbid0IG5lZWQgYSB0cmFuc2xhdGlvbi5cbiAgUGx1cyxcbiAgTWludXMsXG4gIE11bCxcbiAgRGl2LFxuICBMZXNzLFxuICBMZXNzT3JFcSxcbiAgR3JlYXRlcixcbiAgR3JlYXRlck9yRXEsXG5cbiAgRXF1YWwsXG4gIE5vdEVxdWFsLFxuICBOb3QsXG4gIFN0cmluZyxcbiAgTnVtYmVyLFxuICBJbmRlbnQsXG4gIE5hbWUsIC8vIFRoZSBuYW1lIG9mIGEgZmllbGQ6IGFuIGlkZW50aWZpZXIgc3RhcnRpbmcgd2l0aCAkXG59XG5cbmludGVyZmFjZSBUb2tlbiB7XG4gIHR5cGU6IFRva2VuVHlwZTtcbiAgdGV4dDogc3RyaW5nO1xufVxuXG4vLyBmaXJzdFRva2VuIHJldHVybnMgdGhlIGZpcnN0IHRva2VuIGluIHMuXG4vLyBzIG11c3Qgbm90IGJlZ2luIHdpdGggd2hpdGVzcGFjZSBjaGFyYWN0ZXJzLlxuZnVuY3Rpb24gZmlyc3RUb2tlbihzOiBzdHJpbmcpOiBUb2tlbiB7XG4gIGlmIChzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkVORCwgdGV4dDogJyd9O1xuICB9XG4gIGxldCBtOiBSZWdFeHBNYXRjaEFycmF5IHwgbnVsbDtcbiAgY29uc3QgYyA9IHMuY2hhckF0KDApO1xuICBzd2l0Y2ggKGMpIHtcbiAgICBjYXNlICcoJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkxQYXJlbiwgdGV4dDogJygnfTtcbiAgICBjYXNlICcpJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLlJQYXJlbiwgdGV4dDogJyknfTtcbiAgICBjYXNlICdbJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkxCcmFja2V0LCB0ZXh0OiAnWyd9O1xuICAgIGNhc2UgJ10nOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuUkJyYWNrZXQsIHRleHQ6ICddJ307XG4gICAgY2FzZSAnLCc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5Db21tYSwgdGV4dDogJywnfTtcbiAgICBjYXNlICcrJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLlBsdXMsIHRleHQ6ICcrJ307XG4gICAgY2FzZSAnLSc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5NaW51cywgdGV4dDogJy0nfTtcbiAgICBjYXNlICcqJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLk11bCwgdGV4dDogJyonfTtcbiAgICBjYXNlICcvJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkRpdiwgdGV4dDogJy8nfTtcbiAgICBjYXNlICc8JzpcbiAgICAgIGlmIChzLmxlbmd0aCA+IDEgJiYgcy5jaGFyQXQoMSkgPT09ICc9Jykge1xuICAgICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5MZXNzT3JFcSwgdGV4dDogJzw9J307XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5MZXNzLCB0ZXh0OiAnPCd9O1xuICAgIGNhc2UgJz4nOlxuICAgICAgaWYgKHMubGVuZ3RoID4gMSAmJiBzLmNoYXJBdCgxKSA9PT0gJz0nKSB7XG4gICAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkdyZWF0ZXJPckVxLCB0ZXh0OiAnPj0nfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkdyZWF0ZXIsIHRleHQ6ICc+J307XG4gICAgY2FzZSAnPSc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5FcXVhbCwgdGV4dDogJz0nfTtcbiAgICBjYXNlICchJzpcbiAgICAgIGlmIChzLmxlbmd0aCA+IDEgJiYgcy5jaGFyQXQoMSkgPT09ICc9Jykge1xuICAgICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5Ob3RFcXVhbCwgdGV4dDogJyE9J307XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5Ob3QsIHRleHQ6ICchJ307XG4gICAgY2FzZSAnJCc6XG4gICAgICBtID0gcy5tYXRjaCgvXlxcJFthLXpBLVpfXVxcdyovKTtcbiAgICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBmaWVsZCBuYW1lIGluOiAnICsgcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5OYW1lLCB0ZXh0OiBtWzBdfTtcbiAgICBjYXNlICdcIic6XG4gICAgICBtID0gcy5tYXRjaCgvXlwiKFxcXFxcXFxcfFxcXFxcInxbXlwiXSkqXCIvKTtcbiAgICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW50ZXJtaW5hdGVkIHN0cmluZyBsaXRlcmFsIGluOiAnICsgcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5TdHJpbmcsIHRleHQ6IG1bMF19O1xuICAgIGNhc2UgXCInXCI6XG4gICAgICBtID0gcy5tYXRjaCgvXicoXFxcXFxcXFx8XFxcXCd8W14nXSkqJy8pO1xuICAgICAgaWYgKG0gPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnRlcm1pbmF0ZWQgc3RyaW5nIGxpdGVyYWwgaW46ICcgKyBzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLlN0cmluZywgdGV4dDogbVswXX07XG4gIH1cbiAgaWYgKGMgPj0gJzAnICYmIGMgPD0gJzknKSB7XG4gICAgbSA9IHMubWF0Y2goL15cXGQrKFxcLlxcZCspPyhbZUVdW1xcK1xcLV0/XFxkKyk/Lyk7XG4gICAgaWYgKG0gPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW1wb3NzaWJsZScpO1xuICAgIH1cbiAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5OdW1iZXIsIHRleHQ6IG1bMF19O1xuICB9XG4gIG0gPSBzLm1hdGNoKC9eW2EtekEtWl9dXFx3Ki8pO1xuICBpZiAobSAhPT0gbnVsbCkge1xuICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkluZGVudCwgdGV4dDogbVswXX07XG4gIH1cbiAgaWYgKHMubWF0Y2goL15cXHMvKSAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc3RyaW5nIHMgaGFzIGEgbGVhZGluZyB3aGl0ZXNwYWNlJyk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgdG9rZW4gaW46ICcgKyBzKTtcbn1cblxuZnVuY3Rpb24gdG9rZW5pemUoczogc3RyaW5nKTogVG9rZW5bXSB7XG4gIGNvbnN0IHRva3M6IFRva2VuW10gPSBbXTtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzID0gcy50cmltKCk7XG4gICAgY29uc3QgdCA9IGZpcnN0VG9rZW4ocyk7XG4gICAgdG9rcy5wdXNoKHQpO1xuICAgIGlmICh0LnR5cGUgPT09IFRva2VuVHlwZS5FTkQpIHtcbiAgICAgIHJldHVybiB0b2tzO1xuICAgIH1cbiAgICBzID0gcy5zbGljZSh0LnRleHQubGVuZ3RoKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5kaWNhdG9yVG9Kcyhmb3JtdWxhOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcGFyc2VFeHByZXNzaW9uKHRva2VuaXplKGZvcm11bGEpLnJldmVyc2UoKSwgVG9rZW5UeXBlLkVORCk7XG59XG5cbmZ1bmN0aW9uIHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvazogVG9rZW4sIHJlc3Q6IFRva2VuW10pOiBFcnJvciB7XG4gIGlmICh0b2sudHlwZSA9PT0gVG9rZW5UeXBlLkVORCkge1xuICAgIHJldHVybiBuZXcgRXJyb3IoJ3VuZXhwZWN0ZWQgZW5kIG9mIHRva2VuIHN0cmVhbScpO1xuICB9XG4gIHJlc3QucHVzaCh0b2spO1xuICByZXR1cm4gbmV3IEVycm9yKCd1bmV4cGVjdGVkIHRva2VuIGF0IHRoZSBzdGFydCBvZjogJyArIHByaW50VG9rZW5zKHJlc3QpKTtcbn1cblxuZnVuY3Rpb24gcHJpbnRUb2tlbnMocmV2VG9rczogVG9rZW5bXSkge1xuICBsZXQgcyA9ICcnO1xuICB3aGlsZSAocmV2VG9rcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgdG9rID0gcmV2VG9rcy5wb3AoKSBhcyBUb2tlbjtcbiAgICBpZiAodG9rLnR5cGUgPj0gVG9rZW5UeXBlLlBsdXMgJiYgdG9rLnR5cGUgPD0gVG9rZW5UeXBlLk5vdEVxdWFsKSB7XG4gICAgICAvLyBiaW5hcnkgb3BlcmF0b3JzXG4gICAgICBzICs9ICcgJyArIHRvay50ZXh0ICsgJyAnO1xuICAgIH0gZWxzZSBpZiAodG9rLnR5cGUgPT09IFRva2VuVHlwZS5Db21tYSkge1xuICAgICAgcyArPSAnLCAnO1xuICAgIH0gZWxzZSB7XG4gICAgICBzICs9IHRvay50ZXh0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gcztcbn1cblxuZnVuY3Rpb24gY29uc3VtZShyZXZUb2tzOiBUb2tlbltdLCBleHBlY3RlZFR5cGU6IFRva2VuVHlwZSk6IFRva2VuIHtcbiAgY29uc3QgdG9rID0gcmV2VG9rcy5wb3AoKSBhcyBUb2tlbjtcbiAgaWYgKHRvay50eXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2ssIHJldlRva3MpO1xuICB9XG4gIHJldHVybiB0b2s7XG59XG5cbi8vIHBhcnNlRXhwcmVzc2lvbiBwYXJzZXMgdGhlIGZpcnN0IGV4cHJlc3Npb24gaW4gcmV2VG9rc1xuLy8gYW5kIHJldHVybnMgaXRzIEphdmFTY3JpcHQvYWpmIHRyYW5zbGF0aW9uLlxuLy8gcmV2VG9rcyBpcyByZXZlcnNlZCwgdGhlIGZpcnN0IHRva2VuIG9mIHRoZSBleHByZXNzaW9uIGJlaW5nIGF0IGluZGV4IGxlbmd0aC0xO1xuLy8gdGhpcyB3YXksIHRva2VucyBjYW4gYmUgY29uc3VtZWQgZWZmaWNpZW50bHkgd2l0aCByZXZUb2tzLnBvcCgpLlxuLy8gQWZ0ZXIgdGhlIGV4cHJlc3Npb24sIHRoZSBmdW5jdGlvbiBleHBlY3RzIHRvIGZpbmQgdGhlIHRva2VuIGV4cGVjdGVkRW5kLlxuZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9uKHJldlRva3M6IFRva2VuW10sIGV4cGVjdGVkRW5kOiBUb2tlblR5cGUpOiBzdHJpbmcge1xuICBpZiAoXG4gICAgZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5FTkQgJiZcbiAgICBleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLlJQYXJlbiAmJlxuICAgIGV4cGVjdGVkRW5kICE9PSBUb2tlblR5cGUuQ29tbWEgJiZcbiAgICBleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLlJCcmFja2V0XG4gICkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBleHBlY3RlZEVuZCcpO1xuICB9XG5cbiAgbGV0IGpzID0gJyc7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgLy8gRXhwcmVzc2lvbi5cbiAgICBsZXQgdG9rID0gcmV2VG9rcy5wb3AoKSBhcyBUb2tlbjtcbiAgICBsZXQgbmV4dDogVG9rZW47XG4gICAgc3dpdGNoICh0b2sudHlwZSkge1xuICAgICAgY2FzZSBUb2tlblR5cGUuSW5kZW50OlxuICAgICAgICBuZXh0ID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAobmV4dC50eXBlID09PSBUb2tlblR5cGUuTFBhcmVuKSB7XG4gICAgICAgICAganMgKz0gcGFyc2VGdW5jdGlvbkNhbGwodG9rLnRleHQsIHJldlRva3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGpzICs9IHRvay50ZXh0O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUb2tlblR5cGUuTmFtZTpcbiAgICAgICAganMgKz0gdG9rLnRleHQuc2xpY2UoMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUb2tlblR5cGUuU3RyaW5nOlxuICAgICAgY2FzZSBUb2tlblR5cGUuTnVtYmVyOlxuICAgICAgICBqcyArPSB0b2sudGV4dDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRva2VuVHlwZS5QbHVzOlxuICAgICAgY2FzZSBUb2tlblR5cGUuTWludXM6XG4gICAgICAgIG5leHQgPSByZXZUb2tzW3JldlRva3MubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5QbHVzIHx8IG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLk1pbnVzKSB7XG4gICAgICAgICAgdGhyb3cgdW5leHBlY3RlZFRva2VuRXJyb3IocmV2VG9rcy5wb3AoKSBhcyBUb2tlbiwgcmV2VG9rcyk7XG4gICAgICAgIH1cbiAgICAgICAganMgKz0gdG9rLnRleHQ7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgY2FzZSBUb2tlblR5cGUuTm90OlxuICAgICAgICBqcyArPSAnISc7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgY2FzZSBUb2tlblR5cGUuTFBhcmVuOlxuICAgICAgICBqcyArPSAnKCcgKyBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbikgKyAnKSc7XG4gICAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUb2tlblR5cGUuTEJyYWNrZXQ6XG4gICAgICAgIGpzICs9ICdbJyArIHBhcnNlTGlzdChyZXZUb2tzLCBUb2tlblR5cGUuUkJyYWNrZXQpICsgJ10nO1xuICAgICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SQnJhY2tldCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgdW5leHBlY3RlZFRva2VuRXJyb3IodG9rLCByZXZUb2tzKTtcbiAgICB9XG5cbiAgICAvLyBQb3NzaWJsZSBlbmQgb2YgZXhwcmVzc2lvbi4gZXhwZWN0ZWRFbmQgY2FuIGJlOlxuICAgIC8vIEVORCxcbiAgICAvLyBSUGFyZW4gZm9yIGV4cHJlc3Npb25zIGJldHdlZW4gcGFyZW50aGVzZXMsXG4gICAgLy8gQ29tbWEgZm9yIGZ1bmN0aW9uIGFyZ3VtZW50cywgaW4gd2hpY2ggY2FzZSB3ZSBhbHNvIGFjY2VwdCBSUGFyZW4sXG4gICAgLy8gUkJyYWNrZXQgZm9yIGFycmF5IGVsZW1lbnRzLCAgaW4gd2hpY2ggY2FzZSB3ZSBhbHNvIGFjY2VwdCBDb21tYS5cbiAgICAvLyBOb3RlIHRoYXQgd2UgZG9uJ3QgY29uc3VtZSB0aGUgZW5kIHRva2VuLlxuICAgIGNvbnN0IHR5cGUgPSByZXZUb2tzW3JldlRva3MubGVuZ3RoIC0gMV0udHlwZTtcbiAgICBpZiAoXG4gICAgICB0eXBlID09PSBleHBlY3RlZEVuZCB8fFxuICAgICAgKGV4cGVjdGVkRW5kID09PSBUb2tlblR5cGUuQ29tbWEgJiYgdHlwZSA9PT0gVG9rZW5UeXBlLlJQYXJlbikgfHxcbiAgICAgIChleHBlY3RlZEVuZCA9PT0gVG9rZW5UeXBlLlJCcmFja2V0ICYmIHR5cGUgPT09IFRva2VuVHlwZS5Db21tYSlcbiAgICApIHtcbiAgICAgIHJldHVybiBqcztcbiAgICB9XG5cbiAgICAvLyBPcGVyYXRvci5cbiAgICB0b2sgPSByZXZUb2tzLnBvcCgpIGFzIFRva2VuO1xuICAgIGlmICh0b2sudHlwZSA+PSBUb2tlblR5cGUuUGx1cyAmJiB0b2sudHlwZSA8PSBUb2tlblR5cGUuR3JlYXRlck9yRXEpIHtcbiAgICAgIGpzICs9ICcgJyArIHRvay50ZXh0ICsgJyAnO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHN3aXRjaCAodG9rLnR5cGUpIHtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLkluZGVudDpcbiAgICAgICAgaWYgKHRvay50ZXh0ID09PSAnQU5EJykge1xuICAgICAgICAgIGpzICs9ICcgJiYgJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9rLnRleHQgPT09ICdPUicpIHtcbiAgICAgICAgICBqcyArPSAnIHx8ICc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgdW5leHBlY3RlZFRva2VuRXJyb3IodG9rLCByZXZUb2tzKTtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLkVxdWFsOlxuICAgICAgICBqcyArPSAnID09PSAnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk5vdEVxdWFsOlxuICAgICAgICBqcyArPSAnICE9PSAnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gICAgfVxuICB9XG59XG5cbi8vIHBhcnNlTGlzdCBwYXJzZXMgYSBjb21tYS1zZXBhcmF0ZWQgbGlzdCBvZiBleHByZXNzaW9ucy5cbi8vIGV4cGVjdGVkRW5kIGlzIENvbW1hIGZvciBmdW5jdGlvbiBhcmd1bWVudHMgYW5kIFJCcmFja2V0IGZvciBhcnJheXMsXG4vLyBhY2NvcmRpbmcgdG8gdGhlIGJlaGF2aW9yIG9mIHBhcnNlRXhwcmVzc2lvbi5cbmZ1bmN0aW9uIHBhcnNlTGlzdChyZXZUb2tzOiBUb2tlbltdLCBleHBlY3RlZEVuZDogVG9rZW5UeXBlKTogc3RyaW5nIHtcbiAgaWYgKGV4cGVjdGVkRW5kICE9PSBUb2tlblR5cGUuQ29tbWEgJiYgZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5SQnJhY2tldCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBleHBlY3RlZEVuZCcpO1xuICB9XG4gIGxldCBuZXh0ID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdO1xuICBpZiAobmV4dC50eXBlID09PSBUb2tlblR5cGUuUlBhcmVuIHx8IG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLlJCcmFja2V0KSB7XG4gICAgLy8gZW1wdHkgbGlzdFxuICAgIHJldHVybiAnJztcbiAgfVxuICBsZXQganMgPSAnJztcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBqcyArPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgZXhwZWN0ZWRFbmQpO1xuICAgIG5leHQgPSByZXZUb2tzW3JldlRva3MubGVuZ3RoIC0gMV07XG4gICAgaWYgKG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLlJQYXJlbiB8fCBuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5SQnJhY2tldCkge1xuICAgICAgcmV0dXJuIGpzO1xuICAgIH1cbiAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAganMgKz0gJywgJztcbiAgfVxufVxuXG4vLyBwYXJzZUZ1bmN0aW9uQ2FsbCBwYXJzZXMgYSBmdW5jdGlvbiBjYWxsIGV4cHJlc3Npb24uXG4vLyBUaGUgbGlzdCBvZiBzdXBwb3J0ZWQgZnVuY3Rpb25zIGlzIGRvY3VtZW50ZWQgaGVyZTpcbi8vIGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2RvY3VtZW50L2QvMU81NUdfN0VuMU52WWNkaXc4LU5nb19seFhZd2lhUTRKdmlpZkY0RS1kVEEvXG4vLyBUaGUgZnVuY3Rpb24gbmFtZSBoYXMgYWxyZWFkeSBiZWVuIHNjYW5uZWQuXG5mdW5jdGlvbiBwYXJzZUZ1bmN0aW9uQ2FsbChuYW1lOiBzdHJpbmcsIHJldlRva3M6IFRva2VuW10pOiBzdHJpbmcge1xuICBsZXQganM6IHN0cmluZztcbiAgc3dpdGNoIChuYW1lKSB7XG4gICAgY2FzZSAnSU5DTFVERVMnOlxuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTFBhcmVuKTtcbiAgICAgIGpzID0gJygnICsgcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnKS5pbmNsdWRlcygnO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAganMgKz0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnKSc7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgcmV0dXJuIGpzO1xuICAgIGNhc2UgJ1BFUkNFTlQnOlxuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTFBhcmVuKTtcbiAgICAgIGpzID0gJ1BFUkNFTlQoJyArIHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpICsgJywgJztcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgIGpzICs9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpICsgJyknO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUlBhcmVuKTtcbiAgICAgIHJldHVybiBqcztcbiAgICBjYXNlICdDT1VOVEZPUk1TJzpcbiAgICBjYXNlICdDT1VOVEZPUk1TX1VOSVFVRSc6XG4gICAgY2FzZSAnTEFTVCc6XG4gICAgICByZXR1cm4gcGFyc2VDb3VudEZvcm1zKG5hbWUsIHJldlRva3MpO1xuICAgIGNhc2UgJ1NVTSc6XG4gICAgY2FzZSAnTUVBTic6XG4gICAgICByZXR1cm4gcGFyc2VBZ2dyZWdhdGlvbkZ1bmN0aW9uKG5hbWUsIHJldlRva3MpO1xuICAgIGNhc2UgJ0FMTF9WQUxVRVNfT0YnOlxuICAgIGNhc2UgJ01BWCc6XG4gICAgY2FzZSAnTUVESUFOJzpcbiAgICAgIHJldHVybiBwYXJzZVN0YXRGdW5jdGlvbihuYW1lLCByZXZUb2tzKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBmdW5jdGlvbjogJyArIG5hbWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlQ291bnRGb3JtcyhuYW1lOiBzdHJpbmcsIHJldlRva3M6IFRva2VuW10pOiBzdHJpbmcge1xuICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MUGFyZW4pO1xuICBjb25zdCBmb3JtID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gIGNvbnN0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gIHN3aXRjaCAodG9rLnR5cGUpIHtcbiAgICBjYXNlIFRva2VuVHlwZS5SUGFyZW46XG4gICAgICByZXR1cm4gYCR7bmFtZX0oJHtmb3JtfSlgO1xuICAgIGNhc2UgVG9rZW5UeXBlLkNvbW1hOlxuICAgICAgY29uc3QgY29uZGl0aW9uID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgcmV0dXJuIGAke25hbWV9KCR7Zm9ybX0sIFxcYCR7Y29uZGl0aW9ufVxcYClgO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2ssIHJldlRva3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlQWdncmVnYXRpb25GdW5jdGlvbihuYW1lOiBzdHJpbmcsIHJldlRva3M6IFRva2VuW10pOiBzdHJpbmcge1xuICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MUGFyZW4pO1xuICBjb25zdCBmb3JtID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgY29uc3QgZmllbGRzID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gIGNvbnN0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gIHN3aXRjaCAodG9rLnR5cGUpIHtcbiAgICBjYXNlIFRva2VuVHlwZS5SUGFyZW46XG4gICAgICByZXR1cm4gYCR7bmFtZX0oJHtmb3JtfSwgXFxgJHtmaWVsZHN9XFxgKWA7XG4gICAgY2FzZSBUb2tlblR5cGUuQ29tbWE6XG4gICAgICBjb25zdCBjb25kaXRpb24gPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICByZXR1cm4gYCR7bmFtZX0oJHtmb3JtfSwgXFxgJHtmaWVsZHN9XFxgLCBcXGAke2NvbmRpdGlvbn1cXGApYDtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgdW5leHBlY3RlZFRva2VuRXJyb3IodG9rLCByZXZUb2tzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZVN0YXRGdW5jdGlvbihuYW1lOiBzdHJpbmcsIHJldlRva3M6IFRva2VuW10pOiBzdHJpbmcge1xuICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MUGFyZW4pO1xuICBjb25zdCBmb3JtID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgY29uc3QgZmllbGROYW1lID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuXG4gIHJldHVybiBgJHtuYW1lfSgke2Zvcm19LCAke2ZpZWxkTmFtZX0pYDtcbn1cbiJdfQ==