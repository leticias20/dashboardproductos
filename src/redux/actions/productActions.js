import axios from 'axios';



export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });

  try {
    const response = await axios.get('api/productos');
    console.info("Producto: ", response.data);
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

// Acción para eliminar un producto
export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({ type: 'DELETE_PRODUCT_REQUEST', payload: productId });

  try {
    await axios.delete(`api/productos/${productId}`);

    dispatch({ type: 'DELETE_PRODUCT_SUCCESS', payload: productId });
  } catch (error) {
    dispatch({
      type: 'DELETE_PRODUCT_FAILURE',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Acción para actualizar un producto
export const updateProduct = (productId, updatedData) => async (dispatch) => {
  dispatch({ type: 'UPDATE_PRODUCT_REQUEST', payload: { productId, updatedData } });

  try {
    const response = await axios.put(`api/productos/${productId}`, updatedData);

    dispatch({ type: 'UPDATE_PRODUCT_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'UPDATE_PRODUCT_FAILURE',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};


export const fetchProductById = (id) => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  try {
    const response = await axios.get(`api/productos/${id}`);
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: [response.data] });
  } catch (error) {
    dispatch({
      type: 'FETCH_PRODUCTS_FAILURE',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Acción para actualizar cantidad de producto
export const updateProductQuantity = (productId, newCantidad) => async (dispatch) => {
  dispatch({ type: 'UPDATE_PRODUCT_QUANTITY_REQUEST', payload: { productId, newCantidad } });
  try {
    const response = await axios.put(`api/productos/${productId}/cantidad`, { cantidad: newCantidad });
    console.log("Respuesta de actualización de cantidad:", response.data);
    dispatch({ type: 'UPDATE_PRODUCT_QUANTITY_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'UPDATE_PRODUCT_QUANTITY_FAILURE',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
