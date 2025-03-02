import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [income, setIncome] = useState("");
  const [tax, setTax] = useState(null);
  const [error, setError] = useState("");
  const [showBreakdown, setShowBreakdown] = useState(false);

  const calculateTax = (income) => {
    let tax = 0;
    
    if (income <= 50000) {
        tax = 0;
    } else if (income <= 100000) {
        tax = (income - 50000) * 0.05;
    } else if (income <= 150000) {
        tax = 2500 + (income - 100000) * 0.10;
    } else if (income <= 200000) {
        tax = 7500 + (income - 150000) * 0.15;
    } else if (income <= 250000) {
        tax = 15000 + (income - 200000) * 0.175;
    } else if (income <= 300000) {
        tax = 23750 + (income - 250000) * 0.20;
    } else if (income <= 400000) {
        tax = 33750 + (income - 300000) * 0.225;
    } else if (income <= 500000) {
        tax = 56250 + (income - 400000) * 0.25;
    } else if (income <= 600000) {
        tax = 81250 + (income - 500000) * 0.275;
    } else if (income <= 1200000) {
        tax = 108750 + (income - 600000) * 0.30;
    } else if (income <= 2400000) {
        tax = 288750 + (income - 1200000) * 0.325;
    } else {
        tax = 708750 + (income - 2400000) * 0.35;
    }

    return tax;
};

  const handleIncomeChange = (e) => {
    const incomeValue = e.target.value;
    setIncome(incomeValue);

    if (incomeValue === "" || incomeValue < 0) {
      setError("");
      setTax(null);
      setShowBreakdown(false);
    } else {
      setError("");
      const yearlyTax = calculateTax(parseFloat(incomeValue));
      setTax(yearlyTax);
      setShowBreakdown(true);
    }
  };

  const yearlyIncome = parseFloat(income) * 12;
  const yearlyTax = tax * 12;
  const yearlyIncomeAfterTax = yearlyIncome - yearlyTax * 12;
  const monthlyIncome = parseFloat(income);
  const monthlyTax = tax;
  const monthlyIncomeAfterTax = monthlyIncome - monthlyTax;

  return (
    <div className="App">
      <div className="content-container">
        <h1>Income Tax Calculator Pakistan 2024-25</h1>
        <h5>Calculate income tax on salary using the following calculator as per the 2024-2025 federal budget.</h5>
        
        <div className="input-container">
          <input
            type="number"
            id="income"
            value={income}
            onChange={handleIncomeChange}
            required
            className="input-field"
            placeholder=" "
          />
          <label htmlFor="income" className="floating-label">Enter Monthly Income</label>
        </div>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <div className={`breakdown-container ${showBreakdown ? "show" : ""}`}>
          {tax !== null && (
            <div>
              <h3 style={{color: "#888"}}>Monthly Breakdown</h3>
              <p className="left-align">Monthly Tax</p>
              <p className="right-align">PKR {Math.round(tax)}</p>
              <p className="left-align">Monthly Income</p>
              <p className="right-align">PKR {Math.round(monthlyIncome)}</p>
            
              <p className="left-align">Monthly Income After Tax</p>
              <p className="right-align">PKR {Math.round(monthlyIncomeAfterTax)}</p>

              <h3 style={{color: "#888"}}>Yearly Breakdown</h3>
              <p className="left-align">Yearly Tax</p>
              <p className="right-align">PKR {Math.round(yearlyTax)}</p>
              <p className="left-align">Yearly Income</p>
              <p className="right-align">PKR {Math.round(yearlyIncome)}</p>
              
              <p className="left-align">Yearly Income After Tax</p>
              <p className="right-align">PKR {Math.round(yearlyIncomeAfterTax)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
