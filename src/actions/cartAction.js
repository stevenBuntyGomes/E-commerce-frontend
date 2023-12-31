import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
} from '../consants/cartConsants'
import axios from 'axios'
import { API } from '../consants/api';

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    // try{
        // dispatch({type: LOGIN_REQUEST});
        // const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.get(`${API}/api/v1/products/${id}`);
        dispatch({type: ADD_TO_CART, payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
        }});
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    // } catch (error) {
    //     dispatch({type: LOGIN_FAIL, payload: "error.response.data.message"});
    // }
}

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

// save shipping info

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data, 
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
}