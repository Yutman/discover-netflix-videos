import React, { useEffect, useState } from 'react';
     import Head from 'next/head';
     import Image from 'next/image';
     import Link from 'next/link';
     import { useRouter } from 'next/router';
     import styles from '../styles/Login.module.css';
     import { magic } from '../lib/magic-client';

     const Login = () => {
       const [email, setEmail] = useState('');
       const [userMsg, setUserMsg] = useState('');
       const [isLoading, setIsLoading] = useState(false);

       const router = useRouter();

       useEffect(() => {
         const handleComplete = () => {
           console.log('login.js: Route change complete:', router.pathname);
           setIsLoading(false);
         };
         const handleError = () => {
           console.log('login.js: Route change error:', router.pathname);
           setIsLoading(false);
         };
         router.events.on('routeChangeComplete', handleComplete);
         router.events.off('routeChangeError', handleError);

         return () => {
           router.events.off('routeChangeComplete', handleComplete);
           router.events.off('routeChangeError', handleError);
         };
       }, [router]);

       const handleOnChangeEmail = (e) => {
         setUserMsg('');
         setEmail(e.target.value);
       };

       const handleLoginWithEmail = async (e) => {
         e.preventDefault();
         if (!email) {
           console.log('login.js: No email provided');
           setUserMsg('Please enter a valid email address');
           return;
         }

         try {
           console.log('login.js: Attempting login with email:', email);
           setIsLoading(true);
           const didToken = await magic.auth.loginWithMagicLink({
             email,
             redirectURI: 'https://discover-videos.vercel.app/login',
           });
           if (!didToken) {
             console.log('login.js: No didToken returned from Magic');
             setIsLoading(false);
             setUserMsg('Failed to generate magic link. Please try again.');
             return;
           }

           console.log('login.js: Got didToken, calling /api/login');
           const response = await fetch('/api/login', {
             method: 'POST',
             headers: {
               Authorization: `Bearer ${didToken}`,
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({ email }),
           });

           const loggedInResponse = await response.json();
           if (loggedInResponse.done) {
             console.log('login.js: Login successful, redirecting to /');
             router.push('/');
           } else {
             console.log('login.js: Login failed:', loggedInResponse);
             setIsLoading(false);
             setUserMsg(loggedInResponse.error || 'Something went wrong logging in');
           }
         } catch (error) {
           console.error('login.js: Login error:', error);
           setIsLoading(false);
           setUserMsg('Login error: ' + error.message);
         }
       };

       return (
         <div className={styles.container}>
           <Head>
             <title>Netflix SignIn</title>
           </Head>
           <header className={styles.header}>
             <Link href="/" legacyBehavior>
               <a className={styles.logoLink}>
                 <div className={styles.logoWrapper}>
                   <Image
                     src="/static/icons/netflix.svg"
                     alt="Netflix logo"
                     width={128}
                     height={34}
                   />
                 </div>
               </a>
             </Link>
           </header>
           <main className={styles.main}>
             <div className={styles.mainWrapper}>
               <h1 className={styles.signinHeader}>Sign In</h1>
               <input
                 type="text"
                 placeholder="Email Address"
                 className={styles.emailInput}
                 onChange={handleOnChangeEmail}
                 value={email}
               />
               <p className={styles.userMsg}>{userMsg}</p>
               <button
                 onClick={handleLoginWithEmail}
                 className={styles.loginBtn}
                 disabled={isLoading}
               >
                 {isLoading ? 'Loading...' : 'Sign In'}
               </button>
             </div>
           </main>
         </div>
       );
     };

     export default Login;