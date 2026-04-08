import React, { useState /*, useEffect*/ } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
// import cursorImg from './assets/img/loghi/cursor_32.png';

function App() {
  const [splashDone, setSplashDone] = useState(false);

  // useEffect(() => {
  //   document.body.style.cursor = `url(${cursorImg}) 16 16, auto`;
  //   return () => { document.body.style.cursor = 'auto'; };
  // }, []);

  return (
    <Router>
      {splashDone && <Navbar />}
      <Routes>
        <Route path="/" element={<Home onSplashDone={() => setSplashDone(true)} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;