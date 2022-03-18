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
        case 'COUNT_FORMS':
        case 'COUNT_REPS':
            return parseFieldFunction(name, revToks, false, true);
        case 'COUNT_FORMS_UNIQUE':
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
        case 'EVALUATE':
            consume(revToks, 1 /* LParen */);
            js = 'EVALUATE(' + parseExpression(revToks, 5 /* Comma */) + ', ';
            consume(revToks, 5 /* Comma */);
            js += parseExpression(revToks, 5 /* Comma */) + ', ';
            consume(revToks, 5 /* Comma */);
            js += parseExpression(revToks, 5 /* Comma */) + ')';
            consume(revToks, 2 /* RParen */);
            return js;
        case 'FILTER_BY':
            consume(revToks, 1 /* LParen */);
            js = 'FILTER_BY(' + parseExpression(revToks, 5 /* Comma */) + ', ';
            consume(revToks, 5 /* Comma */);
            js += `\`${parseExpression(revToks, 5 /* Comma */)}\`)`;
            consume(revToks, 2 /* RParen */);
            return js;
        case 'ISBEFORE':
        case 'ISAFTER':
            consume(revToks, 1 /* LParen */);
            js = `${name}(${parseExpression(revToks, 5 /* Comma */)}, `;
            consume(revToks, 5 /* Comma */);
            js += `${parseExpression(revToks, 5 /* Comma */)})`;
            consume(revToks, 2 /* RParen */);
            return js;
        case 'ISWITHININTERVAL':
            consume(revToks, 1 /* LParen */);
            js = 'ISWITHININTERVAL(' + parseExpression(revToks, 5 /* Comma */) + ', ';
            consume(revToks, 5 /* Comma */);
            js += parseExpression(revToks, 5 /* Comma */) + ', ';
            consume(revToks, 5 /* Comma */);
            js += parseExpression(revToks, 5 /* Comma */) + ')';
            consume(revToks, 2 /* RParen */);
            return js;
        case 'TODAY':
            return 'TODAY()';
        case 'APPLY':
            consume(revToks, 1 /* LParen */);
            const form = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 5 /* Comma */);
            const field = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 5 /* Comma */);
            const expression = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 2 /* RParen */);
            return `APPLY(${form}, \`${field}\`, \"${expression}\")`;
        case 'GET_AGE':
        case 'LEN':
        case 'CONSOLE_LOG':
            consume(revToks, 1 /* LParen */);
            js = `${name}(${parseExpression(revToks, 2 /* RParen */)})`;
            consume(revToks, 2 /* RParen */);
            return js;
        case 'JOIN_FORMS':
            consume(revToks, 1 /* LParen */);
            const formA = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 5 /* Comma */);
            const formB = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 5 /* Comma */);
            const fieldA = parseExpression(revToks, 5 /* Comma */);
            const tok = revToks.pop();
            switch (tok.type) {
                case 2 /* RParen */:
                    return `${name}(${formA}, ${formB},\`${fieldA}\`)`;
                case 5 /* Comma */:
                    const fieldB = parseExpression(revToks, 5 /* Comma */);
                    consume(revToks, 2 /* RParen */);
                    return `${name}(${formA}, ${formB},\`${fieldA}\`,\`${fieldB}\`)`;
                default:
                    throw unexpectedTokenError(tok, revToks);
            }
        case 'JOIN_REPEATING_SLIDES':
            consume(revToks, 1 /* LParen */);
            const mformA = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 5 /* Comma */);
            const mformB = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 5 /* Comma */);
            const mfieldA = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 5 /* Comma */);
            const mfieldB = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 5 /* Comma */);
            const msubFieldA = parseExpression(revToks, 5 /* Comma */);
            const mtok = revToks.pop();
            switch (mtok.type) {
                case 2 /* RParen */:
                    return `${name}(${mformA}, ${mformB},\`${mfieldA}\`,\`${mfieldB}\`,\`${msubFieldA}\`)`;
                case 5 /* Comma */:
                    const msubFieldB = parseExpression(revToks, 5 /* Comma */);
                    consume(revToks, 2 /* RParen */);
                    return `${name}(${mformA}, ${mformB},\`${mfieldA}\`,\`${mfieldB}\`,\`${msubFieldA}\`,\`${msubFieldB}\`)`;
                default:
                    throw unexpectedTokenError(mtok, revToks);
            }
        case 'FROM_REPS':
            consume(revToks, 1 /* LParen */);
            const mainFormFROM_REPS = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 5 /* Comma */);
            const exprFROM_REPS = parseExpression(revToks, 2 /* RParen */);
            consume(revToks, 2 /* RParen */);
            return `${name}(${mainFormFROM_REPS},\`${exprFROM_REPS}\`)`;
        case 'ISIN':
            consume(revToks, 1 /* LParen */);
            const mainFormISIN = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 5 /* Comma */);
            const exprISIN = parseExpression(revToks, 2 /* RParen */);
            consume(revToks, 2 /* RParen */);
            return `${name}(${mainFormISIN},${exprISIN})`;
        case 'OP':
            consume(revToks, 1 /* LParen */);
            const datasetA = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 5 /* Comma */);
            const datasetB = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 5 /* Comma */);
            const expr = parseExpression(revToks, 2 /* RParen */);
            consume(revToks, 2 /* RParen */);
            return `${name}(${datasetA},${datasetB},\`${expr}\`)`;
        case 'GET_LABELS':
            consume(revToks, 1 /* LParen */);
            const schemaGET_LABELS = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 5 /* Comma */);
            const fieldGET_LABELS = parseExpression(revToks, 2 /* RParen */);
            consume(revToks, 2 /* RParen */);
            return `${name}(${schemaGET_LABELS},${fieldGET_LABELS})`;
        case 'BUILD_DATASET':
            consume(revToks, 1 /* LParen */);
            const formsBUILD_DATASET = parseExpression(revToks, 5 /* Comma */);
            const tokBUILD_DATASET = revToks.pop();
            switch (tokBUILD_DATASET.type) {
                case 2 /* RParen */:
                    return `BUILD_DATASET(${formsBUILD_DATASET})`;
                case 5 /* Comma */:
                    const schemaBUILD_DATASET = parseExpression(revToks, 2 /* RParen */);
                    consume(revToks, 2 /* RParen */);
                    return `BUILD_DATASET(${formsBUILD_DATASET}, ${schemaBUILD_DATASET})`;
                default:
                    throw unexpectedTokenError(tokBUILD_DATASET, revToks);
            }
        case 'ROUND':
            consume(revToks, 1 /* LParen */);
            const valROUND = parseExpression(revToks, 2 /* RParen */);
            const tokROUND = revToks.pop();
            switch (tokROUND.type) {
                case 2 /* RParen */:
                    return `ROUND(${valROUND})`;
                case 5 /* Comma */:
                    const digitsROUND = parseExpression(revToks, 2 /* RParen */);
                    consume(revToks, 2 /* RParen */);
                    return `ROUND(${valROUND}, ${digitsROUND})`;
                default:
                    throw unexpectedTokenError(tokROUND, revToks);
            }
        case 'IS_BEFORE':
        case 'IS_AFTER':
            consume(revToks, 1 /* LParen */);
            const dateIS = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 5 /* Comma */);
            const dateToCompareIS = parseExpression(revToks, 2 /* RParen */);
            return `${name}(\`${dateIS}\`, \`${dateToCompareIS}\`)`;
        case 'IS_WITHIN_INTERVAL':
            consume(revToks, 1 /* LParen */);
            const dateIS_IS_WITHIN_INTERVAL = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 5 /* Comma */);
            const dateStartIS_IS_WITHIN_INTERVAL = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 5 /* Comma */);
            const dateEndIS_IS_WITHIN_INTERVAL = parseExpression(revToks, 2 /* RParen */);
            consume(revToks, 2 /* RParen */);
            return `IS_WITHIN_INTERVAL(\`${dateIS_IS_WITHIN_INTERVAL}\`, \`${dateStartIS_IS_WITHIN_INTERVAL}\`, \`${dateEndIS_IS_WITHIN_INTERVAL}\`)`;
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
            return `REPEAT(${form}, ${array}, ${funcIdent}, \"${exp}\")`;
        case 5 /* Comma */:
            const condition = parseExpression(revToks, 5 /* Comma */);
            consume(revToks, 2 /* RParen */);
            return `REPEAT(${form}, ${array}, ${funcIdent}, \"${exp}\", \"${condition}\")`;
        default:
            throw unexpectedTokenError(tok, revToks);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGluZGlraXQtcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9yZXBvcnRzL3NyYy94bHMtcmVwb3J0L2hpbmRpa2l0LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFtQ0gsMkNBQTJDO0FBQzNDLCtDQUErQztBQUMvQyxTQUFTLFVBQVUsQ0FBQyxDQUFTO0lBQzNCLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDbEIsT0FBTyxFQUFDLElBQUksYUFBZSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQztLQUN4QztJQUNELElBQUksQ0FBMEIsQ0FBQztJQUMvQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RCLFFBQVEsQ0FBQyxFQUFFO1FBQ1QsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksZ0JBQWtCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQzdDLEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLGdCQUFrQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUM3QyxLQUFLLEdBQUc7WUFDTixPQUFPLEVBQUMsSUFBSSxrQkFBb0IsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUM7UUFDL0MsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFDLElBQUksa0JBQW9CLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQy9DLEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLGVBQWlCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQzVDLEtBQUssR0FBRztZQUNOLE9BQU8sRUFBQyxJQUFJLGNBQWdCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBQzNDLEtBQUssR0FBRztZ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QUFPLEdBQUcsU0FBUyxTQUFTLEtBQUssQ0FBQztRQUNqRjtZQUNFLE1BQU0sb0JBQW9CLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzVDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuY29uc3QgZW51bSBUb2tlblR5cGUge1xuICBFTkQsXG4gIExQYXJlbixcbiAgUlBhcmVuLFxuICBMQnJhY2tldCxcbiAgUkJyYWNrZXQsXG4gIENvbW1hLFxuXG4gIC8vIEJpbmFyeSBvcGVyYXRvcnMgZnJvbSBQbHVzIHRvIEdyZWF0ZXJPckVxIGhhdmUgdGhlIHNhbWUgcmVwcmVzZW50YXRpb25cbiAgLy8gaW4gaW5kaWNhdG9yIGZvcm11bGFzIGFuZCBKYXZhU2NyaXB0IGFuZCBkb24ndCBuZWVkIGEgdHJhbnNsYXRpb24uXG4gIFBsdXMsXG4gIE1pbnVzLFxuICBNdWwsXG4gIERpdixcbiAgTGVzcyxcbiAgTGVzc09yRXEsXG4gIEdyZWF0ZXIsXG4gIEdyZWF0ZXJPckVxLFxuXG4gIEVxdWFsLFxuICBOb3RFcXVhbCxcbiAgTm90LFxuICBTdHJpbmcsXG4gIE51bWJlcixcbiAgSW5kZW50LFxuICBOYW1lLCAvLyBUaGUgbmFtZSBvZiBhIGZpZWxkOiBhbiBpZGVudGlmaWVyIHN0YXJ0aW5nIHdpdGggJFxufVxuXG5pbnRlcmZhY2UgVG9rZW4ge1xuICB0eXBlOiBUb2tlblR5cGU7XG4gIHRleHQ6IHN0cmluZztcbn1cblxuLy8gZmlyc3RUb2tlbiByZXR1cm5zIHRoZSBmaXJzdCB0b2tlbiBpbiBzLlxuLy8gcyBtdXN0IG5vdCBiZWdpbiB3aXRoIHdoaXRlc3BhY2UgY2hhcmFjdGVycy5cbmZ1bmN0aW9uIGZpcnN0VG9rZW4oczogc3RyaW5nKTogVG9rZW4ge1xuICBpZiAocy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5FTkQsIHRleHQ6ICcnfTtcbiAgfVxuICBsZXQgbTogUmVnRXhwTWF0Y2hBcnJheSB8IG51bGw7XG4gIGNvbnN0IGMgPSBzLmNoYXJBdCgwKTtcbiAgc3dpdGNoIChjKSB7XG4gICAgY2FzZSAnKCc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5MUGFyZW4sIHRleHQ6ICcoJ307XG4gICAgY2FzZSAnKSc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5SUGFyZW4sIHRleHQ6ICcpJ307XG4gICAgY2FzZSAnWyc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5MQnJhY2tldCwgdGV4dDogJ1snfTtcbiAgICBjYXNlICddJzpcbiAgICAgIHJldHVybiB7dHlwZTogVG9rZW5UeXBlLlJCcmFja2V0LCB0ZXh0OiAnXSd9O1xuICAgIGNhc2UgJywnOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuQ29tbWEsIHRleHQ6ICcsJ307XG4gICAgY2FzZSAnKyc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5QbHVzLCB0ZXh0OiAnKyd9O1xuICAgIGNhc2UgJy0nOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTWludXMsIHRleHQ6ICctJ307XG4gICAgY2FzZSAnKic6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5NdWwsIHRleHQ6ICcqJ307XG4gICAgY2FzZSAnLyc6XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5EaXYsIHRleHQ6ICcvJ307XG4gICAgY2FzZSAnPCc6XG4gICAgICBpZiAocy5sZW5ndGggPiAxICYmIHMuY2hhckF0KDEpID09PSAnPScpIHtcbiAgICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTGVzc09yRXEsIHRleHQ6ICc8PSd9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTGVzcywgdGV4dDogJzwnfTtcbiAgICBjYXNlICc+JzpcbiAgICAgIGlmIChzLmxlbmd0aCA+IDEgJiYgcy5jaGFyQXQoMSkgPT09ICc9Jykge1xuICAgICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5HcmVhdGVyT3JFcSwgdGV4dDogJz49J307XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5HcmVhdGVyLCB0ZXh0OiAnPid9O1xuICAgIGNhc2UgJz0nOlxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuRXF1YWwsIHRleHQ6ICc9J307XG4gICAgY2FzZSAnISc6XG4gICAgICBpZiAocy5sZW5ndGggPiAxICYmIHMuY2hhckF0KDEpID09PSAnPScpIHtcbiAgICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTm90RXF1YWwsIHRleHQ6ICchPSd9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTm90LCB0ZXh0OiAnISd9O1xuICAgIGNhc2UgJyQnOlxuICAgICAgbSA9IHMubWF0Y2goL15cXCRbYS16QS1aX11cXHcqLyk7XG4gICAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZmllbGQgbmFtZSBpbjogJyArIHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTmFtZSwgdGV4dDogbVswXX07XG4gICAgY2FzZSAnXCInOlxuICAgICAgbSA9IHMubWF0Y2goL15cIihcXFxcXFxcXHxcXFxcXCJ8W15cIl0pKlwiLyk7XG4gICAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VudGVybWluYXRlZCBzdHJpbmcgbGl0ZXJhbCBpbjogJyArIHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuU3RyaW5nLCB0ZXh0OiBtWzBdfTtcbiAgICBjYXNlIFwiJ1wiOlxuICAgICAgbSA9IHMubWF0Y2goL14nKFxcXFxcXFxcfFxcXFwnfFteJ10pKicvKTtcbiAgICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW50ZXJtaW5hdGVkIHN0cmluZyBsaXRlcmFsIGluOiAnICsgcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5TdHJpbmcsIHRleHQ6IG1bMF19O1xuICB9XG4gIGlmIChjID49ICcwJyAmJiBjIDw9ICc5Jykge1xuICAgIG0gPSBzLm1hdGNoKC9eXFxkKyhcXC5cXGQrKT8oW2VFXVtcXCtcXC1dP1xcZCspPy8pO1xuICAgIGlmIChtID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ltcG9zc2libGUnKTtcbiAgICB9XG4gICAgcmV0dXJuIHt0eXBlOiBUb2tlblR5cGUuTnVtYmVyLCB0ZXh0OiBtWzBdfTtcbiAgfVxuICBtID0gcy5tYXRjaCgvXlthLXpBLVpfXVxcdyovKTtcbiAgaWYgKG0gIT09IG51bGwpIHtcbiAgICByZXR1cm4ge3R5cGU6IFRva2VuVHlwZS5JbmRlbnQsIHRleHQ6IG1bMF19O1xuICB9XG4gIGlmIChzLm1hdGNoKC9eXFxzLykgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0cmluZyBzIGhhcyBhIGxlYWRpbmcgd2hpdGVzcGFjZScpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHRva2VuIGluOiAnICsgcyk7XG59XG5cbmZ1bmN0aW9uIHRva2VuaXplKHM6IHN0cmluZyk6IFRva2VuW10ge1xuICBjb25zdCB0b2tzOiBUb2tlbltdID0gW107XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgcyA9IHMudHJpbSgpO1xuICAgIGNvbnN0IHQgPSBmaXJzdFRva2VuKHMpO1xuICAgIHRva3MucHVzaCh0KTtcbiAgICBpZiAodC50eXBlID09PSBUb2tlblR5cGUuRU5EKSB7XG4gICAgICByZXR1cm4gdG9rcztcbiAgICB9XG4gICAgcyA9IHMuc2xpY2UodC50ZXh0Lmxlbmd0aCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluZGljYXRvclRvSnMoZm9ybXVsYTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHBhcnNlRXhwcmVzc2lvbih0b2tlbml6ZShmb3JtdWxhKS5yZXZlcnNlKCksIFRva2VuVHlwZS5FTkQpO1xufVxuXG5mdW5jdGlvbiB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2s6IFRva2VuLCByZXN0OiBUb2tlbltdKTogRXJyb3Ige1xuICBpZiAodG9rLnR5cGUgPT09IFRva2VuVHlwZS5FTkQpIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKCd1bmV4cGVjdGVkIGVuZCBvZiB0b2tlbiBzdHJlYW0nKTtcbiAgfVxuICByZXN0LnB1c2godG9rKTtcbiAgcmV0dXJuIG5ldyBFcnJvcigndW5leHBlY3RlZCB0b2tlbiBhdCB0aGUgc3RhcnQgb2Y6ICcgKyBwcmludFRva2VucyhyZXN0KSk7XG59XG5cbmZ1bmN0aW9uIHByaW50VG9rZW5zKHJldlRva3M6IFRva2VuW10pIHtcbiAgbGV0IHMgPSAnJztcbiAgd2hpbGUgKHJldlRva3MubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gICAgaWYgKHRvay50eXBlID49IFRva2VuVHlwZS5QbHVzICYmIHRvay50eXBlIDw9IFRva2VuVHlwZS5Ob3RFcXVhbCkge1xuICAgICAgLy8gYmluYXJ5IG9wZXJhdG9yc1xuICAgICAgcyArPSAnICcgKyB0b2sudGV4dCArICcgJztcbiAgICB9IGVsc2UgaWYgKHRvay50eXBlID09PSBUb2tlblR5cGUuQ29tbWEpIHtcbiAgICAgIHMgKz0gJywgJztcbiAgICB9IGVsc2Uge1xuICAgICAgcyArPSB0b2sudGV4dDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHM7XG59XG5cbmZ1bmN0aW9uIGNvbnN1bWUocmV2VG9rczogVG9rZW5bXSwgZXhwZWN0ZWRUeXBlOiBUb2tlblR5cGUpOiBUb2tlbiB7XG4gIGNvbnN0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gIGlmICh0b2sudHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgdGhyb3cgdW5leHBlY3RlZFRva2VuRXJyb3IodG9rLCByZXZUb2tzKTtcbiAgfVxuICByZXR1cm4gdG9rO1xufVxuXG4vLyBwYXJzZUV4cHJlc3Npb24gcGFyc2VzIHRoZSBmaXJzdCBleHByZXNzaW9uIGluIHJldlRva3Ncbi8vIGFuZCByZXR1cm5zIGl0cyBKYXZhU2NyaXB0L2FqZiB0cmFuc2xhdGlvbi5cbi8vIHJldlRva3MgaXMgcmV2ZXJzZWQsIHRoZSBmaXJzdCB0b2tlbiBvZiB0aGUgZXhwcmVzc2lvbiBiZWluZyBhdCBpbmRleCBsZW5ndGgtMTtcbi8vIHRoaXMgd2F5LCB0b2tlbnMgY2FuIGJlIGNvbnN1bWVkIGVmZmljaWVudGx5IHdpdGggcmV2VG9rcy5wb3AoKS5cbi8vIEFmdGVyIHRoZSBleHByZXNzaW9uLCB0aGUgZnVuY3Rpb24gZXhwZWN0cyB0byBmaW5kIHRoZSB0b2tlbiBleHBlY3RlZEVuZC5cbmZ1bmN0aW9uIHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzOiBUb2tlbltdLCBleHBlY3RlZEVuZDogVG9rZW5UeXBlKTogc3RyaW5nIHtcbiAgaWYgKFxuICAgIGV4cGVjdGVkRW5kICE9PSBUb2tlblR5cGUuRU5EICYmXG4gICAgZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5SUGFyZW4gJiZcbiAgICBleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLkNvbW1hICYmXG4gICAgZXhwZWN0ZWRFbmQgIT09IFRva2VuVHlwZS5SQnJhY2tldFxuICApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZXhwZWN0ZWRFbmQnKTtcbiAgfVxuXG4gIGxldCBqcyA9ICcnO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIC8vIEV4cHJlc3Npb24uXG4gICAgbGV0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gICAgbGV0IG5leHQ6IFRva2VuO1xuICAgIHN3aXRjaCAodG9rLnR5cGUpIHtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLkluZGVudDpcbiAgICAgICAgbmV4dCA9IHJldlRva3NbcmV2VG9rcy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLkxQYXJlbikge1xuICAgICAgICAgIGpzICs9IHBhcnNlRnVuY3Rpb25DYWxsKHRvay50ZXh0LCByZXZUb2tzKTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5MQnJhY2tldCkge1xuICAgICAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkxCcmFja2V0KTtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuUkJyYWNrZXQpO1xuICAgICAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJCcmFja2V0KTtcbiAgICAgICAgICBqcyArPSBgJHt0b2sudGV4dH1bJHtpbmRleH1dYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBqcyArPSB0b2sudGV4dDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk5hbWU6XG4gICAgICAgIGpzICs9IHRvay50ZXh0LnNsaWNlKDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLlN0cmluZzpcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk51bWJlcjpcbiAgICAgICAganMgKz0gdG9rLnRleHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUb2tlblR5cGUuUGx1czpcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk1pbnVzOlxuICAgICAgICBuZXh0ID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAobmV4dC50eXBlID09PSBUb2tlblR5cGUuUGx1cyB8fCBuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5NaW51cykge1xuICAgICAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHJldlRva3MucG9wKCkgYXMgVG9rZW4sIHJldlRva3MpO1xuICAgICAgICB9XG4gICAgICAgIGpzICs9IHRvay50ZXh0O1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLk5vdDpcbiAgICAgICAganMgKz0gJyEnO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIGNhc2UgVG9rZW5UeXBlLkxQYXJlbjpcbiAgICAgICAganMgKz0gJygnICsgcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pICsgJyknO1xuICAgICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVG9rZW5UeXBlLkxCcmFja2V0OlxuICAgICAgICBqcyArPSAnWycgKyBwYXJzZUxpc3QocmV2VG9rcywgVG9rZW5UeXBlLlJCcmFja2V0KSArICddJztcbiAgICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUkJyYWNrZXQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gICAgfVxuXG4gICAgLy8gUG9zc2libGUgZW5kIG9mIGV4cHJlc3Npb24uIGV4cGVjdGVkRW5kIGNhbiBiZTpcbiAgICAvLyBFTkQsXG4gICAgLy8gUlBhcmVuIGZvciBleHByZXNzaW9ucyBiZXR3ZWVuIHBhcmVudGhlc2VzLFxuICAgIC8vIENvbW1hIGZvciBmdW5jdGlvbiBhcmd1bWVudHMsIGluIHdoaWNoIGNhc2Ugd2UgYWxzbyBhY2NlcHQgUlBhcmVuLFxuICAgIC8vIFJCcmFja2V0IGZvciBhcnJheSBlbGVtZW50cywgIGluIHdoaWNoIGNhc2Ugd2UgYWxzbyBhY2NlcHQgQ29tbWEuXG4gICAgLy8gTm90ZSB0aGF0IHdlIGRvbid0IGNvbnN1bWUgdGhlIGVuZCB0b2tlbi5cbiAgICBjb25zdCB0eXBlID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdLnR5cGU7XG4gICAgaWYgKFxuICAgICAgdHlwZSA9PT0gZXhwZWN0ZWRFbmQgfHxcbiAgICAgIChleHBlY3RlZEVuZCA9PT0gVG9rZW5UeXBlLkNvbW1hICYmIHR5cGUgPT09IFRva2VuVHlwZS5SUGFyZW4pIHx8XG4gICAgICAoZXhwZWN0ZWRFbmQgPT09IFRva2VuVHlwZS5SQnJhY2tldCAmJiB0eXBlID09PSBUb2tlblR5cGUuQ29tbWEpXG4gICAgKSB7XG4gICAgICByZXR1cm4ganM7XG4gICAgfVxuXG4gICAgLy8gT3BlcmF0b3IuXG4gICAgdG9rID0gcmV2VG9rcy5wb3AoKSBhcyBUb2tlbjtcbiAgICBpZiAodG9rLnR5cGUgPj0gVG9rZW5UeXBlLlBsdXMgJiYgdG9rLnR5cGUgPD0gVG9rZW5UeXBlLkdyZWF0ZXJPckVxKSB7XG4gICAgICBqcyArPSAnICcgKyB0b2sudGV4dCArICcgJztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRvay50eXBlKSB7XG4gICAgICBjYXNlIFRva2VuVHlwZS5JbmRlbnQ6XG4gICAgICAgIGlmICh0b2sudGV4dCA9PT0gJ0FORCcpIHtcbiAgICAgICAgICBqcyArPSAnICYmICc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRvay50ZXh0ID09PSAnT1InKSB7XG4gICAgICAgICAganMgKz0gJyB8fCAnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gICAgICBjYXNlIFRva2VuVHlwZS5FcXVhbDpcbiAgICAgICAganMgKz0gJyA9PT0gJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRva2VuVHlwZS5Ob3RFcXVhbDpcbiAgICAgICAganMgKz0gJyAhPT0gJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2ssIHJldlRva3MpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBwYXJzZUxpc3QgcGFyc2VzIGEgY29tbWEtc2VwYXJhdGVkIGxpc3Qgb2YgZXhwcmVzc2lvbnMuXG4vLyBleHBlY3RlZEVuZCBpcyBDb21tYSBmb3IgZnVuY3Rpb24gYXJndW1lbnRzIGFuZCBSQnJhY2tldCBmb3IgYXJyYXlzLFxuLy8gYWNjb3JkaW5nIHRvIHRoZSBiZWhhdmlvciBvZiBwYXJzZUV4cHJlc3Npb24uXG5mdW5jdGlvbiBwYXJzZUxpc3QocmV2VG9rczogVG9rZW5bXSwgZXhwZWN0ZWRFbmQ6IFRva2VuVHlwZSk6IHN0cmluZyB7XG4gIGlmIChleHBlY3RlZEVuZCAhPT0gVG9rZW5UeXBlLkNvbW1hICYmIGV4cGVjdGVkRW5kICE9PSBUb2tlblR5cGUuUkJyYWNrZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZXhwZWN0ZWRFbmQnKTtcbiAgfVxuICBsZXQgbmV4dCA9IHJldlRva3NbcmV2VG9rcy5sZW5ndGggLSAxXTtcbiAgaWYgKG5leHQudHlwZSA9PT0gVG9rZW5UeXBlLlJQYXJlbiB8fCBuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5SQnJhY2tldCkge1xuICAgIC8vIGVtcHR5IGxpc3RcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgbGV0IGpzID0gJyc7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAganMgKz0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIGV4cGVjdGVkRW5kKTtcbiAgICBuZXh0ID0gcmV2VG9rc1tyZXZUb2tzLmxlbmd0aCAtIDFdO1xuICAgIGlmIChuZXh0LnR5cGUgPT09IFRva2VuVHlwZS5SUGFyZW4gfHwgbmV4dC50eXBlID09PSBUb2tlblR5cGUuUkJyYWNrZXQpIHtcbiAgICAgIHJldHVybiBqcztcbiAgICB9XG4gICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgIGpzICs9ICcsICc7XG4gIH1cbn1cblxuLy8gcGFyc2VGdW5jdGlvbkNhbGwgcGFyc2VzIGEgZnVuY3Rpb24gY2FsbCBleHByZXNzaW9uLlxuLy8gVGhlIGxpc3Qgb2Ygc3VwcG9ydGVkIGZ1bmN0aW9ucyBpcyBoZXJlOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2dudWNvb3AvYWpmL2Jsb2IvbWFzdGVyL3NyYy9jb3JlL21vZGVscy91dGlscy9leHByZXNzaW9uLXV0aWxzLnRzXG4vLyBUaGUgZnVuY3Rpb24gbmFtZSBoYXMgYWxyZWFkeSBiZWVuIHNjYW5uZWQuXG5mdW5jdGlvbiBwYXJzZUZ1bmN0aW9uQ2FsbChuYW1lOiBzdHJpbmcsIHJldlRva3M6IFRva2VuW10pOiBzdHJpbmcge1xuICBsZXQganM6IHN0cmluZztcbiAgc3dpdGNoIChuYW1lKSB7XG4gICAgY2FzZSAnU1VNJzpcbiAgICBjYXNlICdNRUFOJzpcbiAgICBjYXNlICdNQVgnOlxuICAgIGNhc2UgJ01FRElBTic6XG4gICAgY2FzZSAnTU9ERSc6XG4gICAgICByZXR1cm4gcGFyc2VNYXRoRnVuY3Rpb24obmFtZSwgcmV2VG9rcyk7XG4gICAgY2FzZSAnQUxMX1ZBTFVFU19PRic6XG4gICAgICByZXR1cm4gcGFyc2VGaWVsZEZ1bmN0aW9uKG5hbWUsIHJldlRva3MsIHRydWUsIGZhbHNlKTtcbiAgICBjYXNlICdDT1VOVF9GT1JNUyc6XG4gICAgY2FzZSAnQ09VTlRfUkVQUyc6XG4gICAgICByZXR1cm4gcGFyc2VGaWVsZEZ1bmN0aW9uKG5hbWUsIHJldlRva3MsIGZhbHNlLCB0cnVlKTtcbiAgICBjYXNlICdDT1VOVF9GT1JNU19VTklRVUUnOlxuICAgICAgcmV0dXJuIHBhcnNlRmllbGRGdW5jdGlvbihuYW1lLCByZXZUb2tzLCB0cnVlLCB0cnVlKTtcbiAgICBjYXNlICdJTkNMVURFUyc6XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MUGFyZW4pO1xuICAgICAganMgPSAnKCcgKyBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKSArICcpLmluY2x1ZGVzKCc7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBqcyArPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKSArICcpJztcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICByZXR1cm4ganM7XG4gICAgY2FzZSAnUEVSQ0VOVCc6XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MUGFyZW4pO1xuICAgICAganMgPSAnUEVSQ0VOVCgnICsgcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnLCAnO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAganMgKz0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnKSc7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgcmV0dXJuIGpzO1xuICAgIGNhc2UgJ0xBU1QnOlxuICAgICAgcmV0dXJuIHBhcnNlTGFzdChyZXZUb2tzKTtcbiAgICBjYXNlICdSRVBFQVQnOlxuICAgICAgcmV0dXJuIHBhcnNlUmVwZWF0KHJldlRva3MpO1xuICAgIGNhc2UgJ0VWQUxVQVRFJzpcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkxQYXJlbik7XG4gICAgICBqcyA9ICdFVkFMVUFURSgnICsgcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnLCAnO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAganMgKz0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnLCAnO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAganMgKz0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnKSc7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgcmV0dXJuIGpzO1xuICAgIGNhc2UgJ0ZJTFRFUl9CWSc6XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MUGFyZW4pO1xuICAgICAganMgPSAnRklMVEVSX0JZKCcgKyBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKSArICcsICc7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBqcyArPSBgXFxgJHtwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKX1cXGApYDtcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICByZXR1cm4ganM7XG4gICAgY2FzZSAnSVNCRUZPUkUnOlxuICAgIGNhc2UgJ0lTQUZURVInOlxuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTFBhcmVuKTtcbiAgICAgIGpzID0gYCR7bmFtZX0oJHtwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKX0sIGA7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBqcyArPSBgJHtwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKX0pYDtcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICByZXR1cm4ganM7XG4gICAgY2FzZSAnSVNXSVRISU5JTlRFUlZBTCc6XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MUGFyZW4pO1xuICAgICAganMgPSAnSVNXSVRISU5JTlRFUlZBTCgnICsgcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnLCAnO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAganMgKz0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnLCAnO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAganMgKz0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSkgKyAnKSc7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgcmV0dXJuIGpzO1xuICAgIGNhc2UgJ1RPREFZJzpcbiAgICAgIHJldHVybiAnVE9EQVkoKSc7XG4gICAgY2FzZSAnQVBQTFknOlxuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTFBhcmVuKTtcbiAgICAgIGNvbnN0IGZvcm0gPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgIGNvbnN0IGZpZWxkID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBjb25zdCBleHByZXNzaW9uID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgcmV0dXJuIGBBUFBMWSgke2Zvcm19LCBcXGAke2ZpZWxkfVxcYCwgXFxcIiR7ZXhwcmVzc2lvbn1cXFwiKWA7XG4gICAgY2FzZSAnR0VUX0FHRSc6XG4gICAgY2FzZSAnTEVOJzpcbiAgICBjYXNlICdDT05TT0xFX0xPRyc6XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MUGFyZW4pO1xuICAgICAganMgPSBgJHtuYW1lfSgke3BhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuUlBhcmVuKX0pYDtcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICByZXR1cm4ganM7XG4gICAgY2FzZSAnSk9JTl9GT1JNUyc6XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MUGFyZW4pO1xuICAgICAgY29uc3QgZm9ybUEgPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgIGNvbnN0IGZvcm1CID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBjb25zdCBmaWVsZEEgPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgIGNvbnN0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gICAgICBzd2l0Y2ggKHRvay50eXBlKSB7XG4gICAgICAgIGNhc2UgVG9rZW5UeXBlLlJQYXJlbjpcbiAgICAgICAgICByZXR1cm4gYCR7bmFtZX0oJHtmb3JtQX0sICR7Zm9ybUJ9LFxcYCR7ZmllbGRBfVxcYClgO1xuICAgICAgICBjYXNlIFRva2VuVHlwZS5Db21tYTpcbiAgICAgICAgICBjb25zdCBmaWVsZEIgPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgICAgIHJldHVybiBgJHtuYW1lfSgke2Zvcm1BfSwgJHtmb3JtQn0sXFxgJHtmaWVsZEF9XFxgLFxcYCR7ZmllbGRCfVxcYClgO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gICAgICB9XG4gICAgY2FzZSAnSk9JTl9SRVBFQVRJTkdfU0xJREVTJzpcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkxQYXJlbik7XG4gICAgICBjb25zdCBtZm9ybUEgPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgIGNvbnN0IG1mb3JtQiA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAgY29uc3QgbWZpZWxkQSA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAgY29uc3QgbWZpZWxkQiA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAgY29uc3QgbXN1YkZpZWxkQSA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAgY29uc3QgbXRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gICAgICBzd2l0Y2ggKG10b2sudHlwZSkge1xuICAgICAgICBjYXNlIFRva2VuVHlwZS5SUGFyZW46XG4gICAgICAgICAgcmV0dXJuIGAke25hbWV9KCR7bWZvcm1BfSwgJHttZm9ybUJ9LFxcYCR7bWZpZWxkQX1cXGAsXFxgJHttZmllbGRCfVxcYCxcXGAke21zdWJGaWVsZEF9XFxgKWA7XG4gICAgICAgIGNhc2UgVG9rZW5UeXBlLkNvbW1hOlxuICAgICAgICAgIGNvbnN0IG1zdWJGaWVsZEIgPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgICAgIHJldHVybiBgJHtuYW1lfSgke21mb3JtQX0sICR7bWZvcm1CfSxcXGAke21maWVsZEF9XFxgLFxcYCR7bWZpZWxkQn1cXGAsXFxgJHttc3ViRmllbGRBfVxcYCxcXGAke21zdWJGaWVsZEJ9XFxgKWA7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgdW5leHBlY3RlZFRva2VuRXJyb3IobXRvaywgcmV2VG9rcyk7XG4gICAgICB9XG4gICAgY2FzZSAnRlJPTV9SRVBTJzpcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkxQYXJlbik7XG4gICAgICBjb25zdCBtYWluRm9ybUZST01fUkVQUyA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAgY29uc3QgZXhwckZST01fUkVQUyA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuUlBhcmVuKTtcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICByZXR1cm4gYCR7bmFtZX0oJHttYWluRm9ybUZST01fUkVQU30sXFxgJHtleHByRlJPTV9SRVBTfVxcYClgO1xuICAgIGNhc2UgJ0lTSU4nOlxuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTFBhcmVuKTtcbiAgICAgIGNvbnN0IG1haW5Gb3JtSVNJTiA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAgY29uc3QgZXhwcklTSU4gPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgcmV0dXJuIGAke25hbWV9KCR7bWFpbkZvcm1JU0lOfSwke2V4cHJJU0lOfSlgO1xuICAgIGNhc2UgJ09QJzpcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkxQYXJlbik7XG4gICAgICBjb25zdCBkYXRhc2V0QSA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAgY29uc3QgZGF0YXNldEIgPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgIGNvbnN0IGV4cHIgPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgcmV0dXJuIGAke25hbWV9KCR7ZGF0YXNldEF9LCR7ZGF0YXNldEJ9LFxcYCR7ZXhwcn1cXGApYDtcbiAgICBjYXNlICdHRVRfTEFCRUxTJzpcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkxQYXJlbik7XG4gICAgICBjb25zdCBzY2hlbWFHRVRfTEFCRUxTID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBjb25zdCBmaWVsZEdFVF9MQUJFTFMgPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgcmV0dXJuIGAke25hbWV9KCR7c2NoZW1hR0VUX0xBQkVMU30sJHtmaWVsZEdFVF9MQUJFTFN9KWA7XG4gICAgY2FzZSAnQlVJTERfREFUQVNFVCc6XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MUGFyZW4pO1xuICAgICAgY29uc3QgZm9ybXNCVUlMRF9EQVRBU0VUID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBjb25zdCB0b2tCVUlMRF9EQVRBU0VUID0gcmV2VG9rcy5wb3AoKSBhcyBUb2tlbjtcbiAgICAgIHN3aXRjaCAodG9rQlVJTERfREFUQVNFVC50eXBlKSB7XG4gICAgICAgIGNhc2UgVG9rZW5UeXBlLlJQYXJlbjpcbiAgICAgICAgICByZXR1cm4gYEJVSUxEX0RBVEFTRVQoJHtmb3Jtc0JVSUxEX0RBVEFTRVR9KWA7XG4gICAgICAgIGNhc2UgVG9rZW5UeXBlLkNvbW1hOlxuICAgICAgICAgIGNvbnN0IHNjaGVtYUJVSUxEX0RBVEFTRVQgPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuUlBhcmVuKTtcbiAgICAgICAgICByZXR1cm4gYEJVSUxEX0RBVEFTRVQoJHtmb3Jtc0JVSUxEX0RBVEFTRVR9LCAke3NjaGVtYUJVSUxEX0RBVEFTRVR9KWA7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgdW5leHBlY3RlZFRva2VuRXJyb3IodG9rQlVJTERfREFUQVNFVCwgcmV2VG9rcyk7XG4gICAgICB9XG4gICAgY2FzZSAnUk9VTkQnOlxuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTFBhcmVuKTtcbiAgICAgIGNvbnN0IHZhbFJPVU5EID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgY29uc3QgdG9rUk9VTkQgPSByZXZUb2tzLnBvcCgpIGFzIFRva2VuO1xuICAgICAgc3dpdGNoICh0b2tST1VORC50eXBlKSB7XG4gICAgICAgIGNhc2UgVG9rZW5UeXBlLlJQYXJlbjpcbiAgICAgICAgICByZXR1cm4gYFJPVU5EKCR7dmFsUk9VTkR9KWA7XG4gICAgICAgIGNhc2UgVG9rZW5UeXBlLkNvbW1hOlxuICAgICAgICAgIGNvbnN0IGRpZ2l0c1JPVU5EID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICAgICAgcmV0dXJuIGBST1VORCgke3ZhbFJPVU5EfSwgJHtkaWdpdHNST1VORH0pYDtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2tST1VORCwgcmV2VG9rcyk7XG4gICAgICB9XG4gICAgY2FzZSAnSVNfQkVGT1JFJzpcbiAgICBjYXNlICdJU19BRlRFUic6XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MUGFyZW4pO1xuICAgICAgY29uc3QgZGF0ZUlTID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBjb25zdCBkYXRlVG9Db21wYXJlSVMgPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICByZXR1cm4gYCR7bmFtZX0oXFxgJHtkYXRlSVN9XFxgLCBcXGAke2RhdGVUb0NvbXBhcmVJU31cXGApYDtcbiAgICBjYXNlICdJU19XSVRISU5fSU5URVJWQUwnOlxuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTFBhcmVuKTtcbiAgICAgIGNvbnN0IGRhdGVJU19JU19XSVRISU5fSU5URVJWQUwgPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgICAgIGNvbnN0IGRhdGVTdGFydElTX0lTX1dJVEhJTl9JTlRFUlZBTCA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICAgICAgY29uc3QgZGF0ZUVuZElTX0lTX1dJVEhJTl9JTlRFUlZBTCA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuUlBhcmVuKTtcbiAgICAgIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLlJQYXJlbik7XG4gICAgICByZXR1cm4gYElTX1dJVEhJTl9JTlRFUlZBTChcXGAke2RhdGVJU19JU19XSVRISU5fSU5URVJWQUx9XFxgLCBcXGAke2RhdGVTdGFydElTX0lTX1dJVEhJTl9JTlRFUlZBTH1cXGAsIFxcYCR7ZGF0ZUVuZElTX0lTX1dJVEhJTl9JTlRFUlZBTH1cXGApYDtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBmdW5jdGlvbjogJyArIG5hbWUpO1xuICB9XG59XG5cbi8vIFBhcnNlcyBhIGZ1bmN0aW9uIHdpdGggcGFyYW1ldGVyczogZm9ybSwgZXhwcmVzc2lvbiwgY29uZGl0aW9uP1xuZnVuY3Rpb24gcGFyc2VNYXRoRnVuY3Rpb24obmFtZTogc3RyaW5nLCByZXZUb2tzOiBUb2tlbltdKTogc3RyaW5nIHtcbiAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTFBhcmVuKTtcbiAgY29uc3QgZm9ybSA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gIGNvbnN0IGV4cCA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICBjb25zdCB0b2sgPSByZXZUb2tzLnBvcCgpIGFzIFRva2VuO1xuICBzd2l0Y2ggKHRvay50eXBlKSB7XG4gICAgY2FzZSBUb2tlblR5cGUuUlBhcmVuOlxuICAgICAgcmV0dXJuIGAke25hbWV9KCR7Zm9ybX0sIFxcYCR7ZXhwfVxcYClgO1xuICAgIGNhc2UgVG9rZW5UeXBlLkNvbW1hOlxuICAgICAgY29uc3QgY29uZGl0aW9uID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgcmV0dXJuIGAke25hbWV9KCR7Zm9ybX0sIFxcYCR7ZXhwfVxcYCwgXFxgJHtjb25kaXRpb259XFxgKWA7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gIH1cbn1cblxuLy8gUGFyc2VzIGEgZnVuY3Rpb24gd2l0aCBwYXJhbWV0ZXJzOiBmb3JtLCBmaWVsZE5hbWU/LCBjb25kaXRpb24/XG5mdW5jdGlvbiBwYXJzZUZpZWxkRnVuY3Rpb24oXG4gIG5hbWU6IHN0cmluZyxcbiAgcmV2VG9rczogVG9rZW5bXSxcbiAgaGFzRmllbGQ6IGJvb2xlYW4sXG4gIGNhbkhhdmVDb25kOiBib29sZWFuLFxuKTogc3RyaW5nIHtcbiAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTFBhcmVuKTtcbiAgbGV0IGpzID0gbmFtZSArICcoJyArIHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICBpZiAoaGFzRmllbGQpIHtcbiAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgY29uc3QgZmllbGROYW1lID0gY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuTmFtZSkudGV4dC5zbGljZSgxKTtcbiAgICBqcyArPSBgLCBcXGAke2ZpZWxkTmFtZX1cXGBgO1xuICB9XG4gIGNvbnN0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gIGlmICh0b2sudHlwZSA9PT0gVG9rZW5UeXBlLlJQYXJlbikge1xuICAgIHJldHVybiBqcyArICcpJztcbiAgfVxuICBpZiAoIWNhbkhhdmVDb25kIHx8IHRvay50eXBlICE9PSBUb2tlblR5cGUuQ29tbWEpIHtcbiAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2ssIHJldlRva3MpO1xuICB9XG4gIGNvbnN0IGNvbmRpdGlvbiA9IHBhcnNlRXhwcmVzc2lvbihyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICByZXR1cm4ganMgKyBgLCBcXGAke2NvbmRpdGlvbn1cXGApYDtcbn1cblxuLy8gTEFTVCBoYXMgcGFyYW1ldGVyczogZm9ybSwgZXhwcmVzc2lvbiwgZGF0ZT9cbi8vIHdoZXJlIGRhdGUgaXMgYSBzdHJpbmcgY29uc3RhbnQuXG5mdW5jdGlvbiBwYXJzZUxhc3QocmV2VG9rczogVG9rZW5bXSk6IHN0cmluZyB7XG4gIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkxQYXJlbik7XG4gIGNvbnN0IGZvcm0gPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICBjb25zdCBleHAgPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgY29uc3QgdG9rID0gcmV2VG9rcy5wb3AoKSBhcyBUb2tlbjtcbiAgc3dpdGNoICh0b2sudHlwZSkge1xuICAgIGNhc2UgVG9rZW5UeXBlLlJQYXJlbjpcbiAgICAgIHJldHVybiBgTEFTVCgke2Zvcm19LCBcXGAke2V4cH1cXGApYDtcbiAgICBjYXNlIFRva2VuVHlwZS5Db21tYTpcbiAgICAgIGNvbnN0IGRhdGUgPSBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5TdHJpbmcpLnRleHQ7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgcmV0dXJuIGBMQVNUKCR7Zm9ybX0sIFxcYCR7ZXhwfVxcYCwgJHtkYXRlfSlgO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyB1bmV4cGVjdGVkVG9rZW5FcnJvcih0b2ssIHJldlRva3MpO1xuICB9XG59XG5cbi8vIFJFUEVBVCBoYXMgcGFyYW1ldGVyczogZm9ybSwgYXJyYXksIGZ1bmNJbmRlbnQsIGV4cHJlc3Npb24sIGNvbmRpdGlvbj9cbmZ1bmN0aW9uIHBhcnNlUmVwZWF0KHJldlRva3M6IFRva2VuW10pOiBzdHJpbmcge1xuICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5MUGFyZW4pO1xuICBjb25zdCBmb3JtID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgY29uc3QgYXJyYXkgPSBwYXJzZUV4cHJlc3Npb24ocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgY29uc3VtZShyZXZUb2tzLCBUb2tlblR5cGUuQ29tbWEpO1xuICBjb25zdCBmdW5jSWRlbnQgPSBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5JbmRlbnQpLnRleHQ7XG4gIGNvbnN1bWUocmV2VG9rcywgVG9rZW5UeXBlLkNvbW1hKTtcbiAgY29uc3QgZXhwID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gIGNvbnN0IHRvayA9IHJldlRva3MucG9wKCkgYXMgVG9rZW47XG4gIHN3aXRjaCAodG9rLnR5cGUpIHtcbiAgICBjYXNlIFRva2VuVHlwZS5SUGFyZW46XG4gICAgICByZXR1cm4gYFJFUEVBVCgke2Zvcm19LCAke2FycmF5fSwgJHtmdW5jSWRlbnR9LCBcXFwiJHtleHB9XFxcIilgO1xuICAgIGNhc2UgVG9rZW5UeXBlLkNvbW1hOlxuICAgICAgY29uc3QgY29uZGl0aW9uID0gcGFyc2VFeHByZXNzaW9uKHJldlRva3MsIFRva2VuVHlwZS5Db21tYSk7XG4gICAgICBjb25zdW1lKHJldlRva3MsIFRva2VuVHlwZS5SUGFyZW4pO1xuICAgICAgcmV0dXJuIGBSRVBFQVQoJHtmb3JtfSwgJHthcnJheX0sICR7ZnVuY0lkZW50fSwgXFxcIiR7ZXhwfVxcXCIsIFxcXCIke2NvbmRpdGlvbn1cXFwiKWA7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IHVuZXhwZWN0ZWRUb2tlbkVycm9yKHRvaywgcmV2VG9rcyk7XG4gIH1cbn1cbiJdfQ==