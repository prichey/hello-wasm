import React, { useState } from 'react';
import './App.css';

const Loaded = ({ wasm }) => <button onClick={wasm.greet}>Click me</button>;

const UnLoaded = ({ loading, loadWasm }) => {
  return loading ? (
    <div>Loading...</div>
  ) : (
    <button onClick={loadWasm}>Load library</button>
  );
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [wasm, setWasm] = useState(null);

  const loadWasm = async () => {
    try {
      setLoading(true);
      const wasm = await import('@prichey/hello-wasm');
      setWasm(wasm);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {wasm ? (
          <Loaded wasm={wasm} />
        ) : (
          <UnLoaded loading={loading} loadWasm={loadWasm} />
        )}
      </header>
    </div>
  );
};

export default App;
