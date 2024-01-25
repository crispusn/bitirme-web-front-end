import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import axios from 'axios';


const Index = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://bitirme-projesi-back-end.onrender.com/user/deneme', {
        username: formData.username,
        password: formData.password,

      });
      console.log(response.data);
      if (response.data.succeded) {
        console.log('Login Successful:', response.data);


        router.push('/home');
      } else {
        console.error('Login Failed');

      }
    } catch (error) {
      console.error('Login Error:', error);

    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <form className={styles.loginForm} >
          <h1 className={styles.header}>Giriş Yap</h1>
          <h2 className={styles.subText}>Kullanıcı bilgilerinizi giriniz.</h2>
          <label htmlFor="username">Kullanıcı Adı:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Kullanıcı Adı"
            value={formData.username}
            onChange={handleInputChange}
          />

          <label htmlFor="password">Şifre:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Şifre"
            value={formData.password}
            onChange={handleInputChange}
          />

          <button type="submit" onClick={handleLogin}>Giriş Yap</button>
        </form>
      </div>
      <div className={styles.rightPanel}>
        <h1 className={styles.panelTitle}>Elektrik Kaçak Tespit Sistemi</h1>
        <img src="/logo.svg" alt="Circle SVG" className={styles.svgImage} />
      </div>
    </div>
  );
};

export default Index;
