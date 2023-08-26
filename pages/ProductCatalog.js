import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const ProductCatalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchData, setSearchData] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([]);
    const prices = [
        {
            min: '0',
            max: '100',
        },
        {
            min: '101',
            max: '500',
        },
        {
            min: '501',
            max: '1000',
        },
        {
            min: '1001',
            max: '5000',
        },
        {
            min: '5001',
            max: '10000',
        },
        {
            min: '10001',
            max: 'above',
        }
    ];

    const getAllProducts = async () => {
        try {
            //change made to get approved product
            const { data } = await axios.get('http://localhost:8080/api/v1/product/get-product/Approved');
            console.log(data);
            if (data?.success) {
                setProducts(data?.products);
            }
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong in getting products.');
        }
    };

    const getFilteredProducts = async () => {
        try {
            var query = '';
            if (selectedCategory.length || selectedPriceRange.length)
                query = query.concat('?');
            if (selectedCategory.length)
                query = query.concat('category=');
            selectedCategory.map((item, index) => {
                if (index > 0)
                    query = query.concat(',');
                query = query.concat(item);
            });
            if (selectedCategory.length && selectedPriceRange.length)
                query = query.concat('&');
            if (selectedPriceRange.length)
                query = query.concat('price=');
            selectedPriceRange.map((item, index) => {
                if (index > 0)
                    query = query.concat(',');
                query = query.concat(item);
            });
            console.log(query);
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-filtered-product${query}`);
            if (data?.success) {
                setProducts(data?.products);
            }
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong in getting products.');
        }
    };

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/category/allcategories');
            if (data?.success) {
                setCategories(data?.categories);
            }
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong in getting categories.');
        }
    };

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const filteredProducts = products && products.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        if (term) {
            setSearchData(filteredProducts);
        }
        else {
            setSearchData(null);
        }
    };

    const handleCategoryChange = (e) => {
        var updatedList = [...selectedCategory];
        if (e.target.checked) {
            updatedList.push(e.target.value);
        }
        else {
            updatedList.splice(selectedCategory.indexOf(e.target.value), 1);
        }

        setSelectedCategory(updatedList);
    };

    const handlePriceChange = (e) => {
        var updatedList = [...selectedPriceRange];
        if (e.target.checked) {
            updatedList.push(e.target.value);
        }
        else {
            updatedList.splice(selectedPriceRange.indexOf(e.target.value), 1);
        }
        setSelectedPriceRange(updatedList);
    };


    useEffect(() => {
        getAllCategories();
        getAllProducts();
    }, []);

    useEffect(() => {
        getFilteredProducts();
    }, [selectedCategory, selectedPriceRange]);
    return (
        <Layout>
            <div className="row">
                {/**left column to contain search bar and product types */}
                <div className='col-lg-4'>
                    <div className='row'>
                        {/** search bar */}
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder='Search Products' value={searchTerm} onChange={handleSearchChange}></input>
                            <button class="btn btn-primary hover:brightness-300">Search</button>
                        </div>
                        {
                            searchData && searchData.length !== 0 ? (
                                <div className="mt-10 absolute min-h-[30vh] max-w-[70vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                                    {searchData.map((i, index) => {
                                        const d = i.slug;
                                        const productSlug = d.replace(/\s+/g, "-");
                                        return (
                                            // eslint-disable-next-line react/jsx-key
                                            <Link href={`/product/${productSlug}`}>
                                                <div className="mt-5 w-full flex items-start-py-3">
                                                    <img src={`http://localhost:8080/${i.photo}`} className="w-[40px] h-[40px] mr-[10px]" />
                                                    <h1>{i.name}</h1>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : null
                        }
                    </div>
                    <div className="row">
                        {/** bring product types here */}
                        <h6 className="mb-3"><b>Product Categories</b></h6>
                        <div className="form-check px-5">
                            <input className="form-check-input" type="checkbox" value="" id="allProduct" checked />
                            <label className="form-check-label" for="allProduct">
                                All Products
                            </label>
                        </div>
                        {
                            categories.map((cat, index) => {
                                return (
                                    <div className="form-check px-5" key={index}>
                                        <input className="form-check-input" type="checkbox" value={cat.name} id="{cat.name}" onChange={handleCategoryChange} />
                                        <label className="form-check-label" for={cat.name}>
                                            {cat.name}
                                        </label>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div class="row">
                        {/** bring product price range here */}
                        <h6 className="mb-3"><b>Price Ranges</b></h6>
                        <div className="form-check px-5">
                            <input className="form-check-input" type="checkbox" value="" id="allPrice" checked />
                            <label className="form-check-label" for="allPrice">
                                All
                            </label>
                        </div>
                        {
                            prices.map((price, index) => {
                                return (
                                    <div className="form-check px-5" key={index}>
                                        <input className="form-check-input" type="checkbox" value={`${price.min}-${price.max}`} id={index} onChange={handlePriceChange} />
                                        <label className="form-check-label" for={index}>
                                            {price.min} - {price.max} Tk.
                                        </label>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className='col-lg-8'>
                    {/** Bring product catalogue here */}
                    {/* <ProductCard></ProductCard>  */}
                    <div className='font-bold text-3xl text-pink-800 mx-2'>Products Collection</div>
                    <div className='grid grid-cols-3'>
                        {
                            products.map((product, index) => {
                                return (
                                    <div key={index}>
                                        <Link href={`/product/${product.slug}`}>
                                            <ProductCard product={product} />
                                        </Link>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductCatalog;