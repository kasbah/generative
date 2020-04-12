main -> (_ word _):* {%
    function (d) {
	  const words = filter(flatten(d))
      return {
        subjects: words.reduce((subjects, w) => subjects.concat(w.subject ? w.subject : []), []),
        verbs: words.reduce((verbs, w) => verbs.concat(w.verb ? w.verb : []), [])
      }
    }
%}

word -> 
    subject {% d => ({subject: flatten(d)}) %}
  | verb    {% d => ({verb: flatten(d)}) %}

subject -> "na" | "ke" | "di"

verb -> "fli" | "flo" 

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
