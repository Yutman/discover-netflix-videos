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
        setIsLoading(true);
        setUserMsg(''); // Clear any previous messages
        
        // Check if Magic client is available
        if (!magic) {
          setIsLoading(false);
          setUserMsg('Authentication service is not available. Please refresh the page and try again.');
          return;
        }
        
        const didToken = await magic.auth.loginWithMagicLink({ email });
        if (didToken) {
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
            router.push('/');
          } else {
            setIsLoading(false);
            // Display the specific error message from the server
            setUserMsg(loggedInResponse.error || 'Sign in failed. Please try again.');
          }
        } else {
          setIsLoading(false);
          setUserMsg('Authentication failed. Please try again.');
        }
      } catch (error) {
        console.error('Login error:', error);
        setIsLoading(false);
        
        // Provide specific error messages based on error type
        if (error.message.includes('Magic Link')) {
          setUserMsg('Email verification failed. Please check your email and try again.');
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          setUserMsg('Network error. Please check your connection and try again.');
        } else {
          setUserMsg('Sign in failed. Please try again.');
        }
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
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
          {userMsg && userMsg.includes('temporarily unavailable') && (
            <button
              onClick={() => window.location.reload()}
              className={styles.retryBtn}
              style={{ 
                marginTop: '10px', 
                padding: '8px 16px', 
                backgroundColor: 'transparent', 
                border: '1px solid #fff', 
                color: '#fff', 
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              Refresh Page
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Login;