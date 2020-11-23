import React, { useEffect } from 'react';
import AdminBookCard from './AdminBookCard';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { setBookData } from '../../redux/App/actions';
import Grid from '@material-ui/core/Grid';
import { useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center'
	},
	divContainer: {
		margin: '20px',
		width: '800px'
	},
	container: {
		marginLeft: '300px'
	},
	formControl: {
		margin: theme.spacing(1),
		width: 200,
		textAlign: 'left'
	}
}));

export default function Home() {
	const classes = useStyles();
	const history = useHistory();
	const { isAuth } = useSelector((state) => state.auth);

	const bookData = useSelector((state) => state.app.bookData) || [];
	const dispatch = useDispatch();

	useEffect(
		() => {
			window.scrollTo(0, 0);
			axios({
				method: 'get',
				url: 'http://localhost:8000/api/getBooks'
			})
				.then((res) => dispatch(setBookData(res.data)))
				.catch((err) => console.log(err));
		},
		[ dispatch ]
	);

	const handleClick = (_id) => {
		history.push(`/chapters/${_id}`);
	};

	console.log('bookData1', bookData[0]);

	if (!isAuth) {
		alert('You must login in first');
		return <Redirect to="/signin" />;
	} else {
		return (
			<div className={classes.container}>
				<Grid className={classes.root}>
					{bookData &&
						bookData.map((item, id) => (
							<div key={id} className={classes.divContainer}>
								<AdminBookCard data={item} handleClick={handleClick} />
							</div>
						))}
				</Grid>
			</div>
		);
	}
}
