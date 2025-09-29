import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk' // Middleware para acciones asíncronas
import productReducer from './reducers/productReducer'; // Asegúrate de que el path es correcto
import movimientoReducer from './reducers/movimientoReducer';// Asegúrate de que el path es correcto
import categoriaReducer from './reducers/categoriaReducer'; // Asegúrate de que el path es correcto

// Combina los reducers en caso de tener más de uno
const rootReducer = combineReducers({
  products: productReducer,
  movimientos: movimientoReducer,
  categorias: categoriaReducer // Asegúrate de que este reducer está bien definido
});

// Crea el store con middleware thunk
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store; // Exporta el store correctamente
