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
                js += ' == ';
                break;
            case 15 /* TokenType.NotEqual */:
                js += ' != ';
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
    ADD_DAYS: ["arg", "arg"],
    ALL_VALUES_OF: ["arg", "field", "func(form)?"],
    APPLY_LABELS: ["arg", "arg", "arg"],
    APPLY: ["arg", "field", "func(form)"],
    BUILD_DATASET: ["arg", "arg?"],
    COMPARE_DATE: ["arg", "arg", "arg", "arg?"],
    CONCAT: ["arg", "arg"],
    CONSOLE_LOG: ["arg"],
    COUNT_FORMS: ["arg", "func(form)?"],
    COUNT_REPS: ["arg", "func(form)?"],
    DAYS_DIFF: ["arg", "arg"],
    FILTER_BY: ["arg", "func(form)"],
    FIRST: ["arg", "func(form)", "field?"],
    FROM_REPS: ["arg", "func(form)"],
    GET_AGE: ["arg", "arg?"],
    GET_LABELS: ["arg", "arg"],
    INCLUDES: ["arg", "arg"],
    IS_AFTER: ["arg", "arg"],
    IS_BEFORE: ["arg", "arg"],
    IS_WITHIN_INTERVAL: ["arg", "arg", "arg"],
    JOIN_FORMS: ["arg", "arg", "field", "field?"],
    JOIN_REPEATING_SLIDES: ["arg", "arg", "field", "field", "field", "field?"],
    LAST: ["arg", "func(form)", "field?"],
    LEN: ["arg"],
    MAP: ["arg", "func(elem)"],
    MAX: ["arg", "field", "func(form)?"],
    MEAN: ["arg", "field", "func(form)?"],
    MEDIAN: ["arg", "field", "func(form)?"],
    MODE: ["arg", "field", "func(form)?"],
    OP: ["arg", "arg", "func(elemA, elemB)"],
    PERCENT: ["arg", "arg"],
    REMOVE_DUPLICATES: ["arg"],
    ROUND: ["arg", "arg?"],
    SUM: ["arg", "field", "func(form)?"],
    TODAY: [],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGluZGlraXQtcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9yZXBvcnRzL3NyYy94bHMtcmVwb3J0L2hpbmRpa2l0LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFtQ0gsMkNBQTJDO0FBQzNDLCtDQUErQztBQUMvQyxTQUFTLFVBQVUsQ0FBQyxDQUFTO0lBQzNCLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDbEIsT0FBTyxFQUFDLElBQUksdUJBQWUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUM7S0FDeEM7SUFDRCxJQUFJLENBQTBCLENBQUM7SUFDL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QixRQUFRLENBQUMsRUFBRTtRQUNULEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLDBCQUFrQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUM3QyxLQUFLLEdBQUc7WUFDTixPQUFPLEVBQUMsSUFBSSwwQkFBa0IsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDN0MsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksNEJBQW9CLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQy9DLEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLDRCQUFvQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUMvQyxLQUFLLEdBQUc7WUFDTixPQUFPLEVBQUMsSUFBSSx5QkFBaUIsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDNUMsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksd0JBQWdCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQzNDLEtBQUssR0FB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Q0FBQyxLQUFLLENBQUM7SUFDWixHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDO0lBQzFCLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDO0lBQ3BDLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDO0lBQ3JDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDO0lBQ3ZDLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDO0lBQ3JDLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsb0JBQW9CLENBQUM7SUFDeEMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUN2QixpQkFBaUIsRUFBRSxDQUFDLEtBQUssQ0FBQztJQUMxQixLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO0lBQ3RCLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDO0lBQ3BDLEtBQUssRUFBRSxFQUFFO0NBQ1YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuY29uc3QgZW51bSBUb2tlblR5cGUge1xuICBFTkQsXG4gIExQYXJlbixcbiAgUlBhcmVuLFxuICBMQnJhY2tldCxcbiAgUkJyYWNrZXQsXG4gIENvbW1hLFxuXG4gIC8vIEJpbmFyeSBvcGVyYXRvcnMgZnJvbSBQbHVzIHRvIEdyZWF0ZXJPckVxIGhhdmUgdGhlIHNhbWUgcmVwcmVzZW50YXRpb25cbiAgLy8gaW4gaW5kaWNhdG9yIGZvcm11bGFzIGFuZCBKYXZhU2NyaXB0IGFuZCBkb24ndCBuZWVkIGEgdHJhbnNsYXRpb24uXG4gIFBsdXMsXG4gIE1pbnVzLFxuICBNdWwsXG4gIERpdixcbiAgTGVzcyxcbiAgTGVzc09yRXEsXG4gIEdyZWF0ZXIsXG4gIEdyZWF0ZXJPckVxLFxuXG4gIEVxdWFsLFxuICBOb3RFcXVhbCxcbiAgTm90LFxuICBTdHJpbmcsXG4gIE51bWJlcixcbiAgSWRlbnQsXG4gIEZpZWxkLCAvLyBhbiBpZGVudGlmaWVyIHN0YXJ0aW5nIHdpdGggJFxufVxuXG5pbnRlcmZhY2UgVG9rZW4ge1xuICB0eXBlOiBUb2tlblR5cGU7XG4gIHRleHQ6IHN0cmluZztcbn1cblxuLy8gZmlyc3RUb2tlbiByZXR1cm5zIHRoZSBmaXJzdCB0b2tlbiBpbiBzLlxuLy8gcyBtdXN0IG5vdCBiZWdpbiB3aXRoIHdoaXRlc3BhY2UgY2hhcmFjdGVycy5cbmZ1bmN0aW9uIGZpcnN0VG9rZW4oczogc3RyaW5nKTogVG9rZW4ge1xuICBpZiAocy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5FTkQsIHRleHQ6ICcnfTtcbiAgfVxuICBsZXQgbTogUmVnRXhwTWF0Y2hBcnJheSB8IG51bGw7XG4gIGNvbnN0IGMgPSBzLmNoYXJBdCgwKTtcbiAgc3dpdGNoIChjKSB7XG4gICAgY2FzZSAnKCc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5MUGFyZW4sIHRleHQ6ICcoJ307XG4gICAgY2FzZSAnKSc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5SUGFyZW4sIHRleHQ6ICcpJ307XG4gICAgY2FzZSAnWyc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5MQnJhY2tldCwgdGV4dDogJ1snfTtcbiAgICBjYXNlICddJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLlJCcmFja2V0LCB0ZXh0OiAnXSd9O1xuICAgIGNhc2UgJywnOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuQ29tbWEsIHRleHQ6ICcsJ307XG4gICAgY2FzZSAnKyc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5QbHVzLCB0ZXh0OiAnKyd9O1xuICAgIGNhc2UgJy0nOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTWludXMsIHRleHQ6ICctJ307XG4gICAgY2FzZSAnKic6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5NdWwsIHRleHQ6ICcqJ307XG4gICAgY2FzZSAnLyc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5EaXYsIHRleHQ6ICcvJ307XG4gICAgY2FzZSAnPCc6XG4gICAgICBpZiAocy5sZW5ndGggPiAxICYmIHMuY2hhckF0KDEpID09PSAnPScpIHtcbiAgICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTGVzc09yRXEsIHRleHQ6ICc8PSd9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTGVzcywgdGV4dDogJzwnfTtcbiAgICBjYXNlICc+JzpcbiAgICAgIGlmIChzLmxlbmd0aCA+IDEgJiYgcy5jaGFyQXQoMSkgPT09ICc9Jykge1xuICAgICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5HcmVhdGVyT3JFcSwgdGV4dDogJz49J307XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5HcmVhdGVyLCB0ZXh0OiAnPid9O1xuICAgIGNhc2UgJz0nOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuRXF1YWwsIHRleHQ6ICc9J307XG4gICAgY2FzZSAnISc6XG4gICAgICBpZiAocy5sZW5ndGggPiAxICYmIHMuY2hhckF0KDEpID09PSAnPScpIHtcbiAgICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTm90RXF1YWwsIHRleHQ6ICchPSd9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTm90LCB0ZXh0OiAnISd9O1xuICAgIGNhc2UgJyQnOlxuICAgICAgbSA9IHMubWF0Y2goL15cXCRbYS16QS1aX11cXHcqLyk7XG4gICAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZmllbGQgbmFtZSBpbjogJyArIHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuRmllbGQsIHRleHQ6IG1bMF19O1xuICAgIGNhc2UgJ1wiJzpcbiAgICAgIG0gPSBzLm1hdGNoKC9eXCIoXFxcXFxcXFx8XFxcXFwifFteXCJdKSpcIi8pO1xuICAgICAgaWYgKG0gPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnRlcm1pbmF0ZWQgc3RyaW5nIGxpdGVyYWwgaW46ICcgKyBzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLlN0cmluZywgdGV4dDogbVswXX07XG4gICAgY2FzZSBcIidcIjpcbiAgICAgIG0gPSBzLm1hdGNoKC9eJyhcXFxcXFxcXHxcXFxcJ3xbXiddKSonLyk7XG4gICAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VudGVybWluYXRlZCBzdHJpbmcgbGl0ZXJhbCBpbjogJyArIHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuU3RyaW5nLCB0ZXh0OiBtWzBdfTtcbiAgfVxuICBpZiAoYyA+PSAnMCcgJiYgYyA8PSAnOScpIHtcbiAgICBtID0gcy5tYXRjaCgvXlxcZCsoXFwuXFxkKyk/KFtlRV1bXFwrXFwtXT9cXGQrKT8vKTtcbiAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbXBvc3NpYmxlJyk7XG4gICAgfVxuICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLk51bWJlciwgdGV4dDogbVswXX07XG4gIH1cbiAgbSA9IHMubWF0Y2goL15bYS16QS1aX11cXHcqLyk7XG4gIGlmIChtICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuSWRlbnQsIHRleHQ6IG1bMF19O1xuICB9XG4gIGlmIChzLm1hdGNoKC9eXFxzLykgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0cmluZyBzIGhhcyBhIGxlYWRpbmcgd2hpdGVzcGFjZScpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHRva2VuIGluOiAnICsgcyk7XG59XG5cbmZ1bmN0aW9uIHRva2VuaXplKHM6IHN0cmluZyk6IFRva2VuW10ge1xuICBjb25zdCB0b2tzOiBUb2tlbltdID0gW107XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgcyA9IHMudHJpbSgpO1xuICAgIGNvbnN0IHQgPSBmaXJzdFRva2VuKHMpO1xuICAgIHRva3MucHVzaCh0KTtcbiAgICBpZiAodC50eXBlID09PSBUb2tlblR5cGUuRU5EKSB7XG4gICAgICByZXR1cm4gdG9rcztcbiAgICB9XG4gICAgcyA9IHMuc2xpY2UodC50ZXh0Lmxlbmd0aCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluZGljYXRvclRvSnMoZm9ybXVsYTogc3RyaW5nKTogc3RyaW5nIHtcbiAgc3dpdGNoICh0eXBlb2YgZm9ybXVsYSkge1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBpZiAoZm9ybXVsYS5zdGFydHNXaXRoKCdqczonKSkge1xuICAgICAgICByZXR1cm4gZm9ybXVsYS5zbGljZSgzKS50cmltKCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdudW1iZXInOlxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgZm9ybXVsYSA9IFN0cmluZyhmb3JtdWxhKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm11bGEgaXMgbm90IGEgc3RyaW5nJyk7XG4gIH1cbiAgcmV0dXJuIHBhcnNlRXhwcmVzc2lvbih0b2tlbml6ZShmb3JtdWxhKS5yZXZlcnNlKCksIFRva2VuVHlwZS5FTkQpO1xufVxuXG5mdW5jdGlvbiB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2s6IFRva2VuLCByZXN0OiBUb2tlbltdKTogRXJyb3Ige1xuICBpZiAodG9rLnR5cGUgPT09IFRva2VuVHlwZS5FTkQpIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKCd1bmV4cGVjdGVkIGVuZCBvZiB0b2tlbiBzdHJlYW0nKTtcbiAgfVxuICByZXN0LnB1c2godG9rKTtcbiAgcmV0dXJuIG5ldyBFcnJvcigndW5leHBlY3RlZCB0b2tlbiBhdCB0aGUgc3RhcnQgb2Y6ICcgKyBwcmludFRva2VucyhyZXN0KSk7XG59XG5cbmZ1bmN0aW9uIHByaW50VG9rZW5zKHJldlRva3M6IFRva2VuW10pIHtcbiAgbGV0IHMgPSAnJztcbiAgd2hpbGUgKHJldlRva3MubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gICAgaWYgKHRvay50eXBlID49IFRva2VuVHlwZS5QbHVzICYmIHRvay50eXBlIDw9IFRva2VuVHlwZS5Ob3RFcXVhbCkge1xuICAgICAgLy8gYmluYXJ5IG9wZXJhdG9yc1xuICAgICAgcyArPSAnICcgKyB0b2sudGV4dCArICcgJztcbiAgICB9IGVsc2UgaWYgKHRvay50eXBlID09PSBUb2tlblR5cGUuQ29tbWEpIHtcbiAgICAgIHMgKz0gJywgJztcbiAgICB9IGVsc2Uge1xuICAgICAgcyArPSB0b2sudGV4dDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHM7XG59XG5cbmZ1bmN0aW9uIGNvbnN1bWUocmV2VG9rczogVG9rZW5bXSwgZXhwZWN0ZWRUeXBlOiBUb2tlblR5cGUpOiBUb2tlbiB7XG4gIGNvbnN0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gIGlmICh0b2sudHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgdGhyb3cgdW5leHBlY3RlZFRva2VuRXJyb3IodG9rLCByZXZUb2tzKTtcbiAgfVxuICByZXR1cm4gdG9rO1xufVxuXG4vLyBwYXJzZUV4cHJlc3Npb24gcGFyc2VzIHRoZSBmaXJzdCBleHByZXNzaW9uIGluIHJldlRva3Ncbi8vIGFuZCByZXR1cm5zIGl0cyBKYXZhU2NyaXB0L2FqZiB0cmFuc2xhdGlvbi5cbi8vIHJldlRva3MgaXMgcmV2ZXJzZWQsIHRoZSBmaXJzdCB0b2tlbiBvZiB0aGUgZXhwcmVzc2lvbiBiZWluZyBhdCBpbmRleCBsZW5ndGgtMTtcbi8vIHRoaXMgd2F5LCB0b2tlbnMgY2FuIGJlIGNvbnN1bWVkIGVmZmljaWVudGx5IHdpdGggcmV2VG9rcy5wb3AoKS5cbi8vIEFmdGVyIHRoZSBleHByZXNzaW9uLCB0aGUgZnVuY3Rpb24gZXhwZWN0cyB0byBmaW5kIHRoZSB0b2tlbiBleHBlY3RlZEVuZC5cbmZ1bmN0aW9uIHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzOiBUb2tlbltdLCBleHBlY3RlZEVuZDogVG9rZW5UeXBlKTogc3RyaW5nIHtcbiAgaWYgKFxuICAgIGV4cGVjdGVkRW5kICE9PSBUb2tlblR5cGUuRU5EICYmXG4gICAgZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5SUGFyZW4gJiZcbiAgICBleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLkNvbW1hICYmXG4gICAgZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5SQnJhY2tldFxuICApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZXhwZWN0ZWRFbmQnKTtcbiAgfVxuXG4gIGxldCBqcyA9ICcnO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIC8vIEV4cHJlc3Npb24uXG4gICAgbGV0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gICAgbGV0IG5leHQ6IFRva2VuO1xuICAgIHN3aXRjaCAodG9rLnR5cGUpIHtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLklkZW50OlxuICAgICAgICBuZXh0ID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAobmV4dC50eXBlID09PSBUb2tlblR5cGUuTFBhcmVuKSB7XG4gICAgICAgICAganMgKz0gcGFyc2VGdW5jdGlvbkNhbGwodG9rLnRleHQsIHJldlRva3MpO1xuICAgICAgICB9IGVsc2UgaWYgKG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLkxCcmFja2V0KSB7XG4gICAgICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTEJyYWNrZXQpO1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5SQnJhY2tldCk7XG4gICAgICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUkJyYWNrZXQpO1xuICAgICAgICAgIGpzICs9IGAke3Rvay50ZXh0fVske2luZGV4fV1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGpzICs9IHRvay50ZXh0O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUb2tlblR5cGUuRmllbGQ6XG4gICAgICAgIGpzICs9ICdmb3JtLicgKyB0b2sudGV4dC5zbGljZSgnJCcubGVuZ3RoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRva2VuVHlwZS5TdHJpbmc6XG4gICAgICBjYXNlIFRva2VuVHlwZS5OdW1iZXI6XG4gICAgICAgIGpzICs9IHRvay50ZXh0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLlBsdXM6XG4gICAgICBjYXNlIFRva2VuVHlwZS5NaW51czpcbiAgICAgICAgbmV4dCA9IHJldlRva3NbcmV2VG9rcy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLlBsdXMgfHwgbmV4dC50eXBlID09PSBUb2tlblR5cGUuTWludXMpIHtcbiAgICAgICAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcihyZXZUb2tzLnBvcCgpIGFzIFRva2VuLCByZXZUb2tzKTtcbiAgICAgICAgfVxuICAgICAgICBqcyArPSB0b2sudGV4dDtcbiAgICAgICAgY29udGludWU7XG4gICAgICBjYXNlIFRva2VuVHlwZS5Ob3Q6XG4gICAgICAgIGpzICs9ICchJztcbiAgICAgICAgY29udGludWU7XG4gICAgICBjYXNlIFRva2VuVHlwZS5MUGFyZW46XG4gICAgICAgIGpzICs9ICcoJyArIHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuUlBhcmVuKSArICcpJztcbiAgICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUlBhcmVuKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRva2VuVHlwZS5MQnJhY2tldDpcbiAgICAgICAganMgKz0gJ1snICsgcGFyc2VMaXN0KHJldlRva3MsIFRva2VuVHlwZS5SQnJhY2tldCkgKyAnXSc7XG4gICAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJCcmFja2V0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2ssIHJldlRva3MpO1xuICAgIH1cblxuICAgIC8vIFBvc3NpYmxlIGVuZCBvZiBleHByZXNzaW9uLiBleHBlY3RlZEVuZCBjYW4gYmU6XG4gICAgLy8gRU5ELFxuICAgIC8vIFJQYXJlbiBmb3IgZXhwcmVzc2lvbnMgYmV0d2VlbiBwYXJlbnRoZXNlcyxcbiAgICAvLyBDb21tYSBmb3IgZnVuY3Rpb24gYXJndW1lbnRzLCBpbiB3aGljaCBjYXNlIHdlIGFsc28gYWNjZXB0IFJQYXJlbixcbiAgICAvLyBSQnJhY2tldCBmb3IgYXJyYXkgZWxlbWVudHMsICBpbiB3aGljaCBjYXNlIHdlIGFsc28gYWNjZXB0IENvbW1hLlxuICAgIC8vIE5vdGUgdGhhdCB3ZSBkb24ndCBjb25zdW1lIHRoZSBlbmQgdG9rZW4uXG4gICAgY29uc3QgdHlwZSA9IHJldlRva3NbcmV2VG9rcy5sZW5ndGggLSAxXS50eXBlO1xuICAgIGlmIChcbiAgICAgIHR5cGUgPT09IGV4cGVjdGVkRW5kIHx8XG4gICAgICAoZXhwZWN0ZWRFbmQgPT09IFRva2VuVHlwZS5Db21tYSAmJiB0eXBlID09PSBUb2tlblR5cGUuUlBhcmVuKSB8fFxuICAgICAgKGV4cGVjdGVkRW5kID09PSBUb2tlblR5cGUuUkJyYWNrZXQgJiYgdHlwZSA9PT0gVG9rZW5UeXBlLkNvbW1hKVxuICAgICkge1xuICAgICAgcmV0dXJuIGpzO1xuICAgIH1cblxuICAgIC8vIE9wZXJhdG9yLlxuICAgIHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gICAgaWYgKHRvay50eXBlID49IFRva2VuVHlwZS5QbHVzICYmIHRvay50eXBlIDw9IFRva2VuVHlwZS5HcmVhdGVyT3JFcSkge1xuICAgICAganMgKz0gJyAnICsgdG9rLnRleHQgKyAnICc7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgc3dpdGNoICh0b2sudHlwZSkge1xuICAgICAgY2FzZSBUb2tlblR5cGUuSWRlbnQ6XG4gICAgICAgIGlmICh0b2sudGV4dCA9PT0gJ0FORCcpIHtcbiAgICAgICAgICBqcyArPSAnICYmICc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRvay50ZXh0ID09PSAnT1InKSB7XG4gICAgICAgICAganMgKz0gJyB8fCAnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gICAgICBjYXNlIFRva2VuVHlwZS5FcXVhbDpcbiAgICAgICAganMgKz0gJyA9PSAnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk5vdEVxdWFsOlxuICAgICAgICBqcyArPSAnICE9ICc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgdW5leHBlY3RlZFRva2VuRXJyb3IodG9rLCByZXZUb2tzKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gcGFyc2VMaXN0IHBhcnNlcyBhIGNvbW1hLXNlcGFyYXRlZCBsaXN0IG9mIGV4cHJlc3Npb25zLlxuLy8gZXhwZWN0ZWRFbmQgaXMgQ29tbWEgZm9yIGZ1bmN0aW9uIGFyZ3VtZW50cyBhbmQgUkJyYWNrZXQgZm9yIGFycmF5cyxcbi8vIGFjY29yZGluZyB0byB0aGUgYmVoYXZpb3Igb2YgcGFyc2VFeHByZXNzaW9uLlxuZnVuY3Rpb24gcGFyc2VMaXN0KHJldlRva3M6IFRva2VuW10sIGV4cGVjdGVkRW5kOiBUb2tlblR5cGUpOiBzdHJpbmcge1xuICBpZiAoZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5Db21tYSAmJiBleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLlJCcmFja2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGV4cGVjdGVkRW5kJyk7XG4gIH1cbiAgbGV0IG5leHQgPSByZXZUb2tzW3JldlRva3MubGVuZ3RoIC0gMV07XG4gIGlmIChuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5SUGFyZW4gfHwgbmV4dC50eXBlID09PSBUb2tlblR5cGUuUkJyYWNrZXQpIHtcbiAgICAvLyBlbXB0eSBsaXN0XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGxldCBqcyA9ICcnO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIGpzICs9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBleHBlY3RlZEVuZCk7XG4gICAgbmV4dCA9IHJldlRva3NbcmV2VG9rcy5sZW5ndGggLSAxXTtcbiAgICBpZiAobmV4dC50eXBlID09PSBUb2tlblR5cGUuUlBhcmVuIHx8IG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLlJCcmFja2V0KSB7XG4gICAgICByZXR1cm4ganM7XG4gICAgfVxuICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICBqcyArPSAnLCAnO1xuICB9XG59XG5cbi8vIHBhcnNlRnVuY3Rpb25DYWxsIHBhcnNlcyBhIGZ1bmN0aW9uIGNhbGwgZXhwcmVzc2lvbi5cbi8vIFRoZSBsaXN0IG9mIHN1cHBvcnRlZCBmdW5jdGlvbnMgaXMgaW5cbi8vICAgcHJvamVjdHMvY29yZS9tb2RlbHMvdXRpbHMvZXhwcmVzc2lvbi11dGlscy50c1xuLy8gVGhlIGZ1bmN0aW9uIG5hbWUgaGFzIGFscmVhZHkgYmVlbiBzY2FubmVkLlxuZnVuY3Rpb24gcGFyc2VGdW5jdGlvbkNhbGwobmFtZTogc3RyaW5nLCByZXZUb2tzOiBUb2tlbltdKTogc3RyaW5nIHtcbiAgY29uc3QgYXJncyA9IGZ1bmN0aW9uQXJnc1tuYW1lXTtcbiAgaWYgKGFyZ3MpIHtcbiAgICByZXR1cm4gcGFyc2VGdW5jdGlvbldpdGhBcmdzKG5hbWUsIHJldlRva3MsIGFyZ3MpO1xuICB9XG4gIGlmIChuYW1lID09PSAnSUYnKSB7XG4gICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTFBhcmVuKTtcbiAgICBsZXQganMgPSAnKCcgKyBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKSArICcgPyAnO1xuICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICBqcyArPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKSArICcgOiAnO1xuICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICBqcyArPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKSArICcpJztcbiAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgIHJldHVybiBqcztcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIGZ1bmN0aW9uOiAnICsgbmFtZSk7XG59XG5cbi8qXG4gIFBhcnNlcyBhIGZ1bmN0aW9uIGNhbGwgZXhwcmVzc2lvbi5cbiAgYXJncyB0ZWxscyBob3cgbWFueSBhcmd1bWVudHMgdGhlIGZ1bmN0aW9uIHRha2VzIGFuZCB0aGVpciB0eXBlLlxuICBGb3IgZXhhbXBsZSwgdGhlIGluZGljYXRvciBmdW5jdGlvblxuICAgIFNVTShmb3Jtc1swXSwgJGFnZSwgJGdlbmRlciA9IFwibWFsZVwiKVxuICBjYW4gYmUgcGFyc2VkIHdpdGhcbiAgICBwYXJzZUZ1bmN0aW9uV2l0aEFyZ3MoJ1NVTScsIHJldlRva3MsIFsnYXJnJywgJ2ZpZWxkJywgJ2Z1bmMoZm9ybSk/J10pXG4gIHJlc3VsdGluZyBpbiB0aGUgZm9sbG93aW5nIEphdmFTY3JpcHQ6XG4gICAgU1VNKGZvcm1zWzBdLCAnYWdlJywgKGZvcm0pID0+IGZvcm0uZ2VuZGVyID09PSBcIm1hbGVcIilcbiovXG5mdW5jdGlvbiBwYXJzZUZ1bmN0aW9uV2l0aEFyZ3MobmFtZTogc3RyaW5nLCByZXZUb2tzOiBUb2tlbltdLCBhcmdzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkxQYXJlbik7XG4gIGxldCBhcmdzSnMgPSAnJztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGFyZ1R5cGUgPSBhcmdzW2ldO1xuICAgIGlmIChhcmdUeXBlLmVuZHNXaXRoKCc/JykgJiYgcmV2VG9rc1tyZXZUb2tzLmxlbmd0aC0xXS50eXBlID09PSBUb2tlblR5cGUuUlBhcmVuKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKGFyZ1R5cGUuZW5kc1dpdGgoJz8nKSkge1xuICAgICAgYXJnVHlwZSA9IGFyZ1R5cGUuc2xpY2UoMCwgLTEpO1xuICAgIH1cbiAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAgYXJnc0pzICs9ICcsICc7XG4gICAgfVxuICAgIGxldCBhcmdKcyA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgIGlmIChhcmdUeXBlID09PSAnZmllbGQnICYmIGlzRmllbGQoYXJnSnMpKSB7XG4gICAgICBhcmdKcyA9IFwiJ1wiICsgYXJnSnMuc2xpY2UoJ2Zvcm0uJy5sZW5ndGgpICsgXCInXCI7XG4gICAgfSBlbHNlIGlmIChhcmdUeXBlLnN0YXJ0c1dpdGgoJ2Z1bmMnKSkge1xuICAgICAgYXJnSnMgPSBhcmdUeXBlLnNsaWNlKCdmdW5jJy5sZW5ndGgpICsgJyA9PiAnICsgYXJnSnM7XG4gICAgfVxuICAgIGFyZ3NKcyArPSBhcmdKcztcbiAgfVxuICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICByZXR1cm4gYCR7bmFtZX0oJHthcmdzSnN9KWA7XG59XG5cbmZ1bmN0aW9uIGlzRmllbGQoanM6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gL15mb3JtXFwuW2EtekEtWl9dXFx3KiQvLnRlc3QoanMpO1xufVxuXG5jb25zdCBmdW5jdGlvbkFyZ3M6IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nW119ID0ge1xuICBBRERfREFZUzogW1wiYXJnXCIsIFwiYXJnXCJdLFxuICBBTExfVkFMVUVTX09GOiBbXCJhcmdcIiwgXCJmaWVsZFwiLCBcImZ1bmMoZm9ybSk/XCJdLFxuICBBUFBMWV9MQUJFTFM6IFtcImFyZ1wiLCBcImFyZ1wiLCBcImFyZ1wiXSxcbiAgQVBQTFk6IFtcImFyZ1wiLCBcImZpZWxkXCIsIFwiZnVuYyhmb3JtKVwiXSxcbiAgQlVJTERfREFUQVNFVDogW1wiYXJnXCIsIFwiYXJnP1wiXSxcbiAgQ09NUEFSRV9EQVRFOiBbXCJhcmdcIiwgXCJhcmdcIiwgXCJhcmdcIiwgXCJhcmc/XCJdLFxuICBDT05DQVQ6IFtcImFyZ1wiLCBcImFyZ1wiXSxcbiAgQ09OU09MRV9MT0c6IFtcImFyZ1wiXSxcbiAgQ09VTlRfRk9STVM6IFtcImFyZ1wiLCBcImZ1bmMoZm9ybSk/XCJdLFxuICBDT1VOVF9SRVBTOiBbXCJhcmdcIiwgXCJmdW5jKGZvcm0pP1wiXSxcbiAgREFZU19ESUZGOiBbXCJhcmdcIiwgXCJhcmdcIl0sXG4gIEZJTFRFUl9CWTogW1wiYXJnXCIsIFwiZnVuYyhmb3JtKVwiXSxcbiAgRklSU1Q6IFtcImFyZ1wiLCBcImZ1bmMoZm9ybSlcIiwgXCJmaWVsZD9cIl0sXG4gIEZST01fUkVQUzogW1wiYXJnXCIsIFwiZnVuYyhmb3JtKVwiXSxcbiAgR0VUX0FHRTogW1wiYXJnXCIsIFwiYXJnP1wiXSxcbiAgR0VUX0xBQkVMUzogW1wiYXJnXCIsIFwiYXJnXCJdLFxuICBJTkNMVURFUzogW1wiYXJnXCIsIFwiYXJnXCJdLFxuICBJU19BRlRFUjogW1wiYXJnXCIsIFwiYXJnXCJdLFxuICBJU19CRUZPUkU6IFtcImFyZ1wiLCBcImFyZ1wiXSxcbiAgSVNfV0lUSElOX0lOVEVSVkFMOiBbXCJhcmdcIiwgXCJhcmdcIiwgXCJhcmdcIl0sXG4gIEpPSU5fRk9STVM6IFtcImFyZ1wiLCBcImFyZ1wiLCBcImZpZWxkXCIsIFwiZmllbGQ/XCJdLFxuICBKT0lOX1JFUEVBVElOR19TTElERVM6IFtcImFyZ1wiLCBcImFyZ1wiLCBcImZpZWxkXCIsIFwiZmllbGRcIiwgXCJmaWVsZFwiLCBcImZpZWxkP1wiXSxcbiAgTEFTVDogW1wiYXJnXCIsIFwiZnVuYyhmb3JtKVwiLCBcImZpZWxkP1wiXSxcbiAgTEVOOiBbXCJhcmdcIl0sXG4gIE1BUDogW1wiYXJnXCIsIFwiZnVuYyhlbGVtKVwiXSxcbiAgTUFYOiBbXCJhcmdcIiwgXCJmaWVsZFwiLCBcImZ1bmMoZm9ybSk/XCJdLFxuICBNRUFOOiBbXCJhcmdcIiwgXCJmaWVsZFwiLCBcImZ1bmMoZm9ybSk/XCJdLFxuICBNRURJQU46IFtcImFyZ1wiLCBcImZpZWxkXCIsIFwiZnVuYyhmb3JtKT9cIl0sXG4gIE1PREU6IFtcImFyZ1wiLCBcImZpZWxkXCIsIFwiZnVuYyhmb3JtKT9cIl0sXG4gIE9QOiBbXCJhcmdcIiwgXCJhcmdcIiwgXCJmdW5jKGVsZW1BLCBlbGVtQilcIl0sXG4gIFBFUkNFTlQ6IFtcImFyZ1wiLCBcImFyZ1wiXSxcbiAgUkVNT1ZFX0RVUExJQ0FURVM6IFtcImFyZ1wiXSxcbiAgUk9VTkQ6IFtcImFyZ1wiLCBcImFyZz9cIl0sXG4gIFNVTTogW1wiYXJnXCIsIFwiZmllbGRcIiwgXCJmdW5jKGZvcm0pP1wiXSxcbiAgVE9EQVk6IFtdLFxufTtcbiJdfQ==