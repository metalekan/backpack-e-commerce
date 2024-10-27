import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="max-w-screen-xl mx-auto">
      <h1 className="text-lg font-bold text-gray-900">FAVORITE PRODUCTS</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-[4rem]">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
