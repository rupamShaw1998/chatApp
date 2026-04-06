import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/api/users`,
          { headers: { Authorization: `Bearer ${authToken}` }}
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
      {users.map((user, _id) => (
        <div key={_id} onClick={() => {}}>
          {user.username}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
