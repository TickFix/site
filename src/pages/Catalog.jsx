import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { catalogService } from '../services/catalogService';

export const Catalog = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    subcategories: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    const result = await catalogService.getCategories();
    if (result.success) {
      setCategories(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Convert comma-separated subcategories to array
    const subcategoriesArray = formData.subcategories
      .split(',')
      .map(sub => sub.trim())
      .filter(sub => sub.length > 0);

    if (subcategoriesArray.length === 0) {
      setError('Debes agregar al menos una subcategoría');
      return;
    }

    const categoryData = {
      name: formData.name,
      subcategories: subcategoriesArray
    };

    const result = await catalogService.createCategory(categoryData);

    if (result.success) {
      setSuccess('Categoría creada exitosamente');
      setFormData({ name: '', subcategories: '' });
      setShowForm(false);
      loadCategories();
    } else {
      setError(result.error);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            Gestión de Catálogo
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#00BCD4] text-white px-4 py-2 rounded hover:bg-[#00ACC1] transition-colors"
          >
            {showForm ? 'Cancelar' : 'Nueva Categoría'}
          </button>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-[#1A2332] border border-gray-700 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Crear Nueva Categoría</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">
                  Nombre de la Categoría
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#0F1C2E] border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent"
                  placeholder="ej: Hardware"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Subcategorías (separadas por comas)
                </label>
                <input
                  type="text"
                  name="subcategories"
                  value={formData.subcategories}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#0F1C2E] border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent"
                  placeholder="ej: Laptop, Desktop, Impresora, Monitor"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Ingresa las subcategorías separadas por comas
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#00BCD4] text-white py-2 rounded hover:bg-[#00ACC1] transition-colors"
              >
                Crear Categoría
              </button>
            </form>
          </div>
        )}

        {/* Categories List */}
        <div className="bg-[#1A2332] border border-gray-700 rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Categorías Existentes</h2>

            {loading ? (
              <p className="text-gray-400">Cargando categorías...</p>
            ) : categories.length === 0 ? (
              <p className="text-gray-400">No hay categorías creadas todavía</p>
            ) : (
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="border border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow hover:border-[#00BCD4]"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub, subIndex) => (
                        <span
                          key={subIndex}
                          className="bg-[#00BCD4]/20 text-[#00BCD4] px-3 py-1 rounded-full text-sm border border-[#00BCD4]/30"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};