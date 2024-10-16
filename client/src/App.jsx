import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="card">
        <Button
          variant="destructive"
          onClick={() => setCount((count) => count + 1)}
        >
          Don&apos;t Click {count}
        </Button>
      </div>
    </>
  );
}

export default App;
