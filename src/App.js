import React, { Component } from 'react';
import { Segment, Card } from 'semantic-ui-react';

const request = require('request');

class App extends Component {
  componentDidMount() {
    request(
      'https://feeds.bbci.co.uk/news/rss.xml',
      (error, response, body) => {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
      },
    );
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
