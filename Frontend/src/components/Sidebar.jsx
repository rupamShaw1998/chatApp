const users = ["rupam", "maria", "shaw"];

const Sidebar = () => {
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
