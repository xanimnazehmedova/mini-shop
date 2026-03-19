import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import CategoryProducts from './pages/CategoryProducts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="categories" element={<Categories />} />
          <Route path="category/:categoryName" element={<CategoryProducts />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;