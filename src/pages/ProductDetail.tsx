import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { addToCart } from '../store/cartSlice'; 
import api from '../api/axiosInstance';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const dispatch = useDispatch(); 

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (loading) return <div className="py-40 text-center font-black uppercase tracking-[0.3em] animate-pulse">Loading Details...</div>;
  if (!product) return <div className="py-20 text-center uppercase font-bold text-red-500">Product not found.</div>;

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-12 hover:opacity-50 transition-all">
        <ArrowLeft size={14} /> Back to Collection
      </Link>

      <div className="grid md:grid-cols-2 gap-20 items-start">
        <div className="bg-[#F6F6F4] rounded-[40px] p-12 flex items-center justify-center overflow-hidden group">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="w-full h-auto object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2 block">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">{product.title}</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 text-black px-2 py-1 rounded">
                <Star size={12} fill="#FFD700" color="#FFD700" />
                <span className="text-xs font-bold">{product.rating}</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 italic">In Stock: {product.stock}</span>
            </div>
          </div>

          <p className="text-gray-500 leading-relaxed mb-10 text-sm font-medium border-l-2 border-gray-100 pl-6 italic">
            {product.description}
          </p>

          <div className="text-4xl font-black tracking-tighter mb-10">
            ${product.price}
          </div>
          <button 
            onClick={handleAddToCart}
            className="group relative bg-black text-white w-full py-6 rounded-full font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 overflow-hidden active:scale-[0.98] transition-all"
          >
            <ShoppingCart size={18} />
            Add to Bag
          </button>
      
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;