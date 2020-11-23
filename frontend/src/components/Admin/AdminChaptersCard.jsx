import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 600,
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

export default function AdminChaptersCard({ data }) {
	const classes = useStyles();

	if (data) {
		var { name, image } = data;
	}

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
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid>
							<DeleteIcon color="red" />
						</Grid>
						<Grid>
							<EditIcon color="green" />
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}
