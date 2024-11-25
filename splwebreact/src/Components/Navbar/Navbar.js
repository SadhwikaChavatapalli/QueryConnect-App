import { Link, Navigate } from 'react-router-dom';

const NavbarComponent = ({isAuthenticated}) => {

  const userID = localStorage.getItem("user");
  const userName = localStorage.getItem("userName");
  const userRoleClass = localStorage.getItem("userRoleClass");

  const gotoProfile = () => {
    Navigate(`/signup/${userID}`);
  }
    
    return (
    <div className="navbar bg-base-100">
        {isAuthenticated && <div className="dropdown">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16">
                </path>
            </svg>
          </button>
        
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <Link to="/add-question" className="btn btn-ghost text-xl">Add post</Link>
        </ul>
      </div>}
                  
      
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">QueryConnect!</Link>
      </div>

      <div className="flex flex-1 justify-self-start">
        
      </div>

      <div className='flex justify-end'>
      {isAuthenticated && <div className="font-bold">Hi, {userName} </div>}
      {isAuthenticated && userRoleClass == 0 && <div className="italic p-2">(Admin)</div>}
      {isAuthenticated && userRoleClass == 2 && <div className="italic p-2">(Contributor)</div>}
        <div className="dropdown">
          <button className="btn btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                {/* <li onClick={handleClick}><Link to='/Login'>Sign-in</Link></li> 
                <li onClick={handleClick}><Link to='/Register'>Register</Link></li> */}
                {
                  !isAuthenticated &&<li><Link to='/Login'>Login</Link></li>
                }
                {
                  isAuthenticated && <li><Link to={`/signup/${userID}`}>View Profile</Link></li>
                }
                {
                  isAuthenticated && <li><Link to='/logout'>Logout</Link></li>
                }
            </ul>
          </button>
        </div>
      </div>
  
</div>
  );
}

export default NavbarComponent;