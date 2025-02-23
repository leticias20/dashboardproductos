const initialState = {
    products: [],
    loading: false,
    error: null,
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PRODUCTS_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_PRODUCTS_SUCCESS':
        return { ...state, loading: false, products: action.payload };
      case 'ADD_PRODUCT_SUCCESS':
            return {
              ...state,
              loading: false,
              products: [...state.products, action.payload], // Agrega el nuevo producto a la lista
            };
      case 'DELETE_PRODUCT_SUCCESS':
            return {
              ...state,
              loading: false,
              products: state.products.filter((product) => product.id !== action.payload),
            };

          case 'FETCH_PRODUCTS_FAILURE':
          case 'ADD_PRODUCT_FAILURE':
          case 'DELETE_PRODUCT_FAILURE':
            return { ...state, loading: false, error: action.payload };

          default:
            return state;
        }
  };
  
  export default productReducer;
  