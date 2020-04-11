import React, {Component} from "react"
import Head from "next/head"
import Link from "next/link"

import Meta from "../components/Meta"
import parse from "../lautmaler/parse"

export default class App extends Component {
  constructor(...args) {
    super(...args)
    this.default = {
      tree: parse("na ke di."),
    }
    this.state = this.default
  }
  render() {
    return (
      <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>
        <Head>
          <title>lautmaler - generative.monostable.co.uk</title>
          <Meta
            title="lautmaler"
            description=""
            image="https://generative.monostable.co.uk/static/squares_full.png"
            imageWidth="635"
            imageHeight="635"
          />
        </Head>
        <div
          style={{flexGrow: 1, display: "flex", flexWrap: "nowrap", margin: 10}}
        >
          <div style={{margin: 10}}>
            <textarea
              onChange={(e) => this.setState({tree: parse(e.target.value)})}
              rows="10"
              cols="40"
              placeholder="na ke di."
            />
          </div>
          <div>
            <pre>{JSON.stringify(this.state.tree, null, 2)}</pre>
          </div>
        </div>
        <div style={{flexGrow: 1, display: "flex", margin: 10}}>
          <svg id="svg" width="100%" xmlns="http://www.w3.org/2000/svg">
            {this.state.tree && this.state.tree.map &&
              this.state.tree.map((line) =>
                line.subjects.map((s, i) => (
                  <g transform={`translate(${110 * i} 0)`}>{shape(s)}</g>
                ))
              )}
          </svg>
        </div>
      </div>
    )
  }
}

function shape(s) {
  switch (s) {
    case "na":
      return <rect fill="black" width={100} height={100} />
    case "ke":
      return <polygon fill="black" points="0,100 50,0 100,100" />
    case "di":
      return <ellipse cx={50} cy={50} rx={50} fill="black" />
  }
}
