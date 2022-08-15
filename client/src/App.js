import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Component } from "react";
import AlertTest from "./sweet_alerts/alertTest";

function App() {
  return (
    <Router>
      <AlertTest />
    </Router>
  );
}

export default App;
