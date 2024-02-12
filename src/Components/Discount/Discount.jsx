import { Link } from 'react-router-dom';
import styles from './Discount.module.css';


export const Discount = () => {
    return (
        <section className={styles.backgroundImage}>
            <div className="descriptionWrapper">
                <h1 className={styles.discountDescription}>Amazing Discounts on Garden Products!</h1>
                <Link to='/check'>
                <button className={styles.discountBtn}>Check out</button>
                </Link>
            </div>
        </section>
    )
}