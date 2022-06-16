import React from "react";
import { CheckBox } from "@components";
import style from "./style.module.less";

export const availableSizes = ["XS", "S", "M", "ML", "L", "XL", "XXL"];

export const Filter: React.FC = () => {
  const toggleCheckbox = (label: string) => {
    console.log(label);
  };
  return (
    <div className={style.filter}>
      <h4 className={style["filter-title"]}>Sizes:</h4>
      {availableSizes.map((size) => {
        return (
          <CheckBox
            className={style["filter-checkbox"]}
            label={size}
            key={size}
            onChange={toggleCheckbox}
          />
        );
      })}
    </div>
  );
};
