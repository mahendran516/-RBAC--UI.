import React, { useState } from 'react';

const RoleManagement = ({ roles, authenticatedUser, updateRole }) => {
  const [editRoleId, setEditRoleId] = useState(null);
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState([]);

  const handleEditClick = (role) => {
    setEditRoleId(role.id);
    setRoleName(role.name);
    setPermissions(role.permissions);
  };

  const handleSaveClick = () => {
    updateRole(editRoleId, { name: roleName, permissions });
    setEditRoleId(null);
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPermissions([...permissions, value]);
    } else {
      setPermissions(permissions.filter(permission => permission !== value));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Manage Roles</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-3 px-5 bg-gray-200 text-left text-sm uppercase font-semibold text-gray-700">Role Name</th>
            <th className="py-3 px-5 bg-gray-200 text-left text-sm uppercase font-semibold text-gray-700">Permissions</th>
            {authenticatedUser.role === 'admin' && (
              <th className="py-3 px-5 bg-gray-200 text-left text-sm uppercase font-semibold text-gray-700">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id} className="border-b">
              <td className="py-3 px-5">
                {editRoleId === role.id ? (
                  <input
                    type="text"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                ) : (
                  role.name
                )}
              </td>
              <td className="py-3 px-5">
                {editRoleId === role.id ? (
                  ['Create', 'Read', 'Update', 'Delete'].map(permission => (
                    <div key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        id={permission}
                        value={permission}
                        checked={permissions.includes(permission)}
                        onChange={handlePermissionChange}
                      />
                      <label htmlFor={permission} className="ml-2">{permission}</label>
                    </div>
                  ))
                ) : (
                  role.permissions.join(', ')
                )}
              </td>
              {authenticatedUser.role === 'admin' && (
                <td className="py-3 px-5">
                  {editRoleId === role.id ? (
                    <>
                      <button
                        onClick={handleSaveClick}
                        className="bg-blue-500 text-white px-2 py-1 mr-2 rounded transition duration-200 hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditRoleId(null)}
                        className="bg-gray-500 text-white px-2 py-1 rounded transition duration-200 hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(role)}
                        className="bg-blue-500 text-white px-2 py-1 mr-2 rounded transition duration-200 hover:bg-blue-600"
                      >
                        Edit
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

export default RoleManagement;
