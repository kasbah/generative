import React, {Component} from "react"
import Head from "next/head"
import Link from "next/link"

import Meta from "../../components/Meta"
import parse from "./parse"

export default class App extends Component {
  constructor(...args) {
    super(...args)
    this.default = {
      tree: null,
    }
    this.state = this.default
  }
  render() {
    return (
      <>
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
        <textarea
          onChange={(e) => this.setState({tree: parse(e.target.value)})}
          rows="10"
          cols="80"
        />
        <pre>{JSON.stringify(this.state.tree, null, 2)}</pre>
      </>
    )
  }
}
