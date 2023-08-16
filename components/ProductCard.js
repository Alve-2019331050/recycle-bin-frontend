
const ProductCard = ({product}) => {
  return (
    <div className="shadow border-gray-600 card mt-4 hover:scale-105 transition-all ease-in-out duration-500 cursor-pointer" style={{width:'300px',height:'450px'}}>
        <img src={`http://localhost:8080/${product.photo}`} alt = {product.name} className="h-[290px] w-[290px] object-cover m-1"/>
        <div class="card-body">
            <h4 class="card-title text-center mt-1">
                {product.name}
            </h4>
            <p class="card-text text-center mt-1">
                <b>Price : <span className="text-pink-800">Tk. {product.price}</span></b>
            </p>
        </div>
    </div>
    
  )
}

export default ProductCard