import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import { ArrowUpRight } from 'lucide-react';

interface Category {
  slug: string;
  name: string;
  image?: string; 
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesWithImages = async () => {
      try {
        const res = await api.get('/products/categories');
        const categoriesList: Category[] = res.data;

        const categoryPromises = categoriesList.map(async (cat) => {
          const productRes = await api.get(`/products/category/${cat.slug}?limit=1`);
          return {
            ...cat,
            image: productRes.data.products[0]?.thumbnail 
          };
        });

        const results = await Promise.all(categoryPromises);
        setCategories(results);
        setLoading(false);
      } catch (err) {
        console.error("Xəta:", err);
        setLoading(false);
      }
    };

    fetchCategoriesWithImages();
  }, []);

  if (loading) return <div className="py-40 text-center font-black uppercase tracking-[0.3em] animate-pulse">Loading Collections...</div>;

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="mb-16 border-b border-gray-100 pb-8">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 italic text-black dark:text-white">Collections</h1>
        <p className="text-gray-400 font-medium uppercase text-[10px] tracking-[0.2em]">Explore our curated items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <Link 
            to={`/category/${cat.slug}`} 
            key={cat.slug}
            className="group relative h-[400px] rounded-[32px] overflow-hidden flex flex-col justify-end p-10 transition-all duration-700 hover:shadow-2xl hover:shadow-gray-200 dark:hover:shadow-none"
          >
            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            </div>

            <div className="relative z-10">
              <div className="absolute -top-40 right-0 text-white opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500">
                <ArrowUpRight size={40} strokeWidth={1} />
              </div>
              
              <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-2 italic">
                {cat.name}
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">
                View Collection
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;