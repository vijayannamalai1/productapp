import React, { useState } from 'react';
import { createProduct } from '../../services/productService';
import { useNavigate } from 'react-router-dom';
import './CreateProduct.css'; // Import the CSS file

const CreateProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate(); // Hook to handle navigation

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    try {
      const response = await createProduct(formData);
      console.log('Product created:', response.data.data);
      navigate('/'); // Redirect to home page after successful product creation
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="create-product-container">
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit} className="create-product-form">
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Thumbnail:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
      <button className="go-home-button" onClick={() => navigate('/')}>
        Go to Home Page
      </button>
    </div>
  );
};

export default CreateProduct;
