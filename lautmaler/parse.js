const nearley = require('nearley')
const grammar = require('./grammar')

function parse(str, {returnIgnored} = {}) {
  const parser = new nearley.Parser(
    grammar.ParserRules,
    grammar.ParserStart,
    {keepHistory: true}
  )
  try {
    parser.feed(str)
    return parser.results[0] || []
  } catch (e) {
    console.error(e)
  }
  return []
}

module.exports = parse
