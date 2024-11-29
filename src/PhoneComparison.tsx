import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  parsePhoneNumberFromString,
  isValidPhoneNumber,
  AsYouType,
} from "libphonenumber-js";
import "./phone-input.css";

const PhoneComparison: React.FC = () => {
  // React Phone Number Input
  const [phoneInput, setPhoneInput] = useState<string | undefined>();
  const [errorInput, setErrorInput] = useState<string | null>(null);

  const validatePhoneInput = () => {
    if (phoneInput && isValidPhoneNumber(phoneInput)) {
      setErrorInput(null);
      alert(`Numéro valide (React Phone): ${phoneInput}`);
    } else {
      setErrorInput("Numéro invalide avec React Phone Number Input.");
    }
  };

  // Libphonenumber-js
  const [phoneManual, setPhoneManual] = useState<string>("");
  const [formattedManual, setFormattedManual] = useState<string | null>(null);
  const [errorManual, setErrorManual] = useState<string | null>(null);

  const handleManualChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setPhoneManual(input);

    const formatter = new AsYouType("FR"); // Default to France
    setPhoneManual(formatter.input(input));
  };

  const validatePhoneManual = () => {
    try {
      if (isValidPhoneNumber(phoneManual, "FR")) {
        const parsedNumber = parsePhoneNumberFromString(phoneManual, "FR");
        setFormattedManual(parsedNumber?.formatInternational() || "");
        setErrorManual(null);
      } else {
        setFormattedManual(null);
        setErrorManual("Numéro invalide avec libphonenumber-js.");
      }
    } catch (err) {
      setFormattedManual(null);
      setErrorManual(`Erreur de validation: ${err}`);
    }
  };

  return (
    <div
      className="phone-comparison"
      style={{
        display: "flex",
        justifyContent: "space-around",
        gap: "50px",
        padding: "20px",
        width: "100%",
      }}
    >
      {/* React Phone Number Input */}
      <div style={{ width: "45%" }}>
        <h3>Avec React Phone Number Input</h3>
        <PhoneInput
          defaultCountry="FR"
          placeholder="Entrez votre numéro"
          value={phoneInput}
          onChange={setPhoneInput}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={validatePhoneInput}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              border: "none",
              background: "#007BFF",
              color: "#FFF",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Valider
          </button>
        </div>
        {errorInput && (
          <p style={{ color: "red", marginTop: "10px" }}>{errorInput}</p>
        )}
        {phoneInput && (
          <p style={{ color: "green", marginTop: "10px" }}>
            Numéro actuel : {phoneInput}
          </p>
        )}
      </div>

      {/* Libphonenumber-js */}
      <div style={{ width: "45%" }}>
        <h3>Avec libphonenumber-js</h3>
        <input
          type="text"
          value={phoneManual}
          onChange={handleManualChange}
          placeholder="Entrez votre numéro"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={validatePhoneManual}
            style={{
              padding: "10px 20px",
              border: "none",
              background: "#28A745",
              color: "#FFF",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Valider
          </button>
        </div>
        {errorManual && (
          <p style={{ color: "red", marginTop: "10px" }}>{errorManual}</p>
        )}
        {formattedManual && (
          <p style={{ color: "green", marginTop: "10px" }}>
            Numéro valide : {formattedManual}
          </p>
        )}
      </div>
    </div>
  );
};

export default PhoneComparison;
