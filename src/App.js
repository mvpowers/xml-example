import React, { Component } from 'react';
import { Segment, Card, Loader, Image } from 'semantic-ui-react';

const request = require('request');

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  async componentDidMount() {
    await request(
      { url: 'http://localhost:3001/bbc', json: true },
      (error, response, body) => {
        this.setState({ results: [...this.state.results, ...body] });
      },
    );
    await request(
      { url: 'http://localhost:3001/cnn', json: true },
      (error, response, body) => {
        this.setState({ results: [...this.state.results, ...body] });
      },
    );
    await request(
      { url: 'http://localhost:3001/npr', json: true },
      (error, response, body) => {
        this.setState({ results: [...this.state.results, ...body] });
      },
    );
  }
  render() {
    const { results } = this.state;
    return (
      <div>
        {results.length === 0 ? (
          <Loader active />
        ) : (
          <Segment basic>
            <Card.Group>
              {results.map(article => (
                <Card key={article.title} href={article.link} target="_blank">
                  <Image src={article.thumbnail} />
                  <Card.Content>
                    <Card.Header>{article.title}</Card.Header>
                    <Card.Meta>{article.source}</Card.Meta>
                    <Card.Description>{article.description}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          </Segment>
        )}
      </div>
    );
  }
}

export default App;
