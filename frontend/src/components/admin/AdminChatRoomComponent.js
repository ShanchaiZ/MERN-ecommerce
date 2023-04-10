import { Fragment } from "react";
import { Toast } from "react-bootstrap";

const AdminChatRoomComponent = () => {
    return (
        <>
            <Toast className="ms-4 mb-5">
                <Toast.Header>
                    <strong className="me-auto">Chat with John Doe</strong>
                </Toast.Header>
                <Toast.Body>

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
                    
                </Toast.Body>

            </Toast>
        </>
    )
};

export default AdminChatRoomComponent;