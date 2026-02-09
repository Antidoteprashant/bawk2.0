import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Data
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data: productData, error: productError } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (productError) throw productError;
            setProducts(productData || []);

            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (orderError) throw orderError;
            setOrders(orderData || []);

            const { data: categoryData, error: categoryError } = await supabase
                .from('categories')
                .select('*')
                .order('created_at', { ascending: false });

            if (categoryError) throw categoryError;
            setCategories(categoryData || []);

        } catch (error) {
            console.error("Error fetching data:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // Actions
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', orderId);

            if (error) throw error;

            // Optimistic Update
            setOrders(prev => prev.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error("Error updating order:", error.message);
            alert("Failed to update status");
        }
    };

    const addProduct = async (product, imageFile) => {
        try {
            let imageUrl = product.image_url; // Default to existing (e.g. preview if not file) or empty

            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('products')
                    .upload(fileName, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('products')
                    .getPublicUrl(fileName);

                imageUrl = publicUrl;
            }

            // Remove ID if present to let DB handle it? key 'id' is optional here for now
            const { id, ...productData } = product;

            const newProduct = {
                ...productData,
                image_url: imageUrl
            };

            const { data, error } = await supabase
                .from('products')
                .insert([newProduct])
                .select();

            if (error) throw error;

            // Update State
            setProducts(prev => [data[0], ...prev]);
            return { success: true };
        } catch (error) {
            console.error("Error adding product:", error.message);
            return { success: false, error: error.message };
        }
    };

    const deleteProduct = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            // Get product to find image url
            const productToDelete = products.find(p => p.id === productId);
            if (productToDelete && productToDelete.image_url) {
                const fileName = productToDelete.image_url.split('/').pop();
                // Check if it looks like a storage url (simple check)
                if (!productToDelete.image_url.startsWith('data:')) {
                    await supabase.storage.from('products').remove([fileName]);
                }
            }

            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', productId);

            if (error) throw error;

            setProducts(prev => prev.filter(p => p.id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error.message);
            alert("Failed to delete product");
        }
    };

    const updateProduct = async (productId, updatedData) => {
        try {
            const { error } = await supabase
                .from('products')
                .update(updatedData)
                .eq('id', productId);

            if (error) throw error;

            setProducts(prev => prev.map(p =>
                p.id === productId ? { ...p, ...updatedData } : p
            ));
            return { success: true };
        } catch (error) {
            console.error("Error updating product:", error.message);
            return { success: false, error: error.message };
        }
    };

    const addCategory = async (categoryData, imageFile) => {
        try {
            let imageUrl = '';

            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('categories')
                    .upload(fileName, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('categories')
                    .getPublicUrl(fileName);

                imageUrl = publicUrl;
            }

            const newCategory = {
                ...categoryData,
                cover_image: imageUrl
            };

            const { data, error } = await supabase
                .from('categories')
                .insert([newCategory])
                .select();

            if (error) throw error;

            setCategories(prev => [data[0], ...prev]);
            return { success: true };
        } catch (error) {
            console.error("Error adding category:", error.message);
            return { success: false, error: error.message };
        }
    };

    const deleteCategory = async (categoryId, imageUrl) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            // Delete Image from Storage if exists
            if (imageUrl) {
                const fileName = imageUrl.split('/').pop();
                await supabase.storage.from('categories').remove([fileName]);
            }

            const { error } = await supabase
                .from('categories')
                .delete()
                .eq('id', categoryId);

            if (error) throw error;

            setCategories(prev => prev.filter(c => c.id !== categoryId));
        } catch (error) {
            console.error("Error deleting category:", error.message);
            alert("Failed to delete category");
        }
    };

    const getStats = () => {
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((acc, order) => acc + (parseFloat(order.total_amount) || 0), 0);
        const pendingOrders = orders.filter(o => o.status === 'Pending').length;
        const totalProducts = products.length;

        return { totalOrders, totalRevenue, pendingOrders, totalProducts };
    };

    return (
        <AdminContext.Provider value={{
            orders,
            products,
            categories,
            loading,
            updateOrderStatus,
            addProduct,
            deleteProduct,
            updateProduct,
            addCategory,
            deleteCategory,
            getStats,
            refreshData: fetchData
        }}>
            {children}
        </AdminContext.Provider>
    );
};
