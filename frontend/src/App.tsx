import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../views/home';
import Users from '../views/users';
import UserFood from '../views/post_user_food';
import MyUserFood from '../views/get_user_food';
import UserExcersiceFetcher from '../views/get_user_exercise';
import UserexExercise from '../views/post_user_exercise';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user_food" element={<UserFood />} />
        <Route path="/My_user_food" element={<MyUserFood />} />
        <Route path="/user_exercise" element={<UserexExercise />} />
        <Route path="/My_user_exersice" element={<UserExcersiceFetcher />} />
      </Routes>
    </Router>
  );
}

export default App;