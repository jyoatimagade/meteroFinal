import { combineReducers } from 'redux';
import login from './LoginReducer';
import getJob from './SelectJobReducer';
import  meteroTable from './meteroTableReducer'

const rootReducer = combineReducers({
    login:login,
    getJob:getJob,
    meteroTable:meteroTable,
})

export default rootReducer;