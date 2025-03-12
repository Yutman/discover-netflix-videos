import React from 'react'

const NavBar = (props) => {

    const {username} = props;


  return ( 
    <div>
    NavBar
    <ul>
        <li>Home</li>
        <li>My List</li>
    </ul>

    <nav>
        <div><button>
            <p>{username}</p>
            </button>
            <div><a>
                Sign Out
                </a></div>
        </div>
     </nav>
    </div>
  );
}

export default NavBar;
