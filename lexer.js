// parser: instead of linear array of items, it turns it all into a tree 
// easel.hackclub.com

const TOKEN_TYPES = {
    LeftBrace: 'LeftBrace',
    RightBrace: 'RightBrace',
    LeftBracket: 'LeftBracket',
    RightBracket: 'RightBracket',
    LeftParen: 'LeftParen',
    RightParen: 'RightParen',
    Keyword: 'Keyword',
    Identifier: 'Identifier',
    Number: 'Number',
    String: 'String',
    Period: 'Period',
    Plus: 'Plus',
    Minus: 'Minus',
    Star: 'Star',
    Slash: 'Slash',
    EoF: 'EoF',
}

const KEYWORDS = [
    "prepare",
    "as",
    "if",
    "elif",
    "else",
    "while",
    "loop",
    "through",
]

class Token {
    constructor(type, kind, value) {
        this.type = type
        this.kind = kind
        this.value = value
    }
}

export class Lexer {
    constructor(program) {
        this.program = program
        this.tokens = []
        this.current = 0
        this.line = 1
        this.column = 0
    }

    peek() {
        if (this.current >= this.program.length)
            return '\0'
        return this.program[this.current]
    }

    advance () {
        if(this.current >= this.program.length)
            return "\0"
            return this.program[this.current++]
    }

    scanToken() {
        let char = this.advance ()

        function isdigit (char) {
            return char >= "0" && char <= "9"
        }

        function isalpha (char) {
            return char.toLowerCase() >= "a" && char.toLowerCase() <= "z"
        }

        switch (char) {
            case "(":
                return this.tokens.push(new Token
                (TOKEN_TYPES.LeftParen, "(", "("))
            case ")":
                return this.tokens.push(new Token
                (TOKEN_TYPES.RightParen, ")", ")"))
            case "[":
                return this.tokens.push(new Token
                (TOKEN_TYPES.LeftBracket, "[", "["))
            case "]":
                return this.tokens.push(new Token
                (TOKEN_TYPES.RightBracket, "]", "]"))
            case "{":
                return this.tokens.push(new Token
                (TOKEN_TYPES.LeftBrace, "{", "{"))
            case "}":
                return this.tokens.push(new Token
                (TOKEN_TYPES.RightBrace, "}", "}"))
            case "+":
                return this.tokens.push(new Token
                (TOKEN_TYPES.Plus, "+", "+"))
            case "-":
                return this.tokens.push(new Token
                (TOKEN_TYPES.Minus, "-", "-"))
            case "*":
                return this.tokens.push(new Token
                (TOKEN_TYPES.Star, "*", "*"))
            case "/":
                return this.tokens.push(new Token
                (TOKEN_TYPES.Slash, "/", "/"))
            case ".":
                return this.tokens.push(new Token
                (TOKEN_TYPES.Period, ".", "."))
            // multiple values for Number 
            case "'":
            case '"' : {
                let string = []
                while (this.peek() != char) {
                    string.push(this.advance())
                    if (this.peek() = '/0')
                        // string wasn't closed
                    this.error('Unexpected end of file; expected a closing quote')
                }
                this.advance() // skipping closing quote
                string = string.join('')
                return this.tokens.push(
                    newToken(TOKENS.String, string, string, this.line, this.column)
                )
            }

            match(char) {
                if(this.peek() == char) return this.advance()
                    return false
            }

            case '|': {
                if(this.match'|'))
                    return this.tokens.push(
                new Token(TOKENS.Or, '||', '||', this.line, this.column)
                )
            }

            // include other cases, for instance case '<' from text box cuz..

            return
            default:
                if (isdigit(char)) {
                    let number = [char]
                    while(isdigit(this.peek()) || 
                    (!number.includes(".") && char == ".")) {
                        number.push(this.advance())
                    }
                    return this.tokens.push (
                    new Token(TOKEN_TYPES.Number, 
                        number.join(''),
                        Number(number.join(''))
                    )
                    
                )
                } else if (isalpha(char)) {
                    let chars = [char]
                    while(isalpha(this.peek())) {
                        chars.push(this.advance())
                    }
                    // is it a keyword or an identifier?
                    chars = chars.join("")
                    if (KEYWORDS.includes(chars)) {
                        return this.tokens.push (
                            new Token(TOKEN_TYPES.Keyword, chars, chars)
                        )
                    } else {
                        return this.tokens.push(
                            newToken(TOKEN_TYPES.Identifier, chars, chars)
                        )
                    }
                }
        }
    }

    scanTokens() {
        while(this.peek() !== "\0") this.scanToken ()
            this.tokens.push(newTokens (TOKENS.EoF, '\0', '\0'))
            return this.tokens
    }
}