import ProductFilter from "@/components/shopping/Filter";
import ShoppingProductTile from "@/components/shopping/ShoppingProductTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts } from "@/redux/slices/shop/productsSlice";
import { useEffect } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const ProductListing = () => {
  const dispatch = useDispatch();

  const { productList } = useSelector((state) => state.shopProducts);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
      <ProductFilter />
      <div className="bg-background w-full rounded-lg shadow-sm ">
        <div className="p-4 border-b border-red-500 flex items-center justify-between">
          <h2 className="text-xl font-bold text-red-500">
            All Available Products
          </h2>
          <div className="flex items-center gap-3">
            <p className="text-muted-foreground">
              <span className="text-red-500 font-medium">
                {productList?.length}
              </span>{" "}
              Products
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 border border-red-500 text-red-500 hover:bg-red-100 hover:text-red-500"
                >
                  <BiSortAlt2 size={16} className="" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem, index) => (
                <ShoppingProductTile key={index} product={productItem} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
