/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "@/components/Layout";
import { useAuth } from "@/context/auth";
import { Select } from 'antd';
import axios from 'axios';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
const {Option} = Select;

export default function sell() {
    const [categories,setCategories] = useState([]);
    const [category,setCategory] = useState();
    const [newCategory,setNewCategory] = useState('');
    const [name,setName] = useState("");
    const [slug,setSlug] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [photo,setPhoto] = useState("");
    const router = useRouter();
    const [auth] = useAuth();

    //handle newCategory form submit
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post('http://localhost:8080/api/v1/category/create-category',{name:newCategory,slug:newCategory});
            if(data?.success){
                toast.success(`${newCategory} is created`);
                getAllCategories();
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in creating new category.');
        }
    }

    const getAllCategories = async()=>{
        try{
            const {data} = await axios.get('http://localhost:8080/api/v1/category/allcategories');
            if(data?.success){
                setCategories(data?.categories);
            }
        }catch(err){
            console.log(err);
            toast.error('Something went wrong in getting categories.');
        }
    };

    const handleProductCreate = async(e)=>{
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name",name);
            productData.append("slug",slug);
            productData.append("description",description);
            productData.append("price",price);
            productData.append("category",category);
            productData.append("photo",photo);
            productData.append("id",auth.user.u_id);

            const {data} = await axios.post('http://localhost:8080/api/v1/product/create-product',productData);
            if(data?.success){
                toast.success('Product created successfully');
                router.push('/ProductCatalog');
            }
            else{
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('something went wrong');
        }
    }

    useEffect(() => {
        getAllCategories();
    }, []);
    console.log(categories);
    return (
        <Layout title='Sell Product'>
            <div className="container-fluid m-4 p-4">
                <div className="grid grid-cols-3 mb-10">
                    <div className="text-3xl">Add new Category</div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input type="text" className="w-96 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={newCategory} onChange={(e) => setNewCategory(e.target.value)} required/>
                            <button type="submit" className="mt-4 mx-40 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                ADD
                            </button>
                        </form>
                    </div>
                </div>
                <div className="grid grid-cols-4">
                    <div className="text-3xl">Create Product</div>
                    <div className="grid grid-rows-7">
                        <div className="w-96">
                            <Select
                            placeholder="Select a category" 
                            size="large"
                            showSearch 
                            className="form-select mb-3" onChange={
                                (value) => {setCategory(value)}
                            }>
                                {categories?.map((cat,index)=>(
                                    <Option key={index} value={cat.name}>{cat.name}</Option>
                                ))}
                            </Select>
                        </div>
                        <div className="mt-5">
                            <label className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                {photo? photo.name:"Upload product photo"}
                            <input type="file" name="photo" accept="image/*" onChange={(e)=>setPhoto(e.target.files[0])} hidden />
                            </label>
                        </div>
                        <div className="mt-5 w-40">
                            <input type="text" 
                            value={name} 
                            placeholder="product's name" 
                            className="form-control" 
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mt-5 w-40">
                            <input type="text" 
                            value={slug} 
                            placeholder="product's slug" 
                            className="form-control" 
                            onChange={(e) => setSlug(e.target.value)}
                            />
                        </div>
                        <div className="mt-5 w-40">
                            <input type="textbox" 
                            value={description}
                            placeholder="write product's description" 
                            className="form-control" 
                            onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mt-5 w-40">
                            <input type="number" 
                            value={price} 
                            placeholder="product's price" 
                            className="form-control" 
                            onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="mt-5">
                            <button onClick={handleProductCreate} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                Create Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    </Layout>
    )
}
