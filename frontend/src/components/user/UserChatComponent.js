import "../../chats.css";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";


const UserChatComponent = () => {



    // Initial state of Socket IO for chatting as a regular user:
    const [socket, setSocket] = useState(false);
    // let chat = [
    //     {"client" : "msg"},
    //     {"client" : "msg"},
    //     {"admin" : "msg"},
    // ]
    const [chat, setChat] = useState([]);

    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

    // Socket Io chat for regular user initialized:
    useEffect(() => {
        if (!userInfo.isAdmin) {
            const socket = socketIOClient();
            setSocket(socket);
            return () => socket.disconnect(); //socket disconnects when page closes
        }
    }, [userInfo.isAdmin]);

    // Function: User Chat Submit button Handler:
    const clientSubmitChatMsg = (e) => {
        if (e.keyCode && e.keyCode !== 13) {
            return
        }
        const msg = document.getElementById("clientChatMsg");
        let v = msg.value.trim();
        if (v === "" || v === "null" || v === false || !v) {
            return;
        }
        socket.emit("client sends message", v);
        setChat((chat) => {
            return [...chat, { client: v }]
        });
    }

    return (
        <>
            <input type="checkbox" id="check" />
            <label className="chat-btn" htmlFor="check">
                <i className="bi bi-chat-dots comment"></i>
                <i className="bi bi-x-circle close"></i>
                <span className="position-absolute top-0 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
            </label>
            {/* ChatBox Popup */}
            <div className="chat-wrapper">
                <div className="chat-header">
                    <h6>Let's Chat - Online </h6>
                </div>
                {/* Chatbox Field to Enter Message */}
                <div className="chat-form">
                    {/* Chat History */}
                    <div className="cht-msg">
                        {/* JSX function that logs chat history between User and Admin */}
                        {Array.from({ length: 20 }).map((_, id) => (
                            <div key={id}>
                                <p>
                                    <b>You wrote:</b> This is a test Message!!
                                </p>
                                <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                                    <b>Admin Response:</b> Support Not Available! Please try again!
                                </p>
                            </div>
                        ))}
                    </div>
                    {/* Chatbot Text Area */}
                    <textarea onKeyUp={(e) => clientSubmitChatMsg(e)} id="clientChatMsg" className="form-control" placeholder="Enter Your Message Here!"></textarea>
                    {/* Chat Submit Button */}
                    <button onClick={(e) => clientSubmitChatMsg(e)} className="btn btn-primary btn-block">Submit</button>
                </div>
            </div>
        </>
    )
};

export default UserChatComponent;