import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../redux/actions/productActions';
import { fetchCategorias } from '../redux/actions/categoriaActions';
import { fetchProducts } from '../redux/actions/productActions';

const AddProductForm = () => {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => (state.categorias || {}).categorias) || [];
  const products = useSelector((state) => (state.products || {}).products) || [];

  const [product, setProduct] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    cantidad: ''
  });
  const [isNewName, setIsNewName] = useState(false);
  const [newName, setNewName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  // edición
  const [editMode, setEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    dispatch(fetchCategorias());
    if (!products || products.length === 0) dispatch(fetchProducts());
  }, [dispatch]);

  const nameOptions = Array.from(new Set(products.map((p) => p.nombre))).filter(Boolean);

  const handleChange = (e) => {
    setFormError(null);
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleNameSelect = (e) => {
    const val = e.target.value;
    setFormError(null);

    if (val === '_new') {
      // agregar nuevo nombre
      setIsNewName(true);
      setEditMode(false);
      setEditingProductId(null);
      setProduct((p) => ({ ...p, nombre: '' }));
      return;
    }

    setIsNewName(false);
    setProduct((p) => ({ ...p, nombre: val }));

    // si selecciona un nombre existente, cargar en modo edición
    const prod = products.find((p) => String(p.nombre) === String(val));
    if (prod) {
      setEditMode(true);
      setEditingProductId(prod.idProducto ?? prod.id);
      setProduct({
        nombre: prod.nombre || '',
        precio: prod.precio ?? '',
        categoria: prod.categoria ?? '',
        cantidad: prod.cantidad ?? ''
      });
    } else {
      setEditMode(false);
      setEditingProductId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditingProductId(null);
    setIsNewName(false);
    setNewName('');
    setProduct({ nombre: '', precio: '', categoria: '', cantidad: '' });
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    const finalName = isNewName ? (newName || '').trim() : (product.nombre || '').trim();
    if (!finalName) {
      setFormError('El nombre del producto es obligatorio.');
      return;
    }

    // evitar duplicados al crear (si no estamos en editMode)
    if (!editMode) {
      const exists = products.some((p) => String(p.nombre).toLowerCase() === finalName.toLowerCase());
      if (exists) {
        setFormError('Ya existe un producto con ese nombre.');
        return;
      }
    }

    const payload = {
      nombre: finalName,
      precio: product.precio,
      categoria: product.categoria,
      cantidad: product.cantidad
    };

    setIsSubmitting(true);
    try {
      if (editMode && editingProductId != null) {
        await dispatch(updateProduct(editingProductId, payload));
      } else {
        await dispatch(addProduct(payload));
      }
      await dispatch(fetchProducts());
      // reset
      setProduct({ nombre: '', precio: '', categoria: '', cantidad: '' });
      setNewName('');
      setIsNewName(false);
      setEditMode(false);
      setEditingProductId(null);
    } catch (err) {
      setFormError(err?.message || 'Error al guardar el producto.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="add-form add-form-inline" onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <select
          name="nombreSelect"
          value={isNewName ? '_new' : product.nombre}
          onChange={handleNameSelect}
          className="af-input"
          aria-label="Nombre del producto"
          required={!isNewName && !editMode}
        >
          <option value="">Selecciona nombre...</option>
          {nameOptions.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
          <option value="_new">+ Agregar nuevo...</option>
        </select>

        {isNewName && (
          <input
            type="text"
            name="newName"
            placeholder="Nuevo nombre"
            value={newName}
            onChange={(e) => { setFormError(null); setNewName(e.target.value); }}
            className="af-input"
            required
          />
        )}

        <input className="af-input" type="number" name="precio" placeholder="Precio" value={product.precio} onChange={handleChange} required />
        <input className="af-input" type="number" name="cantidad" placeholder="Cantidad" value={product.cantidad} onChange={handleChange} required />

        <select className="af-input" name="categoria" value={product.categoria} onChange={handleChange} required>
          <option value="">Categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : editMode ? 'Guardar cambios' : 'Agregar'}
        </button>

        {editMode && (
          <button type="button" className="btn" onClick={handleCancelEdit} style={{ marginLeft: 4 }}>
            Cancelar
          </button>
        )}
      </div>

      {formError && <p style={{ color: 'red', margin: '6px 0 0' }}>{formError}</p>}
    </form>
  );
};

export default AddProductForm;