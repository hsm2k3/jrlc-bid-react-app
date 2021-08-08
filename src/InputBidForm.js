import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

//Taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//Taken from https://stackoverflow.com/questions/18375929/validate-phone-number-using-javascript
function validatePhone(phone) {
    const phoneno = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
    return phoneno.test(String(phone));
}

function InputBidForm({ show, onHide, biddingItem, selectedDay }) {
    const [name, updateName] = useState('');
    const [designation, updateDesignation] = useState('');
    const [email, updateEmail] = useState('');
    const [phone, updatePhone] = useState('');
    const [bid, updateBid] = useState('');
    const [comments, updateComments] = useState('');
    const [showNameError, updateShowNameError] = useState(false);
    const [showEmailError, updateShowEmailError] = useState(false);
    const [showPhoneError, updateShowPhoneError] = useState(false);
    const [showBidError, updateShowBidError] = useState(false);

    function onPlaceBid() {
        const trimmedName = name.trim();
        const trimmedDesignation = designation.trim();
        const trimmedEmail = email.trim();
        const trimmedPhone = phone.trim();
        const trimmedBid = bid.trim();
        const trimmedComments = comments.trim();
        let validationFailed = false;
        updateName(trimmedName);
        updateDesignation(trimmedDesignation);
        updateEmail(trimmedEmail);
        updatePhone(trimmedPhone);
        updateBid(trimmedBid);
        updateComments(trimmedComments);
        if (trimmedName === '') {
            updateShowNameError(true);
            validationFailed = true;
        }
        if (!validateEmail(trimmedEmail)) {
            updateShowEmailError(true);
            validationFailed = true;
        }
        if (!validatePhone(trimmedPhone)) {
            updateShowPhoneError(true);
            validationFailed = true;
        }
        let numericBid = Number(trimmedBid);
        numericBid = Math.floor(numericBid);
        if (isNaN(numericBid) || numericBid <= 0 || numericBid <= biddingItem.highestBid) {
            updateShowBidError(true);
            validationFailed = true;
        } else {
            updateBid(numericBid)
        }

        if (validationFailed) {
            return;
        }

        //If validation passes, send off the info in App.js. Have new data be returned to update the UI with any new bids.
    }

    return (
        <Modal show={show} onHide={onHide} backdrop="static" size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Place bid for {biddingItem.title} for {selectedDay}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={name} onChange={({ target }) => { updateShowNameError(false); updateName(target.value); }}></Form.Control>
                        {showNameError && <div style={{ color: 'red' }}>Please provide a name.</div>}
                        <Form.Text className="text-muted">
                            Please enter your full name. Even if you intend to designate for someone else, the name of the person placing the bid should be provided. Required.
                        </Form.Text>

                    </Form.Group>
                    <Form.Group controlId="designation">
                        <Form.Label>Designation</Form.Label>
                        <Form.Control value={designation} onChange={({ target }) => updateDesignation(target.value)}></Form.Control>
                        <Form.Text className="text-muted">
                            Please enter the name of the person you are designating this bid for, even if you intend to designate yourself. If you do not have anyone in particular to designate, or are not sure what to fill in, you may leave this field blank. Optional.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={({ target }) => { updateShowEmailError(false); updateEmail(target.value); }}></Form.Control>
                        {showEmailError && <div style={{ color: 'red' }}>Please provide a valid email address.</div>}
                        <Form.Text className="text-muted">
                            Please enter your email address. Required.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Phone #</Form.Label>
                        <Form.Control type="tel" value={phone} onChange={({ target }) => { updateShowPhoneError(false); updatePhone(target.value); }}></Form.Control>
                        {showPhoneError && <div style={{ color: 'red' }}>Please provide a valid phone #.</div>}
                        <Form.Text className="text-muted">
                            Please enter your phone #. (Format: 000-000-0000) Required.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="bid">
                        <Form.Label>Bid</Form.Label>
                        <Form.Control value={bid} onChange={({ target }) => { updateShowBidError(false); updateBid(target.value); }}></Form.Control>
                        {showBidError && <div style={{ color: 'red' }}>Please provide a valid bid amount and ensure it is higher than the current highest bid.</div>}
                        <Form.Text className="text-muted">
                            Please enter the amount you wish to bid. Only include numbers. It will be rounded down to the nearest dollar. (Ex. 10.99 will be submitted as 10) Current highest bid is ${biddingItem.highestBid}.00. Required.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="comments">
                        <Form.Label>Additional comments</Form.Label>
                        <Form.Control value={comments} onChange={({ target }) => updateComments(target.value)} as="textarea"></Form.Control>
                        <Form.Text className="text-muted">
                            Please enter any additional comments. Optional.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                Please confirm all info is correct before placing bid.
                <Button onClick={onHide} variant="secondary">Cancel</Button>
                <Button onClick={onPlaceBid}>Place bid</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InputBidForm;