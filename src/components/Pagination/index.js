import { ITEMS_PER_PAGE } from "../../utils/constants";
import styles from './Pagination.module.scss';

const Pagination = ({icons, page, setPage}) => {
    return (
    <div className={styles.pagination}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className='btn btn-primary'>Prev</button>
        <span className={styles.paginationPage}>Page {page}</span>
        <button disabled={icons.length < ITEMS_PER_PAGE} onClick={() => setPage(page + 1)} className='btn btn-primary'>Next</button>
    </div>
    )
}

export default Pagination