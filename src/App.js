import './App.css';
import React from "react";
import Main from "./Main";
import {AuthProvider} from "./AuthProvider";

function App() {
  return (
      <AuthProvider>
          <Main />
      </AuthProvider>
  );
}

export default App;
