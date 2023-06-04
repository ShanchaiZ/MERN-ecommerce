import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// Reducer: are functions in Redux are used in changing a state:
import { cartReducer } from "./reducers/cartReducers"; //Used in incrementing items in a cart
import { userRegisterLoginReducer } from "./reducers/userReducers"; //Used in displaying User Name when successful login

const reducer = combineReducers({
    cart: cartReducer,
    userRegisterLogin: userRegisterLoginReducer
})


// Access/Read the data saved in Local Storage:
const userInfoInLocalStorage = localStorage.getItem("userInfo") //If user.info is available from LocalStorage...
    ? JSON.parse(localStorage.getItem("userInfo")) //Then, parse the user from local storage data...
    : sessionStorage.getItem("userInfo") //otherwise, check session Storage for user.info...
        ? JSON.parse(sessionStorage.getItem("userInfo")) //..and parse the user.info from session storage data.
        : {} //ELSE, leave empty object

// DEFAULT INITAL STATE: is set to these properties as below:
const INITIAL_STATE = {
    cart: {
        cartItems: [],
        itemsCount: 0,
        cartSubtotal: 0
    },
    userRegisterLogin: { userInfo: userInfoInLocalStorage }
}

const middleware = [thunk];
const store = createStore(reducer, INITIAL_STATE, composeWithDevTools(applyMiddleware(...middleware)));


export default store;