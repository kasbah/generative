import Link from "next/link"
import {Container, Segment, List, Image} from "semantic-ui-react"

export default () => (
  <Container style={{marginTop: 100}}>
    <Segment>
      <List selection verticalAlign="middle">
        <Link href="/squares">
          <List.Item as="a">
            <Image src="/static/squares.png" />

            <List.Content>
              <List.Header>squares</List.Header>
            </List.Content>
          </List.Item>
        </Link>
        <List.Item disabled>
          <List.Content>More to come...</List.Content>
        </List.Item>
      </List>
    </Segment>
  </Container>
)
