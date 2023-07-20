import "../../chats.css";
import { useEffect, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import { useSelector } from "react-redux";


const UserChatComponent = () => {

    // Initial state of Socket IO for chatting as a regular user:
    const [socket, setSocket] = useState(false);
    const [chat, setChat] = useState([]);
    const [messageReceived, setMessageReceived] = useState(false);

    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

    // Socket Io chat for regular user initialized:
    useEffect(() => {
        if (!userInfo.isAdmin) {
            var audio = new Audio("/audio/chat-msg.mp3");
            const socket = socketIOClient();
            socket.on("no admin", (msg) => { //User Receives message if there is no admin
                setChat((chat) => {
                    return [...chat, { admin: "No Admin Present. Please try again later!" }]
                })
            })
            socket.on("server sends message from admin to client", (msg) => {
                setChat((chat) => {
                    return [...chat, { admin: msg }];
                })
                setMessageReceived(true);
                audio.play();
                const chatMessages = document.querySelector(".cht-msg");
                chatMessages.scrollTop = chatMessages.scrollHeight;
            });
            setSocket(socket);
            return () => socket.disconnect(); //socket disconnects when page closes
        }
    }, [userInfo.isAdmin]);

    // Function: User Chat Submit button Handler:
    const clientSubmitChatMsg = (e) => {
        if (e.keyCode && e.keyCode !== 13) {
            return
        }
        setMessageReceived(false);
        const msg = document.getElementById("clientChatMsg");
        let v = msg.value.trim();
        if (v === "" || v === "null" || v === false || !v) {
            return;
        }
        socket.emit("client sends message", v);
        setChat((chat) => {
            return [...chat, { client: v }]
        });
        // Clears textbox input after Submitting message:
        msg.focus();
        setTimeout(() => {
            msg.value = "";
            const chatMessages = document.querySelector(".cht-msg");
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 200);
    }

    return !userInfo.isAdmin ? (
        <>
            <input type="checkbox" id="check" />
            <label className="chat-btn" htmlFor="check">
                <i className="bi bi-chat-dots comment"></i>
                <i className="bi bi-x-circle close"></i>
                {messageReceived && <span className="position-absolute top-0 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>}
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
                        {chat.map((item, id) => (
                            <div key={id}>
                                {item.client && (
                                    <p>
                                        <b>You wrote:</b> {item.client}
                                    </p>
                                )}
                                {item.admin && (
                                    <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                                        <b>Admin Response:</b> {item.admin}
                                    </p>
                                )}
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
    ) : null;
};

export default UserChatComponent;