import {  Route , Routes} from 'react-router-dom';
import Navbar from '../navbar.js';
import Sidebar from './Sidebar.js';
import Users from '../Users/Users.js';
import UserEdit from '../Users/userEdit.js'
import Events from './Events.js';
import Attendees from './Attendees.js';

const Admin = () => {
    return (
        <div>
          <Navbar />
          <div className="d-flex">
            <div className="col-auto">
              <Sidebar />
            </div>
            <div className='flex-grow-1 d-flex justify-content-center align-items-center '>
                
              <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/events" element={<Events />} />
                <Route path="/attendees" element={<Attendees />} />
                <Route path="/users/userEdit/:userId" element={<UserEdit />} />
              </Routes>
              
            </div>
          </div>
        </div>
      );
  }
  
  export default Admin;