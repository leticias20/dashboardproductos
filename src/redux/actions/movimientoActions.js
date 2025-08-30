import axios from 'axios';
import { updateProductQuantity,fetchProducts } from './productActions';

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


// Acción para agregar un movimiento y actualizar cantidad de producto
export const addMovimiento = (movimientoData) => async (dispatch, getState) => {
  dispatch({ type: 'ADD_MOVIMIENTO_REQUEST' });
  try {
    const response = await axios.post('api/movimientos', movimientoData);
    dispatch({ type: 'ADD_MOVIMIENTO_SUCCESS', payload: response.data });

    // Obtener productos actuales
    const products = getState().products.products;
    console.log("Productos actuales:", products);
    const producto = products.find(p => p.idProducto == movimientoData.id_producto);
    console.log("Producto encontrado:", producto);

    if (producto) {
      let nuevaCantidad = producto.cantidad;
      if (movimientoData.tipo === 'entrada') {
        nuevaCantidad += Number(movimientoData.cantidad);
      } else if (movimientoData.tipo === 'salida') {
        nuevaCantidad -= Number(movimientoData.cantidad);
      }
      console.log("Nueva cantidad calculada:", nuevaCantidad);
      // Actualiza la cantidad del producto
      await dispatch(updateProductQuantity(producto.idProducto, nuevaCantidad));
      await dispatch(fetchProducts());
    }
  } catch (error) {
    dispatch({
      type: 'ADD_MOVIMIENTO_FAILURE',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};