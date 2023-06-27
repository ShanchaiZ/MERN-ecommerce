import * as actionTypes from "../constants/categoryConstants";

import axios from "axios";


// Function: Fetch all Categories:
export const getCategories = () => async (dispatch) => {
    const { data } = await axios.get("/api/categories");
    dispatch({
        type: actionTypes.GET_CATEGORIES_REQUEST,
        payload: data
    })
}

// Function: Save User Written Attributes to Category
export const saveAttributeToCatDoc = (key, val, categoryChosen) => async (dispatch, getState) => {
    const { data } = await axios.post("/api/categories/attr", { key, val, categoryChosen });
    if (data.categoryUpdated) {
        dispatch({
            type: actionTypes.SAVE_ATTR,
            payload: [...data.categoryUpdated]
        })
    }
}

// Function: Inserting Custom Category to be displayed in the Category dropdown:
export const newCategory = (category) => async (dispatch, getState) => {
    const cat = getState().getCategories.categories;
    const { data } = await axios.post("/api/categories", { category });
    if (data.categoryCreated) {
        dispatch({
            type: actionTypes.INSERT_CATEGORY,
            payload: [...cat, data.categoryCreated]
        })
    }
}

// Function: Deleting Category in the Category dropdown X:
export const deleteCategory = (category) => async (dispatch, getState) => {
    const cat = getState().getCategories.categories;
    const categories = cat.filter((item) => item.name !== category);
    const { data } = await axios.delete("/api/categories/" + encodeURIComponent(category));
    if (data.categoryDeleted) {
        dispatch({
            type: actionTypes.DELETE_CATEGORY,
            payload:[...categories],
        })
    }
}