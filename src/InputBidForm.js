import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal, Spinner } from "react-bootstrap";

//Taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//Taken from https://stackoverflow.com/questions/18375929/validate-phone-number-using-javascript
function validatePhone(phone) {
    const phoneno = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
    if (phoneno.test(String(phone))) {
        return true;
    }
    const numPhone = Number(phone);
    if (!isNaN(numPhone) &&
        (numPhone.toString().length === 10 || (numPhone.toString().length === 11 && numPhone.toString().charAt(0) === '1'))
    ) {
        return true;
    }
    return false;
}

function InputBidForm({ show, onHide, biddingItem, selectedDay, selectedTab, onFetchDataAndRetreiveBiddingItem, onShowToast }) {
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
    const [remember, updateRemember] = useState(false);
    const [submitting, updateSubmitting] = useState(false);

    useEffect(() => {
        document.getElementById('name')?.focus();
        let localBidFormInfo = localStorage.getItem('bidFormInfo');
        if (localBidFormInfo) {
            const objBidFormInfo = JSON.parse(localBidFormInfo);
            updateName(objBidFormInfo.name);
            updateDesignation(objBidFormInfo.designation);
            updateEmail(objBidFormInfo.email);
            updatePhone(objBidFormInfo.phone);
            updateRemember(true);
            document.getElementById('bid')?.focus();
        }
    }, []);

    async function onPlaceBid() {
        updateSubmitting(true);
        const biddingItemToValidate = await onFetchDataAndRetreiveBiddingItem() || biddingItem;
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
        const numericBid = Math.floor(Number(trimmedBid));
        if (isNaN(numericBid) || numericBid <= 0 || numericBid <= Number(biddingItemToValidate.amount)) {
            updateShowBidError(true);
            validationFailed = true;
        } else {
            updateBid(String(`${numericBid}.00`));
        }

        if (validationFailed) {
            updateSubmitting(false);
            return;
        }

        if (remember) {
            localStorage.setItem('bidFormInfo', JSON.stringify({ name: trimmedName, designation: trimmedDesignation, email: trimmedEmail, phone: trimmedPhone }));
        } else {
            localStorage.removeItem('bidFormInfo');
        }

        await axios.post(`http://localhost:8000/api/bids/${selectedTab}/update`, {
            aliyah: biddingItemToValidate.aliyah,
            name: trimmedName,
            designation: trimmedDesignation,
            email: trimmedEmail,
            phone: trimmedPhone,
            bid: numericBid,
            comments: trimmedComments
        })
            .then(() => {
                onHide();
                onShowToast('Success', 'Thank you, your bid was successfully placed.');
            })
            .catch(() => {
                updateSubmitting(false);
                onShowToast('Error', 'Unfortunately, something went wrong and your bid may not have been placed. Please try again.');
            });
    }

    return (
        <Modal show={show} onHide={onHide} backdrop="static" size="xl">
            <Modal.Header closeButton>
                <Modal.Title><div>Place bid for {biddingItem.aliyah} for {selectedDay}</div><div> Current highest bid: ${biddingItem.amount}</div></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={name} onChange={({ target }) => { updateShowNameError(false); updateName(target.value); }} disabled={submitting}></Form.Control>
                        {showNameError && <div style={{ color: 'red' }}>Please provide a name.</div>}
                        <Form.Text className="text-muted">
                            Please enter your full name. Even if you intend to designate for someone else, the name of the person placing the bid should be provided. Required.
                        </Form.Text>

                    </Form.Group>
                    <Form.Group controlId="designation">
                        <Form.Label>Designation</Form.Label>
                        <Form.Control value={designation} onChange={({ target }) => updateDesignation(target.value)} disabled={submitting}></Form.Control>
                        <Form.Text className="text-muted">
                            Please enter the name of the person you are designating this bid for, even if you intend to designate yourself. If you do not have anyone in particular to designate, or are not sure what to fill in, you may leave this field blank. Optional.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={({ target }) => { updateShowEmailError(false); updateEmail(target.value); }} disabled={submitting}></Form.Control>
                        {showEmailError && <div style={{ color: 'red' }}>Please provide a valid email address.</div>}
                        <Form.Text className="text-muted">
                            Please enter your email address. Required.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Phone #</Form.Label>
                        <Form.Control type="tel" value={phone} onChange={({ target }) => { updateShowPhoneError(false); updatePhone(target.value); }} disabled={submitting}></Form.Control>
                        {showPhoneError && <div style={{ color: 'red' }}>Please provide a valid phone #.</div>}
                        <Form.Text className="text-muted">
                            Please enter your phone #. (Format: 000-000-0000 or 0000000000) Required.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="bid">
                        <Form.Label>Bid (Current highest bid: <b>${biddingItem.amount}</b>)</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control value={bid} onChange={({ target }) => { updateShowBidError(false); updateBid(target.value); }} disabled={submitting}></Form.Control>
                        </InputGroup>
                        {showBidError && <div style={{ color: 'red' }}>Please provide a valid bid amount and ensure it is higher than the current highest bid.</div>}
                        <Form.Text className="text-muted">
                            Please enter the amount you wish to bid. Only include numbers. Bid will be rounded down to the nearest dollar. (Ex. 10.99 will be submitted as 10.00) Required.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="comments">
                        <Form.Label>Additional comments</Form.Label>
                        <Form.Control value={comments} onChange={({ target }) => updateComments(target.value)} as="textarea" disabled={submitting}></Form.Control>
                        <Form.Text className="text-muted">
                            Please enter any additional comments. Optional.
                        </Form.Text>
                    </Form.Group>
                    <Form.Check id="remember" label="Remember my info" checked={remember} onClick={({ target }) => updateRemember(target.checked)} onChange={() => { }} disabled={submitting} />
                    <Form.Text className="text-muted">
                        If checked, the name, designation, email, and phone # will be remembered for future bids.
                    </Form.Text>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                Please confirm all info is correct before placing bid.
                {submitting
                    ?
                    <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <span className="sr-only">Loading...</span>
                    </Button>
                    :
                    <>
                        <Button onClick={onHide} variant="secondary">Cancel</Button>
                        <Button onClick={onPlaceBid}>Place bid</Button>
                    </>}
            </Modal.Footer>
        </Modal>
    );
}

export default InputBidForm;