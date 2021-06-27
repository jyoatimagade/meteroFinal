import { RSAA } from 'redux-api-middleware';
import * as types from "../_types/index";
import { API_ENDPOINT, AUTH_HEADERS } from '../../_config/ApiConstants';
export function meteroTable_Action(data) {
    // console.log(data)
    return {
        [RSAA]: {
            endpoint: `${API_ENDPOINT}/metero/getequipments`,
            // endpoint: `${API_ENDPOINT}/metero/getjobs`,
            method: 'POST',
            headers: {
                ...AUTH_HEADERS,
            },
            body:JSON.stringify(data),
            types: [
                types.METEROTABLE_REQUEST,
                types.METEROTABLE_RECEIVE, {
                    type: types.METEROTABLE_FAILURE,
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

