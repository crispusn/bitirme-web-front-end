import { useQuery, gql, useLazyQuery } from "@apollo/client";
import withApollo from "../config";
import DataList from "../components/DataList.js";
import React, { useEffect, useState } from "react";
import styles from '../styles/Home.module.css';
import { useApolloClient } from "@apollo/client";
import Modal from 'react-modal';
import { Oval } from "react-loader-spinner";


const QUERY = gql`
  query {
    kacak_elektrik_ihtimalleri {
      _Il
      _Ilce
      _Kacak_Olma_Ihtimali
      id
    }
  }
`;

const Home = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      setIsOpen(false);
    }, 60000);
  };
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }
  const { data, error, refetch } = useQuery(QUERY);
  const [selectedValue, setSelectedValue] = useState('');
  const [kacakDurumları, setKacakDurumları] = useState({});
  const toggleKacakDurumu = (authorId) => {
    setKacakDurumları((prevKacakDurumları) => ({
      ...prevKacakDurumları,
      [authorId]: !prevKacakDurumları[authorId],
    }));
  };
  // const client = useApolloClient();
  const handleDropdownChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const [myData, setMyData] = useState([]);
  useEffect(() => {
    if (data)
      setMyData(data.kacak_elektrik_ihtimalleri)
  }, [data])
  return (


    <div className={styles.form}>

      <div className={styles.dropdownContainer}>
        <select className={styles.dropdown} value={selectedValue} onChange={handleDropdownChange}>
          <option value="option1">Konak</option>

        </select>
        <div>
          <button onClick={openModal}>Verileri Güncelle</button>
          <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <Oval
              visible={true}
              height="140"
              width="140"
              color="#A471FB"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </Modal>
        </div>
        <div className={styles.dropdownBtns}> <button onClick={(e) => {
          e.preventDefault()
          refetch()
          let newData = myData
          console.log(newData)
          if (newData) {
            newData = newData
              .map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value)
          }

          setMyData(newData)



        }}> Verileri İşle </button>

        </div>

      </div>

      <div className={styles.columns}>
        <div className={styles.column}>Abone No</div>
        <div className={styles.column}>İl</div>
        <div className={styles.column}>İlçe</div>
        <div className={styles.column}>Kaçak Olma İhtimali (%)</div>
        <div className={styles.column}>Kaçak Durumu</div>
      </div>



      <DataList authors={myData ? myData : []} />


    </div>


  );
};

export default withApollo(Home);
