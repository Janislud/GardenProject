import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import {
  maxPriceChange,
  minPriceChange,
  resetFilters,
  sortChange,
  toggleShowOnlyDiscounted,
} from "../../slices/filterSlice";
import style from "../FilterBar/FilterBar.module.css";

export const FilterBar = ({ title }) => {
  const dispatch = useDispatch();
  const showOnlyDiscounted = useSelector(
    (state) => state.filter.showOnlyDiscounted
  );
  const [isChecked, setIsChecked] = useState(!showOnlyDiscounted);
  const location = useLocation();
  const theme = useSelector((state) => state.theme.theme);
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const debouncedMinPrice = useDebounce(minPriceInput, 1000);
  const debouncedMaxPrice = useDebounce(maxPriceInput, 1000);

  useEffect(() => {
    setIsChecked(showOnlyDiscounted);
  }, [showOnlyDiscounted, location, dispatch]);

  useEffect(() => {
    dispatch(resetFilters());
  }, [location.pathname, dispatch]);

  const handleToggleShowOnlyDiscounted = () => {
    if (isChecked) {
      setIsChecked(false);
      dispatch(toggleShowOnlyDiscounted());
    } else {
      setIsChecked(true);
      dispatch(toggleShowOnlyDiscounted());
    }
  };

  useEffect(() => {
    // Применяем значения "от" и "до" после debounce
    dispatch(minPriceChange(debouncedMinPrice));
    dispatch(maxPriceChange(debouncedMaxPrice));
  }, [debouncedMinPrice, debouncedMaxPrice, dispatch]);

  return (
    <div className={style.filterBarWrapper}>
      <h2
        className={`${style.filterTitle}  ${
          theme === "light" ? style.dark : style.light
        }`}
      >
        {title}
      </h2>
      <form className={style.formFilterBar}>
        <div className={style.priceWrapper}>
          <label
            className={`${style.lablePrice} ${
              theme === "light" ? style.dark : style.light
            }`}
            htmlFor="price"
          >
            Price
          </label>
          <input
            className={`${style.priceInput} ${
              theme === "light" ? style.dark : style.light
            }`}
            type="number"
            placeholder="from"
            id="price"
            min="0"
            onChange={(element) => setMinPriceInput(element.target.value)}
          />
          <input
            className={`${style.priceInput} ${
              theme === "light" ? style.dark : style.light
            }`}
            type="number"
            placeholder="to"
            min="0"
            onChange={(event) => setMaxPriceInput(event.target.value)}
          />
        </div>
        {title !== "All Sales" && (
          <div className={style.discountItemsWrapper}>
            <label
              className={`${style.lableDiscount} ${
                theme === "light" ? style.dark : style.light
              }`}
              htmlFor="discounted-items"
            >
              Discounted items
            </label>
            <input
              className={`${style.inputCheckBox} ${
                theme === "light" ? style.dark : style.light
              }`}
              type="checkbox"
              id="discounted-items"
              name="discount"
              checked={isChecked}
              onChange={handleToggleShowOnlyDiscounted}
            />
          </div>
        )}

        <div className={style.customSelect}>
          <label
            className={`${style.sortedLable} ${
              theme === "light" ? style.dark : style.light
            }`}
            htmlFor="sort"
          >
            Sorted
          </label>
          <select
            className={`${style.selectOption} ${
              theme === "light" ? style.dark : style.light
            }`}
            id="sort"
            onChange={(element) => dispatch(sortChange(element.target.value))}
          >
            <option
              className={`${style.btnOption} ${
                theme === "light" ? style.dark : style.light
              }`}
            >
              by default
            </option>
            <option
              className={`${style.btnOption} ${
                theme === "light" ? style.dark : style.light
              }`}
              value="Ascending"
            >
              price: high-low
            </option>
            <option
              className={`${style.btnOption} ${
                theme === "light" ? style.dark : style.light
              }`}
              value="Descending"
            >
              price: low-high
            </option>
          </select>
        </div>
      </form>
    </div>
  );
};
