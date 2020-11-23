import React from 'react';
import { Formik, Form, useField } from 'formik';
import { Button, TextField, Box } from '@material-ui/core';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { userSignIn } from '../redux/Auth/actions';
import { Redirect, Link } from 'react-router-dom';

const useStyles = makeStyles({
	layout: {
		padding: '30px',
		textAlign: 'center'
	},
	authPage: {
		margin: 'auto',
		maxWidth: '360px',
		minHeight: '410px',
		background: 'white',
		padding: '60px 40px 40px'
	},
	header: {
		textAlign: 'left',
		fontSize: '20px',
		fontWeight: '500',
		color: '#424553',
		marginBottom: '20px'
	},
	formFields: {
		marginBottom: '10px',
		'& > *': {
			fontSize: '12px'
		}
	},
	radio: {
		fontSize: '12px',
		'& > *': {
			fontSize: '12px'
		}
	},
	button: {
		marginTop: '20px'
	},
	formControl: {
		width: '100%',
		marginBottom: '10px',
		fontSize: '12px'
	},
	select: {
		textAlign: 'left',
		fontSize: '12px'
	},
	inputLabel: {
		fontSize: '12px'
	},
	googleBtn: {
		width: '100%'
	}
});

const MyTextField = ({ placeholder, label, InputLabelProps, InputProps, required, type, ...props }) => {
	const [ field, meta ] = useField(props);
	const errorText = meta.error && meta.touched ? meta.error : '';
	const classes = useStyles(props);
	return (
		<TextField
			placeholder={placeholder}
			label={label}
			className={classes.formFields}
			size="small"
			InputLabelProps={{
				style: {
					fontSize: 12
				},
				width: '100%'
			}}
			InputProps={{
				style: {
					fontSize: 12
				}
			}}
			required={required}
			fullWidth={true}
			{...field}
			helperText={errorText}
			error={!!errorText}
			type={type}
			variant="outlined"
		/>
	);
};

const validationSchema = yup.object({
	email: yup.string().email('Invalid email').required('Required'),
	password: yup.string().min(2, 'Password should have miniumum 2 characters!').required('Required')
});

const SignIn = (props) => {
	window.document.title = 'Signin';

	const classes = useStyles(props);

	const dispatch = useDispatch();
	const { isAuth, error } = useSelector((state) => state.auth);

	if (error === true) {
		console.log('error is', error);
		alert('Try again....!');
	}

	const handleSignIn = async (data) => {
		dispatch(userSignIn(data));
	};

	if (isAuth) {
		return <Redirect to="/admin" />;
	} else {
		return (
			<div className={classes.layout}>
				<Formik
					initialValues={{
						email: '',
						password: ''
					}}
					validationSchema={validationSchema}
					onSubmit={async (data, { setSubmitting }) => {
						setSubmitting(true);
						await handleSignIn(data);
						console.log('submit: ', data);
						setSubmitting(false);
					}}
				>
					{({ values, errors, isSubmitting }) => (
						<Form className={classes.authPage}>
							<Box className={classes.header}>Login in if You already registered!</Box>{' '}
							<div>
								<MyTextField
									type="email"
									placeholder="Email"
									name="email"
									label="Email"
									required={true}
								/>
							</div>
							<div>
								<MyTextField
									type="password"
									placeholder="Password"
									name="password"
									label="Password"
									required={true}
								/>
							</div>
							<div>
								<Button
									disabled={isSubmitting}
									type="submit"
									variant="contained"
									color="primary"
									size="small"
									fullWidth
								>
									Sign In
								</Button>
							</div>
						</Form>
					)}
				</Formik>
				<div>
					<p>
						if not Registered, Register <Link to="/signup">Here</Link>
					</p>
				</div>
			</div>
		);
	}
};

export default SignIn;
