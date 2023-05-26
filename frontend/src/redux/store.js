import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";


// Reducer: are functions in Redux are used in changing a state:
const counterReducer = (state = { value: 0 }, action) => {
    switch (action.type) {
        case "ADD":
            return { value: state.value + 1 + action.someValue };
        default:
            return state;
    }
}


const store = createStore(counterReducer, { value: 0 }, composeWithDevTools());


// Store.dispatch: used to call the actions that CHANGES the global state:
store.dispatch({
    type: "ADD",
    someValue: 10
});


export default store;