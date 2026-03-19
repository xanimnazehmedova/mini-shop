import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { type RootState } from '../store';
import { setSearchTerm } from '../store/cartSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); 
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const searchTerm = useSelector((state: RootState) => state.cart.searchTerm);
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 md:px-12 py-4 flex justify-between items-center">
        <div className="flex-1 md:hidden">
          <button onClick={() => setIsMenuOpen(true)}>
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left">
          <Link to="/" className="text-lg md:text-xl font-black tracking-tighter uppercase italic">
            Mini Shop
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-10 flex-1 justify-center">
          <Link to="/" className="text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-50 transition-opacity">
            Shop All
          </Link>
          <Link to="/categories" className="text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-50 transition-opacity">
            Categories
          </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-6 flex-1 justify-end">
          
          <div className="relative hidden lg:flex items-center bg-[#F6F6F4] rounded-full px-4 py-1.5 border border-transparent focus-within:border-gray-200 transition-all">
            <Search size={14} className="text-gray-400" strokeWidth={1.5} />
            <input 
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className="bg-transparent border-none outline-none text-[9px] tracking-widest ml-2 w-20 focus:w-32 transition-all placeholder:text-gray-300"
            />
          </div>

          <button className="lg:hidden hover:opacity-50 transition-opacity" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search size={20} strokeWidth={1.5} />
          </button>

          <Link to="/cart" className="relative group hover:opacity-70 transition-opacity">
            <ShoppingBag size={22} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black animate-in zoom-in duration-300">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {isSearchOpen && (
        <div className="lg:hidden bg-[#F6F6F4] px-6 py-4 border-b border-gray-100 flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <Search size={16} className="text-gray-400" />
          <input 
            autoFocus
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="bg-transparent border-none outline-none text-xs  tracking-widest w-full"
          />
          <button onClick={() => {setIsSearchOpen(false); dispatch(setSearchTerm(''))}}>
            <X size={18} className="text-gray-400" />
          </button>
        </div>
      )}

      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white p-10 flex flex-col animate-in slide-in-from-left duration-300">
          <button onClick={() => setIsMenuOpen(false)} className="self-end mb-20">
            <X size={30} strokeWidth={1} />
          </button>
          
          <div className="flex flex-col gap-8">
            <Link onClick={() => setIsMenuOpen(false)} to="/" className="text-4xl font-black uppercase tracking-tighter italic">Shop All</Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/categories" className="text-4xl font-black uppercase tracking-tighter italic">Categories</Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/cart" className="text-4xl font-black uppercase tracking-tighter italic border-t pt-8">Your Bag ({totalItems})</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;