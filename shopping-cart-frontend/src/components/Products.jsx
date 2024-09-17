import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, removeProduct } from '../features/productSlice';

const Products = () => {
  const dispatch = useDispatch();
  const { list: products, status, error } = useSelector((state) => state.products);
  
  // Local state for product form
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.description) {
      dispatch(addProduct(newProduct));
      setNewProduct({ name: '', price: '', description: '' }); // Clear form
    }
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  if (status === 'loading') return <p className="text-center text-blue-500">Loading...</p>;
  if (status === 'failed') return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Products</h2>

      <div className="mb-8 p-4 border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleAddProduct}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Product
          </button>
        </div>
      </div>

      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="mb-2">{product.description}</p>
            <p className="text-lg font-semibold mb-2">${product.price}</p>
            <button
              onClick={() => handleRemoveProduct(product.id)}
              className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
