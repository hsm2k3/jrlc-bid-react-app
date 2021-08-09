import { Accordion, Button, Card } from "react-bootstrap";

function BiddingTabContent({ data, onPlaceBidClick }) {
    return (
        <>
            <h3 style={{ textAlign: 'center' }}>{data.title}</h3>
            <Accordion defaultActiveKey={data.biddingItems[0].key}>
                {data.biddingItems.map(biddingItem => <Card key={biddingItem.key}>
                    <Accordion.Toggle as={Card.Header} eventKey={biddingItem.key}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', color: "#007bff" }}><div>{biddingItem.title}</div><div>Current highest bid: {`$${biddingItem.highestBid}.00`}</div></div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={biddingItem.key}>
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