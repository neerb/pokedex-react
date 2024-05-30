import React, { useState } from "react";
import logo from "./logo.svg";
import { Suspense } from "react";
import LoadingScreen from "./components/loadingscreen";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PokemonInformation from "./components/pokemoninformation";
// import Pokedex from "./components/pokedex";
const Pokedex = React.lazy(() => import('./components/pokedex'));

function App() {
  const [passBackPokename, setPassBackPokename] = useState(null);

  const passBack = (name) => {
    setPassBackPokename(name);
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Router basename="/pokedex-react">
        <Routes>
          <Route exact path={"/:name"} element={
            <div>
              <Pokedex />
              <PokemonInformation />
              {/* <PokemonInformation /> */}
            </div>}
          />

          {/* <Route path={"/:name"} element={<PokemonInformation />} key={":name"} /> */}
          {/* <Route exact path="*" element={<Pokedex />} /> */}
        </Routes>
      </Router>
    </Suspense>
  )
}

export default App;
