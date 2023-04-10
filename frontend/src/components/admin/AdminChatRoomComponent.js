import { Fragment, useState } from "react";
import { Toast, Form, Button } from "react-bootstrap";

const AdminChatRoomComponent = () => {

    // Toast Dismissible Function:
    const [toast1, closeToast1] = useState(true);
    const close1 = () => closeToast1(false);

    const [toast2, closeToast2] = useState(true);
    const close2 = () => closeToast2(false);

    return (
        <>
            {/* User Admin Chat Toast 1 */}
            <Toast show={toast1} onClose={close1} className="ms-4 mb-5">
                <Toast.Header>
                    <strong className="me-auto">Chat with John Doe</strong>
                </Toast.Header>
                <Toast.Body>
                    <div style={{ maxHeight: "300px", overflow: "auto" }}>

                        {Array.from({ length: 20 }).map((_, idx) => (
                            <Fragment key={idx}>
                                <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                                    <b>User Wrote:</b> This is a chat message!
                                </p>
                                <p>
                                    <b>Admin Wrote:</b> Understood! Have a great day!
                                </p>
                            </Fragment>
                        ))}
                    </div>
                    {/* Chat Form */}
                    <Form>
                        <Form.Group className="mb-3" controlId="ControlTextarea">
                            <Form.Label>Write A Message</Form.Label>
                            <Form.Control as="textarea" rows={3}></Form.Control>
                            <Button className="btn btn-success" type="submit">Submit</Button>
                        </Form.Group>
                    </Form>
                </Toast.Body>
            </Toast>

            {/* User Admin Chat Toast 2 */}
            <Toast show={toast2} onClose={close2} className="ms-4 mb-5">
                <Toast.Header>
                    <strong className="me-auto">Chat with John Doe 2</strong>
                </Toast.Header>
                <Toast.Body>
                    <div style={{ maxHeight: "300px", overflow: "auto" }}>

                        {Array.from({ length: 20 }).map((_, idx) => (
                            <Fragment key={idx}>
                                <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                                    <b>User Wrote:</b> This is a chat message!
                                </p>
                                <p>
                                    <b>Admin Wrote:</b> Understood! Have a great day!
                                </p>
                            </Fragment>
                        ))}
                    </div>
                    {/* Chat Form */}
                    <Form>
                        <Form.Group className="mb-3" controlId="ControlTextarea">
                            <Form.Label>Write A Message</Form.Label>
                            <Form.Control as="textarea" rows={3}></Form.Control>
                            <Button className="btn btn-success" type="submit">Submit</Button>
                        </Form.Group>
                    </Form>
                </Toast.Body>
            </Toast>
        </>
    )
};

export default AdminChatRoomComponent;