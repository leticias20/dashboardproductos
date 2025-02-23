import axios from 'axios';

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });

  try {
    const response = await axios.get('api/productos');
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data });
  } catch (error) {
    const errorMessage = error.response
      ? `Error del servidor: ${error.response.status} - ${error.response.data}`
      : error.message;

    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: errorMessage });
    console.error('Error al cargar productos:', errorMessage);
  }
};

// Acción para agregar un producto
export const addProduct = (productData) => async (dispatch) => {
  dispatch({ type: 'ADD_PRODUCT_REQUEST' });

  try {
    const response = await axios.post('api/productos', productData);

    dispatch({ type: 'ADD_PRODUCT_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'ADD_PRODUCT_FAILURE',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

