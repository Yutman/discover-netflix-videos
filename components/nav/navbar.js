import React from 'react';
import {useState} from 'react';
import {useRouter} from 'next/router';

import styles from './navbar.module.css';
import Link from 'next/link';
import Image from 'next/image';

const NavBar = (props) => {

    const {username} = props;
    const router = useRouter();

    const [showDropdown, setShowDropdown] = useState(false);

    const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push('/');
    };

    const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push('/browse/my-list');
    };

    const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
    }


  return ( 
    <div className={styles.container}>
    <div className={styles.wrapper}>
        <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
                <Image 
                    src={'/static/icons/netflix.svg'} 
                    alt='netflix logo'
                    width={128}
                    height={34}
                    />
            </div>
        </a>
   
    <ul className={styles.navItems}>
        <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
        <li className={styles.navItem2} onClick={handleOnClickMyList}>My List</li>
    </ul>

    <nav className={styles.navContainer}>
        <div>
            <button className={styles.usernameBtn}
            onClick={handleShowDropdown}>
            <p className={styles.username}>
                {username}
            </p>
              <Image 
                    src={'/static/icons/expand_more.svg'} 
                    alt='expand'
                    width={24}
                    height={24}
                    />
            </button>

            {showDropdown && (
            <div className={styles.navDropdown}>
                <div>
                <Link legacyBehavior href='/login'>
                <a className={styles.linkName} >Sign Out</a>
                </Link>
                <div className={styles.lineWrapper}></div>
                </div>
            </div>
            )}
        </div>
     </nav>
      </div>
    </div>
  );
}

export default NavBar;
