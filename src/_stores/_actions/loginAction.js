import { RSAA } from 'redux-api-middleware';
import * as types from "../_types/index";
import { API_ENDPOINT, AUTH_HEADERS } from '../../_config/ApiConstants';
export function loginAPI_Action(data) {
    
    return {
        [RSAA]: {
            endpoint: `${API_ENDPOINT}/MeterO/validateUser`,
            method: 'POST',
            headers: {
                ...AUTH_HEADERS,
            },
            body:JSON.stringify(data),
            types: [
                types.LOGIN_REQUEST,
                types.LOGIN_RECEIVE, {
                    type: types.LOGIN_FAILURE,
                    meta: (action, state, res) => {
                        return (action, state, res);
                    }
                }]
        }
    }
}


export const resetLoginAPI_Action = () => {
    return {
        type: types.RESET_LOGIN,
        payload: null
    }
};
