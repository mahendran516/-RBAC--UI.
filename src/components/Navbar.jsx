import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ authenticatedUser, handleSignOut }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    handleSignOut();
    navigate('/signup');
  };

  return (
    <nav className="bg-purple-500 p-4 text-white flex justify-between items-center">
        <Link to="/dashboard" className="hover:text-gray-400 text-3xl font-medium">Dashboard</Link>
      <div className="flex space-x-4">
        
        {authenticatedUser && (
          <>
            {authenticatedUser.role === 'admin' && (
              <>
                <Link to="/users" className="hover:text-gray-400 font-medium bg-blue-500 text-white px-4 py-2 rounded-md">Users</Link>
                <Link to="/roles" className="hover:text-gray-400 font-medium bg-blue-500 text-white px-4 py-2 rounded-md">Roles</Link>
                <Link to="/permissions" className="hover:text-gray-400 font-medium bg-blue-500 text-white px-4 py-2 rounded-md">Permissions</Link>
              </>
            )}
            <button onClick={handleLogout} className="hover:text-gray-400 font-medium bg-blue-500 text-white px-4 py-2 rounded-md">Sign Out</button>
          </>
        )}
        {!authenticatedUser && (
          <>
            <Link to="/signup" className="hover:text-gray-400 font-medium bg-blue-500 text-white px-4 py-2 rounded-md">Signup</Link>
            <Link to="/signin" className="hover:text-gray-400 font-medium bg-blue-500 text-white px-4 py-2 rounded-md">Signin</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
