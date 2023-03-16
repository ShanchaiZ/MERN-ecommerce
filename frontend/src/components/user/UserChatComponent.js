import "../../chats.css";

const UserChatComponent = () => {
    return (
        <>
            <input type="checkbox" id="check" />
            <label className="chat-btn" htmlFor="check">
                <i className="bi bi-chat-dots comment"></i>
                <i className="bi bi-x-circle close"></i>
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
                        <p>
                            <b>You wrote:</b> This is a test Message!!
                        </p>
                        <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                            <b>Admin Response:</b> Support Not Available! Please try again!
                        </p>
                    </div>
                    {/* Chatbot Text Area */}
                    <textarea id="clientChatMsg" className="form-control" placeholder="Enter Your Message Here!"></textarea>
                    {/* Chat Submit Button */}
                    <button className="btn btn-primary btn-block">Submit</button>
                </div>
            </div>
        </>
    )
};

export default UserChatComponent;