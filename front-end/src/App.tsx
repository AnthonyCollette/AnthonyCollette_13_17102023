import './assets/css/main.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store/store';
import Homepage from "./pages/Homepage";
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div >
  );
}

export default App;
