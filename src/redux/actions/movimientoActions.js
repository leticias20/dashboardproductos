import axios from 'axios';

// Obtener todos los movimientos
export const fetchMovimientos = () => async (dispatch) => {
  dispatch({ type: 'FETCH_MOVIMIENTOS_REQUEST' });
  try {
    const response = await axios.get('api/movimientos');
    dispatch({ type: 'FETCH_MOVIMIENTOS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'FETCH_MOVIMIENTOS_FAILURE',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Eliminar un movimiento
export const deleteMovimiento = (movimientoId) => async (dispatch) => {
  dispatch({ type: 'DELETE_MOVIMIENTO_REQUEST', payload: movimientoId });
  try {
    await axios.delete(`api/movimientos/${movimientoId}`);
    dispatch({ type: 'DELETE_MOVIMIENTO_SUCCESS', payload: movimientoId });
  } catch (error) {
    dispatch({
      type: 'DELETE_MOVIMIENTO_FAILURE',
      payload: error.response ? error.response.data.message : error.message,
    });
  }

};

// Acción para agregar un movimiento
export const addMovimiento = (movimientoData) => async (dispatch) => {
  dispatch({ type: 'ADD_MOVIMIENTO_REQUEST' });
  try {
    const response = await axios.post('api/movimientos', movimientoData);
    dispatch({ type: 'ADD_MOVIMIENTO_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'ADD_MOVIMIENTO_FAILURE',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};