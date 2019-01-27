import React, {Component} from "react"
import _ from "lodash"
import * as semantic from "semantic-ui-react"
import ColorPicker from "rc-color-picker"

import "seedrandom"

import NumberInput from "../components/NumberInput"

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
      backgroundColor: "white",
      highlightColor: "#FD5F00",
      squareColor: "black",
      highlightThreshold: 800,
      freedom: 10,
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
      backgroundColor,
      squareColor,
      highlightThreshold,
      freedom,
      seed
    } = this.state
    let border = 10
    let width = border * 2 + x * (size + gap) + freedom
    let height = border * 2 + y * (size + gap) + freedom
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <div style={{overflow: "auto", flexGrow: "1"}}>
          <svg style={{backgroundColor}} width={width} height={height}>
            <Squares
              x={x}
              y={y}
              size={size}
              border={border}
              gap={gap}
              highlightColor={highlightColor}
              squareColor={squareColor}
              numberOfInnerSquares={numberOfInnerSquares}
              backgroundColor={backgroundColor}
              highlightThreshold={highlightThreshold}
              freedom={freedom}
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
          <NumberInput
            label="Square freedom"
            max={1000}
            value={freedom}
            onChange={v => this.setState({freedom: v})}
          />
          <NumberInput
            label="Highlight threshold"
            min={0}
            max={1000}
            value={highlightThreshold}
            onChange={v => this.setState({highlightThreshold: v})}
          />
          <div style={{display: "flex", marginTop: 20}}>
            <ColorPicker
              color={highlightColor}
              onChange={({color}) => this.setState({highlightColor: color})}
              placement="topLeft"
              enableAlpha={false}
            >
              <span className="rc-color-picker-trigger" />
            </ColorPicker>
            <span style={{margin: 5}}>Highlight color</span>
          </div>
          <div style={{display: "flex"}}>
            <ColorPicker
              color={backgroundColor}
              onChange={({color}) => this.setState({backgroundColor: color})}
              placement="topLeft"
              enableAlpha={false}
            >
              <span className="rc-color-picker-trigger" />
            </ColorPicker>
            <span style={{margin: 5}}>Background color</span>
          </div>
          <div style={{display: "flex"}}>
            <ColorPicker
              color={squareColor}
              onChange={({color}) => this.setState({squareColor: color})}
              placement="topLeft"
              enableAlpha={false}
            >
              <span className="rc-color-picker-trigger" />
            </ColorPicker>
            <span style={{margin: 5}}>Square color</span>
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

function Squares(props) {
  let random = new Math.seedrandom(props.seed)
  let reduction = props.size / (props.numberOfInnerSquares + 1)
  return _.range(props.x).map(i => {
    let ir = random()
    return _.range(props.y).map(j => {
      let jr = random()
      return _.range(props.numberOfInnerSquares + 1).map(k => {
        let kr = random()
        let stroke =
          ir * jr > props.highlightThreshold / 1000
            ? props.highlightColor
            : props.squareColor
        return (
          <rect
            key={`${i}${j}${k}`}
            width={props.size - reduction * k}
            height={props.size - reduction * k}
            x={
              props.border +
              (reduction / 2) * k +
              i * (props.size + props.gap) +
              jr * props.freedom
            }
            y={
              props.border +
              (reduction / 2) * k +
              j * (props.size + props.gap) +
              ir * props.freedom
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
