import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL } from '../constants/productsConstants'

export const productListReducer = (state={ products:[]}, action) =>{
    switch(action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products:[]}
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}



export const userDetailsReducer = (state={ user:{ comments:[] }}, action) =>{
    switch(action.type) {
        case USER_DETAILS_REQUEST:
            return { loading: true, ...state}
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}