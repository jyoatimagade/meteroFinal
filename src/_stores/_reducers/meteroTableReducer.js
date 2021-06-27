import * as types from "../_types/index";
import { setInitialState } from "../InitialState";


const INITIAL_STATE = setInitialState({
    meteroTableData: null,
});


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.METEROTABLE_REQUEST:
            // console.log("check reducer", action.payload);
            return {
                ...state,
                isFetching: true,
            };
            case types.METEROTABLE_RECEIVE:
            console.log("check reducer", action.payload);

           
            return {
                ...state,
                isFetching: false,
                isSuccess: true,
                meteroTableData: action.payload
            };
        case types.METEROTABLE_FAILURE:
            // console.log("check reducer", action.payload);
            return {
                ...state,
                isFetching: false,
                isError: true,
                meteroTableData: action.payload,
            };
        case types.RESET_METEROTABLE:
            return {
                ...state,
                isFetching: false,
                isError: false,
                meteroTableData: null,
            };
        default:
            return {
                ...state
            }
    }
}
