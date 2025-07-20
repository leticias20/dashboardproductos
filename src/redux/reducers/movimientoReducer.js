const initialState = {
  movimientos: [],
  loading: false,
  error: null,
};

const movimientosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIMIENTOS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_MOVIMIENTOS_SUCCESS':
      return { ...state, loading: false, movimientos: action.payload };
    case 'FETCH_MOVIMIENTOS_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'DELETE_MOVIMIENTO_REQUEST':
      return { ...state, loading: true, error: null };
    case 'DELETE_MOVIMIENTO_SUCCESS':
      return {
        ...state,
        loading: false,
        movimientos: state.movimientos.filter(
          (mov) => mov.id !== action.payload
        ),
      };
    case 'DELETE_MOVIMIENTO_FAILURE':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default movimientosReducer;