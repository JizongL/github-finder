import React, { useReducer } from 'react';
import AlertReducer from 'context/alert/alertReducer';
import { SET_ALERT, REMOVE_ALERT } from 'context/types';
import AlertContext from 'context/alert/alertContext';
const AlertState = (props) => {
	const initialState = null;
	const [ state, dispatch ] = useReducer(AlertReducer, initialState);

	// Set alert
	const setAlert = (msg, type) => {
		dispatch({
			type: SET_ALERT,
			payload: { msg, type }
		});

		setTimeout(
			() =>
				dispatch({
					type: REMOVE_ALERT
				}),
			5000
		);
	};
	return (
		<AlertContext.Provider
			value={{
				alert: state,
				setAlert
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
