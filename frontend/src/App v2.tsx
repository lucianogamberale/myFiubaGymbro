import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../views/home';
import Users from '../views/users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
