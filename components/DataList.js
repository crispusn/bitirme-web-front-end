import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

const DataList = ({ authors }) => {
    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [kacakDurumları, setKacakDurumları] = useState({});
    const [randomIds, setRandomIds] = useState([]);

    // Bu useEffect, bileşen ilk render olduğunda çalışır ve rastgele kimlikleri oluşturur.
    useEffect(() => {
        const ids = authors.map(() => generateRandomId());
        setRandomIds(ids);
    }, [authors]);

    const toggleKacakDurumu = (authorId) => {
        setKacakDurumları((prevKacakDurumları) => ({
            ...prevKacakDurumları,
            [authorId]: !prevKacakDurumları[authorId],
        }));
    };

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
                            <div>{randomIds[i]}</div>
                            <div>{a._Il}</div>
                            <div>{a._Ilce}</div>
                            <div>{a._Kacak_Olma_Ihtimali}</div>
                            <div onClick={() => toggleKacakDurumu(a.id)}>
                                {kacakDurumları[a.id] ? (
                                    <img src="/tick.svg" alt="Circle SVG" height={20} width={20} />
                                ) : (
                                    <img src="/cross.svg" alt="Circle SVG" height={20} width={20} />
                                )}
                            </div>
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

export default DataList;
