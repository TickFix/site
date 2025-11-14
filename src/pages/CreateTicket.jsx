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
        <h1 className="text-3xl font-bold mb-6 text-white">
          Crear Nuevo Ticket
        </h1>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-[#1A2332] border border-gray-700 p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div>
              <label className="block text-gray-300 mb-2 font-semibold">
                Categoría *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                required
                className="w-full px-4 py-2 bg-[#0F1C2E] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent"
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
                <label className="block text-gray-300 mb-2 font-semibold">
                  Subcategoría *
                </label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#0F1C2E] border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent"
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
              <label className="block text-gray-300 mb-2 font-semibold">
                Descripción del Problema *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 bg-[#0F1C2E] border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent"
                placeholder="Describe detalladamente el problema..."
              />
            </div>

            {/* File Upload */}
            <div className="border-t border-gray-700 pt-6">
              <label className="block text-gray-300 mb-2 font-semibold">
                Adjuntar Evidencia (Opcional)
              </label>
              <div className="flex gap-2">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="flex-1 px-4 py-2 bg-[#0F1C2E] border border-gray-600 rounded text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#00BCD4] file:text-white file:cursor-pointer hover:file:bg-[#00ACC1] focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleFileUpload}
                  disabled={!file || uploading}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  {uploading ? 'Subiendo...' : 'Subir'}
                </button>
              </div>
              {uploadedFileKey && (
                <p className="text-sm text-green-400 mt-2">
                  ✓ Archivo subido: {uploadedFileKey.split('/').pop()}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={creating || !formData.category || !formData.subcategory}
              className="w-full bg-[#00BCD4] text-white py-3 rounded hover:bg-[#00ACC1] disabled:bg-gray-600 disabled:cursor-not-allowed font-semibold transition-colors"
            >
              {creating ? 'Creando Ticket...' : 'Crear Ticket'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};