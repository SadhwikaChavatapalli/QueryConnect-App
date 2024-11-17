import { Link } from 'react-router-dom';

function NavbarComponent() {
    const { isAuthenticated } = true;
    return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
  <Link to="/" className="btn btn-ghost text-xl">QueryConnect!</Link>
  </div>
  <div className='flex justify-end'>
    <div className="dropdown dropdown-end">
      <button className="btn btn-square">
        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg> */}
        <span class="icon-[mdi--user]"></span>
        <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-24">
            {/* <li onClick={handleClick}><Link to='/Login'>Sign-in</Link></li> 
            <li onClick={handleClick}><Link to='/Register'>Register</Link></li> */}
            {
              !isAuthenticated &&<li>Login</li>
            }
            {
              isAuthenticated && <li><Link to='/Profile'>Ask Question</Link></li>
            }
            {
              isAuthenticated && <li >Other sample</li>
            }
        </ul>
      </button>
    </div>
  </div>
  
</div>
  );
}

export default NavbarComponent;