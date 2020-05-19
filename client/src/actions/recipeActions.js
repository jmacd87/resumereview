import axios from 'axios';
import { GET_RECIPES, ADD_RECIPE, DELETE_RECIPE, RECIPES_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getRecipes = id => (dispatch) => {
    dispatch(setRecipesLoading());
    console.log('getting recipes', id._id)
    axios
        .get(`/recipes/` + id._id)
        .then(res =>
            dispatch({
                type: GET_RECIPES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const addRecipe = recipe => (dispatch, getState) => {
    axios
        .post('/recipes/add', recipe, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_RECIPE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const deleteRecipe = (id) => (dispatch, getState) => {
    axios
        .delete(`/recipes/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_RECIPE,
                payload: id
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const setRecipesLoading = () => {
    return {
        type: RECIPES_LOADING
    };
};
