import {
    GET_RECIPES,
    ADD_RECIPE,
    DELETE_RECIPE,
    RECIPES_LOADING
} from '../actions/types';

const initialState = {
    recipes: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            console.log('action get recipes')
            return {
                ...state,
                recipes: action.payload,
                loading: false
            };
        case DELETE_RECIPE:
            console.log('state rec', state.recipes)
            return {
                ...state,
                recipes: state.recipes.filter(recipe => recipe._id !== action.payload)


            };
        case ADD_RECIPE:
            return {
                ...state,
                recipes: [action.payload, ...state.recipes]
            };
        case RECIPES_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}