import React from "react";
import logo from "./logo.svg";
import { Suspense } from "react";
import LoadingScreen from "./components/loadingscreen";
// import Pokedex from "./components/pokedex";
const Pokedex = React.lazy(() => import('./components/pokedex'));

function App() {

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Pokedex></Pokedex>
    </Suspense>
  )
}

export default App;
