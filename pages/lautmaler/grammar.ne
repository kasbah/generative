main -> (sentence period _):* {% ([sentences]) => sentences.map(s => filter(flatten(s))[0]) %}

period -> "." {% () => null %}

sentence -> subject (__ subject):* (__ verb):* {%
    function ([subject, subjects, verb]) {
      return {
        subjects: subject.concat(filter(flatten(subjects))),
        verb: filter(flatten(verb))[0]
      }
    }
  %}

subject -> "ba" |  "ma" |  "na" | "ke" | "di"

verb -> "flip" | "flop" | "rowk" | "rawk"

# whitespace
_  -> [\s]:*  {% () => null %}
__ -> [\s]:+  {% () => null %}


@{%
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
%}
