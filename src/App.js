import { Route,Routes } from 'react-router-dom';
import Tasks from './addingtasks';
import './App.css';
import Page from './default';
import './stylings.css'
import db from "./firebase";
import Data from './temp';
import MaterialUIPickers from './td';
import Completed from './completedtasks';
function App() {
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Page/>}></Route>
        <Route path='/Addingtasks' element={<Tasks/>}></Route>
        <Route path='/view' element={<Data/>}></Route>
        <Route path='/completedtasks' element={<Completed/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
