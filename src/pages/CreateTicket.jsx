import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { catalogService } from '../services/catalogService';
import { ticketService } from '../services/ticketService';

export const CreateTicket = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    description: ''
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [uploadedFileKey, setUploadedFileKey] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const result = await catalogService.getCategories();
    if (result.success) {
      setCategories(result.data);
    } else {
      setError('Error al cargar categorías');
    }
  };

  const handleCategoryChange = (e) => {
    const categoryName = e.target.value;
    const category = categories.find(cat => cat.name === categoryName);
    setSelectedCategory(category);
    setFormData({
      ...formData,
      category: categoryName,
      subcategory: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadedFileKey('');
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError('Por favor selecciona un archivo');
      return;
    }

    setUploading(true);
    setError('');

    const result = await ticketService.uploadFile(file, user.email);

    if (result.success) {
      setUploadedFileKey(result.data.key);
      alert('Archivo subido exitosamente');
    } else {
      setError(result.error);
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError('');

    const result = await ticketService.createTicket(formData, user.email);

    if (result.success) {
      alert(`Ticket creado exitosamente con ID: ${result.data.id}`);
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    setCreating(false);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Crear Nuevo Ticket
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Categoría *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory */}
            {selectedCategory && (
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  Subcategoría *
                </label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona una subcategoría</option>
                  {selectedCategory.subcategories.map((sub, index) => (
                    <option key={index} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Descripción del Problema *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe detalladamente el problema..."
              />
            </div>

            {/* File Upload */}
            <div className="border-t pt-6">
              <label className="block text-gray-700 mb-2 font-semibold">
                Adjuntar Evidencia (Opcional)
              </label>
              <div className="flex gap-2">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleFileUpload}
                  disabled={!file || uploading}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Subiendo...' : 'Subir'}
                </button>
              </div>
              {uploadedFileKey && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ Archivo subido: {uploadedFileKey.split('/').pop()}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={creating || !formData.category || !formData.subcategory}
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold"
            >
              {creating ? 'Creando Ticket...' : 'Crear Ticket'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};