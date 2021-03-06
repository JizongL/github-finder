import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from 'components/layout/NavBar';
import Alert from 'components/layout/Alert';
import About from 'components/pages/About';
import User from 'components/users/User';
import GithubState from 'context/github/GithubState';
import AlertState from 'context/alert/AlertState';
import Home from 'components/pages/Home';
import NotFound from 'components/pages/NotFound';
import './App.css';

const App = () => {
	// const [ users, setUsers ] = useState([]);
	// const [ user, setUser ] = useState({});
	// const [ repos, setRepos ] = useState([]);
	// const [ loading, setLoading ] = useState(false);
	// const [ alert, setAlert ] = useState(null);

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

	return (
		<GithubState>
			<AlertState>
				<Router>
					<div className="App">
						<NavBar />
						<div className="container">
							<Alert />
							<Switch>
								<Route path="/" exact render={(props) => <Home />} />
								<Route path="/about" component={About} />
								<Route
									exact
									path="/user/:login"
									component={User}
									// render={(props) => <User {...props} />}
								/>
								<Route component={NotFound} />
							</Switch>
						</div>
					</div>
				</Router>
			</AlertState>
		</GithubState>
	);
};

export default App;
