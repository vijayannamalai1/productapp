import React, { useState, useEffect } from 'react';
import { getProduct, updateProduct, deleteProduct } from '../../services/productService';
import { useParams, useNavigate } from 'react-router-dom';
import './ViewProduct.css'; // Import the CSS file

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    thumbnail: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newThumbnail, setNewThumbnail] = useState(null);

  useEffect(() => {
    const fetchProduct = () => {
      getProduct(id)
        .then((response) => {
          setProduct(response.data.data);
          setNewThumbnail(null);
        })
        .catch((err) => console.error(err));
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('price', product.price);

    if (newThumbnail) {
      formData.append('thumbnail', newThumbnail); // Add the new thumbnail file to the formData
    } else {
      formData.append('thumbnail', product.thumbnail); // Add the existing thumbnail filename
    }

    updateProduct(id, formData)
      .then((response) => {
        setIsEditing(false);
        getProduct(id)
          .then((response) => setProduct(response.data.data))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    deleteProduct(id)
      .then(() => {
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewThumbnail(file);
    }
  };

  const handleImageError = (e) => {
    e.target.src = 'https://img.freepik.com/free-vector/best-qaulity-natural-product-label-stocker_1017-26203.jpg?t=st=1723123844~exp=1723127444~hmac=729e34d963db58492fa87a8d045fabd0a981152f08792aea5c1d642bba36dc96&w=740';
  };

  return (
    <div className="view-product-container">
      <h1 className="view-product-header">View Product</h1>
      <form className="view-product-form" onSubmit={handleUpdate}>
        <div>
          <label>Title:</label>
          {isEditing ? (
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
            />
          ) : (
            <p>{product.title}</p>
          )}
        </div>
        <div>
          <label>Description:</label>
          {isEditing ? (
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          ) : (
            <p>{product.description}</p>
          )}
        </div>
        <div>
          <label>Price:</label>
          {isEditing ? (
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          ) : (
            <p>{product.price}</p>
          )}
        </div>
        <div>
          <label>Thumbnail:</label>
          <img
            src={
              newThumbnail
                ? URL.createObjectURL(newThumbnail)
                : `https://product-app-ag37.onrender.com/uploads/${product.thumbnail}`
            }
            alt="Thumbnail"
            onError={handleImageError} // Add onError handler here
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
            />
          )}
        </div>
        {isEditing ? (
          <>
            <button className="update" type="submit">Update</button>
            <button
              className="cancel"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button className="update" type="button" onClick={handleEdit}>Edit</button>
        )}
        <button className="delete" type="button" onClick={handleDelete}>
          Delete
        </button>
        <button className="go-home" onClick={handleGoHome}>
          Go to Home Page
        </button>
      </form>
    </div>
  );
};

export default ViewProduct;
