import { Link } from 'react-router-dom';
import styles from './MainBanner.module.css';
import { Button } from '../Button/Button';


export const MainBanner = () => {
    return (
        <div className={styles.backgroundImage}>
            <div className="descriptionWrapper">
                <h1 className={styles.discountDescription}>Amazing Discounts on Garden Products!</h1>
                <Link to='/check'>
                <Button buttonClass='primary' text='Check out'/>
                </Link>
            </div>
        </div>
    )
}