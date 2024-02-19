import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { maxPriceChange, minPriceChange, sortChange, toggleShowOnlyDiscounted } from '../../slices/filterSlice'
import style from '../FilterBar/FilterBar.module.css'

export const FilterBar = ({ title }) => {
    const dispatch = useDispatch()
    const showOnlyDiscounted = useSelector(state => state.filter.showOnlyDiscounted);
    const [isChecked , setIsChecked] = useState(showOnlyDiscounted);
    const location = useLocation();

     useEffect(() => {
        setIsChecked(showOnlyDiscounted);
        dispatch(minPriceChange(''));
        dispatch(maxPriceChange(''));
        dispatch(sortChange(''));
    }, [showOnlyDiscounted, location, dispatch]);

    const handleToggleShowOnlyDiscounted = () => {
        
        if(isChecked) {
            setIsChecked(false);
            dispatch(toggleShowOnlyDiscounted());
        } else {
          setIsChecked(true);
          dispatch(toggleShowOnlyDiscounted());
        }
    
    }

    return (
        <div className={style.filterBarWrapper}>
             <h2 className={style.filterTitle}>{title}</h2>
            <form className={style.formFilterBar}>
                <label className={style.lablePrice} htmlFor="price">Price</label>
                    <input className={style.priceInput} type="number" placeholder="from" id="price" min="0" onChange={(element) => dispatch(minPriceChange(element.target.value))} />
                    <input className={style.priceInput} type="number" placeholder="to" min="0" onChange={(element) => dispatch(maxPriceChange(element.target.value))} />
                    {title !== "All Sales" &&
                <div className={style.discountItemsWrapper}>
                    <label className={style.lableDiscount} htmlFor="discounted-items">Discounted items</label>
                    <input className={style.inputCheckBox} type="checkbox" id="discounted-items" name="discount" checked={isChecked} onChange={handleToggleShowOnlyDiscounted} />
                </div>
                }
                <label className={style.sortedLable} htmlFor="sort">Sorted</label>
                <div className={style.customSelect}>
                        <select className={style.selectOption} id="sort" onChange={(element) => dispatch(sortChange(element.target.value))}>
                        <option className={style.btnOption}>by default</option>
                        <option className={style.btnOption} value="Ascending">price: high-low</option>
                        <option className={style.btnOption} value="Descending">price: low-high</option>
                    </select>

                </div>
                    
            </form>
        </div>
      
    )
}