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
            consume(revToks, 1 /* LParen */);
            let js = '(' + parseExpression(revToks, 5 /* Comma */) + ').includes(';
            consume(revToks, 5 /* Comma */);
            js += parseExpression(revToks, 5 /* Comma */) + ')';
            consume(revToks, 2 /* RParen */);
            return js;
        case 'TODAY':
            consume(revToks, 1 /* LParen */);
            consume(revToks, 2 /* RParen */);
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
    consume(revToks, 1 /* LParen */);
    let js = name + '(';
    const firstParam = parseExpression(revToks, 5 /* Comma */);
    js += stringifyParams[0] ? `\`${firstParam}\`` : firstParam;
    for (let i = 1; i < stringifyParams.length - 1; i++) {
        consume(revToks, 5 /* Comma */);
        const param = parseExpression(revToks, 5 /* Comma */);
        js += stringifyParams[i] ? `, \`${param}\`` : `, ${param}`;
    }
    // Last parameter, optional:
    const tok = revToks.pop();
    switch (tok.type) {
        case 2 /* RParen */:
            return js + ')';
        case 5 /* Comma */:
            const lastParam = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 2 /* RParen */);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGluZGlraXQtcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9yZXBvcnRzL3NyYy94bHMtcmVwb3J0L2hpbmRpa2l0LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFtQ0gsMkNBQTJDO0FBQzNDLCtDQUErQztBQUMvQyxTQUFTLFVBQVUsQ0FBQyxDQUFTO0lBQzNCLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDbEIsT0FBTyxFQUFDLElBQUksYUFBZSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQztLQUN4QztJQUNELElBQUksQ0FBMEIsQ0FBQztJQUMvQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RCLFFBQVEsQ0FBQyxFQUFFO1FBQ1QsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksZ0JBQWtCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQzdDLEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLGdCQUFrQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUM3QyxLQUFLLEdBQUc7WUFDTixPQUFPLEVBQUMsSUFBSSxrQkFBb0IsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDL0MsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksa0JBQW9CLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQy9DLEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLGVBQWlCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQzVDLEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLGNBQWdCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQzNDLEtBQUssR0FBRztZ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Q0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO0lBQ3BCLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO0lBQ3hCLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7SUFDMUIsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7SUFDbkMsYUFBYSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUM3QixLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO0lBQ3JCLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7SUFDekIsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUN4QixrQkFBa0IsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO0lBQ3pDLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztDQUMzQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5jb25zdCBlbnVtIFRva2VuVHlwZSB7XG4gIEVORCxcbiAgTFBhcmVuLFxuICBSUGFyZW4sXG4gIExCcmFja2V0LFxuICBSQnJhY2tldCxcbiAgQ29tbWEsXG5cbiAgLy8gQmluYXJ5IG9wZXJhdG9ycyBmcm9tIFBsdXMgdG8gR3JlYXRlck9yRXEgaGF2ZSB0aGUgc2FtZSByZXByZXNlbnRhdGlvblxuICAvLyBpbiBpbmRpY2F0b3IgZm9ybXVsYXMgYW5kIEphdmFTY3JpcHQgYW5kIGRvbid0IG5lZWQgYSB0cmFuc2xhdGlvbi5cbiAgUGx1cyxcbiAgTWludXMsXG4gIE11bCxcbiAgRGl2LFxuICBMZXNzLFxuICBMZXNzT3JFcSxcbiAgR3JlYXRlcixcbiAgR3JlYXRlck9yRXEsXG5cbiAgRXF1YWwsXG4gIE5vdEVxdWFsLFxuICBOb3QsXG4gIFN0cmluZyxcbiAgTnVtYmVyLFxuICBJbmRlbnQsXG4gIE5hbWUsIC8vIFRoZSBuYW1lIG9mIGEgZmllbGQ6IGFuIGlkZW50aWZpZXIgc3RhcnRpbmcgd2l0aCAkXG59XG5cbmludGVyZmFjZSBUb2tlbiB7XG4gIHR5cGU6IFRva2VuVHlwZTtcbiAgdGV4dDogc3RyaW5nO1xufVxuXG4vLyBmaXJzdFRva2VuIHJldHVybnMgdGhlIGZpcnN0IHRva2VuIGluIHMuXG4vLyBzIG11c3Qgbm90IGJlZ2luIHdpdGggd2hpdGVzcGFjZSBjaGFyYWN0ZXJzLlxuZnVuY3Rpb24gZmlyc3RUb2tlbihzOiBzdHJpbmcpOiBUb2tlbiB7XG4gIGlmIChzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkVORCwgdGV4dDogJyd9O1xuICB9XG4gIGxldCBtOiBSZWdFeHBNYXRjaEFycmF5IHwgbnVsbDtcbiAgY29uc3QgYyA9IHMuY2hhckF0KDApO1xuICBzd2l0Y2ggKGMpIHtcbiAgICBjYXNlICcoJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkxQYXJlbiwgdGV4dDogJygnfTtcbiAgICBjYXNlICcpJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLlJQYXJlbiwgdGV4dDogJyknfTtcbiAgICBjYXNlICdbJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkxCcmFja2V0LCB0ZXh0OiAnWyd9O1xuICAgIGNhc2UgJ10nOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuUkJyYWNrZXQsIHRleHQ6ICddJ307XG4gICAgY2FzZSAnLCc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5Db21tYSwgdGV4dDogJywnfTtcbiAgICBjYXNlICcrJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLlBsdXMsIHRleHQ6ICcrJ307XG4gICAgY2FzZSAnLSc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5NaW51cywgdGV4dDogJy0nfTtcbiAgICBjYXNlICcqJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLk11bCwgdGV4dDogJyonfTtcbiAgICBjYXNlICcvJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkRpdiwgdGV4dDogJy8nfTtcbiAgICBjYXNlICc8JzpcbiAgICAgIGlmIChzLmxlbmd0aCA+IDEgJiYgcy5jaGFyQXQoMSkgPT09ICc9Jykge1xuICAgICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5MZXNzT3JFcSwgdGV4dDogJzw9J307XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5MZXNzLCB0ZXh0OiAnPCd9O1xuICAgIGNhc2UgJz4nOlxuICAgICAgaWYgKHMubGVuZ3RoID4gMSAmJiBzLmNoYXJBdCgxKSA9PT0gJz0nKSB7XG4gICAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkdyZWF0ZXJPckVxLCB0ZXh0OiAnPj0nfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkdyZWF0ZXIsIHRleHQ6ICc+J307XG4gICAgY2FzZSAnPSc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5FcXVhbCwgdGV4dDogJz0nfTtcbiAgICBjYXNlICchJzpcbiAgICAgIGlmIChzLmxlbmd0aCA+IDEgJiYgcy5jaGFyQXQoMSkgPT09ICc9Jykge1xuICAgICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5Ob3RFcXVhbCwgdGV4dDogJyE9J307XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5Ob3QsIHRleHQ6ICchJ307XG4gICAgY2FzZSAnJCc6XG4gICAgICBtID0gcy5tYXRjaCgvXlxcJFthLXpBLVpfXVxcdyovKTtcbiAgICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBmaWVsZCBuYW1lIGluOiAnICsgcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5OYW1lLCB0ZXh0OiBtWzBdfTtcbiAgICBjYXNlICdcIic6XG4gICAgICBtID0gcy5tYXRjaCgvXlwiKFxcXFxcXFxcfFxcXFxcInxbXlwiXSkqXCIvKTtcbiAgICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW50ZXJtaW5hdGVkIHN0cmluZyBsaXRlcmFsIGluOiAnICsgcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5TdHJpbmcsIHRleHQ6IG1bMF19O1xuICAgIGNhc2UgXCInXCI6XG4gICAgICBtID0gcy5tYXRjaCgvXicoXFxcXFxcXFx8XFxcXCd8W14nXSkqJy8pO1xuICAgICAgaWYgKG0gPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnRlcm1pbmF0ZWQgc3RyaW5nIGxpdGVyYWwgaW46ICcgKyBzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLlN0cmluZywgdGV4dDogbVswXX07XG4gIH1cbiAgaWYgKGMgPj0gJzAnICYmIGMgPD0gJzknKSB7XG4gICAgbSA9IHMubWF0Y2goL15cXGQrKFxcLlxcZCspPyhbZUVdW1xcK1xcLV0/XFxkKyk/Lyk7XG4gICAgaWYgKG0gPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW1wb3NzaWJsZScpO1xuICAgIH1cbiAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5OdW1iZXIsIHRleHQ6IG1bMF19O1xuICB9XG4gIG0gPSBzLm1hdGNoKC9eW2EtekEtWl9dXFx3Ki8pO1xuICBpZiAobSAhPT0gbnVsbCkge1xuICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkluZGVudCwgdGV4dDogbVswXX07XG4gIH1cbiAgaWYgKHMubWF0Y2goL15cXHMvKSAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc3RyaW5nIHMgaGFzIGEgbGVhZGluZyB3aGl0ZXNwYWNlJyk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgdG9rZW4gaW46ICcgKyBzKTtcbn1cblxuZnVuY3Rpb24gdG9rZW5pemUoczogc3RyaW5nKTogVG9rZW5bXSB7XG4gIGNvbnN0IHRva3M6IFRva2VuW10gPSBbXTtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzID0gcy50cmltKCk7XG4gICAgY29uc3QgdCA9IGZpcnN0VG9rZW4ocyk7XG4gICAgdG9rcy5wdXNoKHQpO1xuICAgIGlmICh0LnR5cGUgPT09IFRva2VuVHlwZS5FTkQpIHtcbiAgICAgIHJldHVybiB0b2tzO1xuICAgIH1cbiAgICBzID0gcy5zbGljZSh0LnRleHQubGVuZ3RoKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5kaWNhdG9yVG9Kcyhmb3JtdWxhOiBzdHJpbmcpOiBzdHJpbmcge1xuICBzd2l0Y2ggKHR5cGVvZiBmb3JtdWxhKSB7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGlmIChmb3JtdWxhLnN0YXJ0c1dpdGgoJ2pzOicpKSB7XG4gICAgICAgIHJldHVybiBmb3JtdWxhLnNsaWNlKDMpLnRyaW0oKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ251bWJlcic6XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBmb3JtdWxhID0gU3RyaW5nKGZvcm11bGEpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignZm9ybXVsYSBpcyBub3QgYSBzdHJpbmcnKTtcbiAgfVxuICByZXR1cm4gcGFyc2VFeHByZXNzaW9uKHRva2VuaXplKGZvcm11bGEpLnJldmVyc2UoKSwgVG9rZW5UeXBlLkVORCk7XG59XG5cbmZ1bmN0aW9uIHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvazogVG9rZW4sIHJlc3Q6IFRva2VuW10pOiBFcnJvciB7XG4gIGlmICh0b2sudHlwZSA9PT0gVG9rZW5UeXBlLkVORCkge1xuICAgIHJldHVybiBuZXcgRXJyb3IoJ3VuZXhwZWN0ZWQgZW5kIG9mIHRva2VuIHN0cmVhbScpO1xuICB9XG4gIHJlc3QucHVzaCh0b2spO1xuICByZXR1cm4gbmV3IEVycm9yKCd1bmV4cGVjdGVkIHRva2VuIGF0IHRoZSBzdGFydCBvZjogJyArIHByaW50VG9rZW5zKHJlc3QpKTtcbn1cblxuZnVuY3Rpb24gcHJpbnRUb2tlbnMocmV2VG9rczogVG9rZW5bXSkge1xuICBsZXQgcyA9ICcnO1xuICB3aGlsZSAocmV2VG9rcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgdG9rID0gcmV2VG9rcy5wb3AoKSBhcyBUb2tlbjtcbiAgICBpZiAodG9rLnR5cGUgPj0gVG9rZW5UeXBlLlBsdXMgJiYgdG9rLnR5cGUgPD0gVG9rZW5UeXBlLk5vdEVxdWFsKSB7XG4gICAgICAvLyBiaW5hcnkgb3BlcmF0b3JzXG4gICAgICBzICs9ICcgJyArIHRvay50ZXh0ICsgJyAnO1xuICAgIH0gZWxzZSBpZiAodG9rLnR5cGUgPT09IFRva2VuVHlwZS5Db21tYSkge1xuICAgICAgcyArPSAnLCAnO1xuICAgIH0gZWxzZSB7XG4gICAgICBzICs9IHRvay50ZXh0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gcztcbn1cblxuZnVuY3Rpb24gY29uc3VtZShyZXZUb2tzOiBUb2tlbltdLCBleHBlY3RlZFR5cGU6IFRva2VuVHlwZSk6IFRva2VuIHtcbiAgY29uc3QgdG9rID0gcmV2VG9rcy5wb3AoKSBhcyBUb2tlbjtcbiAgaWYgKHRvay50eXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2ssIHJldlRva3MpO1xuICB9XG4gIHJldHVybiB0b2s7XG59XG5cbi8vIHBhcnNlRXhwcmVzc2lvbiBwYXJzZXMgdGhlIGZpcnN0IGV4cHJlc3Npb24gaW4gcmV2VG9rc1xuLy8gYW5kIHJldHVybnMgaXRzIEphdmFTY3JpcHQvYWpmIHRyYW5zbGF0aW9uLlxuLy8gcmV2VG9rcyBpcyByZXZlcnNlZCwgdGhlIGZpcnN0IHRva2VuIG9mIHRoZSBleHByZXNzaW9uIGJlaW5nIGF0IGluZGV4IGxlbmd0aC0xO1xuLy8gdGhpcyB3YXksIHRva2VucyBjYW4gYmUgY29uc3VtZWQgZWZmaWNpZW50bHkgd2l0aCByZXZUb2tzLnBvcCgpLlxuLy8gQWZ0ZXIgdGhlIGV4cHJlc3Npb24sIHRoZSBmdW5jdGlvbiBleHBlY3RzIHRvIGZpbmQgdGhlIHRva2VuIGV4cGVjdGVkRW5kLlxuZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9uKHJldlRva3M6IFRva2VuW10sIGV4cGVjdGVkRW5kOiBUb2tlblR5cGUpOiBzdHJpbmcge1xuICBpZiAoXG4gICAgZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5FTkQgJiZcbiAgICBleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLlJQYXJlbiAmJlxuICAgIGV4cGVjdGVkRW5kICE9PSBUb2tlblR5cGUuQ29tbWEgJiZcbiAgICBleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLlJCcmFja2V0XG4gICkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBleHBlY3RlZEVuZCcpO1xuICB9XG5cbiAgbGV0IGpzID0gJyc7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgLy8gRXhwcmVzc2lvbi5cbiAgICBsZXQgdG9rID0gcmV2VG9rcy5wb3AoKSBhcyBUb2tlbjtcbiAgICBsZXQgbmV4dDogVG9rZW47XG4gICAgc3dpdGNoICh0b2sudHlwZSkge1xuICAgICAgY2FzZSBUb2tlblR5cGUuSW5kZW50OlxuICAgICAgICBuZXh0ID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAobmV4dC50eXBlID09PSBUb2tlblR5cGUuTFBhcmVuKSB7XG4gICAgICAgICAganMgKz0gcGFyc2VGdW5jdGlvbkNhbGwodG9rLnRleHQsIHJldlRva3MpO1xuICAgICAgICB9IGVsc2UgaWYgKG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLkxCcmFja2V0KSB7XG4gICAgICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTEJyYWNrZXQpO1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5SQnJhY2tldCk7XG4gICAgICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUkJyYWNrZXQpO1xuICAgICAgICAgIGpzICs9IGAke3Rvay50ZXh0fVske2luZGV4fV1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGpzICs9IHRvay50ZXh0O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUb2tlblR5cGUuTmFtZTpcbiAgICAgICAganMgKz0gdG9rLnRleHQuc2xpY2UoMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUb2tlblR5cGUuU3RyaW5nOlxuICAgICAgY2FzZSBUb2tlblR5cGUuTnVtYmVyOlxuICAgICAgICBqcyArPSB0b2sudGV4dDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRva2VuVHlwZS5QbHVzOlxuICAgICAgY2FzZSBUb2tlblR5cGUuTWludXM6XG4gICAgICAgIG5leHQgPSByZXZUb2tzW3JldlRva3MubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5QbHVzIHx8IG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLk1pbnVzKSB7XG4gICAgICAgICAgdGhyb3cgdW5leHBlY3RlZFRva2VuRXJyb3IocmV2VG9rcy5wb3AoKSBhcyBUb2tlbiwgcmV2VG9rcyk7XG4gICAgICAgIH1cbiAgICAgICAganMgKz0gdG9rLnRleHQ7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgY2FzZSBUb2tlblR5cGUuTm90OlxuICAgICAgICBqcyArPSAnISc7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgY2FzZSBUb2tlblR5cGUuTFBhcmVuOlxuICAgICAgICBqcyArPSAnKCcgKyBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbikgKyAnKSc7XG4gICAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUb2tlblR5cGUuTEJyYWNrZXQ6XG4gICAgICAgIGpzICs9ICdbJyArIHBhcnNlTGlzdChyZXZUb2tzLCBUb2tlblR5cGUuUkJyYWNrZXQpICsgJ10nO1xuICAgICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SQnJhY2tldCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgdW5leHBlY3RlZFRva2VuRXJyb3IodG9rLCByZXZUb2tzKTtcbiAgICB9XG5cbiAgICAvLyBQb3NzaWJsZSBlbmQgb2YgZXhwcmVzc2lvbi4gZXhwZWN0ZWRFbmQgY2FuIGJlOlxuICAgIC8vIEVORCxcbiAgICAvLyBSUGFyZW4gZm9yIGV4cHJlc3Npb25zIGJldHdlZW4gcGFyZW50aGVzZXMsXG4gICAgLy8gQ29tbWEgZm9yIGZ1bmN0aW9uIGFyZ3VtZW50cywgaW4gd2hpY2ggY2FzZSB3ZSBhbHNvIGFjY2VwdCBSUGFyZW4sXG4gICAgLy8gUkJyYWNrZXQgZm9yIGFycmF5IGVsZW1lbnRzLCAgaW4gd2hpY2ggY2FzZSB3ZSBhbHNvIGFjY2VwdCBDb21tYS5cbiAgICAvLyBOb3RlIHRoYXQgd2UgZG9uJ3QgY29uc3VtZSB0aGUgZW5kIHRva2VuLlxuICAgIGNvbnN0IHR5cGUgPSByZXZUb2tzW3JldlRva3MubGVuZ3RoIC0gMV0udHlwZTtcbiAgICBpZiAoXG4gICAgICB0eXBlID09PSBleHBlY3RlZEVuZCB8fFxuICAgICAgKGV4cGVjdGVkRW5kID09PSBUb2tlblR5cGUuQ29tbWEgJiYgdHlwZSA9PT0gVG9rZW5UeXBlLlJQYXJlbikgfHxcbiAgICAgIChleHBlY3RlZEVuZCA9PT0gVG9rZW5UeXBlLlJCcmFja2V0ICYmIHR5cGUgPT09IFRva2VuVHlwZS5Db21tYSlcbiAgICApIHtcbiAgICAgIHJldHVybiBqcztcbiAgICB9XG5cbiAgICAvLyBPcGVyYXRvci5cbiAgICB0b2sgPSByZXZUb2tzLnBvcCgpIGFzIFRva2VuO1xuICAgIGlmICh0b2sudHlwZSA+PSBUb2tlblR5cGUuUGx1cyAmJiB0b2sudHlwZSA8PSBUb2tlblR5cGUuR3JlYXRlck9yRXEpIHtcbiAgICAgIGpzICs9ICcgJyArIHRvay50ZXh0ICsgJyAnO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHN3aXRjaCAodG9rLnR5cGUpIHtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLkluZGVudDpcbiAgICAgICAgaWYgKHRvay50ZXh0ID09PSAnQU5EJykge1xuICAgICAgICAgIGpzICs9ICcgJiYgJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9rLnRleHQgPT09ICdPUicpIHtcbiAgICAgICAgICBqcyArPSAnIHx8ICc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgdW5leHBlY3RlZFRva2VuRXJyb3IodG9rLCByZXZUb2tzKTtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLkVxdWFsOlxuICAgICAgICBqcyArPSAnID09PSAnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk5vdEVxdWFsOlxuICAgICAgICBqcyArPSAnICE9PSAnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gICAgfVxuICB9XG59XG5cbi8vIHBhcnNlTGlzdCBwYXJzZXMgYSBjb21tYS1zZXBhcmF0ZWQgbGlzdCBvZiBleHByZXNzaW9ucy5cbi8vIGV4cGVjdGVkRW5kIGlzIENvbW1hIGZvciBmdW5jdGlvbiBhcmd1bWVudHMgYW5kIFJCcmFja2V0IGZvciBhcnJheXMsXG4vLyBhY2NvcmRpbmcgdG8gdGhlIGJlaGF2aW9yIG9mIHBhcnNlRXhwcmVzc2lvbi5cbmZ1bmN0aW9uIHBhcnNlTGlzdChyZXZUb2tzOiBUb2tlbltdLCBleHBlY3RlZEVuZDogVG9rZW5UeXBlKTogc3RyaW5nIHtcbiAgaWYgKGV4cGVjdGVkRW5kICE9PSBUb2tlblR5cGUuQ29tbWEgJiYgZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5SQnJhY2tldCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBleHBlY3RlZEVuZCcpO1xuICB9XG4gIGxldCBuZXh0ID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdO1xuICBpZiAobmV4dC50eXBlID09PSBUb2tlblR5cGUuUlBhcmVuIHx8IG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLlJCcmFja2V0KSB7XG4gICAgLy8gZW1wdHkgbGlzdFxuICAgIHJldHVybiAnJztcbiAgfVxuICBsZXQganMgPSAnJztcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBqcyArPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgZXhwZWN0ZWRFbmQpO1xuICAgIG5leHQgPSByZXZUb2tzW3JldlRva3MubGVuZ3RoIC0gMV07XG4gICAgaWYgKG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLlJQYXJlbiB8fCBuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5SQnJhY2tldCkge1xuICAgICAgcmV0dXJuIGpzO1xuICAgIH1cbiAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAganMgKz0gJywgJztcbiAgfVxufVxuXG4vLyBwYXJzZUZ1bmN0aW9uQ2FsbCBwYXJzZXMgYSBmdW5jdGlvbiBjYWxsIGV4cHJlc3Npb24uXG4vLyBUaGUgbGlzdCBvZiBzdXBwb3J0ZWQgZnVuY3Rpb25zIGlzIGluXG4vLyAgIHByb2plY3RzL2NvcmUvbW9kZWxzL3V0aWxzL2V4cHJlc3Npb24tdXRpbHMudHNcbi8vIFRoZSBmdW5jdGlvbiBuYW1lIGhhcyBhbHJlYWR5IGJlZW4gc2Nhbm5lZC5cbmZ1bmN0aW9uIHBhcnNlRnVuY3Rpb25DYWxsKG5hbWU6IHN0cmluZywgcmV2VG9rczogVG9rZW5bXSk6IHN0cmluZyB7XG4gIGNvbnN0IHBhcmFtcyA9IGZ1bmN0aW9uUGFyYW1zW25hbWVdO1xuICBpZiAocGFyYW1zKSB7XG4gICAgcmV0dXJuIHBhcnNlRnVuY3Rpb25XaXRoUGFyYW1zKG5hbWUsIHJldlRva3MsIC4uLnBhcmFtcyk7XG4gIH1cbiAgc3dpdGNoIChuYW1lKSB7XG4gICAgY2FzZSAnSU5DTFVERVMnOlxuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTFBhcmVuKTtcbiAgICAgIGxldCBqcyA9ICcoJyArIHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpICsgJykuaW5jbHVkZXMoJztcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgIGpzICs9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpICsgJyknO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUlBhcmVuKTtcbiAgICAgIHJldHVybiBqcztcbiAgICBjYXNlICdUT0RBWSc6XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MUGFyZW4pO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUlBhcmVuKTtcbiAgICAgIHJldHVybiAnVE9EQVkoKSc7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcigndW5zdXBwb3J0ZWQgZnVuY3Rpb246ICcgKyBuYW1lKTtcbiAgfVxufVxuXG4vKlxuICBQYXJzZXMgYSBmdW5jdGlvbiBjYWxsIGV4cHJlc3Npb24uXG4gIHN0cmluZ2lmeVBhcmFtcyB0ZWxscyBob3cgbWFueSBwYXJhbWV0ZXJzIHRoZSBmdW5jdGlvbiBoYXNcbiAgYW5kIGlmIHRoZXkgbmVlZCB0byBiZSBzdHJpbmdpZmllZC5cbiAgRm9yIGV4YW1wbGUsIHRoZSBpbmRpY2F0b3IgZnVuY3Rpb25cbiAgICBTVU0oZm9ybXNbMF0sICRhZ2UsICRnZW5kZXIgPSAnbWFsZScpXG4gIGNhbiBiZSBwYXJzZWQgd2l0aFxuICAgIHBhcnNlRnVuY3Rpb25XaXRoUGFyYW1zKCdTVU0nLCByZXZUb2tzLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSlcbiAgcmVzdWx0aW5nIGluIHRoZSBmb2xsb3dpbmcgSmF2YVNjcmlwdDpcbiAgICBTVU0oZm9ybXNbMF0sIGBhZ2VgLCBgZ2VuZGVyID09PSAnbWFsZSdgKVxuICBzdHJpbmdpZnlQYXJhbXMubGVuZ3RoID49IDIgYW5kIHRoZSBsYXN0IHBhcmFtZXRlciBpcyBjb25zaWRlcmVkIG9wdGlvbmFsLlxuKi9cbmZ1bmN0aW9uIHBhcnNlRnVuY3Rpb25XaXRoUGFyYW1zKFxuICBuYW1lOiBzdHJpbmcsXG4gIHJldlRva3M6IFRva2VuW10sXG4gIC4uLnN0cmluZ2lmeVBhcmFtczogYm9vbGVhbltdXG4pOiBzdHJpbmcge1xuICBpZiAoc3RyaW5naWZ5UGFyYW1zLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3BhcnNlRnVuY3Rpb25XaXRoUGFyYW1zIG9ubHkgd29ya3Mgd2l0aCBhdCBsZWFzdCAyIHBhcmFtZXRlcnMnKTtcbiAgfVxuICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MUGFyZW4pO1xuICBsZXQganMgPSBuYW1lICsgJygnO1xuICBjb25zdCBmaXJzdFBhcmFtID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gIGpzICs9IHN0cmluZ2lmeVBhcmFtc1swXSA/IGBcXGAke2ZpcnN0UGFyYW19XFxgYCA6IGZpcnN0UGFyYW07XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgc3RyaW5naWZ5UGFyYW1zLmxlbmd0aCAtIDE7IGkrKykge1xuICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICBjb25zdCBwYXJhbSA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgIGpzICs9IHN0cmluZ2lmeVBhcmFtc1tpXSA/IGAsIFxcYCR7cGFyYW19XFxgYCA6IGAsICR7cGFyYW19YDtcbiAgfVxuICAvLyBMYXN0IHBhcmFtZXRlciwgb3B0aW9uYWw6XG4gIGNvbnN0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gIHN3aXRjaCAodG9rLnR5cGUpIHtcbiAgICBjYXNlIFRva2VuVHlwZS5SUGFyZW46XG4gICAgICByZXR1cm4ganMgKyAnKSc7XG4gICAgY2FzZSBUb2tlblR5cGUuQ29tbWE6XG4gICAgICBjb25zdCBsYXN0UGFyYW0gPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICBjb25zdCBzdHJpbmdpZnkgPSBzdHJpbmdpZnlQYXJhbXNbc3RyaW5naWZ5UGFyYW1zLmxlbmd0aCAtIDFdO1xuICAgICAgcmV0dXJuIGpzICsgKHN0cmluZ2lmeSA/IGAsIFxcYCR7bGFzdFBhcmFtfVxcYClgIDogYCwgJHtsYXN0UGFyYW19KWApO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2ssIHJldlRva3MpO1xuICB9XG59XG5cbmNvbnN0IGZ1bmN0aW9uUGFyYW1zOiB7W25hbWU6IHN0cmluZ106IGJvb2xlYW5bXX0gPSB7XG4gIFNVTTogW2ZhbHNlLCB0cnVlLCB0cnVlXSxcbiAgTUVBTjogW2ZhbHNlLCB0cnVlLCB0cnVlXSxcbiAgTUFYOiBbZmFsc2UsIHRydWUsIHRydWVdLFxuICBNRURJQU46IFtmYWxzZSwgdHJ1ZSwgdHJ1ZV0sXG4gIE1PREU6IFtmYWxzZSwgdHJ1ZSwgdHJ1ZV0sXG4gIENPVU5UX0ZPUk1TOiBbZmFsc2UsIHRydWVdLFxuICBDT1VOVF9SRVBTOiBbZmFsc2UsIHRydWVdLFxuICBDT1VOVF9GT1JNU19VTklRVUU6IFtmYWxzZSwgdHJ1ZSwgdHJ1ZV0sXG4gIEFMTF9WQUxVRVNfT0Y6IFtmYWxzZSwgdHJ1ZV0sXG4gIFBFUkNFTlQ6IFtmYWxzZSwgZmFsc2VdLFxuICBMQVNUOiBbZmFsc2UsIHRydWUsIGZhbHNlXSxcbiAgUkVQRUFUOiBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgdHJ1ZV0sXG4gIEVWQUxVQVRFOiBbZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gIEZJTFRFUl9CWV9WQVJTOiBbZmFsc2UsIGZhbHNlXSxcbiAgRklMVEVSX0JZOiBbZmFsc2UsIHRydWVdLFxuICBBUFBMWTogW2ZhbHNlLCB0cnVlLCB0cnVlXSxcbiAgR0VUX0FHRTogW2ZhbHNlLCBmYWxzZV0sXG4gIExFTjogW2ZhbHNlLCBmYWxzZV0sXG4gIENPTlNPTEVfTE9HOiBbZmFsc2UsIGZhbHNlXSxcbiAgSk9JTl9GT1JNUzogW2ZhbHNlLCBmYWxzZSwgdHJ1ZSwgdHJ1ZV0sXG4gIEpPSU5fUkVQRUFUSU5HX1NMSURFUzogW2ZhbHNlLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZV0sXG4gIEZST01fUkVQUzogW2ZhbHNlLCBmYWxzZV0sXG4gIElTSU46IFtmYWxzZSwgZmFsc2VdLFxuICBPUDogW2ZhbHNlLCBmYWxzZSwgdHJ1ZV0sXG4gIEdFVF9MQUJFTFM6IFtmYWxzZSwgZmFsc2VdLFxuICBBUFBMWV9MQUJFTFM6IFtmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgQlVJTERfREFUQVNFVDogW2ZhbHNlLCBmYWxzZV0sXG4gIFJPVU5EOiBbZmFsc2UsIGZhbHNlXSxcbiAgSVNfQkVGT1JFOiBbZmFsc2UsIGZhbHNlXSxcbiAgSVNfQUZURVI6IFtmYWxzZSwgZmFsc2VdLFxuICBJU19XSVRISU5fSU5URVJWQUw6IFtmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgQ09NUEFSRV9EQVRFOiBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxufTtcbiJdfQ==