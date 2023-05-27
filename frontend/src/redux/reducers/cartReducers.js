import * as actionTypes from "../constants/cartConstants";


// Reducer: are functions in Redux are used in changing a state:
export const counterReducer = (state = { value: 0 }, action) =>{
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return { value: state.value + 1 + action.someValue };
        default:
            return state;
    }
}