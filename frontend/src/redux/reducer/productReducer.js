import { actionTypes } from "../action/action-types"


export const productListReducer = (state={products:[]},{type,payload})=>{
        switch (type) {
            case actionTypes.PRODUCT_LIST_REQUEST:
                return{loading:true,products:[]}
            case actionTypes.PRODUCT_LIST_SUCCESS:
                return{loading:false,products:payload}
            case actionTypes.PRODUCT_LIST_FAIL:
                return{loading:false,error:payload}
            default:
                return state
        }
}
export const productDetailReducer = (state={product:{ review:[] }},{type,payload})=>{
        switch (type) {
            case actionTypes.PRODUCT_DETAIL_REQUEST:
                return{loading:true,...state}
            case actionTypes.PRODUCT_DETAIL_SUCCESS:
                return{loading:false,product:payload}
            case actionTypes.PRODUCT_DETAIL_FAIL:
                return{loading:false,error:payload}
            default:
                return state
        }
}

