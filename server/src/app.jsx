import React from 'react';
import Tile   from './Tile'
import { Button, ButtonGroup, 
         Grid, Row, Col, 
         OverlayTrigger,
         Label
       }        from 'react-bootstrap';

React.render(
  <Grid>
    <Row className='show-grid'>
      <Col xs={1} md={4}></Col>
      <Col xs={10} md={4} className="text-center">
        Shin Test
      </Col>
      <Col xs={1} md={4}></Col>
    </Row>

    <Row className='show-grid'>
      <Col xs={4} md={4}></Col>
      <Col xs={4} md={4}>
        <ButtonGroup>
          <Tile Title="Window1" />
          <Tile Title="Window2" />
          <Tile Title="Window3" />
        </ButtonGroup>
      </Col>
      <Col xs={4} md={4}></Col>
    </Row>
  </Grid>, 
  document.body 
);
