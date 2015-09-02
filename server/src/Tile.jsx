import React      from 'react';
import { Button } from 'react-bootstrap';

export default class Tile extends React.Component {
  executionTimeRequire = (name) => { return require(name) }

  createTile = (e) => {
    var ipc = this.executionTimeRequire('ipc')
    ipc.send('create_someReactView', null)
  }
  
  render() {
    return (
      <Button onClick={this.createTile}>{this.props.Title}</Button>
     );
  }
}