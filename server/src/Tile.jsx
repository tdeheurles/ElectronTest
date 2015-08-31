import React      from 'react';
import { Button } from 'react-bootstrap';

export default class Tile extends React.Component {
  electronImport(name) {
    return require(name)
  }

  createTile(e) {
    var remote = electronImport('remote')
    var ipc = remote.electronImport('ipc')
    ipc.send('tile', "message")
  }
  
  render() {
    return (
      <Button onClick={this.createTile}>{this.props.Title}</Button>
     );
  }
}