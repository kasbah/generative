import React, {Component} from "react"
import Head from "next/head"
import Link from "next/link"

import Meta from "../../components/Meta"

export default class App extends Component {
  constructor(...args) {
    super(...args)
    this.default = {}
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
        <div> hello </div>
      </>
    )
  }
}
