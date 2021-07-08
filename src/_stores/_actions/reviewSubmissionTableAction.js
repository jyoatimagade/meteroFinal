import { RSAA } from 'redux-api-middleware';
import * as types from "../_types/index";
import { API_ENDPOINT, AUTH_HEADERS } from '../../_config/ApiConstants';
export function reviewSubmissionTable_Action(data) {
    // console.log(data)
    return {
        [RSAA]: {
            endpoint: `${API_ENDPOINT}/metero/reviewSubmit`,
            // endpoint: `${API_ENDPOINT}/metero/getjobs`,
            method: 'POST',
            headers: {
                ...AUTH_HEADERS,
            },
            body:JSON.stringify(data),
            types: [
                types.REVIEWSUBMISSION_REQUEST,
                types.REVIEWSUBMISSION_RECEIVE, {
                    type: types.REVIEWSUBMISSION_FAILURE,
                    meta: (action, state, res) => {
                        return (action, state, res);
                    }
                }]
        }
    }
}


export const resetmeteroTable_Action = () => {
    return {
        type: types.RESET_METEROTABLE,
        payload: null
    }
};

