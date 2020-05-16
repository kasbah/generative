import React from "react"
import {
  renderWithPaperScope,
  PaperContainer,
  Circle,
  Tool,
} from "@psychobolt/react-paperjs"

const LENGTH = 50

const App = ({paper}) => {
  const [mousePos, setMousePos] = React.useState(paper.view.center)
  const [ballPos, setBallPos] = React.useState(paper.view.center)
  return (
    <Tool
      onMouseMove={({event}) => {
        const mouse = new paper.Point(event.clientX, event.clientY)
        setMousePos(mouse)
        setBallPos((pos) => constrainDistance(pos, mouse, LENGTH))
      }}
    >
      <Circle
        center={mousePos}
        radius={LENGTH}
        strokeWidth={1}
        strokeColor="black"
      />
      <Circle
        center={ballPos}
        radius={5}
        strokeWidth={10}
        strokeColor="black"
      />
    </Tool>
  )
}

function constrainDistance(point, anchor, distance) {
  return point.subtract(anchor).normalize().multiply(distance).add(anchor)
}

export default (props) => {
  return (
    <PaperContainer
      canvasProps={{
        resize: "true",
        style: {width: "100%", height: "99.2vh", cursor: "none"},
      }}
    >
      {renderWithPaperScope((paper) => (
        <App {...props} paper={paper} />
      ))}
    </PaperContainer>
  )
}
