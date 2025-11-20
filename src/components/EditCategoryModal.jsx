import { useState } from 'react';

export const EditCategoryModal = ({ category, onClose, onUpdate }) => {
  const [name, setName] = useState(category.name);
  const [subcategories, setSubcategories] = useState(category.subcategories.join('\n'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/catalog/categories/${category.pk}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            subcategories: subcategories
              .split('\n')
              .map(s => s.trim())
              .filter(s => s.length > 0),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error al actualizar categoría');
      }

      const data = await response.json();
      onUpdate(data);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1A2332] border border-gray-700 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Editar Categoría</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre de la categoría
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-[#0F1C2E] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Nota: El ID (pk) no cambiará: {category.pk}
            </p>
          </div>

          {/* Subcategorías */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Subcategorías (una por línea)
            </label>
            <textarea
              value={subcategories}
              onChange={(e) => setSubcategories(e.target.value)}
              className="w-full px-4 py-3 bg-[#0F1C2E] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-[#1E88E5] min-h-[120px]"
              placeholder="Laptops&#10;Desktops&#10;Impresoras"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
              {error}
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#1E88E5] hover:bg-[#1976D2] text-white py-3 rounded font-medium disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};