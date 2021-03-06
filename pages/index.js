import Link from "next/link"
import Head from "next/head"
import {Container, Segment, List, Image} from "semantic-ui-react"
import Meta from "../components/Meta"

export default () => (
  <Container style={{marginTop: 100}}>
    <Head>
      <title>generative.monostable.co.uk</title>
      <Meta
        title="generative.monostable.co.uk"
        description="Generative art by Kaspar Emanuel"
        image="https://generative.monostable.co.uk/static/squares_full.png"
        imageWidth="635"
        imageHeight="635"
      />
    </Head>
    <Segment>
      <List selection verticalAlign="middle">
        <Link href="/squares">
          <List.Item as="a">
            <Image src="/static/squares_thumb.png" />

            <List.Content>
              <List.Header>squares</List.Header>
            </List.Content>
          </List.Item>
        </Link>
        <List.Item disabled>
          <List.Content>More to come...</List.Content>
        </List.Item>
        <List.Item as="a" href="/feed.xml">
          <List.Content>subscribe rss</List.Content>
        </List.Item>
        <List.Item as="a" href="https://monostable.co.uk">
          <List.Content>monostable.co.uk</List.Content>
        </List.Item>
      </List>
    </Segment>
  </Container>
)
