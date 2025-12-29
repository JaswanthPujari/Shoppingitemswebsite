import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./index.css";

const Home = () => {

  const navigate = useNavigate();


  const categories = [
    { name: "Watch", img: "https://img.freepik.com/free-vector/realistic-watches-set_1284-11684.jpg?semt=ais_hybrid&w=740&q=80" },
    { name: "Machine", img: "https://png.pngtree.com/png-clipart/20250109/original/pngtree-laundry-washing-machine-set-isolated-on-transparent-background-png-image_20126222.png" },
    { name: "Jacket", img: "https://www.panaprium.com/cdn/shop/articles/different_fashion_styles_up_f6d5fe49-b92d-4840-bb1d-c57b86907c27.jpg?v=1760958147" },
    { name: "Grinder", img: "https://img.freepik.com/free-vector/household-appliances-realistic-composition_1284-65307.jpg" },
  ];

  const featured = [
    {
      id: 1,
      title: "Buds",
      price: 999,
      imageUrl: "https://cdn.mos.cms.futurecdn.net/9yxGrTtn99S7TEJVGjHHaT.jpg",
    },
    {
      id: 2,
      title: "Jeans",
      price: 45999,
      imageUrl: "https://img.freepik.com/free-photo/blue-jeans-fabric-details_150588-42.jpg?semt=ais_hybrid&w=740&q=80",
    },
  ];

  return (
    <>
      <Navbar />

     
      <div className="banner">
        <img
src="https://cdn.vectorstock.com/i/500p/57/56/shopping-cart-banner-online-store-vector-42935756.jpg"          alt="banner"
        />
      </div>

      <h2 className="welcome">Welcome Back! 👋</h2>

      
      <h3 className="section-title">Shop by Category</h3>
      <div className="categories-container">
        {categories.map((c) => (
          <div
            key={c.name}
            className="category-card"
            onClick={() => navigate(`/products?search=${c.name}`)}
          >
            <img src={c.img} alt={c.name} className="im10"/>
            <p>{c.name}</p>
          </div>
        ))}
      </div>

      <h3 className="section-title">Featured Products</h3>
      <div className="featured-container">
        {featured.map((item) => (
          <div key={item.id} className="featured-card">
            <img src={item.imageUrl} alt={item.title} />
            <h4>{item.title}</h4>
            <p>₹{item.price}</p>
            <button
              onClick={() => navigate(`/products?search=${item.title}`)}
              className="view-btn"
            >
              View Product
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
