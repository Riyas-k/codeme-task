
import './App.css'
import { Route,Routes } from 'react-router-dom';
import AdminLogin from './admin/pages/Login';
import Login from './user/pages/Login';
import Signup from './user/pages/Signup';
import AdminDashboard from './admin/pages/Dashboard';
import UserHome from './user/pages/Home';
import AddEditQuestion from './admin/pages/AddEditQuestion';

function App() {


  return (
    <>
      <Routes>
      <Route  path='/admin/login' element={ <AdminLogin />}/>
      <Route  path='/login' element={ <Login />}/>
      <Route  path='/signup' element={ <Signup />}/>
      <Route  path='/admin/dashboard' element={ <AdminDashboard />}/>
      <Route  path='/admin/add-question' element={ <AddEditQuestion />}/>
      <Route path='/' element={<UserHome />}/>
      </Routes>
    </>
  )
}

export default App
