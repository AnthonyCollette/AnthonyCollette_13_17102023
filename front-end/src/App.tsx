import './assets/css/main.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import Homepage from "./pages/Homepage";
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import Error404 from './pages/Error404';

function App() {

  return (
    <div className="App">

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
    </div >
  );
}

export default App;
