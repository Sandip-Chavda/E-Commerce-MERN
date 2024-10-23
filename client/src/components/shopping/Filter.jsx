import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const ProductFilter = () => {
  return (
    <div className="bg-background rounded-md">
      <div className="p-4 border-b border-red-500 pb-5 pt-5">
        <h2 className="text-lg text-center font-bold text-red-500">
          Filter Items
        </h2>
      </div>
      <div className="p-4 space-y-4 ">
        {Object.keys(filterOptions).map((keyItem, index) => (
          <Fragment key={index}>
            <div className="border-b pb-4 border-red-500">
              <h3 className="text-base font-semibold">{keyItem}</h3>
              <div className=" grid gap-2 mt-3">
                {filterOptions[keyItem].map((option, index) => (
                  <Label
                    className="flex items-center gap-2 font-normal"
                    key={index}
                  >
                    <Checkbox />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
