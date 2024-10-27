import { Link } from "react-router-dom";
import moment from "moment";
import {
  useAllProductsQuery,
  useDeleteProductMutation,
} from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import { Badge, Card, Dropdown } from "flowbite-react";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AllProducts = () => {
  const { data: products, isLoading, isError, refetch } = useAllProductsQuery();

  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id, name) => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      const { data } = await deleteProduct(id);
      console.log(data);
      refetch();
    } catch (error) {
      toast.Error(`Failed! Try again.`);
      console.log(error);
    }
  };

  useEffect(() => {
    refetch();
  }, [products]);

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="w-screen lg:w-full min-h-screen lg:p-8">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="max-w-screen-lg mx-auto p-4">
          <div className="flex justify-between items-center lg:mx-5 mb-10">
            <div className="text-xl tracking-tight text-gray-900 font-bold">
              All Products ({products.length})
            </div>
            <AdminMenu />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto md:max-w-full max-w-sm">
            {products.map((product) => (
              <Card key={product._id}>
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="lg:w-40 lg:h-40 w-20 h-20 object-contain"
                  />
                  <div className="p-4 flex flex-col justify-around">
                    <div className="flex justify-between items-center">
                      <h5 className="text-md lg:text-xl font-semibold capitalize tracking-tight text-gray-900">
                        {product?.name?.substring(0, 30)}...
                      </h5>
                      <p className="text-gray-400 text-xs ml-3 hidden">
                        {moment(product.createdAt).format("MMMM Do YYYY")}
                      </p>
                    </div>

                    <p className="text-gray-700 text-xs lg:text-sm my-4">
                      {product?.description?.substring(0, 50)}...
                    </p>

                    <div className="flex justify-between items-center min-w-full">
                      <Dropdown label="Options" color="purple" size="sm">
                        <Link to={`/admin/product/update/${product._id}`}>
                          <Dropdown.Item>Edit</Dropdown.Item>
                        </Link>
                        <Dropdown.Item
                          onClick={() =>
                            handleDelete(product?._id, product?.name)
                          }
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown>
                      <Badge color="pink">$ {product?.price}</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
