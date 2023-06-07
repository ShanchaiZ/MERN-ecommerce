import * as actionTypes from "../constants/cartConstants";

import axios from "axios";

// Store.dispatch: used to call the actions that CHANGES the global state:
export const addToCart = (productId, quantity) => async (dispatch, getState) => {

    // Api call to fetch product id of a product when add to cart action is called:
    const { data } = await axios.get(`/api/products/get-one/${productId}`);

    dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: {
            productID: data._id,
            name: data.name,
            price: data.price,
            image: data.images[0] ?? null,
            count: data.count,
            quantity,
        },
    })

    //Action of Saving cart data to local storage for persistent memory:
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));

}

// Action of Deleting Items from cart:
export const removeFromCart = (productID, quantity, price) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: { productID: productID, quantity: quantity, price: price }
    })
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
}