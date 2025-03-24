import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Login.module.css'

const Login = () => {
  return (
  <div>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header>
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
        <main className={styles.main}>
            <h1 className={styles.signinHeader}>Sign In</h1>

            <input 
                type='text' 
                placeholder='Email Address'
                className={styles.emailInput}/>
                
            <button onClick={handleLoginWithEmail}>
                Sign In
            </button>
        </main>
      </header>
    </div>
  ); 
};

export default Login
