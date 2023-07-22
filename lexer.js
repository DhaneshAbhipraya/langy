/// <reference path="lexer.d.ts" />

// Define the Token class to hold token information
class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

// Define the TokenRule class to represent a rule for tokenizing
class TokenRule {
    constructor(type, pattern) {
        this.type = type;
        this.pattern = pattern;
    }
}

const TokenType = {
    reservedNames: ['def', 'get', 'reservedNames'],
    def(type) {
        if (this.reservedNames.includes(type.replace('_', ' ').trim())) {
            type = "_" + type;
        }
        this[type] = Object.keys(this).length;
        return this[type];
    },
    get(type) {
        if (this.reservedNames.includes(type.replace('_', ' ').trim())) {
            type = "_" + type;
        }
        return this[type];
    }
};

function getObjectItemFromValue(obj, targetValue) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === targetValue) {
            return { key, value: obj[key] };
        }
    }
    return null;
}

function defineTokenType(type) {
}

// Define the Lexer class
class Lexer {
    input;
    currentPosition;
    tokenRules;

    constructor(input, tokenRules) {
        this.input = input;
        this.currentPosition = 0;
        this.tokenRules = tokenRules;
    }

    // Method to retrieve the next token from the input source code
    getNextToken() {
        if (this.currentPosition >= this.input.length) {
            // End of input reached, return null to indicate no more tokens
            return null;
        }

        // Try to match the current position with each token rule's pattern
        for (const rule of this.tokenRules) {
            const match = this.input.slice(this.currentPosition).match(rule.pattern);
            if (match && match.index === 0) {
                // The current position matches the pattern of this rule
                const value = match[0];
                this.currentPosition += value.length;
                return new Token(rule.type, value);
            }
        }

        // If no token rule matches, skip the character and move to the next one
        this.currentPosition++;
        return this.getNextToken();
    }
}
