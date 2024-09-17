const pool = require('../db');

// Fetch all products
const getAllProducts = async () => {
  try {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
  } catch (err) {
    console.error('Error fetching products:', err);
    throw new Error('Error fetching products: ' + err.message);
  }
};

// Add a product
const addProduct = async (name, price, description) => {
  try {
    const result = await pool.query(
      'INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *',
      [name, price, description]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error adding product:', err);
    throw new Error('Error adding product: ' + err.message);
  }
};

// Update a product
const updateProduct = async (id, name, price, description) => {
  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4 RETURNING *',
      [name, price, description, id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error updating product:', err);
    throw new Error('Error updating product: ' + err.message);
  }
};

// Delete a product
const deleteProduct = async (id) => {
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  } catch (err) {
    console.error('Error deleting product:', err);
    throw new Error('Error deleting product: ' + err.message);
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
