import {
    FETCH_IDEA,
    FETCH_YOUR_IDEA,
    FETCH_OTHERS_IDEA,
    SEARCH
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
    ideas : [],
    yideas : [],
    oideas: [],
    searchres:[],
    yno:false,
    sno:false
};

export default function(state = initialState, action)
{
    switch(action.type){
        case FETCH_IDEA : return {
            ...state,
            ideas: action.payload
        };
        case FETCH_YOUR_IDEA : return {
            ...state,
            yno: isEmpty(action.payload),
            yideas: action.payload
        };
        case FETCH_OTHERS_IDEA : return {
            ...state,
            oideas: action.payload
        };
        case SEARCH : return {
            ...state,
            sno: isEmpty(action.payload),
            searchres: action.payload
        };
        default: return state;
    }
}

