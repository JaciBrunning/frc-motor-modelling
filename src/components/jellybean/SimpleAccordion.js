import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import FAIcon from './FontAwesome';

class SimpleAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: "1" };
  }

  render() {
    var { title, children, ...props } = this.props;
    return <Accordion defaultActiveKey="1" onSelect={ e => this.setState({ selected: e }) } {...props}>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          <FAIcon size='lg' icon={ this.state.selected === "1" ? "caret-up" : "caret-down" } />
          &nbsp;
          { title }
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            { children }
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  } 
}

export default SimpleAccordion;