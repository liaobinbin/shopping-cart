import React from "react";
import { useDispatch, } from 'react-redux'

import { filterProducts, AppDispatch } from '@store'

import { CheckBox } from "@components";
import style from "./style.module.less";

export const availableSizes = ["XS", "S", "M", "ML", "L", "XL", "XXL"];


const selectSizes = new Set<string>();
export const Filter: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()

  const toggleCheckbox = (label: string) => {
    if (selectSizes.has(label)) {
      selectSizes.delete(label)
    } else {
      selectSizes.add(label)
    }

    dispatch(filterProducts(Array.from(selectSizes)))
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
