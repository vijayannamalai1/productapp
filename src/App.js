import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import CreateProduct from './components/CreateProduct/CreateProduct';
import ViewProduct from './components/ViewProduct/ViewProduct';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/view/:id" element={<ViewProduct/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
