import Sidebar from "./sidebar";

export default function PlayerLayout({ children }) {
  return (
    <div className="playerLayout">
      <div className="sideBarContainer">
        <Sidebar />
      </div>
      <div className="contentBoxContainer">
        {children}
      </div>
      <div className="bottomBarContainer">
        bottomBar
      </div>
    </div>
  );
}
