const nearley = require("nearley")
const grammar = require("./grammar")

function parse(str, {returnIgnored} = {}) {
  const lines = str.split("\n").map((s) => s.trim())
  const sentences = []
  for (const line of lines) {
    const parser = new nearley.Parser(
      grammar.ParserRules,
      grammar.ParserStart,
      {
        keepHistory: true,
      }
    )
    try {
      parser.feed(line)
    } catch (e) {
      console.error(e)
    }
    if (parser.results && parser.results[0] != null) {
      sentences.push(parser.results[0])
    }
  }
  return sentences
}

module.exports = parse
