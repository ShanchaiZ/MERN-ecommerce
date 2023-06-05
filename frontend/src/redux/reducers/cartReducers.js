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
            const productBeingAddedToCart = action.payload;

            const productAlreadyExistsInState = state.cartItems.find((x) => x.productID === productBeingAddedToCart.productID);

            const currentState = { ...state }; //Make a copy of state to be changed

            if (productAlreadyExistsInState) {
                currentState.itemsCount = 0;
                currentState.cartSubtotal = 0;
                currentState.cartItems = productAlreadyExistsInState;
            } else {
                currentState.itemsCount = "x"; //dummy value added to see if state is changed. will be updated later to reflect # of  items 
                currentState.cartSubtotal = "x"; //dummy value added to see if state is changed. will be updated later to reflect total cost
            }

            return currentState;
        default:
            return state;
    }
}