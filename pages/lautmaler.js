import React, {Component, useState} from "react"
import Head from "next/head"
import Link from "next/link"

import Meta from "../components/Meta"
import parse from "../lautmaler/parse"

const defaultText = ""

export default function Lautmaler(props) {
  const [text, setText] = useState(defaultText)
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
      <div style={{flexGrow: 1, display: "flex", margin: 10}}>
        <SvgTree tree={tree} />
      </div>
      <div
        style={{
          height: "25vh",
          display: "flex",
          flexWrap: "nowrap",
          width: "100%",
        }}
      >
        <textarea
          style={{width: "70%", margin: 10}}
          onChange={(e) => {
            setTree(parse(e.target.value))
            setText(e.target.value)
          }}
          rows="10"
          cols="40"
          value={text}
        />
        <div style={{width: "30%", maxHeight: "25vh", overflow: "auto"}}>
          <pre>{JSON.stringify(tree, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}

function SvgTree({tree}) {
  return (
    <svg
      id="svg"
      width="100%"
      height="70vh"
      viewBox={getViewBox(tree)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <SvgTreeBody tree={tree} />
    </svg>
  )
}

function SvgTreeBody({tree}) {
  const sentences = []
  let i = 0
  for (const {verbs, subjects} of tree) {
    const fli = verbs.includes("fli")
    let color = "black"
    let line = i
    if (fli) {
      color = "white"
      if (line > 0) {
        line -= 1
      }
    }
    sentences.push(
      <g transform={`translate(0 ${110 * line})`}>
        <Sentence color={color} verbs={verbs} subjects={subjects} />
      </g>
    )
    if (!fli) {
      i += 1
    }
  }
  return sentences
}

function Sentence({verbs, subjects, color}) {
  return subjects.map((word, j) => (
    <g transform={`translate(${112 * j} 0)`}>
      <Shape word={word} color={color} />
    </g>
  ))
}

function getViewBox(tree) {
  const columns = tree.reduce(
    (columns, sentence) => Math.max(columns, sentence.subjects.length),
    0
  )
  const rows = tree.filter((s) => !s.verbs.includes("fli")).length
  return `-1 -1 ${columns * 112} ${rows * 112}`
}

function Shape({word, color}) {
  switch (word) {
    case "na":
      return (
        <rect
          stroke="black"
          strokeWidth={1}
          fill={color}
          width={100}
          height={100}
        />
      )
    case "ke":
      return (
        <polygon
          stroke="black"
          strokeWidth={1}
          fill={color}
          points="0,100 50,0 100,100"
        />
      )
    case "di":
      return (
        <ellipse
          stroke="black"
          strokeWidth={1}
          cx={50}
          cy={50}
          rx={50}
          fill={color}
        />
      )
  }
}
