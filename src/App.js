import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/ProductList';
import MovimientosList from './components/MovimientosList';


function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/productos" element={<Dashboard />} />
        <Route path="/movimientos" element={<MovimientosList />} />
      </Routes>
    </Router>
  );
}

export default App;
