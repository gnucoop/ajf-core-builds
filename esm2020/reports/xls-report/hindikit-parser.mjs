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
    return parseExpression(tokenize(formula).reverse(), 0 /* TokenType.END */).js;
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
    const vars = [];
    while (true) {
        // Expression.
        let tok = revToks.pop();
        let next;
        switch (tok.type) {
            case 19 /* TokenType.Indent */:
                next = revToks[revToks.length - 1];
                if (next.type === 1 /* TokenType.LParen */) {
                    const func = parseFunctionCall(tok.text, revToks);
                    js += func.js;
                    vars.push(...func.vars);
                }
                else if (next.type === 3 /* TokenType.LBracket */) {
                    consume(revToks, 3 /* TokenType.LBracket */);
                    const index = parseExpression(revToks, 4 /* TokenType.RBracket */);
                    consume(revToks, 4 /* TokenType.RBracket */);
                    js += `${tok.text}[${index.js}]`;
                    vars.push(tok.text, ...index.vars);
                }
                else {
                    js += tok.text;
                    vars.push(tok.text);
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
                const paren = parseExpression(revToks, 2 /* TokenType.RParen */);
                consume(revToks, 2 /* TokenType.RParen */);
                js += '(' + paren.js + ')';
                vars.push(...paren.vars);
                break;
            case 3 /* TokenType.LBracket */:
                const list = parseList(revToks, 4 /* TokenType.RBracket */);
                consume(revToks, 4 /* TokenType.RBracket */);
                js += '[' + list.js + ']';
                vars.push(...list.vars);
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
            return { js, vars };
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
    let js = '';
    const vars = [];
    let next = revToks[revToks.length - 1];
    if (next.type === 2 /* TokenType.RParen */ || next.type === 4 /* TokenType.RBracket */) {
        // empty list
        return { js, vars };
    }
    while (true) {
        const elem = parseExpression(revToks, expectedEnd);
        js += elem.js;
        vars.push(...elem.vars);
        next = revToks[revToks.length - 1];
        if (next.type === 2 /* TokenType.RParen */ || next.type === 4 /* TokenType.RBracket */) {
            return { js, vars };
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
    if (name === 'IF_THEN_ELSE') {
        consume(revToks, 1 /* TokenType.LParen */);
        const cond = parseExpression(revToks, 5 /* TokenType.Comma */);
        let js = '(' + cond.js + ' ? ';
        const vars = cond.vars;
        consume(revToks, 5 /* TokenType.Comma */);
        const then = parseExpression(revToks, 5 /* TokenType.Comma */);
        js += then.js + ' : ';
        vars.push(...then.vars);
        consume(revToks, 5 /* TokenType.Comma */);
        const otherwise = parseExpression(revToks, 5 /* TokenType.Comma */);
        js += otherwise.js + ')';
        vars.push(...otherwise.vars);
        consume(revToks, 2 /* TokenType.RParen */);
        return { js, vars };
    }
    throw new Error('unsupported function: ' + name);
}
/*
  Parses a function call expression.
  args tells how many arguments the function takes and their type.
  For example, the indicator function
    SUM(forms[0], $age, $gender = "male")
  can be parsed with
    parseFunctionWithArgs('SUM', revToks, ['arg', 'field', 'formula?'])
  resulting in the following JavaScript:
    SUM(forms[0], "age", "gender === \"male\"")
*/
function parseFunctionWithArgs(name, revToks, args) {
    consume(revToks, 1 /* TokenType.LParen */);
    let argsJs = '';
    const allVars = [];
    let formulaVars = [];
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
        const arg = argType === 'field' ?
            { js: consume(revToks, 20 /* TokenType.Name */).text.slice(1), vars: [] } :
            parseExpression(revToks, 5 /* TokenType.Comma */);
        argsJs += argType === 'field' || argType === 'formula' ? quote(arg.js) : arg.js;
        allVars.push(...arg.vars);
        if (argType === 'formula') {
            formulaVars.push(...arg.vars);
        }
    }
    consume(revToks, 2 /* TokenType.RParen */);
    if (formulaVars.length === 0) {
        return { js: `${name}(${argsJs})`, vars: allVars };
    }
    formulaVars = [...new Set(formulaVars)];
    return { js: `${name}.call({${formulaVars.join(', ')}}, ${argsJs})`, vars: allVars };
}
function quote(s) {
    if (typeof (s) !== 'string') {
        throw new Error('quote argument is not a string');
    }
    return JSON.stringify(s);
}
const functionArgs = {
    SUM: ["arg", "field", "formula?"],
    MEAN: ["arg", "field", "formula?"],
    MAX: ["arg", "field", "formula?"],
    MEDIAN: ["arg", "field", "formula?"],
    MODE: ["arg", "field", "formula?"],
    COUNT_FORMS: ["arg", "field"],
    COUNT_REPS: ["arg", "field"],
    COUNT_FORMS_UNIQUE: ["arg", "field", "formula?"],
    ALL_VALUES_OF: ["arg", "field"],
    PERCENT: ["arg", "arg"],
    LAST: ["arg", "field", "arg?"],
    REPEAT: ["arg", "arg", "arg", "formula", "formula?"],
    INCLUDES: ["arg", "arg"],
    FILTER_BY: ["arg", "formula"],
    APPLY: ["arg", "field", "formula"],
    GET_AGE: ["arg"],
    LEN: ["arg"],
    CONCAT: ["arg", "arg"],
    REMOVE_DUPLICATES: ["arg"],
    CONSOLE_LOG: ["arg"],
    JOIN_FORMS: ["arg", "arg", "field", "field?"],
    JOIN_REPEATING_SLIDES: ["arg", "arg", "field", "field", "field", "field?"],
    FROM_REPS: ["arg", "formula"],
    OP: ["arg", "arg", "formula"],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGluZGlraXQtcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9yZXBvcnRzL3NyYy94bHMtcmVwb3J0L2hpbmRpa2l0LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFtQ0gsMkNBQTJDO0FBQzNDLCtDQUErQztBQUMvQyxTQUFTLFVBQVUsQ0FBQyxDQUFTO0lBQzNCLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDbEIsT0FBTyxFQUFDLElBQUksdUJBQWUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUM7S0FDeEM7SUFDRCxJQUFJLENBQTBCLENBQUM7SUFDL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QixRQUFRLENBQUMsRUFBRTtRQUNULEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLDBCQUFrQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUM3QyxLQUFLLEdBQUc7WUFDTixPQUFPLEVBQUMsSUFBSSwwQkFBa0IsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDN0MsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksNEJBQW9CLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQy9DLEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLDRCQUFvQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUMvQyxLQUFLLEdBQUc7WUFDTixPQUFPLEVBQUMsSUFBSSx5QkFBaUIsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDNUMsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksd0JBQWdCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQzNDLEtBQUssR0FB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LEVBQUUsS0FBSyxDQUFDO0lBQ3pDLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQztJQUMzQyxLQUFLLEVBQUUsRUFBRTtDQUNWLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmNvbnN0IGVudW0gVG9rZW5UeXBlIHtcbiAgRU5ELFxuICBMUGFyZW4sXG4gIFJQYXJlbixcbiAgTEJyYWNrZXQsXG4gIFJCcmFja2V0LFxuICBDb21tYSxcblxuICAvLyBCaW5hcnkgb3BlcmF0b3JzIGZyb20gUGx1cyB0byBHcmVhdGVyT3JFcSBoYXZlIHRoZSBzYW1lIHJlcHJlc2VudGF0aW9uXG4gIC8vIGluIGluZGljYXRvciBmb3JtdWxhcyBhbmQgSmF2YVNjcmlwdCBhbmQgZG9uJ3QgbmVlZCBhIHRyYW5zbGF0aW9uLlxuICBQbHVzLFxuICBNaW51cyxcbiAgTXVsLFxuICBEaXYsXG4gIExlc3MsXG4gIExlc3NPckVxLFxuICBHcmVhdGVyLFxuICBHcmVhdGVyT3JFcSxcblxuICBFcXVhbCxcbiAgTm90RXF1YWwsXG4gIE5vdCxcbiAgU3RyaW5nLFxuICBOdW1iZXIsXG4gIEluZGVudCxcbiAgTmFtZSwgLy8gVGhlIG5hbWUgb2YgYSBmaWVsZDogYW4gaWRlbnRpZmllciBzdGFydGluZyB3aXRoICRcbn1cblxuaW50ZXJmYWNlIFRva2VuIHtcbiAgdHlwZTogVG9rZW5UeXBlO1xuICB0ZXh0OiBzdHJpbmc7XG59XG5cbi8vIGZpcnN0VG9rZW4gcmV0dXJucyB0aGUgZmlyc3QgdG9rZW4gaW4gcy5cbi8vIHMgbXVzdCBub3QgYmVnaW4gd2l0aCB3aGl0ZXNwYWNlIGNoYXJhY3RlcnMuXG5mdW5jdGlvbiBmaXJzdFRva2VuKHM6IHN0cmluZyk6IFRva2VuIHtcbiAgaWYgKHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuRU5ELCB0ZXh0OiAnJ307XG4gIH1cbiAgbGV0IG06IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsO1xuICBjb25zdCBjID0gcy5jaGFyQXQoMCk7XG4gIHN3aXRjaCAoYykge1xuICAgIGNhc2UgJygnOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTFBhcmVuLCB0ZXh0OiAnKCd9O1xuICAgIGNhc2UgJyknOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuUlBhcmVuLCB0ZXh0OiAnKSd9O1xuICAgIGNhc2UgJ1snOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTEJyYWNrZXQsIHRleHQ6ICdbJ307XG4gICAgY2FzZSAnXSc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5SQnJhY2tldCwgdGV4dDogJ10nfTtcbiAgICBjYXNlICcsJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkNvbW1hLCB0ZXh0OiAnLCd9O1xuICAgIGNhc2UgJysnOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuUGx1cywgdGV4dDogJysnfTtcbiAgICBjYXNlICctJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLk1pbnVzLCB0ZXh0OiAnLSd9O1xuICAgIGNhc2UgJyonOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTXVsLCB0ZXh0OiAnKid9O1xuICAgIGNhc2UgJy8nOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuRGl2LCB0ZXh0OiAnLyd9O1xuICAgIGNhc2UgJzwnOlxuICAgICAgaWYgKHMubGVuZ3RoID4gMSAmJiBzLmNoYXJBdCgxKSA9PT0gJz0nKSB7XG4gICAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkxlc3NPckVxLCB0ZXh0OiAnPD0nfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkxlc3MsIHRleHQ6ICc8J307XG4gICAgY2FzZSAnPic6XG4gICAgICBpZiAocy5sZW5ndGggPiAxICYmIHMuY2hhckF0KDEpID09PSAnPScpIHtcbiAgICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuR3JlYXRlck9yRXEsIHRleHQ6ICc+PSd9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuR3JlYXRlciwgdGV4dDogJz4nfTtcbiAgICBjYXNlICc9JzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLkVxdWFsLCB0ZXh0OiAnPSd9O1xuICAgIGNhc2UgJyEnOlxuICAgICAgaWYgKHMubGVuZ3RoID4gMSAmJiBzLmNoYXJBdCgxKSA9PT0gJz0nKSB7XG4gICAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLk5vdEVxdWFsLCB0ZXh0OiAnIT0nfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLk5vdCwgdGV4dDogJyEnfTtcbiAgICBjYXNlICckJzpcbiAgICAgIG0gPSBzLm1hdGNoKC9eXFwkW2EtekEtWl9dXFx3Ki8pO1xuICAgICAgaWYgKG0gPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGZpZWxkIG5hbWUgaW46ICcgKyBzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLk5hbWUsIHRleHQ6IG1bMF19O1xuICAgIGNhc2UgJ1wiJzpcbiAgICAgIG0gPSBzLm1hdGNoKC9eXCIoXFxcXFxcXFx8XFxcXFwifFteXCJdKSpcIi8pO1xuICAgICAgaWYgKG0gPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnRlcm1pbmF0ZWQgc3RyaW5nIGxpdGVyYWwgaW46ICcgKyBzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLlN0cmluZywgdGV4dDogbVswXX07XG4gICAgY2FzZSBcIidcIjpcbiAgICAgIG0gPSBzLm1hdGNoKC9eJyhcXFxcXFxcXHxcXFxcJ3xbXiddKSonLyk7XG4gICAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VudGVybWluYXRlZCBzdHJpbmcgbGl0ZXJhbCBpbjogJyArIHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuU3RyaW5nLCB0ZXh0OiBtWzBdfTtcbiAgfVxuICBpZiAoYyA+PSAnMCcgJiYgYyA8PSAnOScpIHtcbiAgICBtID0gcy5tYXRjaCgvXlxcZCsoXFwuXFxkKyk/KFtlRV1bXFwrXFwtXT9cXGQrKT8vKTtcbiAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbXBvc3NpYmxlJyk7XG4gICAgfVxuICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLk51bWJlciwgdGV4dDogbVswXX07XG4gIH1cbiAgbSA9IHMubWF0Y2goL15bYS16QS1aX11cXHcqLyk7XG4gIGlmIChtICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuSW5kZW50LCB0ZXh0OiBtWzBdfTtcbiAgfVxuICBpZiAocy5tYXRjaCgvXlxccy8pICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzdHJpbmcgcyBoYXMgYSBsZWFkaW5nIHdoaXRlc3BhY2UnKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCB0b2tlbiBpbjogJyArIHMpO1xufVxuXG5mdW5jdGlvbiB0b2tlbml6ZShzOiBzdHJpbmcpOiBUb2tlbltdIHtcbiAgY29uc3QgdG9rczogVG9rZW5bXSA9IFtdO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIHMgPSBzLnRyaW0oKTtcbiAgICBjb25zdCB0ID0gZmlyc3RUb2tlbihzKTtcbiAgICB0b2tzLnB1c2godCk7XG4gICAgaWYgKHQudHlwZSA9PT0gVG9rZW5UeXBlLkVORCkge1xuICAgICAgcmV0dXJuIHRva3M7XG4gICAgfVxuICAgIHMgPSBzLnNsaWNlKHQudGV4dC5sZW5ndGgpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmRpY2F0b3JUb0pzKGZvcm11bGE6IHN0cmluZyk6IHN0cmluZyB7XG4gIHN3aXRjaCAodHlwZW9mIGZvcm11bGEpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgaWYgKGZvcm11bGEuc3RhcnRzV2l0aCgnanM6JykpIHtcbiAgICAgICAgcmV0dXJuIGZvcm11bGEuc2xpY2UoMykudHJpbSgpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGZvcm11bGEgPSBTdHJpbmcoZm9ybXVsYSk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JtdWxhIGlzIG5vdCBhIHN0cmluZycpO1xuICB9XG4gIHJldHVybiBwYXJzZUV4cHJlc3Npb24odG9rZW5pemUoZm9ybXVsYSkucmV2ZXJzZSgpLCBUb2tlblR5cGUuRU5EKS5qcztcbn1cblxuZnVuY3Rpb24gdW5leHBlY3RlZFRva2VuRXJyb3IodG9rOiBUb2tlbiwgcmVzdDogVG9rZW5bXSk6IEVycm9yIHtcbiAgaWYgKHRvay50eXBlID09PSBUb2tlblR5cGUuRU5EKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcigndW5leHBlY3RlZCBlbmQgb2YgdG9rZW4gc3RyZWFtJyk7XG4gIH1cbiAgcmVzdC5wdXNoKHRvayk7XG4gIHJldHVybiBuZXcgRXJyb3IoJ3VuZXhwZWN0ZWQgdG9rZW4gYXQgdGhlIHN0YXJ0IG9mOiAnICsgcHJpbnRUb2tlbnMocmVzdCkpO1xufVxuXG5mdW5jdGlvbiBwcmludFRva2VucyhyZXZUb2tzOiBUb2tlbltdKSB7XG4gIGxldCBzID0gJyc7XG4gIHdoaWxlIChyZXZUb2tzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCB0b2sgPSByZXZUb2tzLnBvcCgpIGFzIFRva2VuO1xuICAgIGlmICh0b2sudHlwZSA+PSBUb2tlblR5cGUuUGx1cyAmJiB0b2sudHlwZSA8PSBUb2tlblR5cGUuTm90RXF1YWwpIHtcbiAgICAgIC8vIGJpbmFyeSBvcGVyYXRvcnNcbiAgICAgIHMgKz0gJyAnICsgdG9rLnRleHQgKyAnICc7XG4gICAgfSBlbHNlIGlmICh0b2sudHlwZSA9PT0gVG9rZW5UeXBlLkNvbW1hKSB7XG4gICAgICBzICs9ICcsICc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHMgKz0gdG9rLnRleHQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBzO1xufVxuXG5mdW5jdGlvbiBjb25zdW1lKHJldlRva3M6IFRva2VuW10sIGV4cGVjdGVkVHlwZTogVG9rZW5UeXBlKTogVG9rZW4ge1xuICBjb25zdCB0b2sgPSByZXZUb2tzLnBvcCgpIGFzIFRva2VuO1xuICBpZiAodG9rLnR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gIH1cbiAgcmV0dXJuIHRvaztcbn1cblxuaW50ZXJmYWNlIFBhcnNpbmdSZXN1bHQge1xuICBqczogc3RyaW5nO1xuICB2YXJzOiBzdHJpbmdbXTtcbn1cblxuLy8gcGFyc2VFeHByZXNzaW9uIHBhcnNlcyB0aGUgZmlyc3QgZXhwcmVzc2lvbiBpbiByZXZUb2tzXG4vLyBhbmQgcmV0dXJucyBpdHMgSmF2YVNjcmlwdC9hamYgdHJhbnNsYXRpb24uXG4vLyByZXZUb2tzIGlzIHJldmVyc2VkLCB0aGUgZmlyc3QgdG9rZW4gb2YgdGhlIGV4cHJlc3Npb24gYmVpbmcgYXQgaW5kZXggbGVuZ3RoLTE7XG4vLyB0aGlzIHdheSwgdG9rZW5zIGNhbiBiZSBjb25zdW1lZCBlZmZpY2llbnRseSB3aXRoIHJldlRva3MucG9wKCkuXG4vLyBBZnRlciB0aGUgZXhwcmVzc2lvbiwgdGhlIGZ1bmN0aW9uIGV4cGVjdHMgdG8gZmluZCB0aGUgdG9rZW4gZXhwZWN0ZWRFbmQuXG5mdW5jdGlvbiBwYXJzZUV4cHJlc3Npb24ocmV2VG9rczogVG9rZW5bXSwgZXhwZWN0ZWRFbmQ6IFRva2VuVHlwZSk6IFBhcnNpbmdSZXN1bHQge1xuICBpZiAoXG4gICAgZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5FTkQgJiZcbiAgICBleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLlJQYXJlbiAmJlxuICAgIGV4cGVjdGVkRW5kICE9PSBUb2tlblR5cGUuQ29tbWEgJiZcbiAgICBleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLlJCcmFja2V0XG4gICkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBleHBlY3RlZEVuZCcpO1xuICB9XG5cbiAgbGV0IGpzID0gJyc7XG4gIGNvbnN0IHZhcnM6IHN0cmluZ1tdID0gW107XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgLy8gRXhwcmVzc2lvbi5cbiAgICBsZXQgdG9rID0gcmV2VG9rcy5wb3AoKSBhcyBUb2tlbjtcbiAgICBsZXQgbmV4dDogVG9rZW47XG4gICAgc3dpdGNoICh0b2sudHlwZSkge1xuICAgICAgY2FzZSBUb2tlblR5cGUuSW5kZW50OlxuICAgICAgICBuZXh0ID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAobmV4dC50eXBlID09PSBUb2tlblR5cGUuTFBhcmVuKSB7XG4gICAgICAgICAgY29uc3QgZnVuYyA9IHBhcnNlRnVuY3Rpb25DYWxsKHRvay50ZXh0LCByZXZUb2tzKTtcbiAgICAgICAgICBqcyArPSBmdW5jLmpzO1xuICAgICAgICAgIHZhcnMucHVzaCguLi5mdW5jLnZhcnMpO1xuICAgICAgICB9IGVsc2UgaWYgKG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLkxCcmFja2V0KSB7XG4gICAgICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTEJyYWNrZXQpO1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5SQnJhY2tldCk7XG4gICAgICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUkJyYWNrZXQpO1xuICAgICAgICAgIGpzICs9IGAke3Rvay50ZXh0fVske2luZGV4LmpzfV1gO1xuICAgICAgICAgIHZhcnMucHVzaCh0b2sudGV4dCwgLi4uaW5kZXgudmFycyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAganMgKz0gdG9rLnRleHQ7XG4gICAgICAgICAgdmFycy5wdXNoKHRvay50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk5hbWU6XG4gICAgICAgIGpzICs9IHRvay50ZXh0LnNsaWNlKDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLlN0cmluZzpcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk51bWJlcjpcbiAgICAgICAganMgKz0gdG9rLnRleHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUb2tlblR5cGUuUGx1czpcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk1pbnVzOlxuICAgICAgICBuZXh0ID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAobmV4dC50eXBlID09PSBUb2tlblR5cGUuUGx1cyB8fCBuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5NaW51cykge1xuICAgICAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHJldlRva3MucG9wKCkgYXMgVG9rZW4sIHJldlRva3MpO1xuICAgICAgICB9XG4gICAgICAgIGpzICs9IHRvay50ZXh0O1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk5vdDpcbiAgICAgICAganMgKz0gJyEnO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLkxQYXJlbjpcbiAgICAgICAgY29uc3QgcGFyZW4gPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICAgIGpzICs9ICcoJyArIHBhcmVuLmpzICsgJyknO1xuICAgICAgICB2YXJzLnB1c2goLi4ucGFyZW4udmFycyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUb2tlblR5cGUuTEJyYWNrZXQ6XG4gICAgICAgIGNvbnN0IGxpc3QgPSBwYXJzZUxpc3QocmV2VG9rcywgVG9rZW5UeXBlLlJCcmFja2V0KTtcbiAgICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUkJyYWNrZXQpO1xuICAgICAgICBqcyArPSAnWycgKyBsaXN0LmpzICsgJ10nO1xuICAgICAgICB2YXJzLnB1c2goLi4ubGlzdC52YXJzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2ssIHJldlRva3MpO1xuICAgIH1cblxuICAgIC8vIFBvc3NpYmxlIGVuZCBvZiBleHByZXNzaW9uLiBleHBlY3RlZEVuZCBjYW4gYmU6XG4gICAgLy8gRU5ELFxuICAgIC8vIFJQYXJlbiBmb3IgZXhwcmVzc2lvbnMgYmV0d2VlbiBwYXJlbnRoZXNlcyxcbiAgICAvLyBDb21tYSBmb3IgZnVuY3Rpb24gYXJndW1lbnRzLCBpbiB3aGljaCBjYXNlIHdlIGFsc28gYWNjZXB0IFJQYXJlbixcbiAgICAvLyBSQnJhY2tldCBmb3IgYXJyYXkgZWxlbWVudHMsICBpbiB3aGljaCBjYXNlIHdlIGFsc28gYWNjZXB0IENvbW1hLlxuICAgIC8vIE5vdGUgdGhhdCB3ZSBkb24ndCBjb25zdW1lIHRoZSBlbmQgdG9rZW4uXG4gICAgY29uc3QgdHlwZSA9IHJldlRva3NbcmV2VG9rcy5sZW5ndGggLSAxXS50eXBlO1xuICAgIGlmIChcbiAgICAgIHR5cGUgPT09IGV4cGVjdGVkRW5kIHx8XG4gICAgICAoZXhwZWN0ZWRFbmQgPT09IFRva2VuVHlwZS5Db21tYSAmJiB0eXBlID09PSBUb2tlblR5cGUuUlBhcmVuKSB8fFxuICAgICAgKGV4cGVjdGVkRW5kID09PSBUb2tlblR5cGUuUkJyYWNrZXQgJiYgdHlwZSA9PT0gVG9rZW5UeXBlLkNvbW1hKVxuICAgICkge1xuICAgICAgcmV0dXJuIHtqcywgdmFyc307XG4gICAgfVxuXG4gICAgLy8gT3BlcmF0b3IuXG4gICAgdG9rID0gcmV2VG9rcy5wb3AoKSBhcyBUb2tlbjtcbiAgICBpZiAodG9rLnR5cGUgPj0gVG9rZW5UeXBlLlBsdXMgJiYgdG9rLnR5cGUgPD0gVG9rZW5UeXBlLkdyZWF0ZXJPckVxKSB7XG4gICAgICBqcyArPSAnICcgKyB0b2sudGV4dCArICcgJztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRvay50eXBlKSB7XG4gICAgICBjYXNlIFRva2VuVHlwZS5JbmRlbnQ6XG4gICAgICAgIGlmICh0b2sudGV4dCA9PT0gJ0FORCcpIHtcbiAgICAgICAgICBqcyArPSAnICYmICc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRvay50ZXh0ID09PSAnT1InKSB7XG4gICAgICAgICAganMgKz0gJyB8fCAnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gICAgICBjYXNlIFRva2VuVHlwZS5FcXVhbDpcbiAgICAgICAganMgKz0gJyA9PT0gJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRva2VuVHlwZS5Ob3RFcXVhbDpcbiAgICAgICAganMgKz0gJyAhPT0gJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2ssIHJldlRva3MpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBwYXJzZUxpc3QgcGFyc2VzIGEgY29tbWEtc2VwYXJhdGVkIGxpc3Qgb2YgZXhwcmVzc2lvbnMuXG4vLyBleHBlY3RlZEVuZCBpcyBDb21tYSBmb3IgZnVuY3Rpb24gYXJndW1lbnRzIGFuZCBSQnJhY2tldCBmb3IgYXJyYXlzLFxuLy8gYWNjb3JkaW5nIHRvIHRoZSBiZWhhdmlvciBvZiBwYXJzZUV4cHJlc3Npb24uXG5mdW5jdGlvbiBwYXJzZUxpc3QocmV2VG9rczogVG9rZW5bXSwgZXhwZWN0ZWRFbmQ6IFRva2VuVHlwZSk6IFBhcnNpbmdSZXN1bHQge1xuICBpZiAoZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5Db21tYSAmJiBleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLlJCcmFja2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGV4cGVjdGVkRW5kJyk7XG4gIH1cbiAgbGV0IGpzID0gJyc7XG4gIGNvbnN0IHZhcnM6IHN0cmluZ1tdID0gW107XG4gIGxldCBuZXh0ID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdO1xuICBpZiAobmV4dC50eXBlID09PSBUb2tlblR5cGUuUlBhcmVuIHx8IG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLlJCcmFja2V0KSB7XG4gICAgLy8gZW1wdHkgbGlzdFxuICAgIHJldHVybiB7anMsIHZhcnN9O1xuICB9XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgY29uc3QgZWxlbSA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBleHBlY3RlZEVuZCk7XG4gICAganMgKz0gZWxlbS5qcztcbiAgICB2YXJzLnB1c2goLi4uZWxlbS52YXJzKTtcbiAgICBuZXh0ID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdO1xuICAgIGlmIChuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5SUGFyZW4gfHwgbmV4dC50eXBlID09PSBUb2tlblR5cGUuUkJyYWNrZXQpIHtcbiAgICAgIHJldHVybiB7anMsIHZhcnN9O1xuICAgIH1cbiAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAganMgKz0gJywgJztcbiAgfVxufVxuXG4vLyBwYXJzZUZ1bmN0aW9uQ2FsbCBwYXJzZXMgYSBmdW5jdGlvbiBjYWxsIGV4cHJlc3Npb24uXG4vLyBUaGUgbGlzdCBvZiBzdXBwb3J0ZWQgZnVuY3Rpb25zIGlzIGluXG4vLyAgIHByb2plY3RzL2NvcmUvbW9kZWxzL3V0aWxzL2V4cHJlc3Npb24tdXRpbHMudHNcbi8vIFRoZSBmdW5jdGlvbiBuYW1lIGhhcyBhbHJlYWR5IGJlZW4gc2Nhbm5lZC5cbmZ1bmN0aW9uIHBhcnNlRnVuY3Rpb25DYWxsKG5hbWU6IHN0cmluZywgcmV2VG9rczogVG9rZW5bXSk6IFBhcnNpbmdSZXN1bHQge1xuICBjb25zdCBhcmdzID0gZnVuY3Rpb25BcmdzW25hbWVdO1xuICBpZiAoYXJncykge1xuICAgIHJldHVybiBwYXJzZUZ1bmN0aW9uV2l0aEFyZ3MobmFtZSwgcmV2VG9rcywgYXJncyk7XG4gIH1cbiAgaWYgKG5hbWUgPT09ICdJRl9USEVOX0VMU0UnKSB7XG4gICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTFBhcmVuKTtcbiAgICBjb25zdCBjb25kID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgbGV0IGpzID0gJygnICsgY29uZC5qcyArICcgPyAnO1xuICAgIGNvbnN0IHZhcnMgPSBjb25kLnZhcnM7XG4gICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgIGNvbnN0IHRoZW4gPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICBqcyArPSB0aGVuLmpzICsgJyA6ICc7XG4gICAgdmFycy5wdXNoKC4uLnRoZW4udmFycyk7XG4gICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgIGNvbnN0IG90aGVyd2lzZSA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgIGpzICs9IG90aGVyd2lzZS5qcyArICcpJztcbiAgICB2YXJzLnB1c2goLi4ub3RoZXJ3aXNlLnZhcnMpO1xuICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgcmV0dXJuIHtqcywgdmFyc307XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBmdW5jdGlvbjogJyArIG5hbWUpO1xufVxuXG4vKlxuICBQYXJzZXMgYSBmdW5jdGlvbiBjYWxsIGV4cHJlc3Npb24uXG4gIGFyZ3MgdGVsbHMgaG93IG1hbnkgYXJndW1lbnRzIHRoZSBmdW5jdGlvbiB0YWtlcyBhbmQgdGhlaXIgdHlwZS5cbiAgRm9yIGV4YW1wbGUsIHRoZSBpbmRpY2F0b3IgZnVuY3Rpb25cbiAgICBTVU0oZm9ybXNbMF0sICRhZ2UsICRnZW5kZXIgPSBcIm1hbGVcIilcbiAgY2FuIGJlIHBhcnNlZCB3aXRoXG4gICAgcGFyc2VGdW5jdGlvbldpdGhBcmdzKCdTVU0nLCByZXZUb2tzLCBbJ2FyZycsICdmaWVsZCcsICdmb3JtdWxhPyddKVxuICByZXN1bHRpbmcgaW4gdGhlIGZvbGxvd2luZyBKYXZhU2NyaXB0OlxuICAgIFNVTShmb3Jtc1swXSwgXCJhZ2VcIiwgXCJnZW5kZXIgPT09IFxcXCJtYWxlXFxcIlwiKVxuKi9cbmZ1bmN0aW9uIHBhcnNlRnVuY3Rpb25XaXRoQXJncyhuYW1lOiBzdHJpbmcsIHJldlRva3M6IFRva2VuW10sIGFyZ3M6IHN0cmluZ1tdKTogUGFyc2luZ1Jlc3VsdCB7XG4gIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkxQYXJlbik7XG4gIGxldCBhcmdzSnMgPSAnJztcbiAgY29uc3QgYWxsVmFyczogc3RyaW5nW10gPSBbXTtcbiAgbGV0IGZvcm11bGFWYXJzOiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgYXJnVHlwZSA9IGFyZ3NbaV07XG4gICAgaWYgKGFyZ1R5cGUuZW5kc1dpdGgoJz8nKSAmJiByZXZUb2tzW3JldlRva3MubGVuZ3RoLTFdLnR5cGUgPT09IFRva2VuVHlwZS5SUGFyZW4pIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoYXJnVHlwZS5lbmRzV2l0aCgnPycpKSB7XG4gICAgICBhcmdUeXBlID0gYXJnVHlwZS5zbGljZSgwLCAtMSk7XG4gICAgfVxuICAgIGlmIChpICE9PSAwKSB7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBhcmdzSnMgKz0gJywgJztcbiAgICB9XG4gICAgY29uc3QgYXJnID0gYXJnVHlwZSA9PT0gJ2ZpZWxkJyA/XG4gICAgICB7anM6IGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLk5hbWUpLnRleHQuc2xpY2UoMSksIHZhcnM6IFtdfSA6XG4gICAgICBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICBhcmdzSnMgKz0gYXJnVHlwZSA9PT0gJ2ZpZWxkJyB8fCBhcmdUeXBlID09PSAnZm9ybXVsYScgPyBxdW90ZShhcmcuanMpIDogYXJnLmpzO1xuICAgIGFsbFZhcnMucHVzaCguLi5hcmcudmFycyk7XG4gICAgaWYgKGFyZ1R5cGUgPT09ICdmb3JtdWxhJykge1xuICAgICAgZm9ybXVsYVZhcnMucHVzaCguLi5hcmcudmFycyk7XG4gICAgfVxuICB9XG4gIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG5cbiAgaWYgKGZvcm11bGFWYXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB7anM6IGAke25hbWV9KCR7YXJnc0pzfSlgLCB2YXJzOiBhbGxWYXJzfTtcbiAgfVxuICBmb3JtdWxhVmFycyA9IFsuLi5uZXcgU2V0KGZvcm11bGFWYXJzKV07XG4gIHJldHVybiB7anM6IGAke25hbWV9LmNhbGwoeyR7Zm9ybXVsYVZhcnMuam9pbignLCAnKX19LCAke2FyZ3NKc30pYCwgdmFyczogYWxsVmFyc307XG59XG5cbmZ1bmN0aW9uIHF1b3RlKHM6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmICh0eXBlb2YocykgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdxdW90ZSBhcmd1bWVudCBpcyBub3QgYSBzdHJpbmcnKTtcbiAgfVxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocyk7XG59XG5cbmNvbnN0IGZ1bmN0aW9uQXJnczoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmdbXX0gPSB7XG4gIFNVTTogW1wiYXJnXCIsIFwiZmllbGRcIiwgXCJmb3JtdWxhP1wiXSxcbiAgTUVBTjogW1wiYXJnXCIsIFwiZmllbGRcIiwgXCJmb3JtdWxhP1wiXSxcbiAgTUFYOiBbXCJhcmdcIiwgXCJmaWVsZFwiLCBcImZvcm11bGE/XCJdLFxuICBNRURJQU46IFtcImFyZ1wiLCBcImZpZWxkXCIsIFwiZm9ybXVsYT9cIl0sXG4gIE1PREU6IFtcImFyZ1wiLCBcImZpZWxkXCIsIFwiZm9ybXVsYT9cIl0sXG4gIENPVU5UX0ZPUk1TOiBbXCJhcmdcIiwgXCJmaWVsZFwiXSxcbiAgQ09VTlRfUkVQUzogW1wiYXJnXCIsIFwiZmllbGRcIl0sXG4gIENPVU5UX0ZPUk1TX1VOSVFVRTogW1wiYXJnXCIsIFwiZmllbGRcIiwgXCJmb3JtdWxhP1wiXSxcbiAgQUxMX1ZBTFVFU19PRjogW1wiYXJnXCIsIFwiZmllbGRcIl0sXG4gIFBFUkNFTlQ6IFtcImFyZ1wiLCBcImFyZ1wiXSxcbiAgTEFTVDogW1wiYXJnXCIsIFwiZmllbGRcIiwgXCJhcmc/XCJdLFxuICBSRVBFQVQ6IFtcImFyZ1wiLCBcImFyZ1wiLCBcImFyZ1wiLCBcImZvcm11bGFcIiwgXCJmb3JtdWxhP1wiXSxcbiAgSU5DTFVERVM6IFtcImFyZ1wiLCBcImFyZ1wiXSxcbiAgRklMVEVSX0JZOiBbXCJhcmdcIiwgXCJmb3JtdWxhXCJdLFxuICBBUFBMWTogW1wiYXJnXCIsIFwiZmllbGRcIiwgXCJmb3JtdWxhXCJdLFxuICBHRVRfQUdFOiBbXCJhcmdcIl0sXG4gIExFTjogW1wiYXJnXCJdLFxuICBDT05DQVQ6IFtcImFyZ1wiLCBcImFyZ1wiXSxcbiAgUkVNT1ZFX0RVUExJQ0FURVM6IFtcImFyZ1wiXSxcbiAgQ09OU09MRV9MT0c6IFtcImFyZ1wiXSxcbiAgSk9JTl9GT1JNUzogW1wiYXJnXCIsIFwiYXJnXCIsIFwiZmllbGRcIiwgXCJmaWVsZD9cIl0sXG4gIEpPSU5fUkVQRUFUSU5HX1NMSURFUzogW1wiYXJnXCIsIFwiYXJnXCIsIFwiZmllbGRcIiwgXCJmaWVsZFwiLCBcImZpZWxkXCIsIFwiZmllbGQ/XCJdLFxuICBGUk9NX1JFUFM6IFtcImFyZ1wiLCBcImZvcm11bGFcIl0sXG4gIE9QOiBbXCJhcmdcIiwgXCJhcmdcIiwgXCJmb3JtdWxhXCJdLFxuICBHRVRfTEFCRUxTOiBbXCJhcmdcIiwgXCJhcmdcIl0sXG4gIEFQUExZX0xBQkVMUzogW1wiYXJnXCIsIFwiYXJnXCIsIFwiYXJnXCJdLFxuICBCVUlMRF9EQVRBU0VUOiBbXCJhcmdcIiwgXCJhcmc/XCJdLFxuICBST1VORDogW1wiYXJnXCJdLFxuICBJU19CRUZPUkU6IFtcImFyZ1wiLCBcImFyZ1wiXSxcbiAgSVNfQUZURVI6IFtcImFyZ1wiLCBcImFyZ1wiXSxcbiAgSVNfV0lUSElOX0lOVEVSVkFMOiBbXCJhcmdcIiwgXCJhcmdcIiwgXCJhcmdcIl0sXG4gIENPTVBBUkVfREFURTogW1wiYXJnXCIsIFwiYXJnXCIsIFwiYXJnXCIsIFwiYXJnP1wiXSxcbiAgVE9EQVk6IFtdLFxufTtcbiJdfQ==