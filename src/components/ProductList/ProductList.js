import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productService';
import { Link, useNavigate } from 'react-router-dom';
import './ProductList.css'; // Import the CSS file

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="product-list-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const handleCreateProduct = () => {
    navigate('/create'); // Navigate to the Create Product page
  };

  const handleImageError = (e) => {
    e.target.src = 'https://img.freepik.com/free-vector/best-qaulity-natural-product-label-stocker_1017-26203.jpg?t=st=1723123844~exp=1723127444~hmac=729e34d963db58492fa87a8d045fabd0a981152f08792aea5c1d642bba36dc96&w=740';
  };

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
  
      {products.length === 0 ? (
        <div>
          <p>There are no products. To create a product, use the button below.</p>
          <button className='create-product-btn' onClick={handleCreateProduct}>Create Product</button>
        </div>
      ) : (
        <>
          <button className='create-product-btn' onClick={handleCreateProduct}>Create Product</button>
          <div className="product-grid">
            {products.map((product) => (
              <div key={product._id} className="product-item">
                {/* Ensure the image source URL is correct */}
                <img
                  src={`https://product-app-ag37.onrender.com/uploads/${product.thumbnail}`}
                  alt="product"
                  onError={handleImageError} // Add onError handler here
                />
                <p>{product.title} - <Link to={`/view/${product._id}`}>View</Link></p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
