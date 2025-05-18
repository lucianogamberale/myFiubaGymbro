import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../views/home';
import Register from '../views/register';
import ChargeUserInfo from '../views/charge_user_info';
import Users from '../views/users';
import UserFood from '../views/post_user_food';
import MyUserFood from '../views/get_user_food';
import UserExcersiceFetcher from '../views/get_user_exercise';
import UserExercise from '../views/post_user_exercise';
import CreateDiet from '../views/create_diet';
import MyDiets from '../views/my_diets';
import EditDiet from '../views/edit_diet';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user_food" element={<UserFood />} />
        <Route path="/My_user_food" element={<MyUserFood />} />
        <Route path="/user_exercise" element={<UserExercise />} />
        <Route path="/My_user_exersice" element={<UserExcersiceFetcher />} />
        <Route path="/charge_user_info" element={<ChargeUserInfo />} />
        <Route path="/create_diet" element={<CreateDiet />} />
        <Route path="/my_diets" element={<MyDiets />} />
        <Route path="/edit_diet/:dietId" element={<EditDiet />} /> {}
      </Routes>
    </Router>
  );
}

export default App;
