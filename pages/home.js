import { useQuery, gql, useLazyQuery } from "@apollo/client";
import AuthorList from "./AuthorList";
import withApollo from "../config";
import React, { useEffect, useState } from "react";
import styles from '../styles/Home.module.css';
import { useApolloClient } from "@apollo/client";



const QUERY = gql`
  query {
    kacak_verileri_deneme {
      _Il
      _Ilce
      _Kacak_Olma_Ihtimali
      id
    }
  }
`;

const Home = () => {
  const { data, loading, error, refetch } = useQuery(QUERY);
  const [selectedValue, setSelectedValue] = useState('');

  // const client = useApolloClient();
  const handleDropdownChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const [myData, setMyData] = useState([]);
  useEffect(() => {
    if (data)
      setMyData(data.kacak_verileri_deneme)
  }, [data])
  return (


    <div className={styles.form}>

      <div className={styles.dropdownContainer}>
        <select className={styles.dropdown} value={selectedValue} onChange={handleDropdownChange}>
          <option value="option1">Konak</option>

        </select>
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
        <div className={styles.dropdownBtns}> <button > Verileri Güncelle </button>

        </div>
      </div>

      <div className={styles.columns}>
        <div className={styles.column}>Abone No</div>
        <div className={styles.column}>İl</div>
        <div className={styles.column}>İlçe</div>
        <div className={styles.column}>Kaçak Olma İhtimali</div>
        <div className={styles.column}>Kaçak Durumu</div>
      </div>



      <AuthorList authors={myData ? myData : []} />


    </div>


  );
};

export default withApollo(Home);
