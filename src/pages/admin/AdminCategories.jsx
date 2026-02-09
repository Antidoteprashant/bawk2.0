import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useCurrentTime } from '../../hooks/useCurrentTime';

const AdminCategories = () => {
    const { categories, addCategory, deleteCategory } = useAdmin();
    const currentTime = useCurrentTime();

    const [showAddForm, setShowAddForm] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: '',
        color: '#ffffff',
        slug: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory(prev => {
            const updated = { ...prev, [name]: value };
            if (name === 'name') {
                updated.slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            }
            return updated;
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageFile) {
            alert("Please select a cover image.");
            return;
        }

        setLoading(true);
        const result = await addCategory(newCategory, imageFile);
        setLoading(false);

        if (result.success) {
            setShowAddForm(false);
            setNewCategory({ name: '', color: '#ffffff', slug: '' });
            setImageFile(null);
        } else {
            alert("Failed to add category: " + result.error);
        }
    };

    return (
        <div>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <h1 style={{ fontSize: '2.5rem', margin: 0, textTransform: 'uppercase' }}>Categories</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem',
                        padding: '10px 20px',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        {currentTime}
                    </div>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        style={{
                            padding: '12px 25px',
                            background: showAddForm ? 'rgba(255,255,255,0.1)' : 'var(--accent-primary)',
                            color: showAddForm ? '#fff' : '#000',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>
                        {showAddForm ? 'Cancel' : '+ Add Category'}
                    </button>
                </div>
            </div>

            {/* Add Category Form */}
            {showAddForm && (
                <div className="glass-panel" style={{ padding: '30px', borderRadius: '15px', marginBottom: '30px' }}>
                    <h2 style={{ marginTop: 0, marginBottom: '20px' }}>New Category</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={newCategory.name}
                                onChange={handleInputChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Color (Hex)</label>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <input
                                    type="color"
                                    name="color"
                                    value={newCategory.color}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        padding: 0,
                                        border: 'none',
                                        background: 'none',
                                        cursor: 'pointer'
                                    }}
                                />
                                <input
                                    type="text"
                                    name="color"
                                    value={newCategory.color}
                                    onChange={handleInputChange}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)' }}>Cover Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: '15px',
                                background: 'var(--accent-primary)',
                                color: '#000',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.7 : 1,
                                marginTop: '10px'
                            }}
                        >
                            {loading ? 'Creating...' : 'Create Category'}
                        </button>
                    </form>
                </div>
            )}

            {/* Categories List */}
            <div className="glass-panel" style={{ padding: '20px', borderRadius: '15px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <th style={{ padding: '15px', color: 'var(--text-muted)' }}>Image</th>
                            <th style={{ padding: '15px', color: 'var(--text-muted)' }}>Name</th>
                            <th style={{ padding: '15px', color: 'var(--text-muted)' }}>Slug</th>
                            <th style={{ padding: '15px', color: 'var(--text-muted)' }}>Color</th>
                            <th style={{ padding: '15px', color: 'var(--text-muted)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No categories found. Add one to get started.
                                </td>
                            </tr>
                        ) : (
                            categories.map(cat => (
                                <tr key={cat.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '15px' }}>
                                        <div style={{
                                            width: '60px',
                                            height: '40px',
                                            borderRadius: '5px',
                                            overflow: 'hidden',
                                            background: '#333'
                                        }}>
                                            <img
                                                src={cat.cover_image}
                                                alt={cat.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                    </td>
                                    <td style={{ padding: '15px', color: '#fff', fontWeight: 'bold' }}>{cat.name}</td>
                                    <td style={{ padding: '15px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{cat.slug}</td>
                                    <td style={{ padding: '15px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: cat.color }}></div>
                                            <span style={{ color: 'var(--text-muted)' }}>{cat.color}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <button
                                            onClick={() => deleteCategory(cat.id, cat.cover_image)}
                                            style={{
                                                padding: '5px 10px',
                                                background: 'rgba(255,0,0,0.2)',
                                                color: '#ff4444',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer'
                                            }}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCategories;
