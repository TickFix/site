import { useState, useEffect } from 'react';
import { EditCategoryModal } from '../components/EditCategoryModal';

export const Catalog = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  
  // Form para crear
  const [newName, setNewName] = useState('');
  const [newSubcategories, setNewSubcategories] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  // Cargar categorías
  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/catalog/categories`);
      if (!response.ok) throw new Error('Error al cargar categorías');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Crear categoría
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/catalog/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName.trim(),
          subcategories: newSubcategories
            .split('\n')
            .map(s => s.trim())
            .filter(s => s.length > 0),
        }),
      });

      if (!response.ok) throw new Error('Error al crear categoría');
      
      await loadCategories();
      setShowCreateModal(false);
      setNewName('');
      setNewSubcategories('');
    } catch (err) {
      setError(err.message);
    }
  };

  // Eliminar categoría
  const handleDelete = async (categoryPk) => {
    if (!confirm(`¿Estás seguro de eliminar la categoría "${categoryPk}"?`)) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/catalog/categories/${categoryPk}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar categoría');
      
      await loadCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1C2E] flex items-center justify-center">
        <div className="text-white text-xl">Cargando categorías...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1C2E] py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Catálogo de Servicios</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#1E88E5] hover:bg-[#1976D2] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            + Nueva Categoría
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Lista de categorías */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.pk}
              className="bg-[#1A2332] border border-gray-700 rounded-lg p-6 hover:border-[#1E88E5] transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
                <div className="flex gap-2">
                  {/* Botón Editar */}
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="text-[#1E88E5] hover:text-[#1976D2] text-sm font-medium"
                    title="Editar"
                  >
                    ✏️
                  </button>
                  {/* Botón Eliminar */}
                  <button
                    onClick={() => handleDelete(category.pk)}
                    className="text-red-500 hover:text-red-600 text-sm font-medium"
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-3">ID: {category.pk}</p>

              <div>
                <p className="text-sm text-gray-400 mb-2">Subcategorías:</p>
                <ul className="space-y-1">
                  {category.subcategories.map((sub, idx) => (
                    <li key={idx} className="text-gray-300 text-sm">
                      • {sub}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {categories.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-4">
              No hay categorías creadas aún
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-[#1E88E5] hover:bg-[#1976D2] text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Crear Primera Categoría
            </button>
          </div>
        )}

        {/* Modal Crear */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#1A2332] border border-gray-700 rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Nueva Categoría</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F1C2E] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subcategorías (una por línea)
                  </label>
                  <textarea
                    value={newSubcategories}
                    onChange={(e) => setNewSubcategories(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F1C2E] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-[#1E88E5] min-h-[120px]"
                    placeholder="Laptops&#10;Desktops&#10;Impresoras"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#1E88E5] hover:bg-[#1976D2] text-white py-3 rounded font-medium"
                  >
                    Crear
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Editar */}
        {editingCategory && (
          <EditCategoryModal
            category={editingCategory}
            onClose={() => setEditingCategory(null)}
            onUpdate={() => {
              loadCategories();
              setEditingCategory(null);
            }}
          />
        )}
      </div>
    </div>
  );
};