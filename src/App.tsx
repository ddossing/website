import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CommandsPage from './components/CommandsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/commands" element={<CommandsPage />} />
    </Routes>
  );
}

export default App;
