import React from "react"
import {Input} from "semantic-ui-react"
import Slider from "rc-slider"

export default function NumberInput(props) {
  function onChange(v) {
    v = Math.max(v, props.min == null ? 0 : props.min)
    v = Math.min(v, props.max == null ? 100 : props.max)
    props.onChange(v)
  }
  return (
    <div style={{marginTop: 10}}>
      <div>{props.label + " "}</div>
      <Input
        size="mini"
        type="number"
        value={props.value}
        onChange={(e, t) => onChange(t.value)}
        style={{marginBottom: 3}}
      />
      <Slider
        min={props.min == null ? 0 : props.min}
        max={props.max == null ? 100 : props.max}
        value={props.value || props.min || 0}
        onChange={onChange}
      />
    </div>
  )
}
