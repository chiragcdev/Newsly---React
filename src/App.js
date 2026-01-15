import React, { useState } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import LoadingBar from "react-top-loading-bar";
import {BrowserRouter as Router, Routes, Route,} from "react-router-dom";

const App = () => {
  const pageSize = 9;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const [progress, setProgress] = useState(0);
  
    return (
      <div>
        <Router>
          
          <LoadingBar
            color="#ff0000"
            height={4}
            progress={progress}
          />
          <NavBar />
          <Routes>
            <Route path="/" element={<News setProgress={setProgress} apikey={apiKey} key="home" pageSize={pageSize} country="us" category='General' />} />
            <Route exact path="/general" element={<News setProgress={setProgress} apikey={apiKey} key="general" pageSize={pageSize} country="us" category='General' />} />
            <Route exact path="/business" element={<News setProgress={setProgress} apikey={apiKey} key="business" pageSize={pageSize} country="us" category='Business' />} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={apiKey} key="entertainment" pageSize={pageSize} country="us" category='Entertainment' />} />
            <Route exact path="/health" element={<News setProgress={setProgress} apikey={apiKey} key="health" pageSize={pageSize} country="us" category='Health' />} />
            <Route exact path="/science" element={<News setProgress={setProgress} apikey={apiKey} key="science" pageSize={pageSize} country="us" category='Science' />} />
            <Route exact path="/sports" element={<News setProgress={setProgress} apikey={apiKey} key="sports" pageSize={pageSize} country="us" category='Sports' />} />
            <Route exact path="/technology" element={<News setProgress={setProgress} apikey={apiKey} key="technology" pageSize={pageSize} country="us" category='Technology' />} />
          </Routes>
        </Router>        
      </div>
    )
}

export default App;
