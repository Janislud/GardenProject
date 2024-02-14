import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { maxPriceChange, minPriceChange, sortChange, toggleShowOnlyDiscounted } from '../../slices/filterSlice'
import style from '../FilterBar/FilterBar.module.css'

export const FilterBar = ({ title }) => {
    const dispatch = useDispatch()
    const showOnlyDiscounted = useSelector(state => state.filter.showOnlyDiscounted);
    const [isChecked , setIsChecked] = useState(showOnlyDiscounted);

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
                    <input className={style.priceInput} type="number" placeholder="from" id="price" onChange={(element) => dispatch(minPriceChange(element.target.value))} />
                    <input className={style.priceInput} type="number" placeholder="to" onChange={(element) => dispatch(maxPriceChange(element.target.value))} />
           
                <div>
                    <label className={style.lableDiscount} htmlFor="discounted-items">Discounted items</label>
                    <input type="checkbox" id="discounted-items" name="discount" checked={isChecked} onChange={handleToggleShowOnlyDiscounted} />
                </div>
                
            

                <label htmlFor="sort">Sorted</label>
                    <select id="sort" onChange={(element) => dispatch(sortChange(element.target.value))}>
                        <option>By default</option>
                        <option value="Ascending">Ascending</option>
                        <option value="Descending">Descending</option>
                    </select>
            </form>
        </div>
      
    )
}