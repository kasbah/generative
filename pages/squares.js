import React, {Component} from "react"
import _ from "lodash"
import * as semantic from "semantic-ui-react"
import Slider, {Range} from "rc-slider"
import "rc-slider/assets/index.css"
import "semantic-ui-css/semantic.min.css"

class App extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      x: 11,
      y: 11,
      size: 50,
      border: 10,
      gap: 5,
      numberOfInnerSquares: 4
    }
  }
  setNumberOfSquares = n => {
    n = Math.min(n, 50)
    n = Math.max(n, 0)
    this.setState({numberOfInnerSquares: n})
  }
  render() {
    let {x, y, size, border, gap, numberOfInnerSquares} = this.state
    let width = border * 2 + x * (size + gap)
    let height = border * 2 + y * (size + gap)
    let reduction = size / (numberOfInnerSquares + 1)
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
              reduction={reduction}
              numberOfInnerSquares={numberOfInnerSquares}
            />
          </svg>
        </div>
        <div style={{minWidth: 200, maxWidth: 200, margin: 20}}>
          Number of inner squares:{" "}
          <semantic.Input
            type="number"
            value={numberOfInnerSquares || 0}
            onChange={(e, t) => this.setNumberOfSquares(t.value)}
          />
          <Slider
            max={50}
            value={numberOfInnerSquares || 0}
            onChange={this.setNumberOfSquares}
          />
          Square size:{" "}
          <semantic.Input
            type="number"
            value={size}
            onChange={(e, t) => this.setState({size: t.value})}
          />
          <Slider
            max={200}
            value={size}
            onChange={v => this.setState({size: v})}
          />
        </div>
      </div>
    )
  }
}

function NumberInput(props) {
  return <>{props.label}</>
}

function Squares(props) {
  return _.range(props.x).map(i => {
    let ir = Math.random()
    return _.range(props.y).map(j => {
      let jr = Math.random()
      return _.range(props.numberOfInnerSquares + 1).map(k => {
        let kr = Math.random()
        return (
          <rect
            width={props.size - props.reduction * k}
            height={props.size - props.reduction * k}
            x={
              props.border +
              (props.reduction / 2) * k +
              i * (props.size + props.gap) +
              jr * 10
            }
            y={
              props.border +
              (props.reduction / 2) * k +
              j * (props.size + props.gap) +
              ir * 10
            }
            style={{
              fill: "rgba(0, 0, 0, 0)",
              strokeWidth: kr * 6,
              stroke: ir * jr > 0.8 ? "#FD5F00" : "black"
            }}
          />
        )
      })
    })
  })
}

export default App
