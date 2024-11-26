import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate,} from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/DashBoard";
import UserManagement from "./components/User";
import RoleManagement from "./components/Roles";
import Permissions from "./components/Permission";
import Signup from "./components/Signup";
import Signin from "./components/Signin";

const App = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      permissions: ["Create", "Read", "Update", "Delete"],
    },
    { id: 2, name: "User", permissions: ["Read"] },
  ]);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const addUser = (user) => {
    setUsers([...users, { ...user, id: users.length + 1 }]);
  };
  const authenticateUser = ({ username, password }) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setAuthenticatedUser(user);
      return true;
    }
    return false;
  };
  const updateUser = (userId, { username, role, permissions }) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, username, role, permissions } : user
      )
    );
  };
  const updateRole = (roleId, { name, permissions }) => {
    setRoles(
      roles.map((role) =>
        role.id === roleId ? { ...role, name, permissions } : role
      )
    );
  };
  const handleSignOut = () => {
    setAuthenticatedUser(null);
  };
  return (
    <Router>
      <Navbar
        authenticatedUser={authenticatedUser}
        handleSignOut={handleSignOut}
      />
      <Routes>
        {authenticatedUser ? (
          <>
            {" "}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/users"
              element={
                <UserManagement
                  users={users}
                  authenticatedUser={authenticatedUser}
                  updateUser={updateUser}
                />
              }
            />
            <Route
              path="/roles"
              element={
                <RoleManagement
                  roles={roles}
                  authenticatedUser={authenticatedUser}
                  updateRole={updateRole}
                />
              }
            />
            <Route
              path="/permissions"
              element={
                <Permissions
                  roles={roles}
                  updateRole={updateRole}
                  authenticatedUser={authenticatedUser}
                />
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<Signup addUser={addUser} />} />
            <Route
              path="/signin"
              element={<Signin authenticateUser={authenticateUser} />}
            />
            <Route path="*" element={<Navigate to="/signin" />} />
          </>
        )}
      </Routes>{" "}
    </Router>
  );
};
export default App;
