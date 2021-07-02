import * as types from "../_types/index";
import { setInitialState } from "../InitialState";


const INITIAL_STATE = setInitialState({
    logindata: null,
});


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            console.log("add reducer111", action.payload);
            return {
                ...state,
                isFetching: true,
            };
        case types.LOGIN_RECEIVE:

            console.log("add reducer", action.payload);
           
            return {
                ...state,
                isFetching: false,
                isSuccess: true,
                logindata: action.payload
            };
        case types.LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                isError: true,
                logindata: action.payload,
            };
        case types.RESET_LOGIN:
            return {
                ...state,
                isFetching: false,
                isError: false,
                logindata: null,
            };
        default:
            return {
                ...state
            }
    }
}