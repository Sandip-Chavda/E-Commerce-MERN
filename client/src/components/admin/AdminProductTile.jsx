import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

const AdminProductTile = ({
  product,
  setCurrentEditedId,
  setFormData,
  setOpenCreateProductDialog,
  handleDelete,
}) => {
  return (
    <Card className="w-full h-full max-w-sm mx-auto border hover:shadow-md hover:shadow-red-400 transition-shadow duration-300">
      <div className="">
        <div className="">
          <div className="relative">
            <img
              alt={product?.title}
              src={product?.image}
              className="w-full h-[250px] object-fit rounded-t-md"
            />
          </div>
        </div>

        <CardContent>
          <h2 className="text-xl mt-2 font-bold mb-2 truncate">
            {product?.title}
          </h2>
          <div className="flex flex-col mb-2">
            <span
              className={`${
                product.salePrice > 0
                  ? "line-through font-medium !text-sm !text-red-500"
                  : ""
              } text-base font-bold text-green-500`}
            >
              Price: {product?.price} ₹
            </span>

            {product?.salePrice > 0 ? (
              <span className="text-base font-bold text-green-500">
                Sale Price: {product?.salePrice} ₹
              </span>
            ) : (
              <span>No Sale Price</span>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between !items-end ">
          <Button
            variant=""
            className="bg-transparent text-blue-500 flex gap-1 hover:bg-transparent border border-blue-500 hover:gap-2"
            onClick={() => {
              setOpenCreateProductDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit <AiFillEdit size={20} />
          </Button>
          <Button
            onClick={() => handleDelete(product?._id)}
            className="bg-transparent hover:bg-transparent text-red-500 hover:text-red-700 p-0"
          >
            <MdDeleteForever size={26} />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductTile;
