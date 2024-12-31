import { createRoot } from "react-dom/client";
import Pizza from "./Pizza";

const App = () => {
  return (
    <div>
      <h1>Pizza Explorer</h1>
      <Pizza name="Pizza Margherita" description="The classic pizza that everyone loves." />
      <Pizza name="Pizza Funghi" description="A pizza for mushroom lovers." />
      <Pizza name="Pizza Prosciutto" description="A pizza for ham lovers." />
    </div>
  )
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
