import React, { Component } from 'react';
import { Segment, Card } from 'semantic-ui-react';

const request = require('request');

class App extends Component {
  componentDidMount() {
    request('http://localhost:3001/bbc', (error, response, body) => {
      console.log('body:', body);
    });
    request('http://localhost:3001/npr', (error, response, body) => {
      console.log('body:', body);
    });
  }
  render() {
    return (
      <Segment>
        <Card>
          <Card.Header>what up</Card.Header>
          <Card.Content>world</Card.Content>
        </Card>
      </Segment>
    );
  }
}

export default App;
