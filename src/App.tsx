import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Cat from './pages/CatDetails';
import { CatProvider } from './contexts/CatContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <CatProvider>
        <BrowserRouter>
          <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/cat/:id' element={<Cat />} />
          </Routes>
        </BrowserRouter>
      </CatProvider>
    </div>
  );
}

export default App;
