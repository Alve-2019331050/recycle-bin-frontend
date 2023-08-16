import { useAuth } from '@/context/auth';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiSolidStar, BiSolidStarHalf, BiStar } from 'react-icons/bi';
import { toast } from 'react-toastify';

function ProductDetails({product}) {
  const [count,setCount] = useState(1);
  const [auth] = useAuth();
  const [seller,setSeller] = useState(null);
  const [rating,setRating] = useState(null);
  const [open,setOpen] = useState(false);
  const [starCount,setStarCount] = useState(0);

  const decrement = ()=>{
    if(count>1){
        setCount((prv)=>{return prv-1});
    }
  };

  const increment = () => {
    setCount((prv)=>{return prv+1});
  };

  const addToCartHandler = async() => {
    const info = {
        u_id:auth.user.u_id,
        p_id:product.p_id,
        quantity:count
    };
    try {
        const {data} = await axios.post('http://localhost:8080/api/v1/cart/addItem',info);
        if(data?.success){
            toast.success(data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong in adding item to cart');
    } 
  };

  const getSellerInfo = async()=>{
    try {
        const {data} = await axios.get(`http://localhost:8080/api/v1/auth/user-info/${product.s_id}`);
        if(data?.success){
            setSeller(data.data[0]);
            const review = data.review, reviewcnt = data.reviewcnt;
            const ratingFloor = Math.floor(review/reviewcnt);
            const remainder = review%reviewcnt;
            console.log(review,reviewcnt);
            console.log(ratingFloor,remainder);
            setRating({ratingFloor,remainder});
        }
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong in fetching seller information');
    }
  };

  const submitStarCount = async() => {
    try {
        const {data} = await axios.post(`http://localhost:8080/api/v1/review`,{u_id:product.s_id,count:starCount});
        if(data?.success){
            toast.success(data.message);
            getSellerInfo();
        }
    } catch (error) {
        console.log(error);
        toast.error('There was a problem in giving rating');
    }
  }

  useEffect(()=>{
    getSellerInfo();
  },[]);
  
  return (
    <div className="w-[90%] grid grid-cols-2">
        <div className='ml-24'>
            <img src={`http://localhost:8080/${product.photo}`} alt={product.slug} className="mt-3 w-[65%] h-[65%] hover:scale-110 transition-all ease-in-out duration-500 cursor-pointer"/>
            <h3 className="mt-4 text-lg mx-0.5 font-bold">Seller:</h3>
            {seller && rating &&
                <>
                    <div className='grid grid-cols-2'>
                        <div>
                            <div className="flex mt-3"> 
                                <img src={`http://localhost:8080/${seller.avatar}`} className="w-[50px] h-[50px] rounded-full mr-2" />
                                <div>
                                    <h3 className="mt-1 text-lg text-blue-800">{seller.name}</h3>
                                    <h5 className="flex pb-3 text-[15px]">
                                        {
                                            rating.ratingFloor>0 && (
                                            [
                                                ...Array(rating.ratingFloor),
                                            ].map((value,index) => 
                                                <BiSolidStar key={index} />
                                            ))
                                        }
                                        {
                                            rating.remainder>0 && <BiSolidStarHalf/>
                                        }
                                        {
                                            (5-rating.ratingFloor-(rating.remainder?1:0))>0 && (
                                            [
                                                ...Array(5-rating.ratingFloor-(rating.remainder?1:0)),
                                            ].map((value,index) => 
                                                <BiStar key={index} />
                                            ))
                                        } 
                                    </h5>
                                </div>
                            </div>
                            <div className='bg-black mt-1 flex rounded h-8 w-56 items-center'>
                                <span className='text-white mx-2'>
                                    Phone no : {seller.phone}
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className='mt-3 text-violet-800 hover:cursor-pointer' onClick={()=>setOpen((old)=>!old)}>Want to give rating to this seller?</div>
                            {
                                open && (
                                    <div className='flex items-center'>
                                        <div className='mt-3 card border-blue-500 border-2 shadow-sm w-[120px]'>
                                            <div className='flex p-3 hover:cursor-pointer' onClick={()=>setStarCount((old)=>(old<5?old+1:old))}>
                                            {
                                                [
                                                    ...Array(starCount),
                                                ].map((value,index) => 
                                                    <BiSolidStar key={index} />
                                                )
                                            }
                                            {
                                                [
                                                    ...Array(5-starCount),
                                                ].map((value,index) => 
                                                    <BiStar key={index} />
                                                )
                                            }
                                            </div>
                                        </div>
                                        <div className='mt-3 bg-orange-500 hover:bg-orange-600 text-white btn ml-3' onClick={submitStarCount}>Submit</div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </>
            }
        </div>
        <div className='pt-3 pr-[5px]'>
            <div className='text-xl font-bold'>
                {product.name}
            </div>
            <p className='text-xl mt-9'>Description</p>
            <p className='mt-2'>{product.description}</p>
            <div className='flex pt-5'>
                <div className=''>
                    <b>Price : <span className="text-pink-800">Tk. {product.price}</span></b>
                </div>
            </div>
            <div className='flex items-center mt-12 justify-between pr-3'>
                <div>
                    <button className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out' onClick={decrement}>-</button>
                    <span className='bg-gray-200 text-gray-800 font-medium px-4 py-[10px]'>{count}</span>
                    <button className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out' onClick={increment}>+</button>
                </div>
            </div>
            <div className='btn w-32 flex items-center mt-5 bg-orange-500 hover:bg-orange-600 text-white' onClick={addToCartHandler}>
                <AiOutlineShoppingCart />
                <span className="ml-1.5">Add to cart</span>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails