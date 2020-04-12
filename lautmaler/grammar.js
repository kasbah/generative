// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  function flatten (arr) {
    return flat(arr, [])
  }

  function flat(arr, res) {
    var i = 0, cur
    var len = arr.length;
    for (; i < len; i++) {
      cur = arr[i]
      Array.isArray(cur) ? flat(cur, res) : res.push(cur)
    }
    return res
  }

  const filter = d => d.filter(t => t !== null)

  const assignAll = objs => objs.reduce((prev, obj) => Object.assign(prev, obj))

  const nuller = () => null
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main$ebnf$1", "symbols": []},
    {"name": "main$ebnf$1$subexpression$1", "symbols": ["_", "word", "_"]},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "main$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main", "symbols": ["main$ebnf$1"], "postprocess": 
            function (d) {
        const words = filter(flatten(d))
              return {
                subjects: words.reduce((subjects, w) => subjects.concat(w.subject ? w.subject : []), []),
                verbs: words.reduce((verbs, w) => verbs.concat(w.verb ? w.verb : []), [])
              }
            }
        },
    {"name": "word", "symbols": ["subject"], "postprocess": d => ({subject: flatten(d)})},
    {"name": "word", "symbols": ["verb"], "postprocess": d => ({verb: flatten(d)})},
    {"name": "subject$string$1", "symbols": [{"literal":"n"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "subject", "symbols": ["subject$string$1"]},
    {"name": "subject$string$2", "symbols": [{"literal":"k"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "subject", "symbols": ["subject$string$2"]},
    {"name": "subject$string$3", "symbols": [{"literal":"d"}, {"literal":"i"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "subject", "symbols": ["subject$string$3"]},
    {"name": "verb$string$1", "symbols": [{"literal":"f"}, {"literal":"l"}, {"literal":"i"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "verb", "symbols": ["verb$string$1"]},
    {"name": "verb$string$2", "symbols": [{"literal":"f"}, {"literal":"l"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "verb", "symbols": ["verb$string$2"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": () => null},
    {"name": "__$ebnf$1", "symbols": [/[\s]/]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": () => null}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
