import Header from './components/Header' ;
import './App.css';
import HomeTable from './components/HomeTable' ;
import {Routes, Route} from 'react-router-dom' ;

import Error from './components/Error' ;
function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' exact element={<HomeTable/>} />
       
      <Route  element={<Error/>} />
       
    </Routes>
   
    </>
    
  );
}

export default App;
