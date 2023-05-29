import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// Reducer: are functions in Redux are used in changing a state:
import { counterReducer } from "./reducers/cartReducers"; //Used in incrementing items in a cart
import { userRegisterLoginReducer } from "./reducers/userReducers"; //Used in displaying User Name when successful login

const reducer = combineReducers({
    cart: counterReducer,
    userRegisterLogin: userRegisterLoginReducer
})


const middleware = [thunk];
const store = createStore(reducer, { cart: { value: 0 } }, composeWithDevTools(applyMiddleware(...middleware)));


export default store;