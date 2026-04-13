import actionTypes from "./actionTypes";
import {
  getProducts,
  getTopProducts,
  getProductsById,
  createProductReview,
} from "../../services/productServices";

/**
 * Returns a list of all products
 */
export const listProducts = (keyword = "", pageNumber = "") => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.PRODUCT_LIST_REQUEST });
      const data = await getProducts(keyword, pageNumber);
      dispatch({
        type: actionTypes.PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

/**
 * Returns a list of the most ranked products
 */
export const listProductsTop = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.PRODUCTS_TOP_REQUEST });
      const data = await getTopProducts(); //observacion :: cambiar nombre a "data"
      dispatch({
        type: actionTypes.PRODUCTS_TOP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCTS_TOP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

/**
 * Returns a product
 */

export const productById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.PRODUCT_BY_ID_REQUEST });

      const data = await getProductsById(id);

      dispatch({
        type: actionTypes.PRODUCT_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_BY_ID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

/**
 * Create product review
 */

export const createReviewAction = (token, body, id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.TYPE_REQUEST });
      const data = await createProductReview(token, body, id);
      console.log(data);
      dispatch({
        type: actionTypes.TYPE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.TYPE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
