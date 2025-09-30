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
      setIsLoading(false);
    };
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  const handleOnChangeEmail = (e) => {
    setUserMsg('');
    const email = e.target.value;
    setEmail(email);
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        console.log('🔍 Login Debug - Starting authentication flow for email:', email);
        setIsLoading(true);
        
        console.log('🔍 Magic client instance check:', !!magic);
        if (!magic) {
          console.error('❌ Magic client not initialized');
          setUserMsg('Authentication service not available');
          setIsLoading(false);
          return;
        }
        
        console.log('🔍 Attempting Magic Link authentication...');
        const didToken = await magic.auth.loginWithMagicLink({ email });
        console.log('🔍 DID Token received:', !!didToken);
        console.log('🔍 DID Token length:', didToken ? didToken.length : 0);
        
        if (didToken) {
          console.log('🔍 Sending authentication request to API...');
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${didToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });

          console.log('🔍 API Response status:', response.status);
          const loggedInResponse = await response.json();
          console.log('🔍 API Response:', loggedInResponse);
          
          if (loggedInResponse.done) {
            console.log('✅ Authentication successful, redirecting...');
            router.push('/');
          } else {
            console.error('❌ Authentication failed:', loggedInResponse.error);
            setIsLoading(false);
            setUserMsg(loggedInResponse.error || 'Something went wrong logging in');
          }
        } else {
          console.error('❌ No DID token received from Magic');
          setIsLoading(false);
          setUserMsg('Authentication failed - no token received');
        }
      } catch (error) {
        console.error('❌ Authentication error:', error);
        setIsLoading(false);
        setUserMsg('Something went wrong logging in');
      }
    } else {
      setIsLoading(false);
      setUserMsg('Please enter a valid email address');
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