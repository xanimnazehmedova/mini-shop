import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import ProductCard from '../components/ProductCard';
import { ArrowLeft } from 'lucide-react';

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/products/category/${categoryName}`)
      .then(res => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error("Məhsullar yüklənmədi:", err);
        setLoading(false);
      });
  }, [categoryName]); 

  if (loading) return (
    <div className="py-40 text-center font-black uppercase tracking-[0.3em] animate-pulse">
      Loading {categoryName?.replace('-', ' ')}...
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      <Link 
        to="/categories" 
        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-10 hover:opacity-50 transition-all text-gray-400"
      >
        <ArrowLeft size={14} /> Back to Collections
      </Link>

      <div className="mb-12 border-b border-gray-100 pb-6 flex justify-between items-end">
        <h1 className="text-4xl font-black uppercase tracking-tighter italic">
          {categoryName?.replace('-', ' ')}
        </h1>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {products.length} Items Found
        </span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-gray-300 font-black uppercase tracking-[0.2em]">
            No products in this category yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;