import { useEffect, useState } from "react";
import axios from "axios";

const users = ["rupam", "maria", "shaw"];

const Sidebar = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        // const response = await axios.get()
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <div className="sidebar">
      {users.map((user) => (
        <div onClick={() => {}}>
          {user}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
