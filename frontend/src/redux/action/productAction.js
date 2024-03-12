import axios from "axios"
import { actionTypes } from "./action-types"
// import actionTypes from "./action-types"


export const listProduct= () => async(dispatch)=> {
        try {
            dispatch({
                type:actionTypes.PRODUCT_LIST_REQUEST
            })

            const { data } = await axios.get('/api/products')

            dispatch({
                type:actionTypes.PRODUCT_LIST_SUCCESS,
                payload:data
            })
        } catch (error) {
            dispatch({
                type:actionTypes.PRODUCT_LIST_FAIL,
                payload:error
            })
            
        }
}

export const detailProduct= (id) => async(dispatch)=> {
        try {
            dispatch({
                type:actionTypes.PRODUCT_DETAIL_REQUEST
            })

            const { data } = await axios.get(`/api/products/${id}`)

            dispatch({
                type:actionTypes.PRODUCT_DETAIL_SUCCESS,
                payload:data
            })
        } catch (error) {
            dispatch({
                type:actionTypes.PRODUCT_DETAIL_FAIL,
                payload:error
            })
            
        }
}
