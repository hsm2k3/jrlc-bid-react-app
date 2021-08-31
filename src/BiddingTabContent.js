import { useEffect, useState } from "react";
import { Accordion, Button, Card, Jumbotron } from "react-bootstrap";

function BiddingTabContent({ data, onPlaceBidClick }) {
    const [activeKey, updateActiveKey] = useState(null);
    useEffect(() => {
        const localActiveKey = localStorage.getItem(`${data.key}activeKey`);
        if (localActiveKey && data.biddingItems.find(({ aliyah }) => aliyah === localActiveKey)) {
            updateActiveKey(localActiveKey);
        } else if (localActiveKey !== 'null') {
            updateActiveKey(data.biddingItems[0].aliyah);
            localStorage.setItem(`${data.key}activeKey`, data.biddingItems[0].aliyah);
        } else {
            updateActiveKey(null);
        }
    }, [data.biddingItems, data.key]);

    return (
        <>
            <Jumbotron fluid style={{ padding: '1rem 1rem', marginBottom: 0 }}>
                <h3 style={{ textAlign: 'center' }}>{data.title}</h3>
            </Jumbotron>
            <Accordion activeKey={activeKey} onSelect={key => { localStorage.setItem(`${data.key}activeKey`, key); updateActiveKey(key); }}>
                {data.biddingItems.map(biddingItem => <Card key={biddingItem.aliyah}>
                    <Accordion.Toggle as={Card.Header} eventKey={biddingItem.aliyah}>
                        <div style={{ color: "#007bff" }}>
                            <div>{`${biddingItem.aliyah}`}</div>
                            <div>Current highest bid: <b>{`$${biddingItem.amount}`}</b></div>
                        </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={biddingItem.aliyah}>
                        <Card.Body><div>{biddingItem.details}</div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button onClick={() => onPlaceBidClick(biddingItem, data.title)}>Place bid</Button></div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>)}
            </Accordion>
        </>
    );
}

export default BiddingTabContent;