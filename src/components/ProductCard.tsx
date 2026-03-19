import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

interface ProductProps {
  product: {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    category: string;
    rating: number;
  };
}

const ProductCard = ({ product }: ProductProps) => {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-[#F9F9F7] rounded-2xl overflow-hidden relative mb-3 transition-transform duration-300 group-hover:-translate-y-1 shadow-sm hover:shadow-md">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-[12px] font-bold">
          <Star size={12} fill="#FFD700" color="#FFD700" />
          {product.rating}
        </div>
      </div>

      <h3 className="font-medium text-sm text-gray-800 group-hover:underline truncate">
        {product.title}
      </h3>
      <p className="text-lg font-bold mt-1 uppercase tracking-tighter">
        ${product.price}
      </p>
    </Link>
  );
};

export default ProductCard;