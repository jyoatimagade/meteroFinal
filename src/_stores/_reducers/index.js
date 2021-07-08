import { combineReducers } from 'redux';
import login from './LoginReducer';
import getJob from './SelectJobReducer';
import  meteroTable from './meteroTableReducer'
import  reviewSubmissionTable from './reviewSubmissionTableReducer'

const rootReducer = combineReducers({
    login:login,
    getJob:getJob,
    meteroTable:meteroTable,
    reviewSubmissionTable:reviewSubmissionTable
})

export default rootReducer;