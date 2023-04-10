import { Toast } from "react-bootstrap";

const AdminChatRoomComponent = () => {
    return (
        <>
            <Toast className="ms-4 mb-5">
                <Toast.Header>
                    <strong className="me-auto">Chat with John Doe</strong>
                </Toast.Header>
                <Toast.Body>
                    <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                        <b>User Wrote:</b> This is a chat message!
                    </p>
                    <p>
                        <b>Admin Wrote:</b> Understood! Have a great day!
                    </p>
                </Toast.Body>

            </Toast>
        </>
    )
};

export default AdminChatRoomComponent;