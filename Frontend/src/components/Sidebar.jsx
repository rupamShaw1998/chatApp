import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Logout from "./Logout";
import useAsync from "../hooks/useAsync";

const Sidebar = ({ setSelectedUser, onlineUsers }) => {
  const [users, setUsers] = useState([]);

  const user = useSelector(state => state.auth.user);

  const { loading, run } = useAsync();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const response = await run(() => 
          axios.get(
            `${import.meta.env.VITE_BASE_API_URL}/api/users`,
            { headers: { Authorization: `Bearer ${authToken}` }}
          )
        );
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);

  return (
    <div className="sidebar">
      <div className="user">
        <span>{user.username} </span> <Logout />
      </div>
      <h4>Chats</h4>
      <div className="users-container">
        {loading ?
          "Loading users ..."
          :
          users.map((user) => (
            <div key={user._id} onClick={() => setSelectedUser(user)}>
              {user.username}
              {onlineUsers.includes(user._id) && (
                <span className="online-dot">●</span>
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Sidebar;
