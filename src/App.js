import React,{useState} from 'react';


import ImageList from './components/ImageList';
import SearchBar from './components/SearchBar';

import './App.css';

function App() {
  let [state,setState]=useState({term:'',hasMore:false,images:[]})
 const loadImages=()=>{
   
 }
  return (
    <div className="App">
      <header className="App-header">
    <SearchBar></SearchBar>
      </header>
      <ImageList></ImageList>
    </div>
    
  );
}

export default App;
