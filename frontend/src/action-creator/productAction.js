import axios from 'axios'
import{ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS
} from '../constants/productConstants'

const getProduct = () => async(dispatch)=>{
    try {
        
        dispatch({ type: ALL_PRODUCT_REQUEST});
        
        
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message,
        })
    }
}
