import React, { Component } from 'react';
import { Segment, Card, Loader, Image, Input } from 'semantic-ui-react';

const uuidv4 = require('uuid/v4');
const request = require('request');

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      search: '',
      errors: [],
    };
  }

  componentDidMount() {
    request(
      { url: 'http://localhost:3001/bbc', json: true },
      (error, response, body) => {
        if (error) {
          return this.setState({ errors: [...this.state.errors, error] });
        }
        return this.setState({ results: [...this.state.results, ...body] });
      },
    );
    request(
      { url: 'http://localhost:3001/cnn', json: true },
      (error, response, body) => {
        if (error) {
          return this.setState({ errors: [...this.state.errors, error] });
        }
        return this.setState({ results: [...this.state.results, ...body] });
      },
    );
    request(
      { url: 'http://localhost:3001/npr', json: true },
      (error, response, body) => {
        if (error) {
          return this.setState({ errors: [...this.state.errors, error] });
        }
        return this.setState({ results: [...this.state.results, ...body] });
      },
    );
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { results, search } = this.state;
    const filteredResults = results.filter(
      article =>
        article.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        article.description.toLowerCase().indexOf(search.toLowerCase()) !== -1,
    );
    return (
      <div>
        {results.length === 0 ? (
          <Loader active />
        ) : (
          <Segment basic>
            <Segment basic>
              <Input
                id="search"
                icon="search"
                placeholder="Search"
                value={search}
                onChange={this.handleChange}
              />
            </Segment>
            <Card.Group>
              {filteredResults.map(article => (
                <Card key={uuidv4()} href={article.link} target="_blank">
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
