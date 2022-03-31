import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/appContext/AppContext';
import { WorkoutProvider } from './context/workoutContext/WorkoutContext';
import './app.scss';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';

// Pages
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import SignUp2 from './pages/sign-up-2/SignUp2';
import Home from './pages/home/Home';
import Workouts from './pages/workouts/Workouts';
import Profile from './pages/profile/Profile';

//Components
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import BottomNav from './components/bottomNav/BottomNav';

function App() {
	const [darkMode, setDarkMode] = useState(false);

	const toggleTheme = () => {
		setDarkMode(!darkMode);
	};

	return (
		<WorkoutProvider>
			<AppProvider>
				<Router>
					<div className={`App ${darkMode ? 'dark-mode' : ''}`}>
						<Header />
						<Menu toggleTheme={toggleTheme} darkMode={darkMode} />

						<Routes>
							<Route path="/home" element={<Home />} />
							<Route path="/" element={<SignIn />} />
							<Route path="/register" element={<SignUp />} />
							<Route path="/register-2" element={<SignUp2 />} />
							<Route path="/workouts" element={<Workouts />} />
							<Route path='/profile' element={<Profile />} />
						</Routes>

						<BottomNav />
					</div>
				</Router>
				<ToastContainer autoClose={1000} />
			</AppProvider>
		</WorkoutProvider>
	);
}

export default App;
