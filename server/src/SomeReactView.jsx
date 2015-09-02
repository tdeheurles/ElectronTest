import React  from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import SomeViewModel from './SomeViewModel.js'

export default class SomeReactView extends React.Component {
  constructor(props) {
    super(props);

    const someViewModel = new SomeViewModel([0,0,0, 0,0,0, 0,0,0,
                                             0,0,0, 0,0,0, 0,0,0,
                                             0,0,0, 0,0,0, 0,0,0,
                                             0,0,0, 0,0,0, 0,0,0 ])
    this.state = {
      someViewModel: someViewModel
    };
  }
  
  executionTimeRequire = (name) => { return require(name) }

  componentWillMount() {
    var ipc = this.executionTimeRequire('ipc')  
    ipc.on('update', (datas) => {
      let newViewModel = this.state.someViewModel
      newViewModel.elements = datas
      this.setState({someViewModel: newViewModel});
    })
    ipc.send('give_it_to_me', 0)
  }

  render() {
    return (
      <Grid style={{'-webkit-app-region': 'drag'}}>
        <Row>
          <Col xs={1}>{this.state.someViewModel.elements[0]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[1]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[2]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[3]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[4]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[5]}</Col>
        </Row>
        <Row>
          <Col xs={1}>{this.state.someViewModel.elements[6]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[7]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[8]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[9]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[10]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[11]}</Col>
        </Row>
        <Row>
          <Col xs={1}>{this.state.someViewModel.elements[12]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[13]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[14]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[15]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[16]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[17]}</Col>
        </Row>
        <Row>
          <Col xs={1}>{this.state.someViewModel.elements[18]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[19]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[20]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[21]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[22]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[23]}</Col>
        </Row>
        <Row>
          <Col xs={1}>{this.state.someViewModel.elements[24]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[25]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[26]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[27]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[28]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[29]}</Col>
        </Row>
        <Row>
          <Col xs={1}>{this.state.someViewModel.elements[30]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[31]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[32]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[33]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[34]}</Col>
          <Col xs={1}>{this.state.someViewModel.elements[35]}</Col>
        </Row>
      </Grid>
     );
  }
}

React.render(
  <SomeReactView />,
  document.body 
);
