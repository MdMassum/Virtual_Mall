import './App.css';
import Header from './components/layout/Header/Header';
import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import Home from './components/layout/Home/Home';

function App() {
  return (
    <>
    
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/home" element={<Home/>}></Route>
            {/* <Route path="/products" element={}></Route>
            <Route path="/" element={}></Route> */}
        </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
