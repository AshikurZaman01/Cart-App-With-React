import React, { useEffect, useState } from 'react';

const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch("../../../../public/bottle.json")
            .then(res => res.json())
            .then(data => setBottles(data))
            .catch(error => console.log(error))
    }, []);

    const addToCart = (id) => {
        const bottle = bottles.find(bottle => bottle.id === id);
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            setCart(cart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...bottle, quantity: 1 }]);
        }
    }

    const handleRemove = (id) => {
        setCart(cart.filter(item => item.id !== id));
    }

    const handleClear = () => {
        setCart([]);
    }

    const quantityIncrease = (id) => {
        setCart(cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    }

    const quantityDecrease = (id) => {
        setCart(cart.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        ));
    }

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div>
            <div className='text-center text-4xl font-bold mt-5 mb-2'><h1>All Bottles</h1></div>
            <div className='flex justify-between items-start'>
                <div className='w-[80%] grid grid-cols-3 gap-y-10 gap-x-2'>
                    {bottles.map(bottle => (
                        <div key={bottle.id}>
                            <div>
                                <img className='w-[150px] h-[150px]' src={bottle.imageUrl} alt="" />
                            </div>
                            <h1 className='font-bold px-2'>{bottle.name}</h1>
                            <p>{bottle.price} $</p>
                            <button onClick={() => addToCart(bottle.id)} className={`btn btn-sm ${bottle.available ? "btn-primary" : "btn-secondary text-red-500"} text-white px-3 py-1 rounded-md`} disabled={!bottle.available}>
                                {bottle.available ? "Add to Cart" : "Out of Stock"}
                            </button>
                        </div>
                    ))}
                </div>

                <div className='w-[20%] bg-gray-300 p-2'>
                    <div>
                        <h2 className='text-2xl font-bold'>Cart</h2>
                    </div>

                    <div>
                        <h2>Total : {totalPrice} $</h2>

                        <div>
                            {cart.map(item => (
                                <div key={item.id} className='my-5'>
                                    <img className='w-[40px]' src={item.imageUrl} alt="" />
                                    <p>{item.name}</p>
                                    <p>{item.price} $</p>

                                    <div className='flex items-center gap-2'>
                                        <button onClick={() => quantityIncrease(item.id)} className='btn btn-xs btn-success'>+</button>
                                        <h3>{item.quantity}</h3>
                                        <button onClick={() => quantityDecrease(item.id)} className='btn btn-xs btn-error'>-</button>
                                    </div>

                                    <div>
                                        <button onClick={() => handleRemove(item.id)} className='btn btn-sm my-2 w-full btn-error text-white capitalize'>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {cart.length === 0 && <div className='text-center text-2xl font-bold text-red-500'>No Item Found</div>}
                        {cart.length > 0 && <button onClick={handleClear} className='btn btn-sm my-2 w-full btn-error text-white capitalize'>Clear</button>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bottles;
