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
    PERCENTAGE_CHANGE: ["arg", "arg"],
    REMOVE_DUPLICATES: ["arg"],
    ROUND: ["arg", "arg?"],
    SUM: ["arg", "field", "func(form)?"],
    TODAY: [],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGluZGlraXQtcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9yZXBvcnRzL3NyYy94bHMtcmVwb3J0L2hpbmRpa2l0LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFtQ0gsMkNBQTJDO0FBQzNDLCtDQUErQztBQUMvQyxTQUFTLFVBQVUsQ0FBQyxDQUFTO0lBQzNCLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDbEIsT0FBTyxFQUFDLElBQUksdUJBQWUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUM7S0FDeEM7SUFDRCxJQUFJLENBQTBCLENBQUM7SUFDL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QixRQUFRLENBQUMsRUFBRTtRQUNULEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLDBCQUFrQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUM3QyxLQUFLLEdBQUc7WUFDTixPQUFPLEVBQUMsSUFBSSwwQkFBa0IsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDN0MsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksNEJBQW9CLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQy9DLEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLDRCQUFvQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUMvQyxLQUFLLEdBQUc7WUFDTixPQUFPLEVBQUMsSUFBSSx5QkFBaUIsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDNUMsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksd0JBQWdCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQzNDLEtBQUssR0FB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Q0FBQyxLQUFLLENBQUM7SUFDWixHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDO0lBQzFCLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDO0lBQ3BDLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDO0lBQ3JDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDO0lBQ3ZDLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDO0lBQ3JDLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsb0JBQW9CLENBQUM7SUFDeEMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUN2QixpQkFBaUIsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7SUFDakMsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUM7SUFDMUIsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztJQUN0QixHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQztJQUNwQyxLQUFLLEVBQUUsRUFBRTtDQUNWLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmNvbnN0IGVudW0gVG9rZW5UeXBlIHtcbiAgRU5ELFxuICBMUGFyZW4sXG4gIFJQYXJlbixcbiAgTEJyYWNrZXQsXG4gIFJCcmFja2V0LFxuICBDb21tYSxcblxuICAvLyBCaW5hcnkgb3BlcmF0b3JzIGZyb20gUGx1cyB0byBHcmVhdGVyT3JFcSBoYXZlIHRoZSBzYW1lIHJlcHJlc2VudGF0aW9uXG4gIC8vIGluIGluZGljYXRvciBmb3JtdWxhcyBhbmQgSmF2YVNjcmlwdCBhbmQgZG9uJ3QgbmVlZCBhIHRyYW5zbGF0aW9uLlxuICBQbHVzLFxuICBNaW51cyxcbiAgTXVsLFxuICBEaXYsXG4gIExlc3MsXG4gIExlc3NPckVxLFxuICBHcmVhdGVyLFxuICBHcmVhdGVyT3JFcSxcblxuICBFcXVhbCxcbiAgTm90RXF1YWwsXG4gIE5vdCxcbiAgU3RyaW5nLFxuICBOdW1iZXIsXG4gIElkZW50LFxuICBGaWVsZCwgLy8gYW4gaWRlbnRpZmllciBzdGFydGluZyB3aXRoICRcbn1cblxuaW50ZXJmYWNlIFRva2VuIHtcbiAgdHlwZTogVG9rZW5UeXBlO1xuICB0ZXh0OiBzdHJpbmc7XG59XG5cbi8vIGZpcnN0VG9rZW4gcmV0dXJucyB0aGUgZmlyc3QgdG9rZW4gaW4gcy5cbi8vIHMgbXVzdCBub3QgYmVnaW4gd2l0aCB3aGl0ZXNwYWNlIGNoYXJhY3RlcnMuXG5mdW5jdGlvbiBmaXJzdFRva2VuKHM6IHN0cmluZyk6IFRva2VuIHtcbiAgaWYgKHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuRU5ELCB0ZXh0OiAnJ307XG4gIH1cbiAgbGV0IG06IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsO1xuICBjb25zdCBjID0gcy5jaGFyQXQoMCk7XG4gIHN3aXRjaCAoYykge1xuICAgIGNhc2UgJygnOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTFBhcmVuLCB0ZXh0OiAnKCd9O1xuICAgIGNhc2UgJyknOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuUlBhcmVuLCB0ZXh0OiAnKSd9O1xuICAgIGNhc2UgJ1snOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTEJyYWNrZXQsIHRleHQ6ICdbJ307XG4gICAgY2FzZSAnXSc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5SQnJhY2tldCwgdGV4dDogJ10nfTtcbiAgICBjYXNlICcsJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkNvbW1hLCB0ZXh0OiAnLCd9O1xuICAgIGNhc2UgJysnOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuUGx1cywgdGV4dDogJysnfTtcbiAgICBjYXNlICctJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLk1pbnVzLCB0ZXh0OiAnLSd9O1xuICAgIGNhc2UgJyonOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTXVsLCB0ZXh0OiAnKid9O1xuICAgIGNhc2UgJy8nOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuRGl2LCB0ZXh0OiAnLyd9O1xuICAgIGNhc2UgJzwnOlxuICAgICAgaWYgKHMubGVuZ3RoID4gMSAmJiBzLmNoYXJBdCgxKSA9PT0gJz0nKSB7XG4gICAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkxlc3NPckVxLCB0ZXh0OiAnPD0nfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkxlc3MsIHRleHQ6ICc8J307XG4gICAgY2FzZSAnPic6XG4gICAgICBpZiAocy5sZW5ndGggPiAxICYmIHMuY2hhckF0KDEpID09PSAnPScpIHtcbiAgICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuR3JlYXRlck9yRXEsIHRleHQ6ICc+PSd9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuR3JlYXRlciwgdGV4dDogJz4nfTtcbiAgICBjYXNlICc9JzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkVxdWFsLCB0ZXh0OiAnPSd9O1xuICAgIGNhc2UgJyEnOlxuICAgICAgaWYgKHMubGVuZ3RoID4gMSAmJiBzLmNoYXJBdCgxKSA9PT0gJz0nKSB7XG4gICAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLk5vdEVxdWFsLCB0ZXh0OiAnIT0nfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLk5vdCwgdGV4dDogJyEnfTtcbiAgICBjYXNlICckJzpcbiAgICAgIG0gPSBzLm1hdGNoKC9eXFwkW2EtekEtWl9dXFx3Ki8pO1xuICAgICAgaWYgKG0gPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGZpZWxkIG5hbWUgaW46ICcgKyBzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkZpZWxkLCB0ZXh0OiBtWzBdfTtcbiAgICBjYXNlICdcIic6XG4gICAgICBtID0gcy5tYXRjaCgvXlwiKFxcXFxcXFxcfFxcXFxcInxbXlwiXSkqXCIvKTtcbiAgICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW50ZXJtaW5hdGVkIHN0cmluZyBsaXRlcmFsIGluOiAnICsgcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5TdHJpbmcsIHRleHQ6IG1bMF19O1xuICAgIGNhc2UgXCInXCI6XG4gICAgICBtID0gcy5tYXRjaCgvXicoXFxcXFxcXFx8XFxcXCd8W14nXSkqJy8pO1xuICAgICAgaWYgKG0gPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnRlcm1pbmF0ZWQgc3RyaW5nIGxpdGVyYWwgaW46ICcgKyBzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLlN0cmluZywgdGV4dDogbVswXX07XG4gIH1cbiAgaWYgKGMgPj0gJzAnICYmIGMgPD0gJzknKSB7XG4gICAgbSA9IHMubWF0Y2goL15cXGQrKFxcLlxcZCspPyhbZUVdW1xcK1xcLV0/XFxkKyk/Lyk7XG4gICAgaWYgKG0gPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW1wb3NzaWJsZScpO1xuICAgIH1cbiAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5OdW1iZXIsIHRleHQ6IG1bMF19O1xuICB9XG4gIG0gPSBzLm1hdGNoKC9eW2EtekEtWl9dXFx3Ki8pO1xuICBpZiAobSAhPT0gbnVsbCkge1xuICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLklkZW50LCB0ZXh0OiBtWzBdfTtcbiAgfVxuICBpZiAocy5tYXRjaCgvXlxccy8pICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzdHJpbmcgcyBoYXMgYSBsZWFkaW5nIHdoaXRlc3BhY2UnKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCB0b2tlbiBpbjogJyArIHMpO1xufVxuXG5mdW5jdGlvbiB0b2tlbml6ZShzOiBzdHJpbmcpOiBUb2tlbltdIHtcbiAgY29uc3QgdG9rczogVG9rZW5bXSA9IFtdO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIHMgPSBzLnRyaW0oKTtcbiAgICBjb25zdCB0ID0gZmlyc3RUb2tlbihzKTtcbiAgICB0b2tzLnB1c2godCk7XG4gICAgaWYgKHQudHlwZSA9PT0gVG9rZW5UeXBlLkVORCkge1xuICAgICAgcmV0dXJuIHRva3M7XG4gICAgfVxuICAgIHMgPSBzLnNsaWNlKHQudGV4dC5sZW5ndGgpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmRpY2F0b3JUb0pzKGZvcm11bGE6IHN0cmluZyk6IHN0cmluZyB7XG4gIHN3aXRjaCAodHlwZW9mIGZvcm11bGEpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgaWYgKGZvcm11bGEuc3RhcnRzV2l0aCgnanM6JykpIHtcbiAgICAgICAgcmV0dXJuIGZvcm11bGEuc2xpY2UoMykudHJpbSgpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGZvcm11bGEgPSBTdHJpbmcoZm9ybXVsYSk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JtdWxhIGlzIG5vdCBhIHN0cmluZycpO1xuICB9XG4gIHJldHVybiBwYXJzZUV4cHJlc3Npb24odG9rZW5pemUoZm9ybXVsYSkucmV2ZXJzZSgpLCBUb2tlblR5cGUuRU5EKTtcbn1cblxuZnVuY3Rpb24gdW5leHBlY3RlZFRva2VuRXJyb3IodG9rOiBUb2tlbiwgcmVzdDogVG9rZW5bXSk6IEVycm9yIHtcbiAgaWYgKHRvay50eXBlID09PSBUb2tlblR5cGUuRU5EKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcigndW5leHBlY3RlZCBlbmQgb2YgdG9rZW4gc3RyZWFtJyk7XG4gIH1cbiAgcmVzdC5wdXNoKHRvayk7XG4gIHJldHVybiBuZXcgRXJyb3IoJ3VuZXhwZWN0ZWQgdG9rZW4gYXQgdGhlIHN0YXJ0IG9mOiAnICsgcHJpbnRUb2tlbnMocmVzdCkpO1xufVxuXG5mdW5jdGlvbiBwcmludFRva2VucyhyZXZUb2tzOiBUb2tlbltdKSB7XG4gIGxldCBzID0gJyc7XG4gIHdoaWxlIChyZXZUb2tzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCB0b2sgPSByZXZUb2tzLnBvcCgpIGFzIFRva2VuO1xuICAgIGlmICh0b2sudHlwZSA+PSBUb2tlblR5cGUuUGx1cyAmJiB0b2sudHlwZSA8PSBUb2tlblR5cGUuTm90RXF1YWwpIHtcbiAgICAgIC8vIGJpbmFyeSBvcGVyYXRvcnNcbiAgICAgIHMgKz0gJyAnICsgdG9rLnRleHQgKyAnICc7XG4gICAgfSBlbHNlIGlmICh0b2sudHlwZSA9PT0gVG9rZW5UeXBlLkNvbW1hKSB7XG4gICAgICBzICs9ICcsICc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHMgKz0gdG9rLnRleHQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBzO1xufVxuXG5mdW5jdGlvbiBjb25zdW1lKHJldlRva3M6IFRva2VuW10sIGV4cGVjdGVkVHlwZTogVG9rZW5UeXBlKTogVG9rZW4ge1xuICBjb25zdCB0b2sgPSByZXZUb2tzLnBvcCgpIGFzIFRva2VuO1xuICBpZiAodG9rLnR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gIH1cbiAgcmV0dXJuIHRvaztcbn1cblxuLy8gcGFyc2VFeHByZXNzaW9uIHBhcnNlcyB0aGUgZmlyc3QgZXhwcmVzc2lvbiBpbiByZXZUb2tzXG4vLyBhbmQgcmV0dXJucyBpdHMgSmF2YVNjcmlwdC9hamYgdHJhbnNsYXRpb24uXG4vLyByZXZUb2tzIGlzIHJldmVyc2VkLCB0aGUgZmlyc3QgdG9rZW4gb2YgdGhlIGV4cHJlc3Npb24gYmVpbmcgYXQgaW5kZXggbGVuZ3RoLTE7XG4vLyB0aGlzIHdheSwgdG9rZW5zIGNhbiBiZSBjb25zdW1lZCBlZmZpY2llbnRseSB3aXRoIHJldlRva3MucG9wKCkuXG4vLyBBZnRlciB0aGUgZXhwcmVzc2lvbiwgdGhlIGZ1bmN0aW9uIGV4cGVjdHMgdG8gZmluZCB0aGUgdG9rZW4gZXhwZWN0ZWRFbmQuXG5mdW5jdGlvbiBwYXJzZUV4cHJlc3Npb24ocmV2VG9rczogVG9rZW5bXSwgZXhwZWN0ZWRFbmQ6IFRva2VuVHlwZSk6IHN0cmluZyB7XG4gIGlmIChcbiAgICBleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLkVORCAmJlxuICAgIGV4cGVjdGVkRW5kICE9PSBUb2tlblR5cGUuUlBhcmVuICYmXG4gICAgZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5Db21tYSAmJlxuICAgIGV4cGVjdGVkRW5kICE9PSBUb2tlblR5cGUuUkJyYWNrZXRcbiAgKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGV4cGVjdGVkRW5kJyk7XG4gIH1cblxuICBsZXQganMgPSAnJztcbiAgd2hpbGUgKHRydWUpIHtcbiAgICAvLyBFeHByZXNzaW9uLlxuICAgIGxldCB0b2sgPSByZXZUb2tzLnBvcCgpIGFzIFRva2VuO1xuICAgIGxldCBuZXh0OiBUb2tlbjtcbiAgICBzd2l0Y2ggKHRvay50eXBlKSB7XG4gICAgICBjYXNlIFRva2VuVHlwZS5JZGVudDpcbiAgICAgICAgbmV4dCA9IHJldlRva3NbcmV2VG9rcy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLkxQYXJlbikge1xuICAgICAgICAgIGpzICs9IHBhcnNlRnVuY3Rpb25DYWxsKHRvay50ZXh0LCByZXZUb2tzKTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5MQnJhY2tldCkge1xuICAgICAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkxCcmFja2V0KTtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuUkJyYWNrZXQpO1xuICAgICAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJCcmFja2V0KTtcbiAgICAgICAgICBqcyArPSBgJHt0b2sudGV4dH1bJHtpbmRleH1dYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBqcyArPSB0b2sudGV4dDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLkZpZWxkOlxuICAgICAgICBqcyArPSAnZm9ybS4nICsgdG9rLnRleHQuc2xpY2UoJyQnLmxlbmd0aCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUb2tlblR5cGUuU3RyaW5nOlxuICAgICAgY2FzZSBUb2tlblR5cGUuTnVtYmVyOlxuICAgICAgICBqcyArPSB0b2sudGV4dDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRva2VuVHlwZS5QbHVzOlxuICAgICAgY2FzZSBUb2tlblR5cGUuTWludXM6XG4gICAgICAgIG5leHQgPSByZXZUb2tzW3JldlRva3MubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5QbHVzIHx8IG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLk1pbnVzKSB7XG4gICAgICAgICAgdGhyb3cgdW5leHBlY3RlZFRva2VuRXJyb3IocmV2VG9rcy5wb3AoKSBhcyBUb2tlbiwgcmV2VG9rcyk7XG4gICAgICAgIH1cbiAgICAgICAganMgKz0gdG9rLnRleHQ7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgY2FzZSBUb2tlblR5cGUuTm90OlxuICAgICAgICBqcyArPSAnISc7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgY2FzZSBUb2tlblR5cGUuTFBhcmVuOlxuICAgICAgICBqcyArPSAnKCcgKyBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbikgKyAnKSc7XG4gICAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUb2tlblR5cGUuTEJyYWNrZXQ6XG4gICAgICAgIGpzICs9ICdbJyArIHBhcnNlTGlzdChyZXZUb2tzLCBUb2tlblR5cGUuUkJyYWNrZXQpICsgJ10nO1xuICAgICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SQnJhY2tldCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgdW5leHBlY3RlZFRva2VuRXJyb3IodG9rLCByZXZUb2tzKTtcbiAgICB9XG5cbiAgICAvLyBQb3NzaWJsZSBlbmQgb2YgZXhwcmVzc2lvbi4gZXhwZWN0ZWRFbmQgY2FuIGJlOlxuICAgIC8vIEVORCxcbiAgICAvLyBSUGFyZW4gZm9yIGV4cHJlc3Npb25zIGJldHdlZW4gcGFyZW50aGVzZXMsXG4gICAgLy8gQ29tbWEgZm9yIGZ1bmN0aW9uIGFyZ3VtZW50cywgaW4gd2hpY2ggY2FzZSB3ZSBhbHNvIGFjY2VwdCBSUGFyZW4sXG4gICAgLy8gUkJyYWNrZXQgZm9yIGFycmF5IGVsZW1lbnRzLCAgaW4gd2hpY2ggY2FzZSB3ZSBhbHNvIGFjY2VwdCBDb21tYS5cbiAgICAvLyBOb3RlIHRoYXQgd2UgZG9uJ3QgY29uc3VtZSB0aGUgZW5kIHRva2VuLlxuICAgIGNvbnN0IHR5cGUgPSByZXZUb2tzW3JldlRva3MubGVuZ3RoIC0gMV0udHlwZTtcbiAgICBpZiAoXG4gICAgICB0eXBlID09PSBleHBlY3RlZEVuZCB8fFxuICAgICAgKGV4cGVjdGVkRW5kID09PSBUb2tlblR5cGUuQ29tbWEgJiYgdHlwZSA9PT0gVG9rZW5UeXBlLlJQYXJlbikgfHxcbiAgICAgIChleHBlY3RlZEVuZCA9PT0gVG9rZW5UeXBlLlJCcmFja2V0ICYmIHR5cGUgPT09IFRva2VuVHlwZS5Db21tYSlcbiAgICApIHtcbiAgICAgIHJldHVybiBqcztcbiAgICB9XG5cbiAgICAvLyBPcGVyYXRvci5cbiAgICB0b2sgPSByZXZUb2tzLnBvcCgpIGFzIFRva2VuO1xuICAgIGlmICh0b2sudHlwZSA+PSBUb2tlblR5cGUuUGx1cyAmJiB0b2sudHlwZSA8PSBUb2tlblR5cGUuR3JlYXRlck9yRXEpIHtcbiAgICAgIGpzICs9ICcgJyArIHRvay50ZXh0ICsgJyAnO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHN3aXRjaCAodG9rLnR5cGUpIHtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLklkZW50OlxuICAgICAgICBpZiAodG9rLnRleHQgPT09ICdBTkQnKSB7XG4gICAgICAgICAganMgKz0gJyAmJiAnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b2sudGV4dCA9PT0gJ09SJykge1xuICAgICAgICAgIGpzICs9ICcgfHwgJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2ssIHJldlRva3MpO1xuICAgICAgY2FzZSBUb2tlblR5cGUuRXF1YWw6XG4gICAgICAgIGpzICs9ICcgPT0gJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRva2VuVHlwZS5Ob3RFcXVhbDpcbiAgICAgICAganMgKz0gJyAhPSAnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gICAgfVxuICB9XG59XG5cbi8vIHBhcnNlTGlzdCBwYXJzZXMgYSBjb21tYS1zZXBhcmF0ZWQgbGlzdCBvZiBleHByZXNzaW9ucy5cbi8vIGV4cGVjdGVkRW5kIGlzIENvbW1hIGZvciBmdW5jdGlvbiBhcmd1bWVudHMgYW5kIFJCcmFja2V0IGZvciBhcnJheXMsXG4vLyBhY2NvcmRpbmcgdG8gdGhlIGJlaGF2aW9yIG9mIHBhcnNlRXhwcmVzc2lvbi5cbmZ1bmN0aW9uIHBhcnNlTGlzdChyZXZUb2tzOiBUb2tlbltdLCBleHBlY3RlZEVuZDogVG9rZW5UeXBlKTogc3RyaW5nIHtcbiAgaWYgKGV4cGVjdGVkRW5kICE9PSBUb2tlblR5cGUuQ29tbWEgJiYgZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5SQnJhY2tldCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBleHBlY3RlZEVuZCcpO1xuICB9XG4gIGxldCBuZXh0ID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdO1xuICBpZiAobmV4dC50eXBlID09PSBUb2tlblR5cGUuUlBhcmVuIHx8IG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLlJCcmFja2V0KSB7XG4gICAgLy8gZW1wdHkgbGlzdFxuICAgIHJldHVybiAnJztcbiAgfVxuICBsZXQganMgPSAnJztcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBqcyArPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgZXhwZWN0ZWRFbmQpO1xuICAgIG5leHQgPSByZXZUb2tzW3JldlRva3MubGVuZ3RoIC0gMV07XG4gICAgaWYgKG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLlJQYXJlbiB8fCBuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5SQnJhY2tldCkge1xuICAgICAgcmV0dXJuIGpzO1xuICAgIH1cbiAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAganMgKz0gJywgJztcbiAgfVxufVxuXG4vLyBwYXJzZUZ1bmN0aW9uQ2FsbCBwYXJzZXMgYSBmdW5jdGlvbiBjYWxsIGV4cHJlc3Npb24uXG4vLyBUaGUgbGlzdCBvZiBzdXBwb3J0ZWQgZnVuY3Rpb25zIGlzIGluXG4vLyAgIHByb2plY3RzL2NvcmUvbW9kZWxzL3V0aWxzL2V4cHJlc3Npb24tdXRpbHMudHNcbi8vIFRoZSBmdW5jdGlvbiBuYW1lIGhhcyBhbHJlYWR5IGJlZW4gc2Nhbm5lZC5cbmZ1bmN0aW9uIHBhcnNlRnVuY3Rpb25DYWxsKG5hbWU6IHN0cmluZywgcmV2VG9rczogVG9rZW5bXSk6IHN0cmluZyB7XG4gIGNvbnN0IGFyZ3MgPSBmdW5jdGlvbkFyZ3NbbmFtZV07XG4gIGlmIChhcmdzKSB7XG4gICAgcmV0dXJuIHBhcnNlRnVuY3Rpb25XaXRoQXJncyhuYW1lLCByZXZUb2tzLCBhcmdzKTtcbiAgfVxuICBpZiAobmFtZSA9PT0gJ0lGJykge1xuICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkxQYXJlbik7XG4gICAgbGV0IGpzID0gJygnICsgcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnID8gJztcbiAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAganMgKz0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnIDogJztcbiAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAganMgKz0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnKSc7XG4gICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUlBhcmVuKTtcbiAgICByZXR1cm4ganM7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBmdW5jdGlvbjogJyArIG5hbWUpO1xufVxuXG4vKlxuICBQYXJzZXMgYSBmdW5jdGlvbiBjYWxsIGV4cHJlc3Npb24uXG4gIGFyZ3MgdGVsbHMgaG93IG1hbnkgYXJndW1lbnRzIHRoZSBmdW5jdGlvbiB0YWtlcyBhbmQgdGhlaXIgdHlwZS5cbiAgRm9yIGV4YW1wbGUsIHRoZSBpbmRpY2F0b3IgZnVuY3Rpb25cbiAgICBTVU0oZm9ybXNbMF0sICRhZ2UsICRnZW5kZXIgPSBcIm1hbGVcIilcbiAgY2FuIGJlIHBhcnNlZCB3aXRoXG4gICAgcGFyc2VGdW5jdGlvbldpdGhBcmdzKCdTVU0nLCByZXZUb2tzLCBbJ2FyZycsICdmaWVsZCcsICdmdW5jKGZvcm0pPyddKVxuICByZXN1bHRpbmcgaW4gdGhlIGZvbGxvd2luZyBKYXZhU2NyaXB0OlxuICAgIFNVTShmb3Jtc1swXSwgJ2FnZScsIChmb3JtKSA9PiBmb3JtLmdlbmRlciA9PT0gXCJtYWxlXCIpXG4qL1xuZnVuY3Rpb24gcGFyc2VGdW5jdGlvbldpdGhBcmdzKG5hbWU6IHN0cmluZywgcmV2VG9rczogVG9rZW5bXSwgYXJnczogc3RyaW5nW10pOiBzdHJpbmcge1xuICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MUGFyZW4pO1xuICBsZXQgYXJnc0pzID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBhcmdUeXBlID0gYXJnc1tpXTtcbiAgICBpZiAoYXJnVHlwZS5lbmRzV2l0aCgnPycpICYmIHJldlRva3NbcmV2VG9rcy5sZW5ndGgtMV0udHlwZSA9PT0gVG9rZW5UeXBlLlJQYXJlbikge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChhcmdUeXBlLmVuZHNXaXRoKCc/JykpIHtcbiAgICAgIGFyZ1R5cGUgPSBhcmdUeXBlLnNsaWNlKDAsIC0xKTtcbiAgICB9XG4gICAgaWYgKGkgIT09IDApIHtcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgIGFyZ3NKcyArPSAnLCAnO1xuICAgIH1cbiAgICBsZXQgYXJnSnMgPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICBpZiAoYXJnVHlwZSA9PT0gJ2ZpZWxkJyAmJiBpc0ZpZWxkKGFyZ0pzKSkge1xuICAgICAgYXJnSnMgPSBcIidcIiArIGFyZ0pzLnNsaWNlKCdmb3JtLicubGVuZ3RoKSArIFwiJ1wiO1xuICAgIH0gZWxzZSBpZiAoYXJnVHlwZS5zdGFydHNXaXRoKCdmdW5jJykpIHtcbiAgICAgIGFyZ0pzID0gYXJnVHlwZS5zbGljZSgnZnVuYycubGVuZ3RoKSArICcgPT4gJyArIGFyZ0pzO1xuICAgIH1cbiAgICBhcmdzSnMgKz0gYXJnSnM7XG4gIH1cbiAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUlBhcmVuKTtcbiAgcmV0dXJuIGAke25hbWV9KCR7YXJnc0pzfSlgO1xufVxuXG5mdW5jdGlvbiBpc0ZpZWxkKGpzOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIC9eZm9ybVxcLlthLXpBLVpfXVxcdyokLy50ZXN0KGpzKTtcbn1cblxuY29uc3QgZnVuY3Rpb25BcmdzOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ1tdfSA9IHtcbiAgQUREX0RBWVM6IFtcImFyZ1wiLCBcImFyZ1wiXSxcbiAgQUxMX1ZBTFVFU19PRjogW1wiYXJnXCIsIFwiZmllbGRcIiwgXCJmdW5jKGZvcm0pP1wiXSxcbiAgQVBQTFlfTEFCRUxTOiBbXCJhcmdcIiwgXCJhcmdcIiwgXCJhcmdcIl0sXG4gIEFQUExZOiBbXCJhcmdcIiwgXCJmaWVsZFwiLCBcImZ1bmMoZm9ybSlcIl0sXG4gIEJVSUxEX0RBVEFTRVQ6IFtcImFyZ1wiLCBcImFyZz9cIl0sXG4gIENPTVBBUkVfREFURTogW1wiYXJnXCIsIFwiYXJnXCIsIFwiYXJnXCIsIFwiYXJnP1wiXSxcbiAgQ09OQ0FUOiBbXCJhcmdcIiwgXCJhcmdcIl0sXG4gIENPTlNPTEVfTE9HOiBbXCJhcmdcIl0sXG4gIENPVU5UX0ZPUk1TOiBbXCJhcmdcIiwgXCJmdW5jKGZvcm0pP1wiXSxcbiAgQ09VTlRfUkVQUzogW1wiYXJnXCIsIFwiZnVuYyhmb3JtKT9cIl0sXG4gIERBWVNfRElGRjogW1wiYXJnXCIsIFwiYXJnXCJdLFxuICBGSUxURVJfQlk6IFtcImFyZ1wiLCBcImZ1bmMoZm9ybSlcIl0sXG4gIEZJUlNUOiBbXCJhcmdcIiwgXCJmdW5jKGZvcm0pXCIsIFwiZmllbGQ/XCJdLFxuICBGUk9NX1JFUFM6IFtcImFyZ1wiLCBcImZ1bmMoZm9ybSlcIl0sXG4gIEdFVF9BR0U6IFtcImFyZ1wiLCBcImFyZz9cIl0sXG4gIEdFVF9MQUJFTFM6IFtcImFyZ1wiLCBcImFyZ1wiXSxcbiAgSU5DTFVERVM6IFtcImFyZ1wiLCBcImFyZ1wiXSxcbiAgSVNfQUZURVI6IFtcImFyZ1wiLCBcImFyZ1wiXSxcbiAgSVNfQkVGT1JFOiBbXCJhcmdcIiwgXCJhcmdcIl0sXG4gIElTX1dJVEhJTl9JTlRFUlZBTDogW1wiYXJnXCIsIFwiYXJnXCIsIFwiYXJnXCJdLFxuICBKT0lOX0ZPUk1TOiBbXCJhcmdcIiwgXCJhcmdcIiwgXCJmaWVsZFwiLCBcImZpZWxkP1wiXSxcbiAgSk9JTl9SRVBFQVRJTkdfU0xJREVTOiBbXCJhcmdcIiwgXCJhcmdcIiwgXCJmaWVsZFwiLCBcImZpZWxkXCIsIFwiZmllbGRcIiwgXCJmaWVsZD9cIl0sXG4gIExBU1Q6IFtcImFyZ1wiLCBcImZ1bmMoZm9ybSlcIiwgXCJmaWVsZD9cIl0sXG4gIExFTjogW1wiYXJnXCJdLFxuICBNQVA6IFtcImFyZ1wiLCBcImZ1bmMoZWxlbSlcIl0sXG4gIE1BWDogW1wiYXJnXCIsIFwiZmllbGRcIiwgXCJmdW5jKGZvcm0pP1wiXSxcbiAgTUVBTjogW1wiYXJnXCIsIFwiZmllbGRcIiwgXCJmdW5jKGZvcm0pP1wiXSxcbiAgTUVESUFOOiBbXCJhcmdcIiwgXCJmaWVsZFwiLCBcImZ1bmMoZm9ybSk/XCJdLFxuICBNT0RFOiBbXCJhcmdcIiwgXCJmaWVsZFwiLCBcImZ1bmMoZm9ybSk/XCJdLFxuICBPUDogW1wiYXJnXCIsIFwiYXJnXCIsIFwiZnVuYyhlbGVtQSwgZWxlbUIpXCJdLFxuICBQRVJDRU5UOiBbXCJhcmdcIiwgXCJhcmdcIl0sXG4gIFBFUkNFTlRBR0VfQ0hBTkdFOiBbXCJhcmdcIiwgXCJhcmdcIl0sXG4gIFJFTU9WRV9EVVBMSUNBVEVTOiBbXCJhcmdcIl0sXG4gIFJPVU5EOiBbXCJhcmdcIiwgXCJhcmc/XCJdLFxuICBTVU06IFtcImFyZ1wiLCBcImZpZWxkXCIsIFwiZnVuYyhmb3JtKT9cIl0sXG4gIFRPREFZOiBbXSxcbn07XG4iXX0=