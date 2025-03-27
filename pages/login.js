import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

import {useRouter} from 'next/router'
import {useState} from 'react'

import styles from '../styles/Login.module.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [userMsg, setUserMsg] = useState('');

  const router = useRouter();

  const handleOnChangeEmail = (e) => {
    setUserMsg('');
    console.log('event', e);
    const email = e.target.value;
    setEmail(email);
  };

  const handleLoginWithEmail = (e) => {
      console.log('Hi Button Clicked'); 
      e.preventDefault(); 

       if (email) {
        if (email === 'nimimishiri@gmail.com') {
     router.push ('/');
        } else {
      //show error message
      setUserMsg('Something went wrong logging in');
        }
    } else {
      //show error message
      setUserMsg('Please enter a valid email address');
    }
  };


  return (
  <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
         <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
                <Image 
                    src='/static/icons/netflix.svg'
                    alt='netflix logo'
                    width={128}
                    height={34}
                    />
            </div>
        </a>
        </div>
        </header>
        <main className={styles.main}>
          <div className={styles.mainWrapper}>
            <h1 className={styles.signinHeader}>Sign In</h1>
            <input 
                type='text' 
                placeholder='Email Address'
                className={styles.emailInput}
                onChange={handleOnChangeEmail}
                />

      <p className={styles.userMsg}>
        {userMsg}
      </p>
            <button 
                onClick={handleLoginWithEmail}
                className={styles.loginBtn}>
                Sign In
            </button>
            </div>
        </main>
    </div>
  ); 
};

export default Login;
