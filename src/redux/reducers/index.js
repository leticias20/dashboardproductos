import { combineReducers } from 'redux';
import productosReducer from './productReducer';
import movimientoReducer from './movimientoReducer';

const rootReducer = combineReducers({
  products: productosReducer,
  movimientos: movimientoReducer, // <--- este nombre debe coincidir con useSelector
});

export default rootReducer;