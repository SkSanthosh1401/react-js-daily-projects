import "./App.css";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [workshop, setWorkshop] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !workshop) {
      setError("Please complete all fields.");
      setIsSubmitted(false);
      return;
    }

    setError("");
    setIsSubmitted(true);

    setName("");
    setEmail("");
    setWorkshop("");
  }

  return (
    <main>
      <h1>Workshop RSVP</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Your name</label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError("");
            setIsSubmitted(false);
          }}
          placeholder="Enter your name"
        />

        <label htmlFor="email">Your email</label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
            setIsSubmitted(false);
          }}
          placeholder="Enter your email"
        />

        <label htmlFor="workshop">Choose a workshop</label>

        <select
          id="workshop"
          value={workshop}
          onChange={(event) => {
            setWorkshop(event.target.value);
            setError("");
            setIsSubmitted(false);
          }}
        >
          <option value="">Select a workshop</option>
          <option value="React Basics">React Basics</option>
          <option value="UI Design">UI Design</option>
          <option value="JavaScript Essentials">JavaScript Essentials</option>
        </select>

        <button type="submit">Confirm RSVP</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {isSubmitted && (
        <p className="success-message">RSVP confirmed! Your ticket is ready.</p>
      )}
      <section className="ticket-preview">
        <h2>Workshop Ticket</h2>

        <p>
          <strong>Attendee:</strong> {name || "Your name"}
        </p>

        <p>
          <strong>Email:</strong> {email || "your@email.com"}
        </p>

        <p>
          <strong>Workshop:</strong> {workshop || "Select a workshop"}
        </p>
      </section>
    </main>
  );
}

export default App;
