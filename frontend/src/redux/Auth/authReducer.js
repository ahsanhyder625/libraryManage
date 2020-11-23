import { SIGNIN_USER_REQUEST, SIGNIN_USER_SUCCESS, SIGNIN_USER_FAILURE, LOGOUT_USER } from './actionTypes';

let initState = {
	error: false,

	isAuth: true,

	email: ''
};

const authReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case SIGNIN_USER_REQUEST:
			return {
				...state,
				error: false
			};

		case SIGNIN_USER_SUCCESS:
			return {
				...state,

				error: false,
				isAuth: true
			};

		case SIGNIN_USER_FAILURE:
			return {
				...state,

				error: true
			};
		case LOGOUT_USER:
			return {
				...state,
				isAuth: false,
				error: false
			};

		default:
			return state;
	}
};

export default authReducer;
