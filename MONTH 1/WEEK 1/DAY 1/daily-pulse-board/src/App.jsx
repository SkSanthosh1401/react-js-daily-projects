import { useState } from "react";
import "./App.css";

function MoodButton({ emoji, label, onMoodSelect, isSelected }) {
  return (
    <button
      className={`mood-button ${isSelected ? "selected" : ""}`}
      onClick={() => onMoodSelect(label)}
    >
      {emoji} {label}
    </button>
  );
}
function App() {
  const [selectedMood, setSelectedMood] = useState("");
  const [energyLevel, setEnergyLevel] = useState("");
  return (
    <main className="pulse-board">
      <h1>Daily Pulse Board</h1>
      <p>How are you feeling today?</p>

      <section className="mood-options">
        {" "}
        <MoodButton
          emoji="😊"
          label="Great"
          onMoodSelect={setSelectedMood}
          isSelected={selectedMood === "Great"}
        />
        <MoodButton
          emoji="🙂"
          label="Good"
          onMoodSelect={setSelectedMood}
          isSelected={selectedMood === "Good"}
        />
        <MoodButton
          emoji="😐"
          label="Okay"
          onMoodSelect={setSelectedMood}
          isSelected={selectedMood === "Okay"}
        />
        <MoodButton
          emoji="😴"
          label="Tired"
          onMoodSelect={setSelectedMood}
          isSelected={selectedMood === "Tired"}
        />
      </section>
      <h2>What is your energy level?</h2>

      <section className="mood-options">
        <MoodButton
          emoji="⚡"
          label="High"
          onMoodSelect={setEnergyLevel}
          isSelected={energyLevel === "High"}
        />

        <MoodButton
          emoji="🔋"
          label="Medium"
          onMoodSelect={setEnergyLevel}
          isSelected={energyLevel === "Medium"}
        />

        <MoodButton
          emoji="🪫"
          label="Low"
          onMoodSelect={setEnergyLevel}
          isSelected={energyLevel === "Low"}
        />
      </section>

      {selectedMood ? (
        <div>
          {energyLevel ? (
            <p>
              Today you feel {selectedMood} with {energyLevel} energy.
            </p>
          ) : (
            <p>
              Your current mood is {selectedMood}. Now select your energy level.
            </p>
          )}

          <button
            className="reset-button"
            onClick={() => {
              setSelectedMood("");
              setEnergyLevel("");
            }}
          >
            Reset Mood
          </button>
        </div>
      ) : (
        <p>Please select a mood.</p>
      )}
    </main>
  );
}

export default App;
