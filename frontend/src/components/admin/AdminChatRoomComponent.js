import { Fragment, useState } from "react";
import { Toast, Form, Button } from "react-bootstrap";

const AdminChatRoomComponent = ({ chatRoom, roomIndex, socketUser }) => {

    // Initial React Hooks:
    [window["toast" + roomIndex], window["closeToast" + roomIndex]] = useState(true); //Chat Box close

    const close = () => {
        window["closeToast" + roomIndex](false);
    }

    return (
        <>
            {/* User Admin Chat Toast*/}
            <Toast show={window["toast" + roomIndex]} onClose={() => close()} className="ms-4 mb-5">
                <Toast.Header>
                    <strong className="me-auto">Chat with User</strong>
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