import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos: {error}</p>;

  return (
    <div>
                    <h2>Lista de Productos</h2>
                    <ul>
                        {products.map(product => (
                            <li key={product.id_producto}>
                                {product.nombre} - Cantidad: {product.cantidad} - Precio: ${product.precio}
                            </li>
                        ))}
                    </ul>
                </div>
  );
};

export default ProductList;
