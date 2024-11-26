import React, { useState } from 'react';

const Permissions = ({ roles, updateRole, authenticatedUser }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [permissions, setPermissions] = useState([]);

  const handleRoleChange = (e) => {
    const role = roles.find(r => r.name === e.target.value);
    setSelectedRole(role.name);
    setPermissions(role.permissions);
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPermissions([...permissions, value]);
    } else {
      setPermissions(permissions.filter(permission => permission !== value));
    }
  };

  const handleSave = () => {
    updateRole(selectedRole, permissions);
    alert('Permissions updated successfully');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Manage Permissions</h2>
      <div className="mt-4">
        <label htmlFor="roles">Select Role</label>
        <select
          id="roles"
          value={selectedRole}
          onChange={handleRoleChange}
          className="border p-2 rounded w-full mt-2"
        >
          <option value="" disabled>Select a role</option>
          {roles.map(role => (
            <option key={role.id} value={role.name}>{role.name}</option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label htmlFor="permissions">Permissions</label>
        <div className="mt-2">
          {['Create', 'Read', 'Update', 'Delete'].map(permission => (
            <div key={permission} className="flex items-center">
              <input
                type="checkbox"
                id={permission}
                value={permission}
                checked={permissions.includes(permission)}
                onChange={handlePermissionChange}
                disabled={authenticatedUser.role !== 'admin'} // Disable checkboxes for non-admin users
              />
              <label htmlFor={permission} className="ml-2">{permission}</label>
            </div>
          ))}
        </div>
      </div>
      {authenticatedUser.role === 'admin' && (
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Save
        </button>
      )}
    </div>
  );
};

export default Permissions;
