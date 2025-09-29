const initialState = {
  categorias: [],
  loading: false,
  error: null,
};

const categoriaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORIAS_REQUEST':
      return { ...state, loading: true, error: action.payload };
    case 'FETCH_CATEGORIAS_SUCCESS':
      return { ...state, loading: false, categorias: action.payload };
    case 'FETCH_CATEGORIAS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default categoriaReducer;