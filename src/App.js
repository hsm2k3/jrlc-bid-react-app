import './App.css';
import { Nav, Navbar } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import BiddingTabContent from './BiddingTabContent';
import InputBidForm from './InputBidForm';
import JRLCLogo from './JRLCLogo.png';

function App() {
  const [selectedTab, updateSelectedTab] = useState(undefined);
  const [inputBidFormProps, updateInputBidFormProps] = useState({ show: false, biddingItem: {}, selectedDay: '' });
  const [data, updateData] = useState([]);
  useEffect(() => {
    const returnedData = [
      {
        key: 'rh1', title: 'Rosh Hashanah Day 1', biddingItems: [
          { key: 'rh1-1', title: 'Shaharis (morning prayers) - Opening the ark', highestBid: 10, details: 'Any details for opening the ark?' },
          { key: 'rh1-2', title: 'Shaharis (morning prayers) - First aliyah', highestBid: 20, details: 'Any details for the first aliyah?' },
          { key: 'rh1-3', title: 'Shaharis (morning prayers) - Second aliyah', highestBid: 30, details: 'Any details for the second aliyah?' },
          { key: 'rh1-4', title: 'Shaharis (morning prayers) - Third aliyah', highestBid: 40, details: 'Any details for the third aliyah?' },
        ]
      },
      {
        key: 'rh2', title: 'Rosh Hashanah Day 2', biddingItems: [
          { key: 'rh2-1', title: 'Shaharis (morning prayers) - Opening the ark', highestBid: 40, details: 'Any details for opening the ark?' },
          { key: 'rh2-2', title: 'Shaharis (morning prayers) - First aliyah', highestBid: 30, details: 'Any details for the first aliyah?' },
          { key: 'rh2-3', title: 'Shaharis (morning prayers) - Second aliyah', highestBid: 20, details: 'Any details for the second aliyah?' },
          { key: 'rh2-4', title: 'Shaharis (morning prayers) - Third aliyah', highestBid: 10, details: 'Any details for the third aliyah?' },
        ]
      },
      {
        key: 'yk', title: 'Yom Kippur', biddingItems: [
          { key: 'yk-1', title: 'Shaharis (morning prayers) - Opening the ark', highestBid: 10, details: 'Any details for opening the ark?' },
          { key: 'yk-2', title: 'Shaharis (morning prayers) - First aliyah', highestBid: 40, details: 'Any details for the first aliyah?' },
          { key: 'yk-3', title: 'Shaharis (morning prayers) - Second aliyah', highestBid: 20, details: 'Any details for the second aliyah?' },
          { key: 'yk-4', title: 'Shaharis (morning prayers) - Third aliyah', highestBid: 30, details: 'Any details for the third aliyah?' },
        ]
      },
    ]
    updateData(returnedData)
    updateSelectedTab(returnedData[0]?.key);
  }, []);

  function onPlaceBidClick(biddingItem = {}, selectedDay = '') {
    updateInputBidFormProps({ show: !inputBidFormProps.show, biddingItem, selectedDay });
  }

  return (
    <>
      {selectedTab !== undefined ?
        <div>
          <Navbar bg="light">
            <Navbar.Brand></Navbar.Brand>
            <img src={JRLCLogo} alt="JRLC" />
          </Navbar>
          <Nav
            activeKey={selectedTab}
            onSelect={updateSelectedTab}
            variant="pills"
            fill
            style={{ fontSize: 'larger', marginBottom: '12px' }}
          >
            {data.map(({ key, title }) =>
              <Nav.Item key={key}><Nav.Link eventKey={key}>{title}</Nav.Link></Nav.Item>)}
          </Nav>
          <BiddingTabContent data={data.find(({ key }) => key === selectedTab)} onPlaceBidClick={onPlaceBidClick} />
        </div>
        : <h1>Loading...</h1>}
      {inputBidFormProps.show &&
        <InputBidForm
          show={inputBidFormProps.show}
          onHide={() => { updateInputBidFormProps({ show: !inputBidFormProps.show, biddingItem: {}, selectedDay: '' }); }}
          biddingItem={inputBidFormProps.biddingItem}
          selectedDay={inputBidFormProps.selectedDay}
        />}
    </>
  );
}

export default App;
