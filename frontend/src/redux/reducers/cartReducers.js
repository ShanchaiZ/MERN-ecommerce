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
                currentState.cartItems = state.cartItems.map((x) => {
                    if (x.productID === productAlreadyExistsInState.productID) {
                        currentState.itemsCount += Number(productBeingAddedToCart.quantity);
                        const sum = Number(productBeingAddedToCart.quantity) * Number(productBeingAddedToCart.price);
                        currentState.cartSubtotal += sum;
                    } else {
                        currentState.itemsCount += Number(x.quantity);
                        const sum = Number(x.quantity) * Number(x.price);
                        currentState.cartSubtotal += sum;
                    }
                    return x.productID === productAlreadyExistsInState.productID ? productBeingAddedToCart : x;
                });
            } else {

            }

            return currentState;
        default:
            return state;
    }
}