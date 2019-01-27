import React, {Component} from "react"
import _ from "lodash"
import * as semantic from "semantic-ui-react"
import Slider, {Range} from "rc-slider"
import "rc-slider/assets/index.css"
import "semantic-ui-css/semantic.min.css"

class App extends Component {
  render() {
    let x = 11
    let y = 11
    let size = 50
    let border = 10
    let gap = 5
    let width = border * 2 + x * (size + gap)
    let height = border * 2 + y * (size + gap)
    let numberOfInnerSquares = 5
    let reduction = size / numberOfInnerSquares
    return (
      <div className="App">
        <semantic.Sidebar.Pushable>
          <semantic.Sidebar
            as={semantic.Form}
            animation="push"
            icon="labeled"
            vertical
            visible={true}
            width="wide"
          >
            <Slider />
          </semantic.Sidebar>
          <semantic.Sidebar.Pusher>
            <semantic.Container>
              <svg
                viewBox={`0 0 ${width} ${height}`}
                width={width}
                height={height}
              >
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
            </semantic.Container>
          </semantic.Sidebar.Pusher>
        </semantic.Sidebar.Pushable>
      </div>
    )
  }
}

function Squares(props) {
  return _.range(props.x).map(i => {
    let ir = Math.random()
    return _.range(props.y).map(j => {
      let jr = Math.random()
      return _.range(props.numberOfInnerSquares).map(k => {
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
