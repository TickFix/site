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
          <h1 className="text-3xl font-bold text-gray-800">
            Gestión de Catálogo
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {showForm ? 'Cancelar' : 'Nueva Categoría'}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Crear Nueva Categoría</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Nombre de la Categoría
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ej: Hardware"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Subcategorías (separadas por comas)
                </label>
                <input
                  type="text"
                  name="subcategories"
                  value={formData.subcategories}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ej: Laptop, Desktop, Impresora, Monitor"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Ingresa las subcategorías separadas por comas
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Crear Categoría
              </button>
            </form>
          </div>
        )}

        {/* Categories List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Categorías Existentes</h2>

            {loading ? (
              <p className="text-gray-600">Cargando categorías...</p>
            ) : categories.length === 0 ? (
              <p className="text-gray-600">No hay categorías creadas todavía</p>
            ) : (
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub, subIndex) => (
                        <span
                          key={subIndex}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
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