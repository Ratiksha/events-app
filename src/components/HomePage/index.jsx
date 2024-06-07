import { useEffect, useState, useContext } from "react";
import Search from '../Search';
import IconList from "../IconsList";
import Pagination from "../Pagination";
import { getIcons, searchIcon } from "../../../services/apiServices/iconsApi"; 
import styles from './HomePage.module.scss';

const HomePage = ({data}) => {
    const [icons, setIcons] = useState(data);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (query) => {
      setQuery(query);
      setIsLoading(true);
        try {
          const data = await searchIcon(query);
          setIcons(data.icons);
        } catch (error) {
          console.log('Error searching icon:', error);
        } finally {
          setIsLoading(false);
        }
    };

    const fetchIcons = async () => {
      setIsLoading(true);
      try {
        const data = await getIcons(page);
        setIcons(data.icons);
      } catch (error) {
        console.log('Error fetching icons:', error);
      } finally {
        setIsLoading(false);
      }
    }

    const handleCancelSearch = () => {
      if(page === 1) {
        fetchIcons();
      } else {
        setPage(1);
      }
    }

    useEffect(() => {
      fetchIcons();
    }, [page])

    useEffect(() => {
      if (!isLoading) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, [isLoading]);

    return(<div className={styles.home}>
              <Search query={query} setQuery={setQuery} onSearch={handleSearch} onCancelSearch={handleCancelSearch} />
              <IconList icons={icons} onSearch={handleSearch} isLoading={isLoading} />
              <Pagination icons={icons} page={page} setPage={setPage} />
            </div>)
}

export default HomePage