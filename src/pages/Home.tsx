import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import { type RootState } from '../store'; 
import api from '../api/axiosInstance';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const searchTerm = useSelector((state: RootState) => state.cart.searchTerm);

  useEffect(() => {
    api.get('/products?limit=15')
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="py-40 text-center font-black uppercase tracking-[0.3em] animate-pulse">Loading Collections...</div>;

  return (
    <div>
      <section className="bg-[#F5F5DC] p-10 md:p-20 mb-12 flex flex-col items-center text-center">
        <span className="text-sm font-bold tracking-[0.3em] uppercase mb-4 opacity-60">new season</span>
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6 leading-tight">
          Modern Fashion <br /> Essentials
        </h1>
        <Link to="/categories" className="bg-black text-white px-8 py-4 rounded-full text-[10px] font-black tracking-widest hover:opacity-80 transition-all active:scale-95 shadow-xl shadow-gray-200">
          SHOP NOW
        </Link>
      </section>

      <div className='px-6 md:px-12 mb-20'>
        <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-black uppercase tracking-tighter italic">New Arrivals</h2>
          
          <Link 
            to="/categories" 
            className="text-[10px] font-black uppercase tracking-widest underline hover:opacity-50 transition-opacity"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {filteredProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-300 font-black uppercase tracking-[0.2em]">
              No items found for "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;