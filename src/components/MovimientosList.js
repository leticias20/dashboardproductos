
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Asegúrate de tener estas acciones en tu Redux
import { fetchMovimientos, deleteMovimiento} from '../redux/actions/movimientoActions';
import { Link } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import AddMovimientoForm from './AddMovimientoForm'; // Importa el formulario

const MovimientosList = () => {
  const dispatch = useDispatch();
  const { movimientos, loading, error } = useSelector((state) => state.movimientos);
const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchMovimientos());
  }, [dispatch]);

  const handleDelete = async (movimientoId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este movimiento?')) {
      await dispatch(deleteMovimiento(movimientoId));
      dispatch(fetchMovimientos());
    }
  };

  console.log(movimientos)

  return (
  <div>
    <HamburgerMenu>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/productos">Dashboard de Productos</Link></li>
        <li><Link to="/movimientos">Dashboard de Movimientos</Link></li>
      </ul>
    </HamburgerMenu>
    <h1>Dashboard de Movimientos</h1>
    <AddMovimientoForm />
    {loading && <p>Cargando movimientos...</p>}
    {error && <p>Error: {error}</p>}
    <ul>
      {movimientos.map((mov) => {
        const producto = products.find(p => p.idProducto === mov.id_producto);
        return (
          <li key={mov.id_movimiento}>
            <strong>
               {mov.tipo} de {producto ? producto.nombre : mov.id_producto}
            </strong> - fecha: {mov.fecha} - cantidad: {mov.cantidad}
            <button
              onClick={() => handleDelete(mov.id_movimiento)}
              style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
            >
              Eliminar
            </button>
          </li>
        );
      })}
    </ul>
  </div>
);
}

export default MovimientosList;