import { useState } from 'react';
import Landing from './components/Landing/Landing';
import './styles/global.css';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const renderPage = () => {
    switch(currentPage) {
      case 'landing':
        return <Landing />;
      // Future pages will be added here
      // case 'about':
      //   return <About />;
      // case 'projects':
      //   return <Projects />;
      // case 'contact':
      //   return <Contact />;
      default:
        return <Landing />;
    }
  };

  return (
    <div className="app">
      {renderPage()}
    </div>
  );
}

export default App;
