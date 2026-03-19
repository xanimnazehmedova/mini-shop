import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-black tracking-tighter uppercase italic mb-6 block text-white">
              Mini Shop
            </Link>
           
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-gray-400">Collections</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="/" className="text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/categories" className="text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors">All Categories</Link></li>
              <li><Link to="/cart" className="text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors">Shopping Bag</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-gray-400">Customer Care</h4>
            <ul className="flex flex-col gap-4">
              <li><button className="text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors">Shipping & Returns</button></li>
              <li><button className="text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button className="text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors">Contact Us</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-gray-400">Follow Us</h4>
            <div className="flex gap-6 items-center">
              <button className="text-gray-500 hover:text-white transition-all hover:scale-110"><Instagram size={18} strokeWidth={1.5} /></button>
              <button className="text-gray-500 hover:text-white transition-all hover:scale-110"><Twitter size={18} strokeWidth={1.5} /></button>
              <button className="text-gray-500 hover:text-white transition-all hover:scale-110"><Facebook size={18} strokeWidth={1.5} /></button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/10 gap-6">
          <p className="text-[9px] font-bold uppercase  text-gray-600">
            © 2026 Xanımnaz Əhmədova. All Rights Reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-white hover:opacity-50 transition-all"
          >
            Scroll to Top <ArrowUp size={14} strokeWidth={2} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;