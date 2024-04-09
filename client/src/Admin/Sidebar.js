import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'


function Sidebar() {
    
    return (
      <div className='d-flex flex-column justify-content-space-between bg-dark text-white p-4 vh-100'>
        <Link to="/admin" className="d-flex align-items-center text-white text-decoration-none mb-4" >
          <i className='bi bi-bootstrap fs-5 me-2'></i>
          <span className='fs-4'>Admin</span>
        </Link>
        <hr className='text-secondary mb-4'/>
        <ul className='nav flex-column p-0 m-0'>
          <li className='nav-item'>
            <Link to="/admin" className='nav-link text-white' >
              <i className='bi bi-speedometer me-2 fs-5'></i>
              <span className='fs-5'>Dashboard</span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to="/admin/users" className='nav-link text-white'>
              <i className='bi bi-person-fill'></i>
              <span className='fs-5'> Users</span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to="/admin/events" className='nav-link text-white' >
              <i className='bi bi-calendar2'></i>
              <span className='fs-5'> Events</span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to="/admin/attendees" className='nav-link text-white'>
              <i className='bi bi-people-fill'></i>
              <span className='fs-5'> Attendees</span>
            </Link>
          </li>
        </ul>
        <div></div>
      </div>
    );
  }
  
  export default Sidebar;
  
