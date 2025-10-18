
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Asegúrate de tener estas acciones en tu Redux
import { fetchMovimientos, deleteMovimiento} from '../redux/actions/movimientoActions';
import { Link } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import AddMovimientoForm from './AddMovimientoForm'; // Importa el formulario
import '../App.css';

const MovimientosList = () => {
  const dispatch = useDispatch();
 // seguridad si el reducer no está definido aún
  const movimientosState = useSelector((state) => state.movimientos || {});
  const productsState = useSelector((state) => state.products || {});

  const movimientos = movimientosState.movimientos || [];
  const loading = movimientosState.loading;
  const error = movimientosState.error;

  const products = productsState.products || [];


  useEffect(() => {
    dispatch(fetchMovimientos());
  }, [dispatch]);

  const handleDelete = async (movimientoId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este movimiento?')) {
      await dispatch(deleteMovimiento(movimientoId));
      dispatch(fetchMovimientos());
    }
  };

  const totalMovimientos = movimientos.length;
  const totalCantidad = movimientos.reduce((s, m) => s + Number(m.cantidad || 0), 0);


  return (
    <div className="dashboard-container">
      <div className="dashboard-header" style={{ alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <HamburgerMenu>
            <ul style={{ listStyle: 'none', padding: 8, margin: 0 }}>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Dashboard de Productos</Link></li>
              <li><Link to="/movimientos">Dashboard de Movimientos</Link></li>
            </ul>
          </HamburgerMenu>

          <div className="dashboard-title">
            <h1 style={{ margin: 0, fontSize: '1.45rem' }}>Dashboard de Movimientos</h1>
            <span className="badge">Movimientos</span>
          </div>
        </div>

        <div className="header-controls">
          <AddMovimientoForm />
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="label">Movimientos</div>
          <div className="value">{totalMovimientos}</div>
        </div>
        <div className="stat">
          <div className="label">Cantidad total</div>
          <div className="value">{totalCantidad}</div>
        </div>
      </div>

      {loading && <p>Cargando movimientos...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul className="card-list">
        {movimientos.map((mov) => {
          const producto = products.find(p => p.idProducto === Number(mov.id_producto));
          return (
            <li key={mov.id_movimiento} className="card">
              <div>
                <h3 style={{ margin: 0 }}>{producto ? producto.nombre : `#${mov.id_producto}`}</h3>
                <div className="meta" style={{ marginTop: 6, alignItems: 'center' }}>
                  <div
                    className="badge"
                    style={{
                      background: mov.tipo === 'entrada' ? '#e8f7ed' : '#fff4f4',
                      color: mov.tipo === 'entrada' ? '#16a34a' : '#b91c1c',
                      fontWeight: 700,
                    }}
                  >
                    {mov.tipo}
                  </div>
                  <div style={{ color: 'var(--muted)', marginLeft: 8 }}>{mov.fecha}</div>
                  <div className="qty" style={{ marginLeft: 'auto' }}>Qty: {mov.cantidad}</div>
                </div>
              </div>

              <div className="card-actions">
                <button className="btn btn-delete" onClick={() => handleDelete(mov.id_movimiento)}>Eliminar</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};


export default MovimientosList;