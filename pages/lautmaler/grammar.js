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
    {"name": "main$ebnf$1$subexpression$1", "symbols": ["sentence", "period", "_"]},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "main$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main", "symbols": ["main$ebnf$1"], "postprocess": ([sentences]) => sentences.map(s => filter(flatten(s))[0])},
    {"name": "period", "symbols": [{"literal":"."}], "postprocess": () => null},
    {"name": "sentence$ebnf$1", "symbols": []},
    {"name": "sentence$ebnf$1$subexpression$1", "symbols": ["__", "subject"]},
    {"name": "sentence$ebnf$1", "symbols": ["sentence$ebnf$1", "sentence$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sentence$ebnf$2", "symbols": []},
    {"name": "sentence$ebnf$2$subexpression$1", "symbols": ["__", "verb"]},
    {"name": "sentence$ebnf$2", "symbols": ["sentence$ebnf$2", "sentence$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sentence", "symbols": ["subject", "sentence$ebnf$1", "sentence$ebnf$2"], "postprocess": 
        function ([subject, subjects, verb]) {
          return {
            subjects: subject.concat(filter(flatten(subjects))),
            verb: filter(flatten(verb))[0]
          }
        }
          },
    {"name": "subject$string$1", "symbols": [{"literal":"b"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "subject", "symbols": ["subject$string$1"]},
    {"name": "subject$string$2", "symbols": [{"literal":"m"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "subject", "symbols": ["subject$string$2"]},
    {"name": "subject$string$3", "symbols": [{"literal":"n"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "subject", "symbols": ["subject$string$3"]},
    {"name": "subject$string$4", "symbols": [{"literal":"k"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "subject", "symbols": ["subject$string$4"]},
    {"name": "subject$string$5", "symbols": [{"literal":"d"}, {"literal":"i"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "subject", "symbols": ["subject$string$5"]},
    {"name": "verb$string$1", "symbols": [{"literal":"f"}, {"literal":"l"}, {"literal":"i"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "verb", "symbols": ["verb$string$1"]},
    {"name": "verb$string$2", "symbols": [{"literal":"f"}, {"literal":"l"}, {"literal":"o"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "verb", "symbols": ["verb$string$2"]},
    {"name": "verb$string$3", "symbols": [{"literal":"r"}, {"literal":"o"}, {"literal":"w"}, {"literal":"k"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "verb", "symbols": ["verb$string$3"]},
    {"name": "verb$string$4", "symbols": [{"literal":"r"}, {"literal":"a"}, {"literal":"w"}, {"literal":"k"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "verb", "symbols": ["verb$string$4"]},
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
