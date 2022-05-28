import { Shuffle } from './features/shuffle/Shuffle'
import { GlobalHeader } from './GlobalHeader'
import './App.css';
import './tailwind.css';

function App() {
  return (
    <div className="App">
      <GlobalHeader />
      <div className="app-content">
        <Shuffle />
      </div>
    </div>
  );
}

export default App;
