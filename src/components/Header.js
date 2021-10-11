import React from 'react';
import {Link, useHistory} from 'react-router-dom';

const Header = ({loggedIn, setLoggedIn}) => {
	//what is wrong with this relative path for image below? Cannot get it to work.

	const history = useHistory();

	function logOut(event) {
		event.preventDefault();
		localStorage.removeItem('Token')
		setLoggedIn(null);
		history.push('/')
	}

	return (
		<header>
			<h1> Buy Cereal</h1>
			<div id="nav-bar">
				<Link to="/items" className="navItem">Cereal</Link>
                <Link to="/profile" className="navItem">Profile</Link>
				<Link to="/cart" className="navItem">Cart</Link>
				
				{loggedIn ?
					<>
						<Link className="navItem" onClick={logOut}>Log Out</Link>
					</>
					: <Link to="/" className="navItem">Log In</Link>
				}
			</div>
		</header>
	)
}

export default Header;