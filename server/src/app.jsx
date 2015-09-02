import React  from 'react';
import Tile   from './Tile.jsx'
import { Button, 
         Grid, Row, Col, 
         OverlayTrigger,
         Label
       }        from 'react-bootstrap';

React.render(
  <Grid>
    <Row>
      <Col xs={1} md={4}></Col>
      <Col xs={10} md={4} className="text-center">
        ElectronTest
      </Col>
      <Col xs={1} md={4}></Col>
    </Row>

    <Row>
      <Col xs={4} md={4}></Col>
      <Col xs={4} md={4}>
        <Tile Title="Create a RxWindow" />
      </Col>
      <Col xs={4} md={4}></Col>
    </Row>
  </Grid>, 
  document.body 
);
