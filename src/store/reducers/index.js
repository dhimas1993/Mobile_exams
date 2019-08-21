import {combineReducers, createStore, compose } from 'redux'

let initialState = {
    uid: '',
    email: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {...state, uid: action.payload.uid, email: action.payload.email}
        case 'LOGOUT_SUCCESS':
            return {...state, uid: '', email: ''}
        default:
            return state
    }
}

/*
    nilai varibale composeEnhancers ada dua kemungkinan, antara lain:
        - window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ yang akan ada ketika proses development
        - compose, di import dari redux
*/
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
    auth: authReducer
})

const STORE = createStore(reducers, composeEnhancers())

export default STORE