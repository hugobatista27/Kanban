import Header from './components/header/header.jsx';
import SideBar from './components/sideBar/sideBar.jsx';
import TaskArea from './components/taskArea/taskArea.jsx'
import './App.css'

function App() {
  return (
    <div className="index">
      <SideBar></SideBar>
      <div>
        <Header></Header>
        <TaskArea></TaskArea>
      </div>
    </div>
  );
}

export default App;
