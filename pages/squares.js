import React, {Component} from "react"
import _ from "lodash"
import * as semantic from "semantic-ui-react"
import Slider, {Range} from "rc-slider"
import ColorPicker from "rc-color-picker"
import "seedrandom"
import "semantic-ui-css/semantic.min.css"
import "rc-slider/assets/index.css"
import "rc-color-picker/assets/index.css"

class App extends Component {
  constructor(...args) {
    super(...args)
    let saved
    this.default = {
      x: 11,
      y: 11,
      size: 50,
      gap: 5,
      highlightColor: "#FD5F00",
      numberOfInnerSquares: 4
    }
    this.state = this.default
    this.state.seed = Math.random()
  }
  render() {
    let {
      x,
      y,
      size,
      gap,
      numberOfInnerSquares,
      highlightColor,
      seed
    } = this.state
    let border = 10
    let width = border * 2 + x * (size + gap)
    let height = border * 2 + y * (size + gap)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <div style={{overflow: "auto", flexGrow: "1"}}>
          <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
            <Squares
              x={x}
              y={y}
              size={size}
              border={border}
              gap={gap}
              highlightColor={highlightColor}
              numberOfInnerSquares={numberOfInnerSquares}
              seed={seed}
            />
          </svg>
        </div>
        <div style={{minWidth: 200, maxWidth: 200, margin: 20}}>
          <NumberInput
            label="Rows:"
            max={500}
            value={y}
            onChange={v => this.setState({y: v})}
          />
          <NumberInput
            label="Columns:"
            max={500}
            value={x}
            onChange={v => this.setState({x: v})}
          />
          <NumberInput
            label="Number of inner squares:"
            max={50}
            value={numberOfInnerSquares}
            onChange={v => this.setState({numberOfInnerSquares: v})}
          />
          <NumberInput
            label="Square size (px):"
            max={500}
            value={size}
            onChange={v => this.setState({size: v})}
          />
          <NumberInput
            label="Gap between squares (px):"
            min={-500}
            max={500}
            value={gap}
            onChange={v => this.setState({gap: v})}
          />
          <div style={{display: "flex", marginTop: 20}}>
            <span style={{marginRight: 5}}>Highlight color:</span>
            <ColorPicker
              color={highlightColor}
              onChange={({color}) => this.setState({highlightColor: color})}
              placement="topLeft"
              className="some-class"
            >
              <span className="rc-color-picker-trigger" />
            </ColorPicker>
          </div>
          <div style={{marginTop: 20}}>
            <semantic.Button onClick={() => this.setState(this.default)}>
              reset
            </semantic.Button>
            <semantic.Button
              onClick={() => this.setState({seed: Math.random()})}
            >
              regenerate
            </semantic.Button>
          </div>
        </div>
      </div>
    )
  }
}


function NumberInput(props) {
  function onChange(v) {
    v = Math.max(v, props.min || 0)
    v = Math.min(v, props.max == null ? 100 : props.max)
    props.onChange(v)
  }
  return (
    <div style={{marginTop: 10}}>
      <div>{props.label + " "}</div>
      <semantic.Input
        size="mini"
        type="number"
        value={props.value}
        onChange={(e, t) => onChange(t.value)}
        style={{marginBottom: 3}}
      />
      <Slider
        min={props.min || 0}
        max={props.max || 100}
        value={props.value || props.min || 0}
        onChange={onChange}
      />
    </div>
  )
}

function Squares(props) {
  let random = new Math.seedrandom(props.seed)
  let reduction = props.size / (props.numberOfInnerSquares + 1)
  return _.range(props.x).map(i => {
    let ir = random()
    return _.range(props.y).map(j => {
      let jr = random()
      return _.range(props.numberOfInnerSquares + 1).map(k => {
        let kr = random()
        let stroke = ir * jr > 0.8 ? props.highlightColor : "black"
        return (
          <rect
            key={`${i}${j}${k}`}
            width={props.size - reduction * k}
            height={props.size - reduction * k}
            x={
              props.border +
              (reduction / 2) * k +
              i * (props.size + props.gap) +
              jr * 10
            }
            y={
              props.border +
              (reduction / 2) * k +
              j * (props.size + props.gap) +
              ir * 10
            }
            style={{
              fill: "rgba(0, 0, 0, 0)",
              strokeWidth: kr * 6,
              stroke
            }}
          />
        )
      })
    })
  })
}

export default App
