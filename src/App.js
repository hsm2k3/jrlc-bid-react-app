import './App.css';
import { Nav, Navbar, Spinner, Toast } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import BiddingTabContent from './BiddingTabContent';
import InputBidForm from './InputBidForm';
import JRLCLogo from './JRLCLogo.png';
import axios from 'axios';

function App() {
  const [selectedTab, updateSelectedTab] = useState(undefined);
  const [inputBidFormProps, updateInputBidFormProps] = useState({ show: false, biddingItem: {}, selectedDay: '' });
  const [toastProps, updateToastProps] = useState({ show: false, header: '', body: '' });
  const [data, updateData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/api/bids')
      .then(({ data }) => {
        updateData(data);
        const localSelectedTab = localStorage.getItem('selectedTabKey');
        if (localSelectedTab && data.find(({ key }) => String(key) === localSelectedTab)) {
          updateSelectedTab(localSelectedTab);
        } else {
          localStorage.setItem('selectedTabKey', data[0]?.key);
          updateSelectedTab(data[0]?.key);
        }
      });
  }, []);

  function onPlaceBidClick(biddingItem = {}, selectedDay = '') {
    updateInputBidFormProps({ show: !inputBidFormProps.show, biddingItem, selectedDay });
  }

  async function onFetchDataAndRetreiveBiddingItem() {
    let selectedBid = null;
    await axios.get('http://localhost:8000/api/bids')
      .then(({ data }) => {
        updateData(data);
        const selectedDayBiddingItems = data.find(({ key }) => String(key) === selectedTab)?.biddingItems;
        if (selectedDayBiddingItems) {
          selectedBid = selectedDayBiddingItems.find(({ aliyah }) => aliyah === inputBidFormProps.biddingItem.aliyah);
          if (selectedBid) {
            updateInputBidFormProps({ show: inputBidFormProps.show, biddingItem: selectedBid, selectedDay: inputBidFormProps.selectedDay });
          }
        }
      });
      return selectedBid;
  }

  function onShowToast(header, body) {
    updateToastProps({ show: true, header, body });
  }

  return (
    <>
      <Navbar bg="light">
        <Navbar.Brand></Navbar.Brand>
        <img src={JRLCLogo} alt="JRLC" />
      </Navbar>
      {selectedTab !== undefined ?
        <>
          <Nav
            activeKey={selectedTab}
            onSelect={key => { localStorage.setItem('selectedTabKey', key); updateSelectedTab(key); }}
            variant="pills"
            fill
            style={{ fontSize: 'larger' }}
          >
            {data.map(({ key, title }) =>
              <Nav.Item key={key}><Nav.Link eventKey={key}>{title}</Nav.Link></Nav.Item>)}
          </Nav>
          <BiddingTabContent data={data.find(({ key }) => String(key) === String(selectedTab))} onPlaceBidClick={onPlaceBidClick} />
        </>
        :
        <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
          <Spinner animation="border" variant="primary">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      }
      {inputBidFormProps.show &&
        <InputBidForm
          show={inputBidFormProps.show}
          onHide={() => updateInputBidFormProps({ show: !inputBidFormProps.show, biddingItem: {}, selectedDay: '' })}
          biddingItem={inputBidFormProps.biddingItem}
          selectedDay={inputBidFormProps.selectedDay}
          selectedTab={selectedTab}
          onFetchDataAndRetreiveBiddingItem={onFetchDataAndRetreiveBiddingItem}
          onShowToast={onShowToast}
        />}
      <Toast
        style={{
          position: 'fixed',
          top: 15,
          right: 10,
        }}
        onClose={() => updateToastProps({ show: false, header: '', body: '' })}
        show={toastProps.show}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">{toastProps.header}</strong>
        </Toast.Header>
        <Toast.Body>{toastProps.body}</Toast.Body>
      </Toast>
    </>
  );
}

export default App;
