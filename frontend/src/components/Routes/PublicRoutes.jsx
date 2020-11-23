import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../Home/Home';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import AdminBookPage from '../Admin/AdminBookPage';
import Chapters from '../Chapters/Chapters';
import EditBook from '../Admin/EditBook';

function PublicRoutes() {
	return (
		<div>
			<Route path="/signup" component={SignUp} />
			<Route path="/signin" component={SignIn} />
			<Route path="/" exact render={(props) => <Home {...props} />} />
			<Route path="/chapters/:id" exact render={(props) => <Chapters {...props} />} />
			<Route path="/admin" exact render={(props) => <AdminBookPage {...props} />} />
			<Route path="/editbook/:id" exact render={(props) => <EditBook {...props} />} />
		</div>
	);
}
export default PublicRoutes;
