import { List } from './components/List';
import { Snowfall } from './components/Snowfall';

function App() {
  return (
    <>
      <div className="snowfall-container">
        <Snowfall />
      </div>
      <List />
    </>
  );
}

export default App;
