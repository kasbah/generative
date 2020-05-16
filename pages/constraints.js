import React from "react"
import Head from "next/head"
import Link from "next/link"
import _ from "lodash"
import * as semantic from "semantic-ui-react"

import {
  renderWithPaperScope,
  PaperContainer,
  Circle,
  Layer,
  Tool,
} from "@psychobolt/react-paperjs"

const Shapes = () => (
  <Circle center={[120, 50]} radius={35} fillColor="#00FF00" />
)

const App = ({paper}) => {
  const [mousePos, setMousePos] = React.useState(paper.view.center)
  return (
    <div>
      <Tool
        onMouseMove={({event}) => {
          setMousePos([event.clientX, event.clientY])
        }}
      >
        <Circle center={mousePos} radius={35} fillColor="red" />
        <Layer>
          <Shapes />
        </Layer>
      </Tool>
    </div>
  )
}

export default (props) => (
  <PaperContainer>
    {renderWithPaperScope((paper) => (
      <App {...props} paper={paper} />
    ))}
  </PaperContainer>
)
