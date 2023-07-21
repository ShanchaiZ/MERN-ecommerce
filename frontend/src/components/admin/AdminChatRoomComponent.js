import { Fragment, useState, useEffect } from "react";
import { Toast, Form, Button } from "react-bootstrap";
import { setMessageReceived } from "../../redux/actions/chatActions";
import { useDispatch } from "react-redux";

const AdminChatRoomComponent = ({ chatRoom, roomIndex, socket, socketUser }) => {

    const dispatch = useDispatch();

    // Initial React Hooks:
    [window["toast" + roomIndex], window["closeToast" + roomIndex]] = useState(true); //Chat Box close
    const [rerender, setRerender] = useState(false); //refreshing page when admin submits button

    const close = () => {
        window["closeToast" + roomIndex](false);
    }

    // Function: admin submit button chat box
    const adminSubmitChatMsg = (e, elem) => {
        e.preventDefault();
        if (e.keyCode && e.keyCode !== 13) {
            return;
        }
        const msg = document.getElementById(elem);
        let v = msg.value.trim();
        if (v === "" || v === null || v === false || !v) {
            return;
        }
        chatRoom[1].push({ admin: msg.value });
        socket.emit("admin sends message", {
            user: socketUser,
            message: v,
        });
        setRerender(!rerender);
        msg.focus();
        dispatch(setMessageReceived(false));
        setTimeout(() => {
            msg.value = "";
            const chatMessages = document.querySelector(`.cht-msg${socketUser}`);
            if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 200)
    }

    //Scroll down chatbox in focus after refresh:
    useEffect(() => {
        const chatMessages = document.querySelector(`.cht-msg${socketUser}`);
        if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
    }, [])

    return (
        <>
            {/* User Admin Chat Toast*/}
            <Toast show={window["toast" + roomIndex]} onClose={() => close()} className="ms-4 mb-5">
                <Toast.Header>
                    <strong className="me-auto">Chat with User</strong>
                </Toast.Header>
                <Toast.Body>
                    <div className={`cht-msg${socketUser}`} style={{ maxHeight: "300px", overflow: "auto" }}>

                        {chatRoom[1].map((msg, idx) => (
                            <Fragment key={idx}>
                                {/* User Message Response: */}
                                {msg.client && (
                                    <p key={idx} className="bg-primary p-3 ms-4 text-light rounded-pill">
                                        <b>User Wrote:</b> {msg.client}
                                    </p>
                                )}
                                {/* Admin Message Response: */}
                                {msg.admin && (
                                    <p key={idx}>
                                        <b>Admin Wrote:</b> {msg.admin}
                                    </p>
                                )}

                            </Fragment>
                        ))}
                    </div>
                    {/* Chat Form */}
                    <Form>
                        <Form.Group className="mb-3" controlId={`adminChatMsg${roomIndex}`}>
                            <Form.Label>Write A Message</Form.Label>
                            <Form.Control onKeyUp={(e) => adminSubmitChatMsg(e, `adminChatMsg${roomIndex}`)} as="textarea" rows={3}></Form.Control>
                            <Button onClick={(e) => adminSubmitChatMsg(e, `adminChatMsg${roomIndex}`)} className="btn btn-success" type="submit">Submit</Button>
                        </Form.Group>
                    </Form>
                </Toast.Body>
            </Toast>
        </>
    )
};

export default AdminChatRoomComponent;