import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Loader2, 
  Upload, 
  Image as ImageIcon, 
  LogOut, 
  Plus, 
  X,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET;

const AdminDashboard = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  // Auth Check
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Fetch Images
  const fetchImages = async () => {
    try {
      const tag = 'retrobest-gallery';
      const response = await fetch(`https://res.cloudinary.com/${CLOUD_NAME}/image/list/${tag}.json`);
      if (response.ok) {
        const data = await response.json();
        const remoteImages = data.resources.map(res => ({
          url: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto,w_400,c_fill,g_auto/${res.public_id}.${res.format}`,
          publicId: res.public_id,
          format: res.format,
          createdAt: res.created_at
        }));
        setImages(remoteImages);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin/login');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setMessage({ text: '', type: '' });
    }
  };

  const generateSignature = async (publicId, timestamp, secret) => {
    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${secret}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(stringToSign);
    const hashBuffer = await window.crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('tags', 'retrobest-gallery');
    formData.append('folder', 'retrobest');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );
      const data = await response.json();
      if (data.secure_url) {
        setMessage({ text: 'Image uploaded successfully!', type: 'success' });
        setSelectedFile(null);
        setPreview(null);
        fetchImages();
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (publicId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    setDeletingId(publicId);
    try {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const signature = await generateSignature(publicId, timestamp, API_SECRET);

      const formData = new FormData();
      formData.append('public_id', publicId);
      formData.append('api_key', API_KEY);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
        { method: 'POST', body: formData }
      );
      const result = await response.json();
      if (result.result === 'ok') {
        setImages(prev => prev.filter(img => img.publicId !== publicId));
      } else {
        throw new Error(result.error?.message || 'Delete failed');
      }
    } catch (error) {
      alert(`Delete error: ${error.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar/Top Header */}
      <nav className="border-b border-white/5 bg-[#111] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-bold text-xl">R</div>
          <h2 className="text-xl font-bold font-serif hidden md:block">Retro Beats <span className="text-red-500">Admin</span></h2>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-red-600/10 hover:text-red-500 transition-all duration-300 font-medium text-sm border border-white/5"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Upload Section */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#111] rounded-3xl p-8 border border-white/5 shadow-2xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-red-500" />
                Add New Image
              </h3>
              
              <div className="space-y-6">
                {/* File Drop/Input */}
                <div 
                  className={`relative border-2 border-dashed rounded-2xl p-6 transition-all duration-300 flex flex-col items-center justify-center min-h-[250px] ${
                    preview ? 'border-red-600/30 bg-red-600/5' : 'border-white/10 hover:border-red-600/20 bg-black/40'
                  }`}
                >
                  {preview ? (
                    <div className="w-full h-full relative">
                      <img src={preview} alt="Preview" className="w-full h-48 object-contain rounded-xl" />
                      <button 
                        onClick={() => { setSelectedFile(null); setPreview(null); }}
                        className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1 shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                        <Upload className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-300">Click or drag image to upload</p>
                      <p className="text-xs text-slate-500 mt-2">Supports JPG, PNG, WEBP (Max 10MB)</p>
                      <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                    </label>
                  )}
                </div>

                {/* Upload Button */}
                <button
                  onClick={handleUpload}
                  disabled={!selectedFile || uploading}
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 ${
                    !selectedFile || uploading 
                      ? 'bg-white/5 text-slate-500 cursor-not-allowed' 
                      : 'bg-red-600 hover:bg-red-500 shadow-lg shadow-red-900/20'
                  }`}
                >
                  {uploading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Upload to Gallery
                    </>
                  )}
                </button>

                {/* Message */}
                {message.text && (
                  <div className={`p-4 rounded-xl flex items-start gap-3 text-sm ${
                    message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                    {message.text}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Image Management List */}
          <div className="lg:col-span-8">
            <div className="bg-[#111] rounded-3xl p-8 border border-white/5 shadow-2xl min-h-[600px]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-red-500" />
                  Manage Gallery ({images.length})
                </h3>
                <button onClick={fetchImages} className="text-slate-400 hover:text-white transition-colors">
                  <Plus className="w-5 h-5 rotate-45" /> {/* Use as a refresh icon or similar */}
                </button>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                  <Loader2 className="w-10 h-10 animate-spin mb-4" />
                  <p>Loading gallery images...</p>
                </div>
              ) : images.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500 bg-black/20 rounded-2xl border border-dashed border-white/5">
                  <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                  <p>No images found in your Cloudinary gallery.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {images.map((img) => (
                    <div key={img.publicId} className="group relative aspect-square rounded-2xl overflow-hidden bg-black border border-white/5 hover:border-red-500/30 transition-all duration-300">
                      <img src={img.url} alt="Gallery item" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      
                      {/* Actions Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between p-4">
                        <button
                          onClick={() => handleDelete(img.publicId)}
                          disabled={deletingId === img.publicId}
                          className="w-10 h-10 rounded-xl bg-red-600 hover:bg-red-500 flex items-center justify-center transition-all duration-300 shadow-lg"
                        >
                          {deletingId === img.publicId ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                        <div className="text-[10px] text-slate-400 font-medium">
                          {new Date(img.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
