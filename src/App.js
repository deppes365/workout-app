import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/appContext/AppContext';
import { WorkoutProvider } from './context/workoutContext/WorkoutContext';
import './app.scss';
import { ToastContainer, toast } from 'react-toastify';

// Pages
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import SignUp2 from './pages/sign-up-2/SignUp2';
import Home from './pages/home/Home';
import Workouts from './pages/workouts/Workouts';

//Components
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import BottomNav from './components/bottomNav/BottomNav';

function App() {
	return (
		<WorkoutProvider>
			<AppProvider>
				<Router>
					<div className="App">
						<Header />
						<Menu />
						<Routes>
							<Route path="/home" element={<Home />} />
							<Route path="/" element={<SignIn />} />
							<Route path="/register" element={<SignUp />} />
							<Route path="/register-2" element={<SignUp2 />} />
							<Route path="/workouts" element={<Workouts />} />
						</Routes>
						<BottomNav />
					</div>
				</Router>
				<ToastContainer autoClose={3000}/>
			</AppProvider>
		</WorkoutProvider>
	);
}

export default App;
