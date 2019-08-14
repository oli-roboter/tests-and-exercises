import React from "react";
import "./App.css";
import TableMain from "./features/tables/TableMain";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <main>
        <TableMain />
      </main>
    </div>
  );
}

export default App;
