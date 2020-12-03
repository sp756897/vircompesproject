import {
    APPROVAL_REQUEST,
    FETCH_REQUESTS,
    APPROVED,
    FETCH_TEAMMEMBERS
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
    freqData: [],
    reqData: [],
    areqData: [],
    teamData: [],
    noReq:false,
    noTeam:false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case APPROVAL_REQUEST:
            return {
                ...state,
                reqData: action.payload
            };
        case FETCH_REQUESTS:
            return {
                ...state,
                noReq: isEmpty(action.payload),
                freqData: action.payload
            };
        case APPROVED:
            return {
                ...state,
                areqData: action.payload
            };
        case FETCH_TEAMMEMBERS:
            return {
                ...state,
                noTeam: isEmpty(action.payload),
                teamData: action.payload
            };
        default:
            return state;
    }
}