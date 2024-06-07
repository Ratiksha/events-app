import styles from './Search.module.scss';
const Search = ({ query, setQuery, onSearch, onCancelSearch }) => {

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const onSearchButtonClick = () => {
    if(query) {
      onSearch(query);
    }
  }

  const handleCancel = () => {
    setQuery('');
    onCancelSearch();
  }

  return (
    <div className={styles.searchContainer}>
        <input
            type="text"
            placeholder="Find your perfect icon"
            value={query} 
            onChange={handleChange}
        />
        { query && <span className={styles.close} onClick={() => handleCancel()}>&#x2715;</span> }
        <button className='btn btn-primary' onClick={() => onSearchButtonClick()}>
          <span className={styles.searchIcon}>&#x1F50E;&#xFE0E;</span>
          <span className={styles.searchText}>Search</span>
        </button>
    </div>
  );
};

export default Search;