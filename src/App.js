
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import { AppProvider } from "./context/AppContext";
import "./app.scss"


// Pages
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import SignUp2 from './pages/sign-up-2/SignUp2';
import Home from "./pages/home/Home";
import Workouts from './pages/workouts/Workouts';

//Components
import Header from "./components/header/Header";
import Menu from "./components/menu/Menu";
import BottomNav from './components/bottomNav/BottomNav';


function App() {

  return (
    <AppProvider>
    <Router>
      <div className="App">
        <Header  />
        <Menu />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/sign-in" element={<SignIn/>}/>
            <Route path='/register' element={<SignUp/>}/>
            <Route path='/register-2' element={<SignUp2/>}/>
            <Route path='/workouts' element={<Workouts/>}/>
          </Routes>
          <BottomNav/>
        </div>
    </Router>
    </AppProvider>
  );
}

export default App;
