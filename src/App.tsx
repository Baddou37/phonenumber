import React from "react";
import PhoneComparison from "./PhoneComparison";

const App: React.FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
    <h1 style={{ textAlign: "center" }}>
      Comparaison des solutions de validation
    </h1>
    <PhoneComparison />
  </div>
);

export default App;
