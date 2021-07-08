import * as types from "../_types/index";
import { setInitialState } from "../InitialState";


const INITIAL_STATE = setInitialState({
    reviewSubmissionTableData: null,
});


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.REVIEWSUBMISSION_REQUEST:
            // console.log("check reducer", action.payload);
            return {
                ...state,
                isFetching: true,
            };
            case types.REVIEWSUBMISSION_RECEIVE:
            console.log("check reducer", action.payload);

           
            return {
                ...state,
                isFetching: false,
                isSuccess: true,
                reviewSubmissionTableData: action.payload
            };
        case types.REVIEWSUBMISSION_FAILURE:
            // console.log("check reducer", action.payload);
            return {
                ...state,
                isFetching: false,
                isError: true,
                reviewSubmissionTableData: action.payload,
            };
        case types.RESET_METEROTABLE:
            return {
                ...state,
                isFetching: false,
                isError: false,
                reviewSubmissionTableData: null,
            };
        default:
            return {
                ...state
            }
    }
}
