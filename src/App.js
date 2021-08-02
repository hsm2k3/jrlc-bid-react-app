import './App.css';
import { Nav, Accordion, Card, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function App() {
  useEffect(() => {
    //TODO:: Fetch data
  }, []);

  const [selectedTab, updateSelectedTab] = useState("rh1");
  let pageToRender = null;
  switch (selectedTab) {
    case 'rh1':
      pageToRender = <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>RH 1: Opening the ark</div><div>Current highest bid: $18.00</div></div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body><div>Any needed details for opening the ark?</div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button>Place bid</Button></div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>First aliyah</div><div>Current highest bid: $36.00</div></div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body><div>Any needed details for first aliyah?</div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button>Place bid</Button></div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>Second aliyah</div><div>Current highest bid: $54.00</div></div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body><div>Any needed details for second aliyah?</div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button>Place bid</Button></div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="3">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>Third aliyah</div><div>Current highest bid: $72.00</div></div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body><div>Any needed details for third aliyah?</div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button>Place bid</Button></div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>;
      break;
    case 'rh2':
      pageToRender = <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>RH 2: Opening the ark</div><div>Current highest bid: $72.00</div></div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body><div>Any needed details for opening the ark?</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button>Place bid</Button></div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>First aliyah</div><div>Current highest bid: $54.00</div></div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body><div>Any needed details for first aliyah?</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button>Place bid</Button></div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="2">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>Second aliyah</div><div>Current highest bid: $36.00</div></div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="2">
          <Card.Body><div>Any needed details for second aliyah?</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button>Place bid</Button></div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="3">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>Third aliyah</div><div>Current highest bid: $18.00</div></div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="3">
          <Card.Body><div>Any needed details for third aliyah?</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button>Place bid</Button></div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>;
      break;
    case 'yk':
      pageToRender = <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>YK: Opening the ark</div><div>Current highest bid: $18.00</div></div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body><div>Any needed details for opening the ark?</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button>Place bid</Button></div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>First aliyah</div><div>Current highest bid: $72.00</div></div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body><div>Any needed details for first aliyah?</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button>Place bid</Button></div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="2">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>Second aliyah</div><div>Current highest bid: $36.00</div></div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="2">
          <Card.Body><div>Any needed details for second aliyah?</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button>Place bid</Button></div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="3">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><div>Third aliyah</div><div>Current highest bid: $54.00</div></div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="3">
          <Card.Body><div>Any needed details for third aliyah?</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button>Place bid</Button></div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>;
      break;
    default:
      pageToRender = null;
  }
  return (
    <div>
      <Nav
        activeKey={selectedTab}
        onSelect={updateSelectedTab}
        variant="tabs"
        justify
      >
        <Nav.Item>
          <Nav.Link eventKey="rh1">Rosh Hashanah Day 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="rh2">Rosh Hashanah Day 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="yk">Yom Kippur</Nav.Link>
        </Nav.Item>
      </Nav>
      {pageToRender}
    </div>
  );
}

export default App;
