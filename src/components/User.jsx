import React, { useState } from 'react';

const UserManagement = ({ users, authenticatedUser, updateUser }) => {
  const [editUserId, setEditUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userPermissions, setUserPermissions] = useState([]);

  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setUserName(user.username);
    setUserRole(user.role);
    setUserPermissions(user.permissions || []);
  };

  const handleSaveClick = () => {
    updateUser(editUserId, { username: userName, role: userRole, permissions: userPermissions });
    setEditUserId(null);
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setUserPermissions([...userPermissions, value]);
    } else {
      setUserPermissions(userPermissions.filter(permission => permission !== value));
    }
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    alert(`User with id ${id} deleted`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Manage Users</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-3 px-5 bg-gray-200 text-left text-sm uppercase font-semibold text-gray-700">Name</th>
            <th className="py-3 px-5 bg-gray-200 text-left text-sm uppercase font-semibold text-gray-700">Role</th>
            <th className="py-3 px-5 bg-gray-200 text-left text-sm uppercase font-semibold text-gray-700">Permissions</th>
            {authenticatedUser.role === 'admin' && (
              <th className="py-3 px-5 bg-gray-200 text-left text-sm uppercase font-semibold text-gray-700">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b">
              <td className="py-3 px-5">
                {editUserId === user.id ? (
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                ) : (
                  user.username
                )}
              </td>
              <td className="py-3 px-5">
                {editUserId === user.id ? (
                  <select
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    className="border p-2 rounded w-full"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td className="py-3 px-5">
                {editUserId === user.id ? (
                  ['Create', 'Read', 'Update', 'Delete'].map(permission => (
                    <div key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        id={permission}
                        value={permission}
                        checked={userPermissions.includes(permission)}
                        onChange={handlePermissionChange}
                      />
                      <label htmlFor={permission} className="ml-2">{permission}</label>
                    </div>
                  ))
                ) : (
                  (user.permissions || []).join(', ')
                )}
              </td>
              {authenticatedUser.role === 'admin' && (
                <td className="py-3 px-5">
                  {editUserId === user.id ? (
                    <>
                      <button
                        onClick={handleSaveClick}
                        className="bg-blue-500 text-white px-2 py-1 mr-2 rounded transition duration-200 hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditUserId(null)}
                        className="bg-gray-500 text-white px-2 py-1 rounded transition duration-200 hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(user)}
                        className="bg-blue-500 text-white px-2 py-1 mr-2 rounded transition duration-200 hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded transition duration-200 hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
