import { SIGNIN_USER_REQUEST, SIGNIN_USER_SUCCESS, SIGNIN_USER_FAILURE, LOGOUT_USER } from './actionTypes';
import axios from 'axios';

export const signInUserRequest = (payload) => ({
	type: SIGNIN_USER_REQUEST,
	payload
});

export const signInUserSuccess = (payload) => ({
	type: SIGNIN_USER_SUCCESS,
	payload
});

export const signInUserFailure = (payload) => ({
	type: SIGNIN_USER_FAILURE,
	payload
});

export const logoutUser = () => ({
	type: LOGOUT_USER
});

export const userSignIn = (payload) => async (dispatch) => {
	dispatch(signInUserRequest());
	const { email, password } = payload;
	try {
		let res = await axios({
			method: 'post',
			url: 'http://localhost:8000/api/admin/login',
			data: {
				email,
				password
			}
		});
		console.log('res', res);
		dispatch(signInUserSuccess(res.data));
		return true;
	} catch (err) {
		dispatch(signInUserFailure(err));
		return false;
	}
};
