import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../views/home';
import Register from '../views/register';
import ChargeUserInfo from '../views/charge_user_info';
import Users from '../views/users';
import UserFood from '../views/post_user_food';
import MyUserFood from '../views/get_user_food';
import UserExersiceFetcher from '../views/get_user_exercise';
import UserExercise from '../views/post_user_exercise';
import UserObjectives from '../views/post_user_objectives';
import WatchUserObjectives from '../views/get_user_objectives';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user_food" element={<UserFood />} />
        <Route path="/My_user_food" element={<MyUserFood />} />
        <Route path="/objectives" element={<WatchUserObjectives />} />
        <Route path="/user_objectives" element={<UserObjectives />} />
        <Route path="/user_exercise" element={<UserExercise />} />
        <Route path="/My_user_exersice" element={<UserExersiceFetcher />} />
        <Route path="/charge_user_info" element={<ChargeUserInfo />} />
      </Routes>
    </Router>
  );
}

export default App;