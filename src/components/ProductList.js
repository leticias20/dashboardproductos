import React,{useState,useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, updateProduct } from '../redux/actions/productActions';
import AddProductForm from './AddProductForm';
import HamburgerMenu from './HamburgerMenu';
import { Link } from 'react-router-dom';
import '../App.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products || { products: [], loading: false, error: null });

   // selector separado para categorias para evitar expresiones lógicas dentro de useMemo deps
  const categoriasState = useSelector((state) => state.categorias || {});
  const categorias = categoriasState.categorias || [];

  const categoriaMap = useMemo(() => {
    return (categorias || []).reduce((acc, c) => {
      const key = c.id ?? c.idCategoria ?? c._id;
      if (key != null) acc[key] = c.nombre;
      return acc;
    }, {});
  }, [categorias]);

  // Estado para edición
  const [editingProduct, setEditingProduct] = useState(null);
  const [editNombre, setEditNombre] = useState('');
  const [editPrecio, setEditPrecio] = useState('');
  const [editCantidad, setEditCantidad] = useState('');
  const [editCategoria, setEditCategoria] = useState('');
  const [searchName, setSearchName] = useState('');

  const handleDelete = async (productId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      await dispatch(deleteProduct(productId));
      dispatch(fetchProducts());
    }
  };

  // Iniciar edición
  const handleEditClick = (product) => {
    setEditingProduct(product.idProducto);
    setEditNombre(product.nombre);
    setEditPrecio(product.precio);
    setEditCantidad(product.cantidad);
    setEditCategoria(product.categoria ?? '');
  };

  // Guardar cambios
    const handleEditSave = async (e) => {
    e.preventDefault();
    // construir payload con cantidad y categoría y convertir numéricos
    const payload = {
      nombre: editNombre,
      precio: Number(editPrecio || 0),
      cantidad: Number(editCantidad || 0),
      categoria: editCategoria,
    };
    await dispatch(updateProduct(editingProduct, payload));
    setEditingProduct(null);
    dispatch(fetchProducts());
  };

  // Cancelar edición
  const handleEditCancel = () => {
    setEditingProduct(null);
  };

   // resumen simple para estadisticas
  const totalProductos = products ? products.length : 0;
  const totalStock = products ? products.reduce((s,p) => s + Number(p.cantidad || 0), 0) : 0;

  const filteredProducts = (products || []).filter((p) => {
    const matchesName = searchName ? p.nombre.toLowerCase().includes(searchName.toLowerCase()) : true;
    return  matchesName;
 });

  // ordenar por categoría (nombre) y luego por nombre de producto
 const sortedProducts = (filteredProducts || []).slice().sort((a, b) => {
   const catA = (categoriaMap[a.categoria] || '').toString().toLowerCase();
   const catB = (categoriaMap[b.categoria] || '').toString().toLowerCase();
   if (catA < catB) return -1;
   if (catA > catB) return 1;
   // si categoría igual, ordenar por nombre de producto
   const nameA = (a.nombre || '').toString().toLowerCase();
   const nameB = (b.nombre || '').toString().toLowerCase();
   if (nameA < nameB) return -1;
   if (nameA > nameB) return 1;
   return 0;
 });

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" style={{ alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <HamburgerMenu>
            <ul style={{ listStyle: 'none', padding: 8, margin: 0 }}>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Catálogo de Productos</Link></li>
              <li><Link to="/movimientos">Catálogo de Movimientos</Link></li>
            </ul>
          </HamburgerMenu>

          <div className="dashboard-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <h1 style={{ margin: 0, fontSize: '1.45rem', whiteSpace: 'nowrap' }}>Catálogo de Productos</h1>
            <span className="badge">Inventario</span>
          </div>
        </div>

        <div className="header-controls">
          <input
            className="search-input"
            type="text"
            placeholder="Buscar por nombre..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <AddProductForm />
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="label">Productos</div>
          <div className="value">{totalProductos}</div>
        </div>
        <div className="stat">
          <div className="label">Stock total</div>
          <div className="value">{totalStock}</div>
        </div>
      </div>

      {loading && <p>Cargando productos...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul className="card-list">
        {sortedProducts.map((product) => (
          <li key={product.idProducto} className="card">
            {editingProduct === product.idProducto ? (
              <form onSubmit={handleEditSave} className="form-inline">
                <input
                  type="text"
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                  required
                />
                <input
                  type="number"
                  value={editPrecio}
                  onChange={(e) => setEditPrecio(e.target.value)}
                  required
                />
                <select
                  value={editCategoria}
                  onChange={(e) => setEditCategoria(e.target.value)}
                  required
                >
                  <option value="">Categoría</option>
                  {categorias.map((cat) => {
                    const key = cat.id ?? cat.idCategoria ?? cat._id;
                    return <option key={key} value={key}>{cat.nombre}</option>;
                })}
                 </select>
                <input
                  type="number"
                  value={editCantidad}
                  onChange={(e) => setEditCantidad(e.target.value)}
                  min="0"
                  step="1"
                />
                <div style={{ marginTop: 8 }}>
                  <button className="btn btn-edit" type="submit">Guardar</button>
                  <button className="btn" type="button" onClick={handleEditCancel}>Cancelar</button>
                </div>
              </form>
            ) : (
              <>
                <h3 style={{ margin: 0 }}>{product.nombre}</h3>
                <div className="meta" style={{ alignItems: 'center' }}>
                  <div className="badge">${product.precio}</div>
                  <div className="qty">Cantidad: {product.cantidad}</div>
                  {product.categoria && (
                    <div style={{ color: 'var(--muted)', marginLeft: 8 }}>
                      {categoriaMap[product.categoria] || product.categoria}
                    </div>
                  )}
                </div>

                <div className="card-actions">
                  <button className="btn btn-edit" onClick={() => handleEditClick(product)}>Editar</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(product.idProducto)}>Eliminar</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
