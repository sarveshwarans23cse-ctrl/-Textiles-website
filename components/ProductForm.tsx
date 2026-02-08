'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/utils';

interface ProductFormProps {
  product?: Product;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProductForm({
  product,
  onSave,
  onCancel,
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Sarees',
    price: '',
    description: '',
    image: '',
    stock: '0',
    rating: '0',
    offerPercent: '0',
    offerLabel: '',
  });

  interface Variant {
    color: string;
    images: string[];
  }

  const [variants, setVariants] = useState<Variant[]>([]);
  const [newVariant, setNewVariant] = useState<Variant>({ color: '', images: [] });
  const [variantImageUploading, setVariantImageUploading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        description: product.description,
        image: product.image,
        stock: product.stock.toString(),
        rating: (product.rating || 0).toString(),
        offerPercent: (product.offerPercent || 0).toString(),
        offerLabel: product.offerLabel || '',
      });
      if (product.variants) {
        // @ts-ignore
        setVariants(product.variants);
      }
    }
  }, [product]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.filename }));
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleVariantImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setVariantImageUploading(true);
    try {
      const uploadedImages: string[] = [];
      const formData = new FormData();

      // Upload each file
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }
      // Note: The simple upload API might only handle single file. 
      // If current API only supports single file, we iterate.
      // Looking at ProductForm logic, it sends 'file' key. 

      for (let i = 0; i < files.length; i++) {
        const singleFileData = new FormData();
        singleFileData.append('file', files[i]);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: singleFileData,
        });

        const data = await response.json();
        if (data.success) {
          uploadedImages.push(data.filename);
        }
      }

      setNewVariant(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedImages]
      }));
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setVariantImageUploading(false);
    }
  };

  const addVariant = () => {
    if (!newVariant.color) return;
    setVariants([...variants, newVariant]);
    setNewVariant({ color: '', images: [] });
  };

  const removeVariant = (index: number) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = product
        ? `/api/products/${product.id}`
        : '/api/products';
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          rating: Number(formData.rating) || 0,
          offerPercent: Number(formData.offerPercent) || 0,
          offerLabel: formData.offerLabel || undefined,
          variants: variants,
        }),
      });

      if (response.ok) {
        onSave();
      }
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category *
        </label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (₹) *
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            required
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock
          </label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating (0-5)
          </label>
          <input
            type="number"
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            min="0"
            max="5"
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Offer (%)
          </label>
          <input
            type="number"
            value={formData.offerPercent}
            onChange={(e) =>
              setFormData({ ...formData, offerPercent: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            min="0"
            max="100"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Offer Label
        </label>
        <input
          type="text"
          value={formData.offerLabel}
          onChange={(e) =>
            setFormData({ ...formData, offerLabel: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="e.g., Festival Offer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image *
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        />
        {uploading && (
          <p className="text-sm text-gray-500 mt-1">Uploading...</p>
        )}
        {formData.image && (
          <div className="mt-2">
            <img
              src={formData.image}
              alt="Preview"
              className="w-32 h-32 object-cover rounded"
            />
          </div>
        )}
      </div>

      <div className="border-t pt-4 mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Product Variants</h3>

        {/* Add New Variant */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Add New Variant</h4>
          <div className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Color Name (e.g. Red, Blue)"
                value={newVariant.color}
                onChange={(e) => setNewVariant({ ...newVariant, color: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Variant Images (Select Multiple)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleVariantImageUpload}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
              {variantImageUploading && <p className="text-xs text-blue-600 mt-1">Uploading images...</p>}
            </div>

            {newVariant.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto py-2">
                {newVariant.images.map((img, idx) => (
                  <img key={idx} src={img} alt="preview" className="w-16 h-16 object-cover rounded border" />
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={addVariant}
              disabled={!newVariant.color}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700 disabled:opacity-50"
            >
              Add Variant
            </button>
          </div>
        </div>

        {/* Variants List */}
        {variants.length > 0 && (
          <div className="space-y-3">
            {variants.map((variant, index) => (
              <div key={index} className="flex items-start justify-between p-3 border rounded-lg bg-white">
                <div>
                  <p className="font-medium text-gray-800">{variant.color}</p>
                  <div className="flex gap-2 mt-2">
                    {variant.images.map((img, imgIdx) => (
                      <img key={imgIdx} src={img} alt={variant.color} className="w-12 h-12 object-cover rounded border" />
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : product ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

