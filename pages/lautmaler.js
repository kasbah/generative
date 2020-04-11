import React, {Component, useState} from "react"
import Head from "next/head"
import Link from "next/link"

import Meta from "../components/Meta"
import parse from "../lautmaler/parse"

const defaultText = "na ke di."

export default function Lautmaler(props) {
  const [tree, setTree] = useState(parse(defaultText))
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
            onChange={(e) => setTree(parse(e.target.value))}
            rows="10"
            cols="40"
            placeholder={defaultText}
          />
        </div>
        <div>
          <pre>{JSON.stringify(tree, null, 2)}</pre>
        </div>
      </div>
      <div style={{flexGrow: 1, display: "flex", margin: 10}}>
        <svg
          id="svg"
          width="100%"
          viewBox={getViewBox(tree)}
          xmlns="http://www.w3.org/2000/svg"
        >
          {tree &&
            tree.map &&
            tree.map((line, i) =>
              line.subjects.map((s, j) => (
                <g transform={`translate(${110 * j} ${110 * i})`}>{shape(s)}</g>
              ))
            )}
        </svg>
      </div>
    </div>
  )
}

function getViewBox(tree) {
  const columns = tree.reduce(
    (columns, sentence) => Math.max(columns, sentence.subjects.length),
    0
  )
  const rows = tree.length
  return `0 0 ${columns * 110} ${rows * 110}`
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
