import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class Search extends Component {
	state = {
		text: ''
	};
	static propTypes = {
		searchUser: PropTypes.func.isRequired
	};
	onSubmit = (e) => {
		e.preventDefault();
		this.props.searchUsers(this.state.text);
		this.setState({ text: '' });
	};
	onChange = (e) => this.setState({ [e.target.name]: e.target.value });
	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit} className="form">
					<input
						type="text"
						name="text"
						placeholder="Search Users..."
						value={this.state.text}
						onChange={this.onChange}
					/>
					<input type="submit" value="Search" className="btn btn-dark btn-block" />
				</form>
			</div>
		);
	}
}