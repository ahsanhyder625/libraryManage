import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		textAlign: 'left'
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 600,
		boxShadow: '0 10px 6px -6px #777',
		cursor: 'pointer'
	},
	image: {
		width: 150,
		height: 150
	},
	img: {
		margin: '20px',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%'
	},
	header: {
		color: 'red',
		fontSize: '24px',
		fontWeight: 600
	}
}));

export default function AdminBookCard({ data, handleClick }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { signInUserSuccess } = useSelector((state) => state.auth);
	console.log('data', data);
	if (data) {
		var { name, image, author, year, category, _id } = data;
	}

	const handleDelete = () => {
		try {
			axios.delete(`http://localhost:8000/api/book/${_id}`);
			window.location.reload(false);
			dispatch(
				signInUserSuccess({
					error: false,
					isAuth: true
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Grid container spacing={2}>
					<Grid item>
						<ButtonBase className={classes.image}>
							<img className={classes.img} alt="complex" src={image} />
						</ButtonBase>
					</Grid>
					<Grid item xs={12} sm container>
						<Grid item xs container direction="column" spacing={2}>
							<Grid item xs>
								<Typography gutterBottom variant="subtitle1" className={classes.header}>
									{name}
								</Typography>
								<Typography variant="body2" gutterBottom>
									Author: {author}
								</Typography>
								<Typography variant="body2" gutterBottom>
									Category: {category}
								</Typography>
								<Typography variant="body2" color="textSecondary">
									Year: {year}
								</Typography>
								<Button variant="contained" onClick={() => handleClick(_id)} color="primary">
									Chapters
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid>
							<DeleteIcon color="red" onClick={handleDelete} />
						</Grid>
						<Grid>
							<Link to={`/editbook/${_id}`}>
								<EditIcon />
							</Link>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}
