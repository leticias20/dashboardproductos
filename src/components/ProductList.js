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
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.idProducto} className="border p-4 rounded shadow">
          <h2 className="text-xl font-bold">{product.idProducto}</h2>
          <img src={product.image} alt={product.nombre} className="w-full h-40 object-cover" />
          <p className="text-gray-700">${product.precio}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
