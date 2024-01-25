import { useState } from 'react';
import styles from '../styles/Home.module.css';

const AuthorList = ({ authors }) => {
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAuthors = authors.slice(indexOfFirstItem, indexOfLastItem);

  const generateRandomId = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {currentAuthors &&
        currentAuthors.map((a, i) => (
          <div key={i}>
            <div className={styles.rows}>
              <div>{generateRandomId()}</div>
              <div>{a._Il}</div>
              <div>{a._Ilce}</div>
              <div>{a._Kacak_Olma_Ihtimali}</div>
              <div>Kontrol</div>
            </div>
          </div>
        ))}

      <div className={styles.pagination}>
        {Array.from({ length: Math.ceil(authors.length / itemsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AuthorList;
