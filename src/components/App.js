import React, { useState, useEffect } from 'react';

import {
  getSomething
} from '../api';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  return (
    <>
			<div className="app">
				<Header
					// loggedIn={loggedIn}
					// setLoggedIn={setLoggedIn}
				/>
				<Switch>
					<Route exact path="/">
						<Home
							// loggedIn={loggedIn}
							// setLoggedIn={setLoggedIn}
							// username={username}
							// password={password}
							// setUsername={setUsername}
							// setPassword={setPassword}
							// setRegisterToken={setRegisterToken}
							// userToken={userToken}
							// setUserToken={setUserToken}
						/>
					</Route>

					<Route path="/register">
						<Register
							// loggedIn={loggedIn}
							// setLoggedIn={setLoggedIn}
							// username={username}
							// password={password}
							// setUsername={setUsername}
							// setPassword={setPassword}
							// registerToken={registerToken}
							// setRegisterToken={setRegisterToken}
						/>
					</Route>

					<Route path="/login">
						<LogIn
							// loggedIn={loggedIn}
							// setLoggedIn={setLoggedIn}
							// username={username}
							// password={password}
							// setUsername={setUsername}
							// setPassword={setPassword}
							// setRegisterToken={setRegisterToken}
							// userToken={userToken}
							// setUserToken={setUserToken}
						/>
					</Route>

					<Route path="/items">
						<Routines />
					</Route>

					<Route path="/cart">
						<MyRoutines />
					</Route>

					<Route path="/profile">
						<Activities />
					</Route>

					<Route>
						<Message />
					</Route>
				</Switch>
			</div>
		</>
	)
}

export default App;