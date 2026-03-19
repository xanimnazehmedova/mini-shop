import { useSelector, useDispatch } from 'react-redux';
import {type  RootState } from '../store';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="py-40 text-center flex flex-col items-center gap-8 animate-in fade-in duration-700">
        <div className="bg-gray-100 p-8 rounded-full">
          <ShoppingBag size={48} strokeWidth={1} className="text-gray-400" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter">Your bag is empty</h2>
        <p className="text-gray-400 font-medium italic">You haven't added anything yet.</p>
        <Link to="/" className="bg-black text-white px-12 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-gray-800 transition-all">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className=" max-w-[1200px] mx-auto px-6 py-12">
      <h1 className="text-4xl font-black uppercase  mb-12 border-b pb-6">Your Bag</h1>

      <div className="grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {items.map((item) => (
            <div key={item.id} className="flex items-center border-b pb-8 gap-2 ">
              <div className="w-28 h-28 bg-[#F6F6F4] rounded-2xl overflow-hidden flex-shrink-0 p-2">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain " />
              </div>
              
              <div className="flex-grow">
                <h3 className="font-black uppercase text-sm tracking-tight">{item.title}</h3>
                <p className="text-gray-400 text-[10px] font-bold uppercase mt-1 italic">${item.price} per item</p>
                
                <div className="flex items-center gap-6 mt-5">
                  <div className="flex items-center border border-gray-100 rounded-full px-4 py-1.5 gap-5">
                    <button 
                      onClick={() => dispatch(updateQuantity({ id: item.id, amount: -1 }))}
                      className="hover:text-gray-400 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => dispatch(updateQuantity({ id: item.id, amount: 1 }))}
                      className="hover:text-gray-400 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              <div className="text-right font-black tracking-tighter text-l">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
          
          <button 
            onClick={() => dispatch(clearCart())}
            className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-300 hover:text-red-500 self-start mt-4 transition-colors"
          >
            Clear All Items
          </button>
        </div>
        <div className="bg-[#F6F6F4] p-10 rounded-[32px] ">
          <h2 className="text-lg font-black uppercase tracking-tight mb-8">Order Summary</h2>
          <div className="flex flex-col gap-5 border-b border-gray-200 pb-8">
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-gray-500">
              <span>Subtotal</span>
              <span className="text-black">${totalPrice.toFixed(2)}</span>
            </div>
         
          </div>
          <div className="flex justify-between items-center pt-8 mb-10">
            <span className="font-black uppercase text-sm">Total</span>
            <span className="text-3xl font-black tracking-tighter">${totalPrice.toFixed(2)}</span>
          </div>
          
          <button className="w-full bg-black text-white py-6 rounded-full font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-gray-200">
            Checkout <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;