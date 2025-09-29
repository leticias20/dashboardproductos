import { combineReducers } from 'redux';
import productosReducer from './productReducer';
import movimientoReducer from './movimientoReducer';
import categoriaReducer from './categoriaReducer';

const rootReducer = combineReducers({
  products: productosReducer,
  movimientos: movimientoReducer, // <--- este nombre debe coincidir con useSelector
  categorias: categoriaReducer
});

export default rootReducer;