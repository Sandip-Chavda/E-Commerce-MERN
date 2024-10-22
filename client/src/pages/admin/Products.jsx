import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useEffect, useState } from "react";
import ProductImageUpload from "./ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/redux/slices/admin/productsSlice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin/AdminProductTile";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProduct = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);
  const { toast } = useToast();
  const dispatch = useDispatch();

  // console.log("productlist", productList);

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(editProduct({ id: currentEditedId, formData })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setFormData(initialFormData);
              setOpenCreateProductDialog(false);
              setCurrentEditedId(null);
            }
          }
        )
      : dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then(
          (data) => {
            // console.log(data);
            // console.log(data?.payload?.success);
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setOpenCreateProductDialog(false);
              setImageFile(null);
              setFormData(initialFormData);
              toast({
                title: data?.payload?.message,
                description: data?.payload?.success,
              });
            }
          }
        );
  }

  function handleDelete(getCurrentProductId) {
    // console.log(getCurrentProductId);
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  // function isFormValid() {
  //   return Object.keys(formData)
  //     .map((key) => formData[key] !== "")
  //     .every((item) => item);
  // }

  function isFormValid() {
    return Object.keys(formData)
      .filter((key) => key !== "salePrice") // Exclude salePrice from the validation
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => {
            setOpenCreateProductDialog(true);
          }}
          className="bg-red-500 hover:bg-red-600"
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
        {console.log(productList)}
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setCurrentEditedId={setCurrentEditedId}
                setFormData={setFormData}
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                product={productItem}
                key={productItem._id}
                handleDelete={handleDelete}
              />
            ))
          : "Tehre is no Product to show, Add some product to sell."}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader className="mt-6 border-red-500 border-b pb-2">
            <SheetTitle className="text-xl font-semibold text-center text-red-500">
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />

          <div className="py-6">
            <CommonForm
              buttonText={
                currentEditedId !== null ? "Edit Product" : "Add Product"
              }
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProduct;
