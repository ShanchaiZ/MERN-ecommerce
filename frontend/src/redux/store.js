import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// Reducer: are functions in Redux are used in changing a state:
import { cartReducer } from "./reducers/cartReducers"; //Used in incrementing items in a cart
import { userRegisterLoginReducer } from "./reducers/userReducers"; //Used in displaying User Name when successful login
import { getCategoriesReducer } from "./reducers/categoryReducers";// Used to fetch Categories for the state

const reducer = combineReducers({
    cart: cartReducer,
    userRegisterLogin: userRegisterLoginReducer,
    getCategories: getCategoriesReducer
})

// CartItems in Local Storage: 
const cartItemsInLocalStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

// Access/Read the data saved in Local Storage:
const userInfoInLocalStorage = localStorage.getItem("userInfo") //If user.info is available from LocalStorage...
    ? JSON.parse(localStorage.getItem("userInfo")) //Then, parse the user from local storage data...
    : sessionStorage.getItem("userInfo") //otherwise, check session Storage for user.info...
        ? JSON.parse(sessionStorage.getItem("userInfo")) //..and parse the user.info from session storage data.
        : {} //ELSE, leave empty object

// DEFAULT INITAL STATE: is set to these properties as below:
const INITIAL_STATE = {
    cart: {
        cartItems: cartItemsInLocalStorage,
        itemsCount: cartItemsInLocalStorage ? cartItemsInLocalStorage.reduce((quantity, item) => Number(item.quantity) + quantity, 0) : 0,
        cartSubtotal: cartItemsInLocalStorage ? cartItemsInLocalStorage.reduce((price, item) => price + item.price * item.quantity, 0) : 0
    },
    userRegisterLogin: { userInfo: userInfoInLocalStorage }
}

const middleware = [thunk];
const store = createStore(reducer, INITIAL_STATE, composeWithDevTools(applyMiddleware(...middleware)));


export default store;