import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from 'components/layout/NavBar';
import Users from 'components/users/Users';
import Search from 'components/users/Search';
import Alert from 'components/layout/Alert';
import About from 'components/pages/About';
import User from 'components/users/User';
import GithubState from 'context/github/GithubState';
import axios from 'axios';
import './App.css';

const App = () => {
	const [ users, setUsers ] = useState([]);
	const [ user, setUser ] = useState({});
	const [ repos, setRepos ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ alert, setAlert ] = useState(null);

	// state = {
	// 	users: [],
	// 	user: {},
	// 	loading: false,
	// 	repos: [],
	// 	alert: null
	// };

	// async componentDidMount() {
	// 	this.setState({ loading: true });
	// 	const res = await axios.get(`https://api.github.com/users?client_id=
	// 	${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
	// 	${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
	// 	this.setState({ users: res.data, loading: false });
	// }

	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};

	const showAlert = (msg, type) => {
		setAlert({ msg: type });
		setTimeout(() => setAlert(null), 5000);
	};

	const getUserRepos = async (username) => {
		setLoading(true);
		const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
		${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
		${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
		setRepos(res.data);
		setLoading(false);
	};

	return (
		<GithubState>
			<Router>
				<div className="App">
					<NavBar />
					<div className="container">
						<Alert alert={alert} />
						<Switch>
							<Route
								path="/"
								exact
								render={(props) => (
									<Fragment>
										<Search
											clearUsers={clearUsers}
											showClear={users.length > 0 ? true : false}
											setAlert={showAlert}
										/>
										<Users />
									</Fragment>
								)}
							/>
							<Route path="/about" component={About} />
							<Route
								exact
								path="/user/:login"
								render={(props) => (
									<User
										{...props}
										getUserRepos={getUserRepos}
										repos={repos}
										user={user}
										loading={loading}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
};

export default App;
