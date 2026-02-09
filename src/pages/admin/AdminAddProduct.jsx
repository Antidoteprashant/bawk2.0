import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

const AdminAddProduct = () => {
    const navigate = useNavigate();
    const { addProduct, categories } = useAdmin();

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        originalPrice: '',
        stock: '',
        categoryId: '',
        description: '',
        status: 'active',
        image: null,
        imagePreview: null
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Set default category
    React.useEffect(() => {
        if (categories.length > 0 && !formData.categoryId) {
            setFormData(prev => ({ ...prev, categoryId: categories[0].id }));
        }
    }, [categories]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, image: 'File size exceeds 5MB' }));
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    image: file,
                    imagePreview: reader.result
                }));
                setErrors(prev => ({ ...prev, image: null }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Product Name is required';
        if (!formData.price) newErrors.price = 'Price is required';
        if (!formData.stock) newErrors.stock = 'Stock is required';
        if (!formData.imagePreview && !formData.image) newErrors.image = 'Product Image is required';
        if (!formData.categoryId) newErrors.categoryId = 'Category is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const newProduct = {
            name: formData.name,
            price: parseFloat(formData.price),
            description: formData.description,
            stock: parseInt(formData.stock),
            category: formData.categoryId,
            image_url: formData.imagePreview,
        };

        // TODO: Handle actual image upload to storage if needed, currently using base64/preview
        // For now, passing the preview as image_url as per previous logic

        await addProduct(newProduct);
        navigate('/admin/products');
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid var(--glass-border)',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '1rem',
        marginTop: '5px'
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
        marginBottom: '5px',
        display: 'block'
    };

    const errorStyle = {
        color: '#ff4d4d',
        fontSize: '0.8rem',
        marginTop: '5px'
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', textTransform: 'uppercase' }}>Add Product</h1>

            <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '40px', borderRadius: '15px' }}>

                {/* Basic Info */}
                <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '20px' }}>Basic Information</h3>

                <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Product Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="e.g. Cyber Samurai Figure"
                    />
                    {errors.name && <div style={errorStyle}>{errors.name}</div>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                        <label style={labelStyle}>Price (₹) *</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="0.00"
                        />
                        {errors.price && <div style={errorStyle}>{errors.price}</div>}
                    </div>
                    <div>
                        <label style={labelStyle}>Original Price (₹)</label>
                        <input
                            type="number"
                            name="originalPrice"
                            value={formData.originalPrice}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="Optional"
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                        <label style={labelStyle}>Stock Quantity *</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="Available units"
                        />
                        {errors.stock && <div style={errorStyle}>{errors.stock}</div>}
                    </div>
                    <div>
                        <label style={labelStyle}>Category *</label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            style={inputStyle}
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        {errors.categoryId && <div style={errorStyle}>{errors.categoryId}</div>}
                    </div>
                </div>

                {/* Image Upload */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Product Image *</label>
                    <div style={{
                        border: '2px dashed var(--glass-border)',
                        borderRadius: '10px',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        background: 'rgba(255,255,255,0.02)',
                        position: 'relative'
                    }}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                top: 0,
                                left: 0,
                                opacity: 0,
                                cursor: 'pointer'
                            }}
                        />
                        {formData.imagePreview ? (
                            <img src={formData.imagePreview} alt="Preview" style={{ maxHeight: '200px', borderRadius: '5px' }} />
                        ) : (
                            <div style={{ padding: '20px' }}>
                                <span style={{ fontSize: '2rem' }}>📷</span>
                                <p style={{ color: 'var(--text-muted)' }}>Click to upload image</p>
                                <p style={{ fontSize: '0.8rem', color: '#666' }}>JPG, PNG, WEBP (Max 5MB)</p>
                            </div>
                        )}
                    </div>
                    {errors.image && <div style={errorStyle}>{errors.image}</div>}
                </div>

                {/* Description */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                        placeholder="Detailed product description..."
                    />
                </div>

                {/* Status */}
                <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={formData.status === 'active'}
                            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.checked ? 'active' : 'disabled' }))}
                        />
                        <span className="slider round"></span>
                    </label>
                    <span style={{ color: formData.status === 'active' ? '#00ff64' : '#666' }}>
                        {formData.status === 'active' ? 'Product Enabled' : 'Product Disabled'}
                    </span>
                    <style>{`
                        .switch { position: relative; display: inline-block; width: 50px; height: 26px; }
                        .switch input { opacity: 0; width: 0; height: 0; }
                        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #333; transition: .4s; border-radius: 34px; }
                        .slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
                        input:checked + .slider { background-color: var(--accent-primary); }
                        input:checked + .slider:before { transform: translateX(24px); }
                    `}</style>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/products')}
                        style={{
                            padding: '12px 25px',
                            background: 'transparent',
                            border: '1px solid var(--glass-border)',
                            color: '#fff',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={loading}
                        style={{
                            padding: '12px 25px',
                            background: 'var(--accent-primary)',
                            color: '#000',
                            border: 'none',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Saving...' : 'Save Product'}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AdminAddProduct;
