import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Create from './Event/Create';
import Read from './Event/Read';
import Edit from './Event/Edit';
import Attendee from './Event/Attendee';
import Users from './Users/Users';
import UserEdit from './Users/userEdit'
import Events from './Admin/Events';
import Attendees from './Admin/Attendees';
import Admin from './Admin/Admin' 
import 'bootstrap/dist/css/bootstrap.min.css'


// Function to check if user is logged in and isAdmin
const checkUserStatus = () => {

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); 

  return { isLoggedIn: !!token, isAdmin: role === 'admin', role };
};

// Protected Route component
export const ProtectedRoute = ({ element, admin, ...rest }) => {
  const { isLoggedIn, isAdmin } = checkUserStatus();

  return isLoggedIn ? (
    admin && !isAdmin ? <Navigate to="/home" /> : element
  ) : (
    <Navigate to="/login" />
  );
};



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/admin/*" element={<ProtectedRoute element={<Admin />} admin />} />
        <Route path="/create" element={<ProtectedRoute element={<Create />} />} />
        <Route path="/read/:_id" element={<ProtectedRoute element={<Read />} />} />
        <Route path="/edit/:_id" element={<ProtectedRoute element={<Edit />} />} />
        <Route path="/attendee" element={<ProtectedRoute element={<Attendee />} />} />
        <Route path="/users" element={<ProtectedRoute element={<Users />} admin />} />
        <Route path="/events" element={<ProtectedRoute element={<Events />} admin />} />
        <Route path="/attendees" element={<ProtectedRoute element={<Attendees />} admin />} />
        <Route path="/userEdit/:_id" element={<ProtectedRoute element={<UserEdit />} admin />} />
      </Routes>
    </Router>
  );
}

export default App;


