import React, {Component} from "react"
import Head from "next/head"
import Link from "next/link"
import _ from "lodash"
import * as semantic from "semantic-ui-react"
import ColorPicker from "rc-color-picker"
import * as fileDownload from "js-file-download"

import "seedrandom"

import NumberInput from "../components/NumberInput"
import Meta from "../components/Meta"

export default class App extends Component {
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
    let svg = (
      <svg
        id="svg"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100%" height="100%" fill={backgroundColor} />
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
    )
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Head>
          <title>squares - generative.monostable.co.uk</title>
          <Meta
            title="squares"
            description="Generative art by Kaspar Emanuel"
            image="https://generative.monostable.co.uk/static/squares_full.png"
            imageWidth="635"
            imageHeight="635"
          />
        </Head>
        <div style={{overflow: "auto", flexGrow: "1"}}>{svg}</div>
        <div style={{minWidth: 230, maxWidth: 200, margin: 20}}>
          <Link href="/">
            <semantic.Button basic as="a">
              <semantic.Icon name="left arrow" />
              See more projects
            </semantic.Button>
          </Link>
          <semantic.Button
            style={{marginTop: 10}}
            onClick={() => {
              let s = new XMLSerializer()
              let svg = document.getElementById("svg")
              let str = s.serializeToString(svg)
              str =
                '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' + str
              fileDownload(str, "squares.svg")
            }}
          >
            <semantic.Icon name="download" />
            Download
          </semantic.Button>
          <semantic.Button.Group inverted color="blue" style={{marginTop: 10}}>
            <semantic.Button onClick={() => this.setState(this.default)}>
              <semantic.Icon name="repeat" />
              Reset
            </semantic.Button>
            <semantic.Button
              onClick={() => this.setState({seed: Math.random()})}
            >
              <semantic.Icon name="react" />
              Regenerate
            </semantic.Button>
          </semantic.Button.Group>
          <NumberInput
            label="Rows:"
            max={100}
            value={y}
            debounce
            onChange={v => this.setState({y: v})}
          />
          <NumberInput
            label="Columns:"
            max={100}
            value={x}
            debounce
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
            min={-100}
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
          <a href="https://github.com/kasbah/generative/blob/master/pages/squares.js">
            source code
          </a>
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
      let stroke =
        ir * jr > props.highlightThreshold / 1000
          ? props.highlightColor
          : props.squareColor
      return _.range(props.numberOfInnerSquares + 1).map(k => {
        let kr = random()
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
              fill: "none",
              strokeWidth: kr * 6,
              stroke
            }}
          />
        )
      })
    })
  })
}
