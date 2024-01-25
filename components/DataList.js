import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

const DataList = ({ authors }) => {
    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [kacakDurumları, setKacakDurumları] = useState({});
    const [randomIds, setRandomIds] = useState([]);
    const [previousPageIds, setPreviousPageIds] = useState([]);

    useEffect(() => {
        generateRandomIds();
    }, [currentPage, authors]);

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

    const generateRandomIds = () => {
        const ids = currentAuthors.map(() => generateRandomId());
        setPreviousPageIds(randomIds);
        setRandomIds(ids);
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

            <div>
                {Array.from({ length: Math.ceil(authors.length / itemsPerPage) }, (_, i) => (
                    <button className={styles.pagination} key={i} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DataList;
