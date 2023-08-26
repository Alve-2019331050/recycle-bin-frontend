import Layout from "@/components/Layout";
import ProductDetails from "@/components/ProductDetails";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ProductInfo() {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-single-product/${slug}`);
      if (data?.success) {
        setProduct(data.product[0]);
      }
    }
    catch (error) {
      console.log(error);
      toast.error('Something went wrong in fetching product details');
    }
  }

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <Layout title={slug}>
      {product && <ProductDetails product={product}></ProductDetails>}
    </Layout>
  )
}

export default ProductInfo;