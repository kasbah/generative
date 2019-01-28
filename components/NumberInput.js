import React from "react"
import {Input} from "semantic-ui-react"
import Slider from "rc-slider"

export default class NumberInput extends React.Component {
  state = {temp: null}
  onInputChange = (e, t) => {
    clearTimeout(this.timer)
    let v = parseInt(t.value, 10)
    this.setTempValue(v)
    this.timer = setTimeout(() => {
      clearTimeout(this.timer)
      this.onChange(v)
    }, 500)
  }
  onChange = v => {
    v = Math.max(v, this.props.min == null ? 0 : this.props.min)
    v = Math.min(v, this.props.max == null ? 100 : this.props.max)
    this.props.onChange(v)
    this.setState({temp: null})
  }
  setTempValue = v => {
    this.setState({temp: v})
  }
  render() {
    let props = this.props
    let {temp} = this.state
    return (
      <div style={{marginTop: 10}}>
        <div>{props.label + " "}</div>
        <Input
          size="mini"
          type="number"
          value={temp != null ? temp : props.value || props.min || 0}
          onChange={this.onInputChange}
          style={{marginBottom: 3}}
        />
        <Slider
          min={props.min == null ? 0 : props.min}
          max={props.max == null ? 100 : props.max}
          value={temp != null ? temp : props.value || props.min || 0}
          onChange={this.setTempValue}
          onAfterChange={this.onChange}
        />
      </div>
    )
  }
}
