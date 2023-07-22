// Define token rules for a simple language with identifiers and numbers
const tokenRules = [
  new TokenRule(TokenType.def("identifier"), /^[a-zA-Z_][a-zA-Z0-9_]*/),
  new TokenRule(TokenType.def("number"), /^[0-9]+(\.[0-9]+)?/),
];

const sourceCode = 'var x=3;';
const lexer = new Lexer(sourceCode, tokenRules);

async function tokens() {
  let token = lexer.getNextToken();
  while (token) {
    console.log(token);
    console.log(`Type: ${getObjectItemFromValue(TokenType, token.type).key}, Value: ${token.value}`);
    token = lexer.getNextToken();
  }
}

tokens();
