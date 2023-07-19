import * as actionTypes from "../constants/chatConstants";

// Default Initial State of the ChatRooms:
const CHAT_INITIAL_STATE = {
    socket: false,
    chatRooms: {}
}

// State of ChatRooms Communication between User and admin:
export const adminChatReducer = (state = CHAT_INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.SET_CHATROOMS:
            let currentState = { ...state };
            // if existing chatroom with user then add more messages in the chatroom:
            if (state.chatRooms[action.payload.user]) {
                currentState.chatRooms[action.payload.user].push({ client: action.payload.message });
                return {
                    ...state,
                    chatRooms: { ...currentState.chatRooms }
                }
                // Otherwise: open new chatroom with user:
            } else {
                return {
                    ...state,
                    chatRooms: { ...currentState.chatRooms, [action.payload.user]: [{ client: action.payload.message }] }
                }
            }
            case actionTypes.SET_SOCKET:
                return{
                    ...state,
                    socket: action.payload.socket,
                }
        default:
            return state;
    }
}