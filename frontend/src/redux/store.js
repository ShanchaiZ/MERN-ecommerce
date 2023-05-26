import { legacy_createStore as createStore } from "redux";

const counterReducer = (state = { value: 0 }) => {
    return state;
}

const store = createStore(counterReducer, { value: 0 });


console.log(store.getState());

export default store;