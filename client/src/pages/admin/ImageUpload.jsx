import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef } from "react";
import { IoCloudUpload } from "react-icons/io5";
import { FaRegFileImage } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
}) => {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    // console.log(event.target.files);

    const selectedFiles = event.target.files?.[0];

    if (selectedFiles) setImageFile(selectedFiles);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();

    const DroppedFile = event.dataTransfer.files?.[0];

    if (DroppedFile) setImageFile(DroppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);

    const data = new FormData();
    data.append("my_file", imageFile);

    const response = await axios.post(
      "http://localhost:3000/api/admin/products/upload-image",
      data
    );

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="mt-5 mb-3 block">Upload Product Image</Label>

      <div onDragOver={handleDragOver} onDrop={handleDrop}>
        <Input
          id="image-upload"
          type="file"
          className="border border-red-500 hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "!cursor-not-allowed" : ""
            } flex flex-col hover:bg-red-50 transition-colors rounded-md border border-dashed border-red-500 mt-2 items-center justify-center h-32 cursor-pointer`}
          >
            <IoCloudUpload className="w-10 h-10 text-red-500 " />
            <span className="text-red-400 text-xs">
              Select or Drop an Image
            </span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-12 w-12 rounded-full animate-pulse bg-red-400" />
        ) : (
          <div className="flex items-center justify-between border border-red-500 border-dashed p-1 rounded-md">
            <div className="flex items-center">
              <FaRegFileImage className="w-6 h-6 text-red-500 mr-2" />
            </div>
            <p className="text-sm font-normal">{imageFile.name}</p>
            <Button
              variant="default"
              size="icon"
              className="bg-transparent p-1 hover:bg-transparent group"
              onClick={handleRemoveImage}
            >
              <MdDeleteForever className="w-6 h-6 text-red-500 group-hover:text-red-700" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
