import React from "react"
import {
  renderWithPaperScope,
  PaperContainer,
  Circle,
  Tool,
} from "@psychobolt/react-paperjs"

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
