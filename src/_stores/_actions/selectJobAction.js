import { RSAA } from 'redux-api-middleware';
import * as types from "../_types/index";
import { API_ENDPOINT, AUTH_HEADERS } from '../../_config/ApiConstants';
export function selectJob_Action(data) {
    // console.log(data)
    return {
        [RSAA]: {
            endpoint: `${API_ENDPOINT}/metero/getjobs`,
            method: 'GET',
            headers: {
                ...AUTH_HEADERS,
            },
            body:JSON.stringify(data),
            types: [
                types.GETJOB_REQUEST,
                types.GETJOB_RECEIVE, {
                    type: types.GETJOB_FAILURE,
                    meta: (action, state, res) => {
                        return (action, state, res);
                    }
                }]
        }
    }
}


export const resetselectJob_Action = () => {
    return {
        type: types.RESET_GETJOB,
        payload: null
    }
};
