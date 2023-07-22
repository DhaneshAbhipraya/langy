/**
 * lexer.ts
 */

declare export class TokenType {
    declare def(type: string): void;
    declare get(type: string): number;
}

declare class Token {
    declare constructor(public type: TokenType, public value: string);
}

declare export class TokenRule {
    declare constructor(public type: TokenType, public pattern: RegExp);
}

declare export default class Lexer {
    declare private input: string;
    declare private currentPosition: number;
    declare private tokenRules: TokenRule[];

    declare constructor(input: string, tokenRules: TokenRule[]);

    declare public getNextToken(): Token | null;
}