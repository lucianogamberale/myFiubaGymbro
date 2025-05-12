import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../views/home';
import Users from '../views/users';
import UserFood from '../views/user_food';
import UserexExercise from '../views/user_exercise';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user_food" element={<UserFood />} />
        <Route path="/user_exercise" element={<UserexExercise />} />
      </Routes>
    </Router>
  );
}

export default App;
