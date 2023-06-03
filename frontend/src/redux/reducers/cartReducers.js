import * as actionTypes from "../constants/cartConstants";

// Defined Initial Cart state in Redux:
const CART_INITIAL_STATE = {
    cartItems: [],
    itemsCount: 0,
    cartSubtotal: 0
}

// Reducer: are functions in Redux are used in changing a state:
export const cartReducer = (state = CART_INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            console.log(action.payload);
            return state;
        default:
            return state;
    }
}