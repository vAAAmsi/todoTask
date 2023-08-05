import { Route,Routes } from 'react-router-dom';
import Tasks from './components/Adding/addingtasks.js';
import Page from './components/Dashboard/dashboard.js';
import Data from './components/viewcomponent/view.js';
import Completed from './components/completedtasks/completedtasks.js';
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
