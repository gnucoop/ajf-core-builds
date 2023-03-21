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
            return { type: 20 /* TokenType.Field */, text: m[0] };
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
        return { type: 19 /* TokenType.Ident */, text: m[0] };
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
            case 19 /* TokenType.Ident */:
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
            case 20 /* TokenType.Field */:
                js += 'form.' + tok.text.slice('$'.length);
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
            case 19 /* TokenType.Ident */:
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
    const args = functionArgs[name];
    if (args) {
        return parseFunctionWithArgs(name, revToks, args);
    }
    if (name === 'IF') {
        consume(revToks, 1 /* TokenType.LParen */);
        let js = '(' + parseExpression(revToks, 5 /* TokenType.Comma */) + ' ? ';
        consume(revToks, 5 /* TokenType.Comma */);
        js += parseExpression(revToks, 5 /* TokenType.Comma */) + ' : ';
        consume(revToks, 5 /* TokenType.Comma */);
        js += parseExpression(revToks, 5 /* TokenType.Comma */) + ')';
        consume(revToks, 2 /* TokenType.RParen */);
        return js;
    }
    throw new Error('unsupported function: ' + name);
}
/*
  Parses a function call expression.
  args tells how many arguments the function takes and their type.
  For example, the indicator function
    SUM(forms[0], $age, $gender = "male")
  can be parsed with
    parseFunctionWithArgs('SUM', revToks, ['arg', 'field', 'func(form)?'])
  resulting in the following JavaScript:
    SUM(forms[0], 'age', (form) => form.gender === "male")
*/
function parseFunctionWithArgs(name, revToks, args) {
    consume(revToks, 1 /* TokenType.LParen */);
    let argsJs = '';
    for (let i = 0; i < args.length; i++) {
        let argType = args[i];
        if (argType.endsWith('?') && revToks[revToks.length - 1].type === 2 /* TokenType.RParen */) {
            break;
        }
        if (argType.endsWith('?')) {
            argType = argType.slice(0, -1);
        }
        if (i !== 0) {
            consume(revToks, 5 /* TokenType.Comma */);
            argsJs += ', ';
        }
        let argJs = parseExpression(revToks, 5 /* TokenType.Comma */);
        if (argType === 'field' && isField(argJs)) {
            argJs = "'" + argJs.slice('form.'.length) + "'";
        }
        else if (argType.startsWith('func')) {
            argJs = argType.slice('func'.length) + ' => ' + argJs;
        }
        argsJs += argJs;
    }
    consume(revToks, 2 /* TokenType.RParen */);
    return `${name}(${argsJs})`;
}
function isField(js) {
    return /^form\.[a-zA-Z_]\w*$/.test(js);
}
const functionArgs = {
    SUM: ["arg", "field", "func(form)?"],
    MEAN: ["arg", "field", "func(form)?"],
    MAX: ["arg", "field", "func(form)?"],
    MEDIAN: ["arg", "field", "func(form)?"],
    MODE: ["arg", "field", "func(form)?"],
    COUNT_FORMS: ["arg", "func(form)"],
    COUNT_REPS: ["arg", "func(form)"],
    ALL_VALUES_OF: ["arg", "field", "func(form)?"],
    PERCENT: ["arg", "arg"],
    FIRST: ["arg", "field", "arg?"],
    LAST: ["arg", "field", "arg?"],
    MAP: ["arg", "func(elem)"],
    INCLUDES: ["arg", "arg"],
    FILTER_BY: ["arg", "func(form)"],
    APPLY: ["arg", "field", "func(form)"],
    GET_AGE: ["arg"],
    LEN: ["arg"],
    CONCAT: ["arg", "arg"],
    REMOVE_DUPLICATES: ["arg"],
    CONSOLE_LOG: ["arg"],
    JOIN_FORMS: ["arg", "arg", "field", "field?"],
    JOIN_REPEATING_SLIDES: ["arg", "arg", "field", "field", "field", "field?"],
    FROM_REPS: ["arg", "func(form)"],
    OP: ["arg", "arg", "func(elemA, elemB)"],
    GET_LABELS: ["arg", "arg"],
    APPLY_LABELS: ["arg", "arg", "arg"],
    BUILD_DATASET: ["arg", "arg?"],
    ROUND: ["arg"],
    IS_BEFORE: ["arg", "arg"],
    IS_AFTER: ["arg", "arg"],
    IS_WITHIN_INTERVAL: ["arg", "arg", "arg"],
    COMPARE_DATE: ["arg", "arg", "arg", "arg?"],
    TODAY: [],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGluZGlraXQtcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9yZXBvcnRzL3NyYy94bHMtcmVwb3J0L2hpbmRpa2l0LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFtQ0gsMkNBQTJDO0FBQzNDLCtDQUErQztBQUMvQyxTQUFTLFVBQVUsQ0FBQyxDQUFTO0lBQzNCLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDbEIsT0FBTyxFQUFDLElBQUksdUJBQWUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUM7S0FDeEM7SUFDRCxJQUFJLENBQTBCLENBQUM7SUFDL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QixRQUFRLENBQUMsRUFBRTtRQUNULEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLDBCQUFrQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUM3QyxLQUFLLEdBQUc7WUFDTixPQUFPLEVBQUMsSUFBSSwwQkFBa0IsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDN0MsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksNEJBQW9CLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQy9DLEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLDRCQUFvQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUMvQyxLQUFLLEdBQUc7WUFDTixPQUFPLEVBQUMsSUFBSSx5QkFBaUIsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDNUMsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksd0JBQWdCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQzNDLEtBQUssR0FB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QUFFLG9CQUFvQixDQUFDO0lBQ3hDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7SUFDMUIsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7SUFDbkMsYUFBYSxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztJQUM5QixLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7SUFDZCxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO0lBQ3pCLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7SUFDeEIsa0JBQWtCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUN6QyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7SUFDM0MsS0FBSyxFQUFFLEVBQUU7Q0FDVixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5jb25zdCBlbnVtIFRva2VuVHlwZSB7XG4gIEVORCxcbiAgTFBhcmVuLFxuICBSUGFyZW4sXG4gIExCcmFja2V0LFxuICBSQnJhY2tldCxcbiAgQ29tbWEsXG5cbiAgLy8gQmluYXJ5IG9wZXJhdG9ycyBmcm9tIFBsdXMgdG8gR3JlYXRlck9yRXEgaGF2ZSB0aGUgc2FtZSByZXByZXNlbnRhdGlvblxuICAvLyBpbiBpbmRpY2F0b3IgZm9ybXVsYXMgYW5kIEphdmFTY3JpcHQgYW5kIGRvbid0IG5lZWQgYSB0cmFuc2xhdGlvbi5cbiAgUGx1cyxcbiAgTWludXMsXG4gIE11bCxcbiAgRGl2LFxuICBMZXNzLFxuICBMZXNzT3JFcSxcbiAgR3JlYXRlcixcbiAgR3JlYXRlck9yRXEsXG5cbiAgRXF1YWwsXG4gIE5vdEVxdWFsLFxuICBOb3QsXG4gIFN0cmluZyxcbiAgTnVtYmVyLFxuICBJZGVudCxcbiAgRmllbGQsIC8vIGFuIGlkZW50aWZpZXIgc3RhcnRpbmcgd2l0aCAkXG59XG5cbmludGVyZmFjZSBUb2tlbiB7XG4gIHR5cGU6IFRva2VuVHlwZTtcbiAgdGV4dDogc3RyaW5nO1xufVxuXG4vLyBmaXJzdFRva2VuIHJldHVybnMgdGhlIGZpcnN0IHRva2VuIGluIHMuXG4vLyBzIG11c3Qgbm90IGJlZ2luIHdpdGggd2hpdGVzcGFjZSBjaGFyYWN0ZXJzLlxuZnVuY3Rpb24gZmlyc3RUb2tlbihzOiBzdHJpbmcpOiBUb2tlbiB7XG4gIGlmIChzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkVORCwgdGV4dDogJyd9O1xuICB9XG4gIGxldCBtOiBSZWdFeHBNYXRjaEFycmF5IHwgbnVsbDtcbiAgY29uc3QgYyA9IHMuY2hhckF0KDApO1xuICBzd2l0Y2ggKGMpIHtcbiAgICBjYXNlICcoJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkxQYXJlbiwgdGV4dDogJygnfTtcbiAgICBjYXNlICcpJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLlJQYXJlbiwgdGV4dDogJyknfTtcbiAgICBjYXNlICdbJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkxCcmFja2V0LCB0ZXh0OiAnWyd9O1xuICAgIGNhc2UgJ10nOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuUkJyYWNrZXQsIHRleHQ6ICddJ307XG4gICAgY2FzZSAnLCc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5Db21tYSwgdGV4dDogJywnfTtcbiAgICBjYXNlICcrJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLlBsdXMsIHRleHQ6ICcrJ307XG4gICAgY2FzZSAnLSc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5NaW51cywgdGV4dDogJy0nfTtcbiAgICBjYXNlICcqJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLk11bCwgdGV4dDogJyonfTtcbiAgICBjYXNlICcvJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkRpdiwgdGV4dDogJy8nfTtcbiAgICBjYXNlICc8JzpcbiAgICAgIGlmIChzLmxlbmd0aCA+IDEgJiYgcy5jaGFyQXQoMSkgPT09ICc9Jykge1xuICAgICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5MZXNzT3JFcSwgdGV4dDogJzw9J307XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5MZXNzLCB0ZXh0OiAnPCd9O1xuICAgIGNhc2UgJz4nOlxuICAgICAgaWYgKHMubGVuZ3RoID4gMSAmJiBzLmNoYXJBdCgxKSA9PT0gJz0nKSB7XG4gICAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkdyZWF0ZXJPckVxLCB0ZXh0OiAnPj0nfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkdyZWF0ZXIsIHRleHQ6ICc+J307XG4gICAgY2FzZSAnPSc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5FcXVhbCwgdGV4dDogJz0nfTtcbiAgICBjYXNlICchJzpcbiAgICAgIGlmIChzLmxlbmd0aCA+IDEgJiYgcy5jaGFyQXQoMSkgPT09ICc9Jykge1xuICAgICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5Ob3RFcXVhbCwgdGV4dDogJyE9J307XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5Ob3QsIHRleHQ6ICchJ307XG4gICAgY2FzZSAnJCc6XG4gICAgICBtID0gcy5tYXRjaCgvXlxcJFthLXpBLVpfXVxcdyovKTtcbiAgICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBmaWVsZCBuYW1lIGluOiAnICsgcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5GaWVsZCwgdGV4dDogbVswXX07XG4gICAgY2FzZSAnXCInOlxuICAgICAgbSA9IHMubWF0Y2goL15cIihcXFxcXFxcXHxcXFxcXCJ8W15cIl0pKlwiLyk7XG4gICAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VudGVybWluYXRlZCBzdHJpbmcgbGl0ZXJhbCBpbjogJyArIHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuU3RyaW5nLCB0ZXh0OiBtWzBdfTtcbiAgICBjYXNlIFwiJ1wiOlxuICAgICAgbSA9IHMubWF0Y2goL14nKFxcXFxcXFxcfFxcXFwnfFteJ10pKicvKTtcbiAgICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW50ZXJtaW5hdGVkIHN0cmluZyBsaXRlcmFsIGluOiAnICsgcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5TdHJpbmcsIHRleHQ6IG1bMF19O1xuICB9XG4gIGlmIChjID49ICcwJyAmJiBjIDw9ICc5Jykge1xuICAgIG0gPSBzLm1hdGNoKC9eXFxkKyhcXC5cXGQrKT8oW2VFXVtcXCtcXC1dP1xcZCspPy8pO1xuICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ltcG9zc2libGUnKTtcbiAgICB9XG4gICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTnVtYmVyLCB0ZXh0OiBtWzBdfTtcbiAgfVxuICBtID0gcy5tYXRjaCgvXlthLXpBLVpfXVxcdyovKTtcbiAgaWYgKG0gIT09IG51bGwpIHtcbiAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5JZGVudCwgdGV4dDogbVswXX07XG4gIH1cbiAgaWYgKHMubWF0Y2goL15cXHMvKSAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc3RyaW5nIHMgaGFzIGEgbGVhZGluZyB3aGl0ZXNwYWNlJyk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgdG9rZW4gaW46ICcgKyBzKTtcbn1cblxuZnVuY3Rpb24gdG9rZW5pemUoczogc3RyaW5nKTogVG9rZW5bXSB7XG4gIGNvbnN0IHRva3M6IFRva2VuW10gPSBbXTtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzID0gcy50cmltKCk7XG4gICAgY29uc3QgdCA9IGZpcnN0VG9rZW4ocyk7XG4gICAgdG9rcy5wdXNoKHQpO1xuICAgIGlmICh0LnR5cGUgPT09IFRva2VuVHlwZS5FTkQpIHtcbiAgICAgIHJldHVybiB0b2tzO1xuICAgIH1cbiAgICBzID0gcy5zbGljZSh0LnRleHQubGVuZ3RoKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5kaWNhdG9yVG9Kcyhmb3JtdWxhOiBzdHJpbmcpOiBzdHJpbmcge1xuICBzd2l0Y2ggKHR5cGVvZiBmb3JtdWxhKSB7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGlmIChmb3JtdWxhLnN0YXJ0c1dpdGgoJ2pzOicpKSB7XG4gICAgICAgIHJldHVybiBmb3JtdWxhLnNsaWNlKDMpLnRyaW0oKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ251bWJlcic6XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBmb3JtdWxhID0gU3RyaW5nKGZvcm11bGEpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignZm9ybXVsYSBpcyBub3QgYSBzdHJpbmcnKTtcbiAgfVxuICByZXR1cm4gcGFyc2VFeHByZXNzaW9uKHRva2VuaXplKGZvcm11bGEpLnJldmVyc2UoKSwgVG9rZW5UeXBlLkVORCk7XG59XG5cbmZ1bmN0aW9uIHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvazogVG9rZW4sIHJlc3Q6IFRva2VuW10pOiBFcnJvciB7XG4gIGlmICh0b2sudHlwZSA9PT0gVG9rZW5UeXBlLkVORCkge1xuICAgIHJldHVybiBuZXcgRXJyb3IoJ3VuZXhwZWN0ZWQgZW5kIG9mIHRva2VuIHN0cmVhbScpO1xuICB9XG4gIHJlc3QucHVzaCh0b2spO1xuICByZXR1cm4gbmV3IEVycm9yKCd1bmV4cGVjdGVkIHRva2VuIGF0IHRoZSBzdGFydCBvZjogJyArIHByaW50VG9rZW5zKHJlc3QpKTtcbn1cblxuZnVuY3Rpb24gcHJpbnRUb2tlbnMocmV2VG9rczogVG9rZW5bXSkge1xuICBsZXQgcyA9ICcnO1xuICB3aGlsZSAocmV2VG9rcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgdG9rID0gcmV2VG9rcy5wb3AoKSBhcyBUb2tlbjtcbiAgICBpZiAodG9rLnR5cGUgPj0gVG9rZW5UeXBlLlBsdXMgJiYgdG9rLnR5cGUgPD0gVG9rZW5UeXBlLk5vdEVxdWFsKSB7XG4gICAgICAvLyBiaW5hcnkgb3BlcmF0b3JzXG4gICAgICBzICs9ICcgJyArIHRvay50ZXh0ICsgJyAnO1xuICAgIH0gZWxzZSBpZiAodG9rLnR5cGUgPT09IFRva2VuVHlwZS5Db21tYSkge1xuICAgICAgcyArPSAnLCAnO1xuICAgIH0gZWxzZSB7XG4gICAgICBzICs9IHRvay50ZXh0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gcztcbn1cblxuZnVuY3Rpb24gY29uc3VtZShyZXZUb2tzOiBUb2tlbltdLCBleHBlY3RlZFR5cGU6IFRva2VuVHlwZSk6IFRva2VuIHtcbiAgY29uc3QgdG9rID0gcmV2VG9rcy5wb3AoKSBhcyBUb2tlbjtcbiAgaWYgKHRvay50eXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2ssIHJldlRva3MpO1xuICB9XG4gIHJldHVybiB0b2s7XG59XG5cbi8vIHBhcnNlRXhwcmVzc2lvbiBwYXJzZXMgdGhlIGZpcnN0IGV4cHJlc3Npb24gaW4gcmV2VG9rc1xuLy8gYW5kIHJldHVybnMgaXRzIEphdmFTY3JpcHQvYWpmIHRyYW5zbGF0aW9uLlxuLy8gcmV2VG9rcyBpcyByZXZlcnNlZCwgdGhlIGZpcnN0IHRva2VuIG9mIHRoZSBleHByZXNzaW9uIGJlaW5nIGF0IGluZGV4IGxlbmd0aC0xO1xuLy8gdGhpcyB3YXksIHRva2VucyBjYW4gYmUgY29uc3VtZWQgZWZmaWNpZW50bHkgd2l0aCByZXZUb2tzLnBvcCgpLlxuLy8gQWZ0ZXIgdGhlIGV4cHJlc3Npb24sIHRoZSBmdW5jdGlvbiBleHBlY3RzIHRvIGZpbmQgdGhlIHRva2VuIGV4cGVjdGVkRW5kLlxuZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9uKHJldlRva3M6IFRva2VuW10sIGV4cGVjdGVkRW5kOiBUb2tlblR5cGUpOiBzdHJpbmcge1xuICBpZiAoXG4gICAgZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5FTkQgJiZcbiAgICBleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLlJQYXJlbiAmJlxuICAgIGV4cGVjdGVkRW5kICE9PSBUb2tlblR5cGUuQ29tbWEgJiZcbiAgICBleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLlJCcmFja2V0XG4gICkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBleHBlY3RlZEVuZCcpO1xuICB9XG5cbiAgbGV0IGpzID0gJyc7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgLy8gRXhwcmVzc2lvbi5cbiAgICBsZXQgdG9rID0gcmV2VG9rcy5wb3AoKSBhcyBUb2tlbjtcbiAgICBsZXQgbmV4dDogVG9rZW47XG4gICAgc3dpdGNoICh0b2sudHlwZSkge1xuICAgICAgY2FzZSBUb2tlblR5cGUuSWRlbnQ6XG4gICAgICAgIG5leHQgPSByZXZUb2tzW3JldlRva3MubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5MUGFyZW4pIHtcbiAgICAgICAgICBqcyArPSBwYXJzZUZ1bmN0aW9uQ2FsbCh0b2sudGV4dCwgcmV2VG9rcyk7XG4gICAgICAgIH0gZWxzZSBpZiAobmV4dC50eXBlID09PSBUb2tlblR5cGUuTEJyYWNrZXQpIHtcbiAgICAgICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MQnJhY2tldCk7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLlJCcmFja2V0KTtcbiAgICAgICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SQnJhY2tldCk7XG4gICAgICAgICAganMgKz0gYCR7dG9rLnRleHR9WyR7aW5kZXh9XWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAganMgKz0gdG9rLnRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRva2VuVHlwZS5GaWVsZDpcbiAgICAgICAganMgKz0gJ2Zvcm0uJyArIHRvay50ZXh0LnNsaWNlKCckJy5sZW5ndGgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLlN0cmluZzpcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk51bWJlcjpcbiAgICAgICAganMgKz0gdG9rLnRleHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUb2tlblR5cGUuUGx1czpcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk1pbnVzOlxuICAgICAgICBuZXh0ID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAobmV4dC50eXBlID09PSBUb2tlblR5cGUuUGx1cyB8fCBuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5NaW51cykge1xuICAgICAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHJldlRva3MucG9wKCkgYXMgVG9rZW4sIHJldlRva3MpO1xuICAgICAgICB9XG4gICAgICAgIGpzICs9IHRvay50ZXh0O1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk5vdDpcbiAgICAgICAganMgKz0gJyEnO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLkxQYXJlbjpcbiAgICAgICAganMgKz0gJygnICsgcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pICsgJyknO1xuICAgICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLkxCcmFja2V0OlxuICAgICAgICBqcyArPSAnWycgKyBwYXJzZUxpc3QocmV2VG9rcywgVG9rZW5UeXBlLlJCcmFja2V0KSArICddJztcbiAgICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUkJyYWNrZXQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gICAgfVxuXG4gICAgLy8gUG9zc2libGUgZW5kIG9mIGV4cHJlc3Npb24uIGV4cGVjdGVkRW5kIGNhbiBiZTpcbiAgICAvLyBFTkQsXG4gICAgLy8gUlBhcmVuIGZvciBleHByZXNzaW9ucyBiZXR3ZWVuIHBhcmVudGhlc2VzLFxuICAgIC8vIENvbW1hIGZvciBmdW5jdGlvbiBhcmd1bWVudHMsIGluIHdoaWNoIGNhc2Ugd2UgYWxzbyBhY2NlcHQgUlBhcmVuLFxuICAgIC8vIFJCcmFja2V0IGZvciBhcnJheSBlbGVtZW50cywgIGluIHdoaWNoIGNhc2Ugd2UgYWxzbyBhY2NlcHQgQ29tbWEuXG4gICAgLy8gTm90ZSB0aGF0IHdlIGRvbid0IGNvbnN1bWUgdGhlIGVuZCB0b2tlbi5cbiAgICBjb25zdCB0eXBlID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdLnR5cGU7XG4gICAgaWYgKFxuICAgICAgdHlwZSA9PT0gZXhwZWN0ZWRFbmQgfHxcbiAgICAgIChleHBlY3RlZEVuZCA9PT0gVG9rZW5UeXBlLkNvbW1hICYmIHR5cGUgPT09IFRva2VuVHlwZS5SUGFyZW4pIHx8XG4gICAgICAoZXhwZWN0ZWRFbmQgPT09IFRva2VuVHlwZS5SQnJhY2tldCAmJiB0eXBlID09PSBUb2tlblR5cGUuQ29tbWEpXG4gICAgKSB7XG4gICAgICByZXR1cm4ganM7XG4gICAgfVxuXG4gICAgLy8gT3BlcmF0b3IuXG4gICAgdG9rID0gcmV2VG9rcy5wb3AoKSBhcyBUb2tlbjtcbiAgICBpZiAodG9rLnR5cGUgPj0gVG9rZW5UeXBlLlBsdXMgJiYgdG9rLnR5cGUgPD0gVG9rZW5UeXBlLkdyZWF0ZXJPckVxKSB7XG4gICAgICBqcyArPSAnICcgKyB0b2sudGV4dCArICcgJztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRvay50eXBlKSB7XG4gICAgICBjYXNlIFRva2VuVHlwZS5JZGVudDpcbiAgICAgICAgaWYgKHRvay50ZXh0ID09PSAnQU5EJykge1xuICAgICAgICAgIGpzICs9ICcgJiYgJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9rLnRleHQgPT09ICdPUicpIHtcbiAgICAgICAgICBqcyArPSAnIHx8ICc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgdW5leHBlY3RlZFRva2VuRXJyb3IodG9rLCByZXZUb2tzKTtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLkVxdWFsOlxuICAgICAgICBqcyArPSAnID09PSAnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk5vdEVxdWFsOlxuICAgICAgICBqcyArPSAnICE9PSAnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gICAgfVxuICB9XG59XG5cbi8vIHBhcnNlTGlzdCBwYXJzZXMgYSBjb21tYS1zZXBhcmF0ZWQgbGlzdCBvZiBleHByZXNzaW9ucy5cbi8vIGV4cGVjdGVkRW5kIGlzIENvbW1hIGZvciBmdW5jdGlvbiBhcmd1bWVudHMgYW5kIFJCcmFja2V0IGZvciBhcnJheXMsXG4vLyBhY2NvcmRpbmcgdG8gdGhlIGJlaGF2aW9yIG9mIHBhcnNlRXhwcmVzc2lvbi5cbmZ1bmN0aW9uIHBhcnNlTGlzdChyZXZUb2tzOiBUb2tlbltdLCBleHBlY3RlZEVuZDogVG9rZW5UeXBlKTogc3RyaW5nIHtcbiAgaWYgKGV4cGVjdGVkRW5kICE9PSBUb2tlblR5cGUuQ29tbWEgJiYgZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5SQnJhY2tldCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBleHBlY3RlZEVuZCcpO1xuICB9XG4gIGxldCBuZXh0ID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdO1xuICBpZiAobmV4dC50eXBlID09PSBUb2tlblR5cGUuUlBhcmVuIHx8IG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLlJCcmFja2V0KSB7XG4gICAgLy8gZW1wdHkgbGlzdFxuICAgIHJldHVybiAnJztcbiAgfVxuICBsZXQganMgPSAnJztcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBqcyArPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgZXhwZWN0ZWRFbmQpO1xuICAgIG5leHQgPSByZXZUb2tzW3JldlRva3MubGVuZ3RoIC0gMV07XG4gICAgaWYgKG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLlJQYXJlbiB8fCBuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5SQnJhY2tldCkge1xuICAgICAgcmV0dXJuIGpzO1xuICAgIH1cbiAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAganMgKz0gJywgJztcbiAgfVxufVxuXG4vLyBwYXJzZUZ1bmN0aW9uQ2FsbCBwYXJzZXMgYSBmdW5jdGlvbiBjYWxsIGV4cHJlc3Npb24uXG4vLyBUaGUgbGlzdCBvZiBzdXBwb3J0ZWQgZnVuY3Rpb25zIGlzIGluXG4vLyAgIHByb2plY3RzL2NvcmUvbW9kZWxzL3V0aWxzL2V4cHJlc3Npb24tdXRpbHMudHNcbi8vIFRoZSBmdW5jdGlvbiBuYW1lIGhhcyBhbHJlYWR5IGJlZW4gc2Nhbm5lZC5cbmZ1bmN0aW9uIHBhcnNlRnVuY3Rpb25DYWxsKG5hbWU6IHN0cmluZywgcmV2VG9rczogVG9rZW5bXSk6IHN0cmluZyB7XG4gIGNvbnN0IGFyZ3MgPSBmdW5jdGlvbkFyZ3NbbmFtZV07XG4gIGlmIChhcmdzKSB7XG4gICAgcmV0dXJuIHBhcnNlRnVuY3Rpb25XaXRoQXJncyhuYW1lLCByZXZUb2tzLCBhcmdzKTtcbiAgfVxuICBpZiAobmFtZSA9PT0gJ0lGJykge1xuICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkxQYXJlbik7XG4gICAgbGV0IGpzID0gJygnICsgcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnID8gJztcbiAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAganMgKz0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnIDogJztcbiAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAganMgKz0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnKSc7XG4gICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUlBhcmVuKTtcbiAgICByZXR1cm4ganM7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBmdW5jdGlvbjogJyArIG5hbWUpO1xufVxuXG4vKlxuICBQYXJzZXMgYSBmdW5jdGlvbiBjYWxsIGV4cHJlc3Npb24uXG4gIGFyZ3MgdGVsbHMgaG93IG1hbnkgYXJndW1lbnRzIHRoZSBmdW5jdGlvbiB0YWtlcyBhbmQgdGhlaXIgdHlwZS5cbiAgRm9yIGV4YW1wbGUsIHRoZSBpbmRpY2F0b3IgZnVuY3Rpb25cbiAgICBTVU0oZm9ybXNbMF0sICRhZ2UsICRnZW5kZXIgPSBcIm1hbGVcIilcbiAgY2FuIGJlIHBhcnNlZCB3aXRoXG4gICAgcGFyc2VGdW5jdGlvbldpdGhBcmdzKCdTVU0nLCByZXZUb2tzLCBbJ2FyZycsICdmaWVsZCcsICdmdW5jKGZvcm0pPyddKVxuICByZXN1bHRpbmcgaW4gdGhlIGZvbGxvd2luZyBKYXZhU2NyaXB0OlxuICAgIFNVTShmb3Jtc1swXSwgJ2FnZScsIChmb3JtKSA9PiBmb3JtLmdlbmRlciA9PT0gXCJtYWxlXCIpXG4qL1xuZnVuY3Rpb24gcGFyc2VGdW5jdGlvbldpdGhBcmdzKG5hbWU6IHN0cmluZywgcmV2VG9rczogVG9rZW5bXSwgYXJnczogc3RyaW5nW10pOiBzdHJpbmcge1xuICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MUGFyZW4pO1xuICBsZXQgYXJnc0pzID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBhcmdUeXBlID0gYXJnc1tpXTtcbiAgICBpZiAoYXJnVHlwZS5lbmRzV2l0aCgnPycpICYmIHJldlRva3NbcmV2VG9rcy5sZW5ndGgtMV0udHlwZSA9PT0gVG9rZW5UeXBlLlJQYXJlbikge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChhcmdUeXBlLmVuZHNXaXRoKCc/JykpIHtcbiAgICAgIGFyZ1R5cGUgPSBhcmdUeXBlLnNsaWNlKDAsIC0xKTtcbiAgICB9XG4gICAgaWYgKGkgIT09IDApIHtcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgIGFyZ3NKcyArPSAnLCAnO1xuICAgIH1cbiAgICBsZXQgYXJnSnMgPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICBpZiAoYXJnVHlwZSA9PT0gJ2ZpZWxkJyAmJiBpc0ZpZWxkKGFyZ0pzKSkge1xuICAgICAgYXJnSnMgPSBcIidcIiArIGFyZ0pzLnNsaWNlKCdmb3JtLicubGVuZ3RoKSArIFwiJ1wiO1xuICAgIH0gZWxzZSBpZiAoYXJnVHlwZS5zdGFydHNXaXRoKCdmdW5jJykpIHtcbiAgICAgIGFyZ0pzID0gYXJnVHlwZS5zbGljZSgnZnVuYycubGVuZ3RoKSArICcgPT4gJyArIGFyZ0pzO1xuICAgIH1cbiAgICBhcmdzSnMgKz0gYXJnSnM7XG4gIH1cbiAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUlBhcmVuKTtcbiAgcmV0dXJuIGAke25hbWV9KCR7YXJnc0pzfSlgO1xufVxuXG5mdW5jdGlvbiBpc0ZpZWxkKGpzOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIC9eZm9ybVxcLlthLXpBLVpfXVxcdyokLy50ZXN0KGpzKTtcbn1cblxuY29uc3QgZnVuY3Rpb25BcmdzOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ1tdfSA9IHtcbiAgU1VNOiBbXCJhcmdcIiwgXCJmaWVsZFwiLCBcImZ1bmMoZm9ybSk/XCJdLFxuICBNRUFOOiBbXCJhcmdcIiwgXCJmaWVsZFwiLCBcImZ1bmMoZm9ybSk/XCJdLFxuICBNQVg6IFtcImFyZ1wiLCBcImZpZWxkXCIsIFwiZnVuYyhmb3JtKT9cIl0sXG4gIE1FRElBTjogW1wiYXJnXCIsIFwiZmllbGRcIiwgXCJmdW5jKGZvcm0pP1wiXSxcbiAgTU9ERTogW1wiYXJnXCIsIFwiZmllbGRcIiwgXCJmdW5jKGZvcm0pP1wiXSxcbiAgQ09VTlRfRk9STVM6IFtcImFyZ1wiLCBcImZ1bmMoZm9ybSlcIl0sXG4gIENPVU5UX1JFUFM6IFtcImFyZ1wiLCBcImZ1bmMoZm9ybSlcIl0sXG4gIEFMTF9WQUxVRVNfT0Y6IFtcImFyZ1wiLCBcImZpZWxkXCIsIFwiZnVuYyhmb3JtKT9cIl0sXG4gIFBFUkNFTlQ6IFtcImFyZ1wiLCBcImFyZ1wiXSxcbiAgRklSU1Q6IFtcImFyZ1wiLCBcImZpZWxkXCIsIFwiYXJnP1wiXSxcbiAgTEFTVDogW1wiYXJnXCIsIFwiZmllbGRcIiwgXCJhcmc/XCJdLFxuICBNQVA6IFtcImFyZ1wiLCBcImZ1bmMoZWxlbSlcIl0sXG4gIElOQ0xVREVTOiBbXCJhcmdcIiwgXCJhcmdcIl0sXG4gIEZJTFRFUl9CWTogW1wiYXJnXCIsIFwiZnVuYyhmb3JtKVwiXSxcbiAgQVBQTFk6IFtcImFyZ1wiLCBcImZpZWxkXCIsIFwiZnVuYyhmb3JtKVwiXSxcbiAgR0VUX0FHRTogW1wiYXJnXCJdLFxuICBMRU46IFtcImFyZ1wiXSxcbiAgQ09OQ0FUOiBbXCJhcmdcIiwgXCJhcmdcIl0sXG4gIFJFTU9WRV9EVVBMSUNBVEVTOiBbXCJhcmdcIl0sXG4gIENPTlNPTEVfTE9HOiBbXCJhcmdcIl0sXG4gIEpPSU5fRk9STVM6IFtcImFyZ1wiLCBcImFyZ1wiLCBcImZpZWxkXCIsIFwiZmllbGQ/XCJdLFxuICBKT0lOX1JFUEVBVElOR19TTElERVM6IFtcImFyZ1wiLCBcImFyZ1wiLCBcImZpZWxkXCIsIFwiZmllbGRcIiwgXCJmaWVsZFwiLCBcImZpZWxkP1wiXSxcbiAgRlJPTV9SRVBTOiBbXCJhcmdcIiwgXCJmdW5jKGZvcm0pXCJdLFxuICBPUDogW1wiYXJnXCIsIFwiYXJnXCIsIFwiZnVuYyhlbGVtQSwgZWxlbUIpXCJdLFxuICBHRVRfTEFCRUxTOiBbXCJhcmdcIiwgXCJhcmdcIl0sXG4gIEFQUExZX0xBQkVMUzogW1wiYXJnXCIsIFwiYXJnXCIsIFwiYXJnXCJdLFxuICBCVUlMRF9EQVRBU0VUOiBbXCJhcmdcIiwgXCJhcmc/XCJdLFxuICBST1VORDogW1wiYXJnXCJdLFxuICBJU19CRUZPUkU6IFtcImFyZ1wiLCBcImFyZ1wiXSxcbiAgSVNfQUZURVI6IFtcImFyZ1wiLCBcImFyZ1wiXSxcbiAgSVNfV0lUSElOX0lOVEVSVkFMOiBbXCJhcmdcIiwgXCJhcmdcIiwgXCJhcmdcIl0sXG4gIENPTVBBUkVfREFURTogW1wiYXJnXCIsIFwiYXJnXCIsIFwiYXJnXCIsIFwiYXJnP1wiXSxcbiAgVE9EQVk6IFtdLFxufTtcbiJdfQ==