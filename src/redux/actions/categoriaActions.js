import axios from 'axios';

export const fetchCategorias = () => async (dispatch) => {
  dispatch({ type: 'FETCH_CATEGORIAS_REQUEST' });
  try {
    const response = await axios.get('api/categorias');
    console.info("Categorías obtenidas:", response.data);
    dispatch({ type: 'FETCH_CATEGORIAS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'FETCH_CATEGORIAS_FAILURE',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};