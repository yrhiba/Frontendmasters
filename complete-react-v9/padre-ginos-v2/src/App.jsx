import { createRoot } from "react-dom/client";
import Order from "./Order";

const App = () => {
  return (
    <div className="container">
      <h1>Pizza Explorer</h1>
      <Order />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
