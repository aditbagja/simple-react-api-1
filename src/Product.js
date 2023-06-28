import { useEffect, useState } from "react";

const Product = () => {
  //memasukan link api
  const url = "https://fakestoreapi.com/products/category/electronics";
  const [products, setProducts] = useState([]);

  //fungsi mengambil data
  const getProducts = async () => {
    const response = await fetch(url);
    const dataProduct = await response.json();
    setProducts(dataProduct);
    console.log("products : ", products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  //search input
  const [search, setSearch] = useState("");

  return (
    <div className="container">
      <h1 className="text-4xl font-bold text-center mb-10">My Product</h1>
      <div className="pt-2 relative mx-auto text-gray-600 justify-center items-center grid mb-10">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          placeholder="Search Product"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {products
          .filter((produk) => {
            return search.toLowerCase() === ""
              ? produk
              : produk.title.toLowerCase().includes(search);
          })
          .map((produk) => (
            <CardProduct
              key={produk.id}
              title={produk.title}
              price={produk.price}
              description={produk.description}
              image={produk.image}
            />
          ))}
      </div>
    </div>
  );
};

function CardProduct(props) {
  return (
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100">
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src={props.image}
        alt={props.title}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {props.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 ">{props.description}</p>
        <p className="mb-3 font-normal text-gray-700 ">
          Price : ${props.price}
        </p>
      </div>
    </div>
  );
}
export default Product;
