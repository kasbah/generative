main -> (verb __):* subject (__ subject):* {%
    function ([verb, subject, subjects]) {
      return {
        subjects: subject.concat(filter(flatten(subjects))),
        verbs: filter(flatten(verb)),
      }
    }
%}

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
