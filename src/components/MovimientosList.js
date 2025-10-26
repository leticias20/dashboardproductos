
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Asegúrate de tener estas acciones en tu Redux
import { fetchMovimientos, deleteMovimiento} from '../redux/actions/movimientoActions';
import { fetchProducts } from '../redux/actions/productActions';
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
  const [searchName, setSearchName] = useState('');


 useEffect(() => {
    dispatch(fetchMovimientos());
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const productMap = useMemo(() => {
    return (products || []).reduce((acc, p) => {
      const key = (p.idProducto ?? p.id ?? p._id);
      if (key != null) {
        acc[String(key)] = p.nombre || p.name || p.productoNombre || '';
      }
      return acc;
    }, {});
  }, [products]);

   const getProductName = (mov) => {
    const prodIdKey = String(mov.id_producto);
    let nombre = productMap[prodIdKey] || null;
    if (!nombre) {
      const prod = (products || []).find((p) => String(p.idProducto ?? p.id ?? p._id) === prodIdKey);
      nombre = prod ? (prod.nombre || prod.name || prod.productoNombre || '') : '';
    }
    return nombre;
  };

    // aplicar filtro por nombre (case-insensitive)
  const filteredMovimientos = (movimientos || []).filter((mov) => {
    if (!searchName) return true;
    const nombre = (getProductName(mov) || '').toLowerCase();
    return nombre.includes(searchName.trim().toLowerCase());
  });

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
      <div className="dashboard-header" style={{ alignItems: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <HamburgerMenu>
            <ul style={{ listStyle: 'none', padding: 8, margin: 0 }}>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Dashboard de Productos</Link></li>
              <li><Link to="/movimientos">Dashboard de Movimientos</Link></li>
            </ul>
          </HamburgerMenu>

          <div className="dashboard-title" style={{ display: 'inline-flex', alignItems: 'left', gap: 8 }}>
            <h1 style={{ margin: 0, fontSize: '1.45rem', whiteSpace: 'nowrap' }}>Dashboard de Movimientos</h1>
            <span className="badge">Movimientos</span>
          </div>
        </div>

         <div className="header-controls">
          <input
            className="search-input"
            type="text"
            placeholder="Buscar por nombre de producto..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
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
        {filteredMovimientos.map((mov) => {
          const prodIdKey = String(mov.id_producto);
         const productoNombre = getProductName(mov) || null;
          return (
            <li key={mov.id_movimiento} className="card">
              <div>
                <h3 style={{ margin: 0 }}>
                  {productoNombre ? productoNombre : `Producto #${mov.id_producto}`}
                </h3>
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