import './App.css';
import Navbar from './components/Navbar/Navbar';
import PublicRoutes from './components/Routes/PublicRoutes';

function App() {
	return (
		<div>
			<div className="App-navbar">
				<Navbar />
			</div>
			<div>
				<PublicRoutes />
			</div>
		</div>
	);
}

export default App;
