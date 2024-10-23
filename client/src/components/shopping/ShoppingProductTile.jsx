import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

const ShoppingProductTile = ({ product }) => {
  return (
    <Card className="w-full max-w-sm mx-auto rounded-lg border">
      <div className="shadow hover:shadow-lg rounded-lg  hover:shadow-red-500 transition-all duration-200">
        <div className="relative p-5">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[250px] object-cover rounded-xl border border-red-500 hover:scale-105 transition-all duration-300"
          />

          {product?.salePrice > 0 ? (
            <Badge className="absolute top-3 left-3 text-[13px] bg-red-500 hover:bg-red-600">
              Sale %
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2 truncate">{product?.title}</h2>

          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">
              Brand:{" "}
              <span className="font-medium text-sm text-black uppercase">
                {product?.brand}
              </span>
            </p>
            <span className="text-sm text-muted-foreground capitalize">
              {product?.category}
            </span>
          </div>

          <div className="flex  justify-between items-center mb-2">
            <p
              className={`${
                product?.salePrice > 0 ? "line-through text-gray-600" : ""
              } "text-lg font-semibold text-primary"`}
            >
              Price:{" "}
              <span className="text-xl font-bold ">{product?.price} ₹</span>
            </p>
            {product?.salePrice > 0 ? (
              <p className="font-semibold text-primary text-sm">
                Sale Price:{" "}
                <span className="font-bold text-xl">
                  {product?.salePrice} ₹
                </span>
              </p>
            ) : (
              <p className=" font-semibold">No Sale</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="">
          <Button className="w-full bg-red-500 hover:bg-red-400">
            Add to cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ShoppingProductTile;
