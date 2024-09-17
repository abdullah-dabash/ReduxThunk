const { getAllProducts, addProduct, updateProduct, deleteProduct } = require('../models/productModel');

exports.getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred while retrieving products' });
  }
};

exports.addProduct = async (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  try {
    const newProduct = await addProduct(name, price, description);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred while adding the product' });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  try {
    const updatedProduct = await updateProduct(id, name, price, description);
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred while updating the product' });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteProduct(id);
    if (result) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred while deleting the product' });
  }
};
