import axios from 'axios'
import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL} 
    from '../constants/productsConstants'

export const listProducts = ()=> async(dispatch)=>{
    try{
        dispatch({type: PRODUCT_LIST_REQUEST})

        const { data } = await axios.get('/api/auth/login')
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
             ? error.response.data.message
             :error.message
        })

    }
}

export const listuserDetails = (id)=> async(dispatch)=>{
    try{
        dispatch({type: USER_DETAILS_REQUEST})

        const { data } = await axios.get(`/api/auth/login/${id}`)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
             ? error.response.data.message
             :error.message
        })

    }
}