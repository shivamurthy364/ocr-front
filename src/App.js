import React from 'react'
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import Home from './HomePage';
import ESI from './Pages/ESI';
import Header from './components/Header';
import ToolsList from './Pages/ToolsList';
import FileUpload from './FileUpload';
import NotFound from './Pages/NotFound';
import TdsFileUpload from './TDSfileUpload';


const App = () => {
  return (
  <Router>
    <Header/>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/esi' element={<ESI/>} />
      <Route path='/toolslist' element={<ToolsList />} />
      <Route path='/fileupload' element={<FileUpload/>} />
      <Route path='/tdsfileupload' element={< TdsFileUpload/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
  </Router>
  )
}

export default App;
