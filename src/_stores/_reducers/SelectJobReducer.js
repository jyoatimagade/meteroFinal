import * as types from "../_types/index";
import { setInitialState } from "../InitialState";


const INITIAL_STATE = setInitialState({
    GETJOBData: null,
});


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GETJOB_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case types.GETJOB_RECEIVE:

           console.log("jobid List-111", action.payload);
            return {
                ...state,
                isFetching: false,
                isSuccess: true,
                GETJOBData: action.payload
            };
        case types.GETJOB_FAILURE:
            // console.log("add reducer", action.payload);
            return {
                ...state,
                isFetching: false,
                isError: true,
                GETJOBData: action.payload,
            };
        case types.RESET_GETJOB:
            return {
                ...state,
                isFetching: false,
                isError: false,
                GETJOBData: null,
            };
        default:
            return {
                ...state
            }
    }
}