import "../../chats.css";

const UserChatComponent = () => {
    return (
        <>
            <input type="checkbox" id="check" />
            <label className="chat-btn" htmlFor="check">
                <i className="bi bi-chat-dots"></i>
                <i className="bi bi-x-circle"></i>
            </label>

        </>
    )
};

export default UserChatComponent;