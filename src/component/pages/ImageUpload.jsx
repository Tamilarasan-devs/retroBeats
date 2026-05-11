import React, { useState } from 'react';
import { Trash2, Loader2, ExternalLink } from 'lucide-react';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET;

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [uploadedData, setUploadedData] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setMessage({ text: 'Please select a valid image file.', type: 'error' });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setMessage({ text: 'File size must be under 10MB.', type: 'error' });
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setMessage({ text: '', type: '' });
    setUploadedData(null);
  };

  const handleImageChange = (e) => {
    handleFileSelect(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files[0]);
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
    if (!image) {
      setMessage({ text: 'Please select an image first.', type: 'error' });
      return;
    }
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      setMessage({ text: 'Cloudinary is not configured. Check your .env file.', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    const formData = new FormData();
    formData.append('file', image);
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
        setUploadedData({ url: data.secure_url, publicId: data.public_id });
        setMessage({ text: '✓ Image uploaded successfully and added to gallery!', type: 'success' });
        setImage(null);
        setPreview(null);
      } else {
        const errMsg = data?.error?.message || 'Upload failed. Please try again.';
        setMessage({ text: `Upload error: ${errMsg}`, type: 'error' });
        console.error('Cloudinary response:', data);
      }
    } catch (error) {
      console.error('Upload network error:', error);
      setMessage({ text: 'Network error. Please check your connection and try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!uploadedData?.publicId) return;
    if (!window.confirm('Are you sure you want to delete this uploaded image?')) return;

    setDeleting(true);
    try {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const signature = await generateSignature(uploadedData.publicId, timestamp, API_SECRET);

      const formData = new FormData();
      formData.append('public_id', uploadedData.publicId);
      formData.append('api_key', API_KEY);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
        { method: 'POST', body: formData }
      );

      const result = await response.json();
      if (result.result === 'ok') {
        setMessage({ text: '✓ Image deleted successfully from gallery.', type: 'success' });
        setUploadedData(null);
      } else {
        throw new Error(result.error?.message || 'Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage({ text: `Delete error: ${error.message}`, type: 'error' });
    } finally {
      setDeleting(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    setMessage({ text: '', type: '' });
    setUploadedData(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-4">
      {/* Page Header */}
      <div className="text-center mb-12">
        <p className="text-red-500 font-bold tracking-widest uppercase text-sm mb-4">Admin</p>
        <h1 className="text-4xl md:text-6xl font-bold text-white font-serif mb-4">
          Upload to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-400">Gallery</span>
        </h1>
        <p className="text-slate-400 font-serif text-lg">Add new images to the Retro Beats collection</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-[#111] border border-red-900/20 rounded-3xl p-8 shadow-2xl shadow-black/50">

          {/* Config Warning */}
          {(!CLOUD_NAME || !UPLOAD_PRESET) && (
            <div className="mb-6 p-4 rounded-xl bg-yellow-950/30 border border-yellow-700/40 text-yellow-500 text-sm font-medium flex gap-2">
              <span>⚠️</span>
              <span>Cloudinary env variables are missing. Set <code className="bg-yellow-900/30 px-1 rounded">VITE_CLOUDINARY_CLOUD_NAME</code> and <code className="bg-yellow-900/30 px-1 rounded">VITE_CLOUDINARY_UPLOAD_PRESET</code> in your <code className="bg-yellow-900/30 px-1 rounded">.env</code> file, then restart the dev server.</span>
            </div>
          )}

          {/* Drop Zone */}
          <div
            className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 ${
              dragOver
                ? 'border-red-500 bg-red-950/20 scale-[1.01]'
                : 'border-red-900/30 hover:border-red-700/50 bg-black/40'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            {preview ? (
              <div className="relative p-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-80 object-contain rounded-xl"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 transition-colors shadow-lg"
                  title="Remove image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="mt-3 text-center">
                  <p className="text-slate-400 text-sm font-medium">{image?.name}</p>
                  <p className="text-slate-600 text-xs mt-1">{(image?.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center py-16 px-8 text-center">
                <div className={`p-5 rounded-2xl mb-5 transition-colors duration-300 ${dragOver ? 'bg-red-500/20' : 'bg-red-900/20'}`}>
                  <svg className={`w-14 h-14 transition-colors ${dragOver ? 'text-red-400' : 'text-red-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-lg mb-1">Drop your image here</p>
                <p className="text-slate-500 text-sm mb-4">or click to browse your files</p>
                <span className="px-4 py-2 rounded-lg bg-red-950/40 border border-red-900/50 text-red-400 text-xs font-medium uppercase tracking-wider">
                  JPG, PNG, WEBP — Max 10MB
                </span>
                <input id="file-input" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              </label>
            )}
          </div>

          {/* Upload Button */}
          <button
            id="upload-button"
            onClick={handleUpload}
            disabled={loading || !image}
            className={`mt-6 w-full py-4 rounded-2xl font-bold text-base tracking-wide transition-all duration-300 ${
              loading || !image
                ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed border border-slate-800'
                : 'bg-gradient-to-r from-red-700 to-rose-600 text-white hover:from-red-600 hover:to-rose-500 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-900/30 border border-red-600/20'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Uploading to Cloudinary...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload to Gallery
              </div>
            )}
          </button>

          {/* Status Message */}
          {message.text && (
            <div className={`mt-4 p-4 rounded-xl text-sm font-medium ${
              message.type === 'success'
                ? 'bg-green-950/30 border border-green-800/30 text-green-400'
                : 'bg-red-950/30 border border-red-800/30 text-red-400'
            }`}>
              {message.text}
            </div>
          )}

          {/* Uploaded Image Preview */}
          {uploadedData && (
            <div className="mt-6 p-4 rounded-xl bg-black/30 border border-red-900/20">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Uploaded Image</p>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-900/20 hover:bg-red-600 text-red-500 hover:text-white text-[10px] font-bold uppercase tracking-wider border border-red-500/30 transition-all duration-300"
                >
                  {deleting ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="w-3 h-3" />
                      Delete Image
                    </>
                  )}
                </button>
              </div>
              <img src={uploadedData.url} alt="Uploaded" className="w-full rounded-lg object-cover max-h-48" />
              <a
                href={uploadedData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 mt-3 text-red-500 hover:text-red-400 text-[10px] font-bold uppercase tracking-widest transition-colors"
              >
                <span>View on Cloudinary</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Help Note */}
          <div className="mt-8 p-4 rounded-xl bg-blue-950/20 border border-blue-900/20">
            <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Setup Checklist</p>
            <ul className="text-slate-500 text-xs space-y-1.5 font-medium list-none">
              <li className={`flex gap-2 ${CLOUD_NAME ? 'text-green-500' : 'text-slate-500'}`}>
                <span>{CLOUD_NAME ? '✓' : '○'}</span> Cloud name set in .env
              </li>
              <li className={`flex gap-2 ${UPLOAD_PRESET ? 'text-green-500' : 'text-slate-500'}`}>
                <span>{UPLOAD_PRESET ? '✓' : '○'}</span> Upload preset set in .env
              </li>
              <li className="flex gap-2">
                <span>○</span> Unsigned upload preset created in Cloudinary Dashboard
              </li>
              <li className="flex gap-2">
                <span>○</span> "Resource list" enabled in Cloudinary Security Settings
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ImageUpload;

