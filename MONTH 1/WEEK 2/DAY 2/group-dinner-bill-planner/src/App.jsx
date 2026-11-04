import { useState } from "react";
import "./App.css";

function calculatePercentage(amount, percentage) {
  return amount * (percentage / 100);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

function App() {
  const [bill, setBill] = useState("");
  const [tax, setTax] = useState("");
  const [tip, setTip] = useState("");
  const [people, setPeople] = useState("");

  const billNumber = Number(bill);
  const taxNumber = Number(tax);
  const tipNumber = Number(tip);
  const peopleNumber = Number(people);

  let errorMessage = "";

  if (bill === "" || tax === "" || tip === "" || people === "") {
    errorMessage = "Please complete all fields.";
  } else if (billNumber <= 0) {
    errorMessage = "The food bill must be greater than zero.";
  } else if (taxNumber < 0 || tipNumber < 0) {
    errorMessage = "Tax and tip cannot be negative.";
  } else if (peopleNumber < 1 || !Number.isInteger(peopleNumber)) {
    errorMessage = "Enter at least one whole person.";
  }

  const taxAmount = calculatePercentage(billNumber, taxNumber);
  const tipAmount = calculatePercentage(billNumber, tipNumber);
  const finalTotal = billNumber + taxAmount + tipAmount;

  const amountPerPerson = errorMessage ? 0 : finalTotal / peopleNumber;

  function handleReset() {
    setBill("");
    setTax("");
    setTip("");
    setPeople("");
  }

  return (
    <main className="planner-card">
      <header className="planner-header">
        <div className="brand-row">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">TS</span>
            <span>TableShare</span>
          </div>
          <span className="brand-label">Smart bill splitter</span>
        </div>

        <p className="eyebrow">Dinner made simple</p>
        <h1>Split the bill, not the mood.</h1>
        <p className="intro">
          Add the dinner details and get a fair per-person split instantly.
        </p>

        <div className="feature-strip" aria-label="Planner features">
          <span>Instant totals</span>
          <span>Fair splitting</span>
          <span>INR ready</span>
        </div>
      </header>

      <section className="input-panel" aria-label="Dinner bill details">
        <div className="field bill-field">
          <label htmlFor="bill">Food bill</label>
          <div className="input-wrap">
            <span aria-hidden="true">₹</span>
            <input
              id="bill"
              type="number"
              min="0"
              value={bill}
              onChange={(event) => setBill(event.target.value)}
              placeholder="2,000"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="tax">Tax</label>
          <div className="input-wrap suffix">
            <input
              id="tax"
              type="number"
              min="0"
              value={tax}
              onChange={(event) => setTax(event.target.value)}
              placeholder="5"
            />
            <span aria-hidden="true">%</span>
          </div>
        </div>

        <div className="field">
          <label htmlFor="tip">Tip</label>
          <div className="input-wrap suffix">
            <input
              id="tip"
              type="number"
              min="0"
              value={tip}
              onChange={(event) => setTip(event.target.value)}
              placeholder="10"
            />
            <span aria-hidden="true">%</span>
          </div>
        </div>

        <div className="field">
          <label htmlFor="people">People</label>
          <div className="input-wrap suffix">
            <input
              id="people"
              type="number"
              min="1"
              value={people}
              onChange={(event) => setPeople(event.target.value)}
              placeholder="4"
            />
            <span aria-hidden="true">guests</span>
          </div>
        </div>
      </section>

      <div className="status-area" aria-live="polite">
        {errorMessage ? (
          <p className="error">{errorMessage}</p>
        ) : (
          <p className="success">Everything looks good. Here is your split.</p>
        )}
      </div>

      {!errorMessage && (
        <section className="summary-card" aria-label="Bill summary">
          <div className="summary-title">
            <div>
              <p className="eyebrow">Bill summary</p>
              <h2>Your dinner split</h2>
            </div>
            <span className="status-badge">Ready</span>
          </div>

          <div className="summary-row">
            <span>Tax amount</span>
            <strong>{formatCurrency(taxAmount)}</strong>
          </div>
          <div className="summary-row">
            <span>Tip amount</span>
            <strong>{formatCurrency(tipAmount)}</strong>
          </div>
          <div className="summary-row total-row">
            <span>Final total</span>
            <strong>{formatCurrency(finalTotal)}</strong>
          </div>
          <div className="per-person">
            <span>Each person pays</span>
            <strong>{formatCurrency(amountPerPerson)}</strong>
          </div>
        </section>
      )}

      <button className="reset-button" type="button" onClick={handleReset}>
        Reset calculator
      </button>

      <p className="footer-note">Fair shares. Clear totals. Better dinners.</p>
    </main>
  );
}

export default App;
