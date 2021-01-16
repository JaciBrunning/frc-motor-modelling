import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

class SimpleAccordion extends React.PureComponent {
  render() {
    return <Accordion defaultActiveKey="1">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          { this.props.title }
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            { this.props.children }
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  } 
}

export default SimpleAccordion;