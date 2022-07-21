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
    switch (typeof (formula)) {
        case 'string':
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
    'SUM': [false, true, true],
    'MEAN': [false, true, true],
    'MAX': [false, true, true],
    'MEDIAN': [false, true, true],
    'MODE': [false, true, true],
    'COUNT_FORMS': [false, true],
    'COUNT_REPS': [false, true],
    'COUNT_FORMS_UNIQUE': [false, true, true],
    'ALL_VALUES_OF': [false, true],
    'PERCENT': [false, false],
    'LAST': [false, true, false],
    'REPEAT': [false, false, false, true, true],
    'EVALUATE': [false, false, false],
    'FILTER_BY': [false, true],
    'APPLY': [false, true, true],
    'GET_AGE': [false, false],
    'LEN': [false, false],
    'CONSOLE_LOG': [false, false],
    'JOIN_FORMS': [false, false, true, true],
    'JOIN_REPEATING_SLIDES': [false, false, true, true, true, true],
    'FROM_REPS': [false, false],
    'ISIN': [false, false],
    'OP': [false, false, true],
    'GET_LABELS': [false, false],
    'BUILD_DATASET': [false, false],
    'ROUND': [false, false],
    'IS_BEFORE': [false, false],
    'IS_AFTER': [false, false],
    'IS_WITHIN_INTERVAL': [false, false, false],
    'COMPARE_DATE': [false, false, false, false],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGluZGlraXQtcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9yZXBvcnRzL3NyYy94bHMtcmVwb3J0L2hpbmRpa2l0LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFtQ0gsMkNBQTJDO0FBQzNDLCtDQUErQztBQUMvQyxTQUFTLFVBQVUsQ0FBQyxDQUFTO0lBQzNCLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDbEIsT0FBTyxFQUFDLElBQUksYUFBZSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQztLQUN4QztJQUNELElBQUksQ0FBMEIsQ0FBQztJQUMvQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RCLFFBQVEsQ0FBQyxFQUFFO1FBQ1QsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksZ0JBQWtCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQzdDLEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLGdCQUFrQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUM3QyxLQUFLLEdBQUc7WUFDTixPQUFPLEVBQUMsSUFBSSxrQkFBb0IsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDL0MsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksa0JBQW9CLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQy9DLEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLGVBQWlCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQzVDLEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLGNBQWdCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQzNDLEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLGVBQWlCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQzVDLEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLGFBQWUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDMUMsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksYUFBZSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUMxQyxLQUFLLEdBQUc7WUFDTixJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO2dCQUN2QyxPQUFPLEVBQUMsSUFBSSxtQkFBb0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUM7YUFDL0M7WUFDRCxPQUFPLEVBQUMsSUFBSSxlQUFnQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUMzQyxLQUFLLEdBQUc7WUFDTixJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO2dCQUN2QyxPQUFPLEVBQUMsSUFBSSxzQkFBdUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUM7YUFDbEQ7WUFDRCxPQUFPLEVBQUMsSUFBSSxrQkFBbUIsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDOUMsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksZ0JBQWlCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQzVDLEtBQUssR0FBRztZQUNOLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7Z0JBQ3ZDLE9BQU8sRUFBQyxJQUFJLG1CQUFvQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQzthQUMvQztZQUNELE9BQU8sRUFBQyxJQUFJLGNBQWUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDMUMsS0FBSyxHQUFHO1lBQ04sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNoRDtZQUNELE9BQU8sRUFBQyxJQUFJLGVBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1FBQzVDLEtBQUssR0FBRztZQUNOLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDekQ7WUFDRCxPQUFPLEVBQUMsSUFBSSxpQkFBa0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7UUFDOUMsS0FBSyxHQUFHO1lBQ04sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN6RDtZQUNELE9BQU8sRUFBQyxJQUFJLGlCQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztLQUMvQztJQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFO1FBQ3hCLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMvQjtRQUNELE9BQU8sRUFBQyxJQUFJLGlCQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztLQUM3QztJQUNELENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdCLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNkLE9BQU8sRUFBQyxJQUFJLGlCQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztLQUM3QztJQUNELElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0tBQ3REO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsU0FBUyxRQUFRLENBQUMsQ0FBUztJQUN6QixNQUFNLElBQUksR0FBWSxFQUFFLENBQUM7SUFDekIsT0FBTyxJQUFJLEVBQUU7UUFDWCxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2IsTUFBTSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsQ0FBQyxJQUFJLGdCQUFrQixFQUFFO1lBQzVCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzVCO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxhQUFhLENBQUMsT0FBZTtJQUMzQyxRQUFRLE9BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN2QixLQUFLLFFBQVE7WUFDWCxNQUFNO1FBQ1IsS0FBSyxRQUFRLENBQUM7UUFDZCxLQUFLLFNBQVM7WUFDWixPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLE1BQU07UUFDUjtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztLQUM5QztJQUNELE9BQU8sZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsY0FBZ0IsQ0FBQztBQUNyRSxDQUFDO0FBRUQsU0FBUyxvQkFBb0IsQ0FBQyxHQUFVLEVBQUUsSUFBYTtJQUNyRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLGdCQUFrQixFQUFFO1FBQzlCLE9BQU8sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztLQUNwRDtJQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZixPQUFPLElBQUksS0FBSyxDQUFDLG9DQUFvQyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzdFLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxPQUFnQjtJQUNuQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDWCxPQUFPLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3pCLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQVcsQ0FBQztRQUNuQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLGdCQUFrQixJQUFJLEdBQUcsQ0FBQyxJQUFJLHFCQUFzQixFQUFFO1lBQ2hFLG1CQUFtQjtZQUNuQixDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1NBQzNCO2FBQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxrQkFBb0IsRUFBRTtZQUN2QyxDQUFDLElBQUksSUFBSSxDQUFDO1NBQ1g7YUFBTTtZQUNMLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQ2Y7S0FDRjtJQUNELE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQUVELFNBQVMsT0FBTyxDQUFDLE9BQWdCLEVBQUUsWUFBdUI7SUFDeEQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBVyxDQUFDO0lBQ25DLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUU7UUFDN0IsTUFBTSxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDMUM7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRCx5REFBeUQ7QUFDekQsOENBQThDO0FBQzlDLGtGQUFrRjtBQUNsRixtRUFBbUU7QUFDbkUsNEVBQTRFO0FBQzVFLFNBQVMsZUFBZSxDQUFDLE9BQWdCLEVBQUUsV0FBc0I7SUFDL0QsSUFDRSxXQUFXLGdCQUFrQjtRQUM3QixXQUFXLG1CQUFxQjtRQUNoQyxXQUFXLGtCQUFvQjtRQUMvQixXQUFXLHFCQUF1QixFQUNsQztRQUNBLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztLQUN4QztJQUVELElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNaLE9BQU8sSUFBSSxFQUFFO1FBQ1gsY0FBYztRQUNkLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQVcsQ0FBQztRQUNqQyxJQUFJLElBQVcsQ0FBQztRQUNoQixRQUFRLEdBQUcsQ0FBQyxJQUFJLEVBQUU7WUFDaEI7Z0JBQ0UsSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLElBQUksQ0FBQyxJQUFJLG1CQUFxQixFQUFFO29CQUNsQyxFQUFFLElBQUksaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDNUM7cUJBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxxQkFBdUIsRUFBRTtvQkFDM0MsT0FBTyxDQUFDLE9BQU8sbUJBQXFCLENBQUM7b0JBQ3JDLE1BQU0sS0FBSyxHQUFHLGVBQWUsQ0FBQyxPQUFPLG1CQUFxQixDQUFDO29CQUMzRCxPQUFPLENBQUMsT0FBTyxtQkFBcUIsQ0FBQztvQkFDckMsRUFBRSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQztpQkFDL0I7cUJBQU07b0JBQ0wsRUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUM7aUJBQ2hCO2dCQUNELE1BQU07WUFDUjtnQkFDRSxFQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU07WUFDUixxQkFBc0I7WUFDdEI7Z0JBQ0UsRUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsTUFBTTtZQUNSLGtCQUFvQjtZQUNwQjtnQkFDRSxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLElBQUksSUFBSSxDQUFDLElBQUksaUJBQW1CLElBQUksSUFBSSxDQUFDLElBQUksa0JBQW9CLEVBQUU7b0JBQ2pFLE1BQU0sb0JBQW9CLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUM3RDtnQkFDRCxFQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDZixTQUFTO1lBQ1g7Z0JBQ0UsRUFBRSxJQUFJLEdBQUcsQ0FBQztnQkFDVixTQUFTO1lBQ1g7Z0JBQ0UsRUFBRSxJQUFJLEdBQUcsR0FBRyxlQUFlLENBQUMsT0FBTyxpQkFBbUIsR0FBRyxHQUFHLENBQUM7Z0JBQzdELE9BQU8sQ0FBQyxPQUFPLGlCQUFtQixDQUFDO2dCQUNuQyxNQUFNO1lBQ1I7Z0JBQ0UsRUFBRSxJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsT0FBTyxtQkFBcUIsR0FBRyxHQUFHLENBQUM7Z0JBQ3pELE9BQU8sQ0FBQyxPQUFPLG1CQUFxQixDQUFDO2dCQUNyQyxNQUFNO1lBQ1I7Z0JBQ0UsTUFBTSxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDNUM7UUFFRCxrREFBa0Q7UUFDbEQsT0FBTztRQUNQLDhDQUE4QztRQUM5QyxxRUFBcUU7UUFDckUsb0VBQW9FO1FBQ3BFLDRDQUE0QztRQUM1QyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDOUMsSUFDRSxJQUFJLEtBQUssV0FBVztZQUNwQixDQUFDLFdBQVcsa0JBQW9CLElBQUksSUFBSSxtQkFBcUIsQ0FBQztZQUM5RCxDQUFDLFdBQVcscUJBQXVCLElBQUksSUFBSSxrQkFBb0IsQ0FBQyxFQUNoRTtZQUNBLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxZQUFZO1FBQ1osR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQVcsQ0FBQztRQUM3QixJQUFJLEdBQUcsQ0FBQyxJQUFJLGdCQUFrQixJQUFJLEdBQUcsQ0FBQyxJQUFJLHdCQUF5QixFQUFFO1lBQ25FLEVBQUUsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7WUFDM0IsU0FBUztTQUNWO1FBQ0QsUUFBUSxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ2hCO2dCQUNFLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7b0JBQ3RCLEVBQUUsSUFBSSxNQUFNLENBQUM7b0JBQ2IsTUFBTTtpQkFDUDtnQkFDRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO29CQUNyQixFQUFFLElBQUksTUFBTSxDQUFDO29CQUNiLE1BQU07aUJBQ1A7Z0JBQ0QsTUFBTSxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDM0M7Z0JBQ0UsRUFBRSxJQUFJLE9BQU8sQ0FBQztnQkFDZCxNQUFNO1lBQ1I7Z0JBQ0UsRUFBRSxJQUFJLE9BQU8sQ0FBQztnQkFDZCxNQUFNO1lBQ1I7Z0JBQ0UsTUFBTSxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDNUM7S0FDRjtBQUNILENBQUM7QUFFRCwwREFBMEQ7QUFDMUQsdUVBQXVFO0FBQ3ZFLGdEQUFnRDtBQUNoRCxTQUFTLFNBQVMsQ0FBQyxPQUFnQixFQUFFLFdBQXNCO0lBQ3pELElBQUksV0FBVyxrQkFBb0IsSUFBSSxXQUFXLHFCQUF1QixFQUFFO1FBQ3pFLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztLQUN4QztJQUNELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLElBQUksSUFBSSxDQUFDLElBQUksbUJBQXFCLElBQUksSUFBSSxDQUFDLElBQUkscUJBQXVCLEVBQUU7UUFDdEUsYUFBYTtRQUNiLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDWixPQUFPLElBQUksRUFBRTtRQUNYLEVBQUUsSUFBSSxlQUFlLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzVDLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuQyxJQUFJLElBQUksQ0FBQyxJQUFJLG1CQUFxQixJQUFJLElBQUksQ0FBQyxJQUFJLHFCQUF1QixFQUFFO1lBQ3RFLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxPQUFPLENBQUMsT0FBTyxnQkFBa0IsQ0FBQztRQUNsQyxFQUFFLElBQUksSUFBSSxDQUFDO0tBQ1o7QUFDSCxDQUFDO0FBRUQsdURBQXVEO0FBQ3ZELHdDQUF3QztBQUN4QyxtREFBbUQ7QUFDbkQsOENBQThDO0FBQzlDLFNBQVMsaUJBQWlCLENBQUMsSUFBWSxFQUFFLE9BQWdCO0lBQ3ZELE1BQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxJQUFJLE1BQU0sRUFBRTtRQUNWLE9BQU8sdUJBQXVCLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDO0tBQzFEO0lBQ0QsUUFBUSxJQUFJLEVBQUU7UUFDWixLQUFLLFVBQVU7WUFDYixPQUFPLENBQUMsT0FBTyxpQkFBbUIsQ0FBQztZQUNuQyxJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsZUFBZSxDQUFDLE9BQU8sZ0JBQWtCLEdBQUcsYUFBYSxDQUFDO1lBQ3pFLE9BQU8sQ0FBQyxPQUFPLGdCQUFrQixDQUFDO1lBQ2xDLEVBQUUsSUFBSSxlQUFlLENBQUMsT0FBTyxnQkFBa0IsR0FBRyxHQUFHLENBQUM7WUFDdEQsT0FBTyxDQUFDLE9BQU8saUJBQW1CLENBQUM7WUFDbkMsT0FBTyxFQUFFLENBQUM7UUFDWixLQUFLLE9BQU87WUFDVixPQUFPLENBQUMsT0FBTyxpQkFBbUIsQ0FBQztZQUNuQyxPQUFPLENBQUMsT0FBTyxpQkFBbUIsQ0FBQztZQUNuQyxPQUFPLFNBQVMsQ0FBQztRQUNuQjtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDcEQ7QUFDSCxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7O0VBV0U7QUFDRixTQUFTLHVCQUF1QixDQUFDLElBQVksRUFBRSxPQUFnQixFQUFFLEdBQUcsZUFBMEI7SUFDNUYsSUFBSSxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLCtEQUErRCxDQUFDLENBQUM7S0FDbEY7SUFDRCxPQUFPLENBQUMsT0FBTyxpQkFBbUIsQ0FBQztJQUNuQyxJQUFJLEVBQUUsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQ3BCLE1BQU0sVUFBVSxHQUFHLGVBQWUsQ0FBQyxPQUFPLGdCQUFrQixDQUFDO0lBQzdELEVBQUUsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztJQUM1RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbkQsT0FBTyxDQUFDLE9BQU8sZ0JBQWtCLENBQUM7UUFDbEMsTUFBTSxLQUFLLEdBQUcsZUFBZSxDQUFDLE9BQU8sZ0JBQWtCLENBQUM7UUFDeEQsRUFBRSxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQztLQUM1RDtJQUNELDRCQUE0QjtJQUM1QixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFXLENBQUM7SUFDbkMsUUFBUSxHQUFHLENBQUMsSUFBSSxFQUFFO1FBQ2hCO1lBQ0UsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ2xCO1lBQ0UsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDLE9BQU8sZ0JBQWtCLENBQUM7WUFDNUQsT0FBTyxDQUFDLE9BQU8saUJBQW1CLENBQUM7WUFDbkMsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDOUQsT0FBTyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sU0FBUyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxHQUFHLENBQUMsQ0FBQztRQUN0RTtZQUNFLE1BQU0sb0JBQW9CLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzVDO0FBQ0gsQ0FBQztBQUVELE1BQU0sY0FBYyxHQUFnQztJQUNsRCxLQUFLLEVBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztJQUNwQyxNQUFNLEVBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztJQUNwQyxLQUFLLEVBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztJQUNwQyxRQUFRLEVBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztJQUNwQyxNQUFNLEVBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztJQUNwQyxhQUFhLEVBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO0lBQzlCLFlBQVksRUFBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7SUFDOUIsb0JBQW9CLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztJQUN6QyxlQUFlLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO0lBQzlCLFNBQVMsRUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7SUFDL0IsTUFBTSxFQUFXLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUM7SUFDckMsUUFBUSxFQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztJQUNsRCxVQUFVLEVBQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUN0QyxXQUFXLEVBQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO0lBQzlCLE9BQU8sRUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO0lBQ3BDLFNBQVMsRUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7SUFDL0IsS0FBSyxFQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUMvQixhQUFhLEVBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO0lBQy9CLFlBQVksRUFBSyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztJQUMzQyx1QkFBdUIsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO0lBQy9ELFdBQVcsRUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7SUFDL0IsTUFBTSxFQUFXLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUMvQixJQUFJLEVBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQztJQUNyQyxZQUFZLEVBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO0lBQy9CLGVBQWUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7SUFDL0IsT0FBTyxFQUFVLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUMvQixXQUFXLEVBQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO0lBQy9CLFVBQVUsRUFBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7SUFDL0Isb0JBQW9CLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUMzQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7Q0FDN0MsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuY29uc3QgZW51bSBUb2tlblR5cGUge1xuICBFTkQsXG4gIExQYXJlbixcbiAgUlBhcmVuLFxuICBMQnJhY2tldCxcbiAgUkJyYWNrZXQsXG4gIENvbW1hLFxuXG4gIC8vIEJpbmFyeSBvcGVyYXRvcnMgZnJvbSBQbHVzIHRvIEdyZWF0ZXJPckVxIGhhdmUgdGhlIHNhbWUgcmVwcmVzZW50YXRpb25cbiAgLy8gaW4gaW5kaWNhdG9yIGZvcm11bGFzIGFuZCBKYXZhU2NyaXB0IGFuZCBkb24ndCBuZWVkIGEgdHJhbnNsYXRpb24uXG4gIFBsdXMsXG4gIE1pbnVzLFxuICBNdWwsXG4gIERpdixcbiAgTGVzcyxcbiAgTGVzc09yRXEsXG4gIEdyZWF0ZXIsXG4gIEdyZWF0ZXJPckVxLFxuXG4gIEVxdWFsLFxuICBOb3RFcXVhbCxcbiAgTm90LFxuICBTdHJpbmcsXG4gIE51bWJlcixcbiAgSW5kZW50LFxuICBOYW1lLCAvLyBUaGUgbmFtZSBvZiBhIGZpZWxkOiBhbiBpZGVudGlmaWVyIHN0YXJ0aW5nIHdpdGggJFxufVxuXG5pbnRlcmZhY2UgVG9rZW4ge1xuICB0eXBlOiBUb2tlblR5cGU7XG4gIHRleHQ6IHN0cmluZztcbn1cblxuLy8gZmlyc3RUb2tlbiByZXR1cm5zIHRoZSBmaXJzdCB0b2tlbiBpbiBzLlxuLy8gcyBtdXN0IG5vdCBiZWdpbiB3aXRoIHdoaXRlc3BhY2UgY2hhcmFjdGVycy5cbmZ1bmN0aW9uIGZpcnN0VG9rZW4oczogc3RyaW5nKTogVG9rZW4ge1xuICBpZiAocy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5FTkQsIHRleHQ6ICcnfTtcbiAgfVxuICBsZXQgbTogUmVnRXhwTWF0Y2hBcnJheSB8IG51bGw7XG4gIGNvbnN0IGMgPSBzLmNoYXJBdCgwKTtcbiAgc3dpdGNoIChjKSB7XG4gICAgY2FzZSAnKCc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5MUGFyZW4sIHRleHQ6ICcoJ307XG4gICAgY2FzZSAnKSc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5SUGFyZW4sIHRleHQ6ICcpJ307XG4gICAgY2FzZSAnWyc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5MQnJhY2tldCwgdGV4dDogJ1snfTtcbiAgICBjYXNlICddJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLlJCcmFja2V0LCB0ZXh0OiAnXSd9O1xuICAgIGNhc2UgJywnOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuQ29tbWEsIHRleHQ6ICcsJ307XG4gICAgY2FzZSAnKyc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5QbHVzLCB0ZXh0OiAnKyd9O1xuICAgIGNhc2UgJy0nOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTWludXMsIHRleHQ6ICctJ307XG4gICAgY2FzZSAnKic6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5NdWwsIHRleHQ6ICcqJ307XG4gICAgY2FzZSAnLyc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5EaXYsIHRleHQ6ICcvJ307XG4gICAgY2FzZSAnPCc6XG4gICAgICBpZiAocy5sZW5ndGggPiAxICYmIHMuY2hhckF0KDEpID09PSAnPScpIHtcbiAgICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTGVzc09yRXEsIHRleHQ6ICc8PSd9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTGVzcywgdGV4dDogJzwnfTtcbiAgICBjYXNlICc+JzpcbiAgICAgIGlmIChzLmxlbmd0aCA+IDEgJiYgcy5jaGFyQXQoMSkgPT09ICc9Jykge1xuICAgICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5HcmVhdGVyT3JFcSwgdGV4dDogJz49J307XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5HcmVhdGVyLCB0ZXh0OiAnPid9O1xuICAgIGNhc2UgJz0nOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuRXF1YWwsIHRleHQ6ICc9J307XG4gICAgY2FzZSAnISc6XG4gICAgICBpZiAocy5sZW5ndGggPiAxICYmIHMuY2hhckF0KDEpID09PSAnPScpIHtcbiAgICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTm90RXF1YWwsIHRleHQ6ICchPSd9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTm90LCB0ZXh0OiAnISd9O1xuICAgIGNhc2UgJyQnOlxuICAgICAgbSA9IHMubWF0Y2goL15cXCRbYS16QS1aX11cXHcqLyk7XG4gICAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZmllbGQgbmFtZSBpbjogJyArIHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTmFtZSwgdGV4dDogbVswXX07XG4gICAgY2FzZSAnXCInOlxuICAgICAgbSA9IHMubWF0Y2goL15cIihcXFxcXFxcXHxcXFxcXCJ8W15cIl0pKlwiLyk7XG4gICAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VudGVybWluYXRlZCBzdHJpbmcgbGl0ZXJhbCBpbjogJyArIHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuU3RyaW5nLCB0ZXh0OiBtWzBdfTtcbiAgICBjYXNlIFwiJ1wiOlxuICAgICAgbSA9IHMubWF0Y2goL14nKFxcXFxcXFxcfFxcXFwnfFteJ10pKicvKTtcbiAgICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW50ZXJtaW5hdGVkIHN0cmluZyBsaXRlcmFsIGluOiAnICsgcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5TdHJpbmcsIHRleHQ6IG1bMF19O1xuICB9XG4gIGlmIChjID49ICcwJyAmJiBjIDw9ICc5Jykge1xuICAgIG0gPSBzLm1hdGNoKC9eXFxkKyhcXC5cXGQrKT8oW2VFXVtcXCtcXC1dP1xcZCspPy8pO1xuICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ltcG9zc2libGUnKTtcbiAgICB9XG4gICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTnVtYmVyLCB0ZXh0OiBtWzBdfTtcbiAgfVxuICBtID0gcy5tYXRjaCgvXlthLXpBLVpfXVxcdyovKTtcbiAgaWYgKG0gIT09IG51bGwpIHtcbiAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5JbmRlbnQsIHRleHQ6IG1bMF19O1xuICB9XG4gIGlmIChzLm1hdGNoKC9eXFxzLykgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0cmluZyBzIGhhcyBhIGxlYWRpbmcgd2hpdGVzcGFjZScpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHRva2VuIGluOiAnICsgcyk7XG59XG5cbmZ1bmN0aW9uIHRva2VuaXplKHM6IHN0cmluZyk6IFRva2VuW10ge1xuICBjb25zdCB0b2tzOiBUb2tlbltdID0gW107XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgcyA9IHMudHJpbSgpO1xuICAgIGNvbnN0IHQgPSBmaXJzdFRva2VuKHMpO1xuICAgIHRva3MucHVzaCh0KTtcbiAgICBpZiAodC50eXBlID09PSBUb2tlblR5cGUuRU5EKSB7XG4gICAgICByZXR1cm4gdG9rcztcbiAgICB9XG4gICAgcyA9IHMuc2xpY2UodC50ZXh0Lmxlbmd0aCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluZGljYXRvclRvSnMoZm9ybXVsYTogc3RyaW5nKTogc3RyaW5nIHtcbiAgc3dpdGNoICh0eXBlb2YoZm9ybXVsYSkpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGZvcm11bGEgPSBTdHJpbmcoZm9ybXVsYSk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JtdWxhIGlzIG5vdCBhIHN0cmluZycpO1xuICB9XG4gIHJldHVybiBwYXJzZUV4cHJlc3Npb24odG9rZW5pemUoZm9ybXVsYSkucmV2ZXJzZSgpLCBUb2tlblR5cGUuRU5EKTtcbn1cblxuZnVuY3Rpb24gdW5leHBlY3RlZFRva2VuRXJyb3IodG9rOiBUb2tlbiwgcmVzdDogVG9rZW5bXSk6IEVycm9yIHtcbiAgaWYgKHRvay50eXBlID09PSBUb2tlblR5cGUuRU5EKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcigndW5leHBlY3RlZCBlbmQgb2YgdG9rZW4gc3RyZWFtJyk7XG4gIH1cbiAgcmVzdC5wdXNoKHRvayk7XG4gIHJldHVybiBuZXcgRXJyb3IoJ3VuZXhwZWN0ZWQgdG9rZW4gYXQgdGhlIHN0YXJ0IG9mOiAnICsgcHJpbnRUb2tlbnMocmVzdCkpO1xufVxuXG5mdW5jdGlvbiBwcmludFRva2VucyhyZXZUb2tzOiBUb2tlbltdKSB7XG4gIGxldCBzID0gJyc7XG4gIHdoaWxlIChyZXZUb2tzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCB0b2sgPSByZXZUb2tzLnBvcCgpIGFzIFRva2VuO1xuICAgIGlmICh0b2sudHlwZSA+PSBUb2tlblR5cGUuUGx1cyAmJiB0b2sudHlwZSA8PSBUb2tlblR5cGUuTm90RXF1YWwpIHtcbiAgICAgIC8vIGJpbmFyeSBvcGVyYXRvcnNcbiAgICAgIHMgKz0gJyAnICsgdG9rLnRleHQgKyAnICc7XG4gICAgfSBlbHNlIGlmICh0b2sudHlwZSA9PT0gVG9rZW5UeXBlLkNvbW1hKSB7XG4gICAgICBzICs9ICcsICc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHMgKz0gdG9rLnRleHQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBzO1xufVxuXG5mdW5jdGlvbiBjb25zdW1lKHJldlRva3M6IFRva2VuW10sIGV4cGVjdGVkVHlwZTogVG9rZW5UeXBlKTogVG9rZW4ge1xuICBjb25zdCB0b2sgPSByZXZUb2tzLnBvcCgpIGFzIFRva2VuO1xuICBpZiAodG9rLnR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gIH1cbiAgcmV0dXJuIHRvaztcbn1cblxuLy8gcGFyc2VFeHByZXNzaW9uIHBhcnNlcyB0aGUgZmlyc3QgZXhwcmVzc2lvbiBpbiByZXZUb2tzXG4vLyBhbmQgcmV0dXJucyBpdHMgSmF2YVNjcmlwdC9hamYgdHJhbnNsYXRpb24uXG4vLyByZXZUb2tzIGlzIHJldmVyc2VkLCB0aGUgZmlyc3QgdG9rZW4gb2YgdGhlIGV4cHJlc3Npb24gYmVpbmcgYXQgaW5kZXggbGVuZ3RoLTE7XG4vLyB0aGlzIHdheSwgdG9rZW5zIGNhbiBiZSBjb25zdW1lZCBlZmZpY2llbnRseSB3aXRoIHJldlRva3MucG9wKCkuXG4vLyBBZnRlciB0aGUgZXhwcmVzc2lvbiwgdGhlIGZ1bmN0aW9uIGV4cGVjdHMgdG8gZmluZCB0aGUgdG9rZW4gZXhwZWN0ZWRFbmQuXG5mdW5jdGlvbiBwYXJzZUV4cHJlc3Npb24ocmV2VG9rczogVG9rZW5bXSwgZXhwZWN0ZWRFbmQ6IFRva2VuVHlwZSk6IHN0cmluZyB7XG4gIGlmIChcbiAgICBleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLkVORCAmJlxuICAgIGV4cGVjdGVkRW5kICE9PSBUb2tlblR5cGUuUlBhcmVuICYmXG4gICAgZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5Db21tYSAmJlxuICAgIGV4cGVjdGVkRW5kICE9PSBUb2tlblR5cGUuUkJyYWNrZXRcbiAgKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGV4cGVjdGVkRW5kJyk7XG4gIH1cblxuICBsZXQganMgPSAnJztcbiAgd2hpbGUgKHRydWUpIHtcbiAgICAvLyBFeHByZXNzaW9uLlxuICAgIGxldCB0b2sgPSByZXZUb2tzLnBvcCgpIGFzIFRva2VuO1xuICAgIGxldCBuZXh0OiBUb2tlbjtcbiAgICBzd2l0Y2ggKHRvay50eXBlKSB7XG4gICAgICBjYXNlIFRva2VuVHlwZS5JbmRlbnQ6XG4gICAgICAgIG5leHQgPSByZXZUb2tzW3JldlRva3MubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5MUGFyZW4pIHtcbiAgICAgICAgICBqcyArPSBwYXJzZUZ1bmN0aW9uQ2FsbCh0b2sudGV4dCwgcmV2VG9rcyk7XG4gICAgICAgIH0gZWxzZSBpZiAobmV4dC50eXBlID09PSBUb2tlblR5cGUuTEJyYWNrZXQpIHtcbiAgICAgICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MQnJhY2tldCk7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLlJCcmFja2V0KTtcbiAgICAgICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SQnJhY2tldCk7XG4gICAgICAgICAganMgKz0gYCR7dG9rLnRleHR9WyR7aW5kZXh9XWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAganMgKz0gdG9rLnRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRva2VuVHlwZS5OYW1lOlxuICAgICAgICBqcyArPSB0b2sudGV4dC5zbGljZSgxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRva2VuVHlwZS5TdHJpbmc6XG4gICAgICBjYXNlIFRva2VuVHlwZS5OdW1iZXI6XG4gICAgICAgIGpzICs9IHRvay50ZXh0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLlBsdXM6XG4gICAgICBjYXNlIFRva2VuVHlwZS5NaW51czpcbiAgICAgICAgbmV4dCA9IHJldlRva3NbcmV2VG9rcy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLlBsdXMgfHwgbmV4dC50eXBlID09PSBUb2tlblR5cGUuTWludXMpIHtcbiAgICAgICAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcihyZXZUb2tzLnBvcCgpIGFzIFRva2VuLCByZXZUb2tzKTtcbiAgICAgICAgfVxuICAgICAgICBqcyArPSB0b2sudGV4dDtcbiAgICAgICAgY29udGludWU7XG4gICAgICBjYXNlIFRva2VuVHlwZS5Ob3Q6XG4gICAgICAgIGpzICs9ICchJztcbiAgICAgICAgY29udGludWU7XG4gICAgICBjYXNlIFRva2VuVHlwZS5MUGFyZW46XG4gICAgICAgIGpzICs9ICcoJyArIHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuUlBhcmVuKSArICcpJztcbiAgICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUlBhcmVuKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRva2VuVHlwZS5MQnJhY2tldDpcbiAgICAgICAganMgKz0gJ1snICsgcGFyc2VMaXN0KHJldlRva3MsIFRva2VuVHlwZS5SQnJhY2tldCkgKyAnXSc7XG4gICAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJCcmFja2V0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2ssIHJldlRva3MpO1xuICAgIH1cblxuICAgIC8vIFBvc3NpYmxlIGVuZCBvZiBleHByZXNzaW9uLiBleHBlY3RlZEVuZCBjYW4gYmU6XG4gICAgLy8gRU5ELFxuICAgIC8vIFJQYXJlbiBmb3IgZXhwcmVzc2lvbnMgYmV0d2VlbiBwYXJlbnRoZXNlcyxcbiAgICAvLyBDb21tYSBmb3IgZnVuY3Rpb24gYXJndW1lbnRzLCBpbiB3aGljaCBjYXNlIHdlIGFsc28gYWNjZXB0IFJQYXJlbixcbiAgICAvLyBSQnJhY2tldCBmb3IgYXJyYXkgZWxlbWVudHMsICBpbiB3aGljaCBjYXNlIHdlIGFsc28gYWNjZXB0IENvbW1hLlxuICAgIC8vIE5vdGUgdGhhdCB3ZSBkb24ndCBjb25zdW1lIHRoZSBlbmQgdG9rZW4uXG4gICAgY29uc3QgdHlwZSA9IHJldlRva3NbcmV2VG9rcy5sZW5ndGggLSAxXS50eXBlO1xuICAgIGlmIChcbiAgICAgIHR5cGUgPT09IGV4cGVjdGVkRW5kIHx8XG4gICAgICAoZXhwZWN0ZWRFbmQgPT09IFRva2VuVHlwZS5Db21tYSAmJiB0eXBlID09PSBUb2tlblR5cGUuUlBhcmVuKSB8fFxuICAgICAgKGV4cGVjdGVkRW5kID09PSBUb2tlblR5cGUuUkJyYWNrZXQgJiYgdHlwZSA9PT0gVG9rZW5UeXBlLkNvbW1hKVxuICAgICkge1xuICAgICAgcmV0dXJuIGpzO1xuICAgIH1cblxuICAgIC8vIE9wZXJhdG9yLlxuICAgIHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gICAgaWYgKHRvay50eXBlID49IFRva2VuVHlwZS5QbHVzICYmIHRvay50eXBlIDw9IFRva2VuVHlwZS5HcmVhdGVyT3JFcSkge1xuICAgICAganMgKz0gJyAnICsgdG9rLnRleHQgKyAnICc7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgc3dpdGNoICh0b2sudHlwZSkge1xuICAgICAgY2FzZSBUb2tlblR5cGUuSW5kZW50OlxuICAgICAgICBpZiAodG9rLnRleHQgPT09ICdBTkQnKSB7XG4gICAgICAgICAganMgKz0gJyAmJiAnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b2sudGV4dCA9PT0gJ09SJykge1xuICAgICAgICAgIGpzICs9ICcgfHwgJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2ssIHJldlRva3MpO1xuICAgICAgY2FzZSBUb2tlblR5cGUuRXF1YWw6XG4gICAgICAgIGpzICs9ICcgPT09ICc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUb2tlblR5cGUuTm90RXF1YWw6XG4gICAgICAgIGpzICs9ICcgIT09ICc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgdW5leHBlY3RlZFRva2VuRXJyb3IodG9rLCByZXZUb2tzKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gcGFyc2VMaXN0IHBhcnNlcyBhIGNvbW1hLXNlcGFyYXRlZCBsaXN0IG9mIGV4cHJlc3Npb25zLlxuLy8gZXhwZWN0ZWRFbmQgaXMgQ29tbWEgZm9yIGZ1bmN0aW9uIGFyZ3VtZW50cyBhbmQgUkJyYWNrZXQgZm9yIGFycmF5cyxcbi8vIGFjY29yZGluZyB0byB0aGUgYmVoYXZpb3Igb2YgcGFyc2VFeHByZXNzaW9uLlxuZnVuY3Rpb24gcGFyc2VMaXN0KHJldlRva3M6IFRva2VuW10sIGV4cGVjdGVkRW5kOiBUb2tlblR5cGUpOiBzdHJpbmcge1xuICBpZiAoZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5Db21tYSAmJiBleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLlJCcmFja2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGV4cGVjdGVkRW5kJyk7XG4gIH1cbiAgbGV0IG5leHQgPSByZXZUb2tzW3JldlRva3MubGVuZ3RoIC0gMV07XG4gIGlmIChuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5SUGFyZW4gfHwgbmV4dC50eXBlID09PSBUb2tlblR5cGUuUkJyYWNrZXQpIHtcbiAgICAvLyBlbXB0eSBsaXN0XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGxldCBqcyA9ICcnO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIGpzICs9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBleHBlY3RlZEVuZCk7XG4gICAgbmV4dCA9IHJldlRva3NbcmV2VG9rcy5sZW5ndGggLSAxXTtcbiAgICBpZiAobmV4dC50eXBlID09PSBUb2tlblR5cGUuUlBhcmVuIHx8IG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLlJCcmFja2V0KSB7XG4gICAgICByZXR1cm4ganM7XG4gICAgfVxuICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICBqcyArPSAnLCAnO1xuICB9XG59XG5cbi8vIHBhcnNlRnVuY3Rpb25DYWxsIHBhcnNlcyBhIGZ1bmN0aW9uIGNhbGwgZXhwcmVzc2lvbi5cbi8vIFRoZSBsaXN0IG9mIHN1cHBvcnRlZCBmdW5jdGlvbnMgaXMgaW5cbi8vICAgcHJvamVjdHMvY29yZS9tb2RlbHMvdXRpbHMvZXhwcmVzc2lvbi11dGlscy50c1xuLy8gVGhlIGZ1bmN0aW9uIG5hbWUgaGFzIGFscmVhZHkgYmVlbiBzY2FubmVkLlxuZnVuY3Rpb24gcGFyc2VGdW5jdGlvbkNhbGwobmFtZTogc3RyaW5nLCByZXZUb2tzOiBUb2tlbltdKTogc3RyaW5nIHtcbiAgY29uc3QgcGFyYW1zID0gZnVuY3Rpb25QYXJhbXNbbmFtZV07XG4gIGlmIChwYXJhbXMpIHtcbiAgICByZXR1cm4gcGFyc2VGdW5jdGlvbldpdGhQYXJhbXMobmFtZSwgcmV2VG9rcywgLi4ucGFyYW1zKTtcbiAgfVxuICBzd2l0Y2ggKG5hbWUpIHtcbiAgICBjYXNlICdJTkNMVURFUyc6XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MUGFyZW4pO1xuICAgICAgbGV0IGpzID0gJygnICsgcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnKS5pbmNsdWRlcygnO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAganMgKz0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnKSc7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgcmV0dXJuIGpzO1xuICAgIGNhc2UgJ1RPREFZJzpcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkxQYXJlbik7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgcmV0dXJuICdUT0RBWSgpJztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBmdW5jdGlvbjogJyArIG5hbWUpO1xuICB9XG59XG5cbi8qXG4gIFBhcnNlcyBhIGZ1bmN0aW9uIGNhbGwgZXhwcmVzc2lvbi5cbiAgc3RyaW5naWZ5UGFyYW1zIHRlbGxzIGhvdyBtYW55IHBhcmFtZXRlcnMgdGhlIGZ1bmN0aW9uIGhhc1xuICBhbmQgaWYgdGhleSBuZWVkIHRvIGJlIHN0cmluZ2lmaWVkLlxuICBGb3IgZXhhbXBsZSwgdGhlIGluZGljYXRvciBmdW5jdGlvblxuICAgIFNVTShmb3Jtc1swXSwgJGFnZSwgJGdlbmRlciA9ICdtYWxlJylcbiAgY2FuIGJlIHBhcnNlZCB3aXRoXG4gICAgcGFyc2VGdW5jdGlvbldpdGhQYXJhbXMoJ1NVTScsIHJldlRva3MsIGZhbHNlLCB0cnVlLCB0cnVlKVxuICByZXN1bHRpbmcgaW4gdGhlIGZvbGxvd2luZyBKYXZhU2NyaXB0OlxuICAgIFNVTShmb3Jtc1swXSwgYGFnZWAsIGBnZW5kZXIgPT09ICdtYWxlJ2ApXG4gIHN0cmluZ2lmeVBhcmFtcy5sZW5ndGggPj0gMiBhbmQgdGhlIGxhc3QgcGFyYW1ldGVyIGlzIGNvbnNpZGVyZWQgb3B0aW9uYWwuXG4qL1xuZnVuY3Rpb24gcGFyc2VGdW5jdGlvbldpdGhQYXJhbXMobmFtZTogc3RyaW5nLCByZXZUb2tzOiBUb2tlbltdLCAuLi5zdHJpbmdpZnlQYXJhbXM6IGJvb2xlYW5bXSk6IHN0cmluZyB7XG4gIGlmIChzdHJpbmdpZnlQYXJhbXMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFcnJvcigncGFyc2VGdW5jdGlvbldpdGhQYXJhbXMgb25seSB3b3JrcyB3aXRoIGF0IGxlYXN0IDIgcGFyYW1ldGVycycpO1xuICB9XG4gIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkxQYXJlbik7XG4gIGxldCBqcyA9IG5hbWUgKyAnKCc7XG4gIGNvbnN0IGZpcnN0UGFyYW0gPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAganMgKz0gc3RyaW5naWZ5UGFyYW1zWzBdID8gYFxcYCR7Zmlyc3RQYXJhbX1cXGBgIDogZmlyc3RQYXJhbTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBzdHJpbmdpZnlQYXJhbXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgIGNvbnN0IHBhcmFtID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAganMgKz0gc3RyaW5naWZ5UGFyYW1zW2ldID8gYCwgXFxgJHtwYXJhbX1cXGBgIDogYCwgJHtwYXJhbX1gO1xuICB9XG4gIC8vIExhc3QgcGFyYW1ldGVyLCBvcHRpb25hbDpcbiAgY29uc3QgdG9rID0gcmV2VG9rcy5wb3AoKSBhcyBUb2tlbjtcbiAgc3dpdGNoICh0b2sudHlwZSkge1xuICAgIGNhc2UgVG9rZW5UeXBlLlJQYXJlbjpcbiAgICAgIHJldHVybiBqcyArICcpJztcbiAgICBjYXNlIFRva2VuVHlwZS5Db21tYTpcbiAgICAgIGNvbnN0IGxhc3RQYXJhbSA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUlBhcmVuKTtcbiAgICAgIGNvbnN0IHN0cmluZ2lmeSA9IHN0cmluZ2lmeVBhcmFtc1tzdHJpbmdpZnlQYXJhbXMubGVuZ3RoIC0gMV07XG4gICAgICByZXR1cm4ganMgKyAoc3RyaW5naWZ5ID8gYCwgXFxgJHtsYXN0UGFyYW19XFxgKWAgOiBgLCAke2xhc3RQYXJhbX0pYCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gIH1cbn1cblxuY29uc3QgZnVuY3Rpb25QYXJhbXM6IHtbbmFtZTogc3RyaW5nXTogYm9vbGVhbltdfSA9IHtcbiAgJ1NVTSc6ICAgICAgICAgICBbZmFsc2UsIHRydWUsIHRydWVdLFxuICAnTUVBTic6ICAgICAgICAgIFtmYWxzZSwgdHJ1ZSwgdHJ1ZV0sXG4gICdNQVgnOiAgICAgICAgICAgW2ZhbHNlLCB0cnVlLCB0cnVlXSxcbiAgJ01FRElBTic6ICAgICAgICBbZmFsc2UsIHRydWUsIHRydWVdLFxuICAnTU9ERSc6ICAgICAgICAgIFtmYWxzZSwgdHJ1ZSwgdHJ1ZV0sXG4gICdDT1VOVF9GT1JNUyc6ICAgW2ZhbHNlLCB0cnVlXSxcbiAgJ0NPVU5UX1JFUFMnOiAgICBbZmFsc2UsIHRydWVdLFxuICAnQ09VTlRfRk9STVNfVU5JUVVFJzogW2ZhbHNlLCB0cnVlLCB0cnVlXSxcbiAgJ0FMTF9WQUxVRVNfT0YnOiBbZmFsc2UsIHRydWVdLFxuICAnUEVSQ0VOVCc6ICAgICAgIFtmYWxzZSwgZmFsc2VdLFxuICAnTEFTVCc6ICAgICAgICAgIFtmYWxzZSwgdHJ1ZSwgZmFsc2VdLFxuICAnUkVQRUFUJzogICAgICAgIFtmYWxzZSwgZmFsc2UsIGZhbHNlLCB0cnVlLCB0cnVlXSxcbiAgJ0VWQUxVQVRFJzogICAgICBbZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICdGSUxURVJfQlknOiAgICAgW2ZhbHNlLCB0cnVlXSxcbiAgJ0FQUExZJzogICAgICAgICBbZmFsc2UsIHRydWUsIHRydWVdLFxuICAnR0VUX0FHRSc6ICAgICAgIFtmYWxzZSwgZmFsc2VdLFxuICAnTEVOJzogICAgICAgICAgIFtmYWxzZSwgZmFsc2VdLFxuICAnQ09OU09MRV9MT0cnOiAgIFtmYWxzZSwgZmFsc2VdLFxuICAnSk9JTl9GT1JNUyc6ICAgIFtmYWxzZSwgZmFsc2UsIHRydWUsIHRydWVdLFxuICAnSk9JTl9SRVBFQVRJTkdfU0xJREVTJzogW2ZhbHNlLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZV0sXG4gICdGUk9NX1JFUFMnOiAgICAgW2ZhbHNlLCBmYWxzZV0sXG4gICdJU0lOJzogICAgICAgICAgW2ZhbHNlLCBmYWxzZV0sXG4gICdPUCc6ICAgICAgICAgICAgW2ZhbHNlLCBmYWxzZSwgdHJ1ZV0sXG4gICdHRVRfTEFCRUxTJzogICAgW2ZhbHNlLCBmYWxzZV0sXG4gICdCVUlMRF9EQVRBU0VUJzogW2ZhbHNlLCBmYWxzZV0sXG4gICdST1VORCc6ICAgICAgICAgW2ZhbHNlLCBmYWxzZV0sXG4gICdJU19CRUZPUkUnOiAgICAgW2ZhbHNlLCBmYWxzZV0sXG4gICdJU19BRlRFUic6ICAgICAgW2ZhbHNlLCBmYWxzZV0sXG4gICdJU19XSVRISU5fSU5URVJWQUwnOiBbZmFsc2UsIGZhbHNlLCBmYWxzZV0sXG4gICdDT01QQVJFX0RBVEUnOiBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdLFxufVxuIl19