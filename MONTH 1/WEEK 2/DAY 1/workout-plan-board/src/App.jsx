import { useState } from "react";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      name: "Morning Run",
      category: "Cardio",
      duration: 30,
      completed: true,
    },
    {
      id: 2,
      name: "Push-ups",
      category: "Strength",
      duration: 15,
      completed: false,
    },
    {
      id: 3,
      name: "Evening Yoga",
      category: "Flexibility",
      duration: 20,
      completed: false,
    },
  ]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  function handleAddWorkout(event) {
    event.preventDefault();

    if (!name.trim() || !category || !duration) {
      return;
    }

    if (editingId !== null) {
      const updatedWorkouts = workouts.map((workout) => {
        if (workout.id === editingId) {
          return {
            ...workout,
            name: name,
            category: category,
            duration: duration,
          };
        }

        return workout;
      });

      setWorkouts(updatedWorkouts);
      setEditingId(null);
    } else {
      const newWorkout = {
        id: Date.now(),
        name: name,
        category: category,
        duration: duration,
        completed: false,
      };

      setWorkouts([...workouts, newWorkout]);
    }

    setName("");
    setCategory("");
    setDuration("");
  }

  function handleDeleteWorkout(workoutId) {
    const remainingWorkouts = workouts.filter(
      (workout) => workout.id !== workoutId,
    );

    setWorkouts(remainingWorkouts);
  }
  function handleToggleWorkout(workoutId) {
    const updatedWorkouts = workouts.map((workout) => {
      if (workout.id === workoutId) {
        return {
          ...workout,
          completed: !workout.completed,
        };
      }

      return workout;
    });

    setWorkouts(updatedWorkouts);
  }
  function handleEditWorkout(workout) {
    setEditingId(workout.id);
    setName(workout.name);
    setCategory(workout.category);
    setDuration(workout.duration);
  }
  const filteredWorkouts = workouts.filter((workout) => {
    if (selectedFilter === "completed") {
      return workout.completed;
    }

    if (selectedFilter === "pending") {
      return !workout.completed;
    }

    return true;
  });
  const totalCount = workouts.length;

  const completedCount = workouts.filter((workout) => workout.completed).length;

  const pendingCount = workouts.filter((workout) => !workout.completed).length;
  return (
    <main className="app">
      <header>
        <h1>Workout Plan Board</h1>
        <p>Plan your workouts and track your progress.</p>
      </header>
      <section className="workout-form-section">
        <h2>{editingId !== null ? "Edit Workout" : "Add a New Workout"}</h2>

        <form className="workout-form" onSubmit={handleAddWorkout}>
          <label>
            Workout name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Example: Squats"
            />
          </label>

          <label>
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
              <option value="Flexibility">Flexibility</option>
            </select>
          </label>

          <label>
            Duration in minutes
            <input
              type="number"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              placeholder="30"
              min="1"
            />
          </label>

          <button type="submit">
            {editingId !== null ? "Save Changes" : "Add Workout"}
          </button>
        </form>
      </section>

      <section>
        <h2>My Workouts</h2>

        <section className="workout-summary">
          <h2>Workout Summary</h2>

          <div>
            <p>Total: {totalCount}</p>
            <p>Completed: {completedCount}</p>
            <p>Pending: {pendingCount}</p>
          </div>
        </section>

        <div className="workout-filters">
          <button
            type="button"
            className={selectedFilter === "all" ? "active-filter" : ""}
            onClick={() => setSelectedFilter("all")}
          >
            All
          </button>

          <button
            type="button"
            className={selectedFilter === "pending" ? "active-filter" : ""}
            onClick={() => setSelectedFilter("pending")}
          >
            Pending
          </button>

          <button
            type="button"
            className={selectedFilter === "completed" ? "active-filter" : ""}
            onClick={() => setSelectedFilter("completed")}
          >
            Completed
          </button>
        </div>
        <div className="workout-list">
          {filteredWorkouts.length === 0 && (
            <p className="empty-message">No workouts found for this filter.</p>
          )}
          {filteredWorkouts.map((workout) => (
            <article className="workout-card" key={workout.id}>
              <h3>{workout.name}</h3>
              <p>Category: {workout.category}</p>
              <p>Duration: {workout.duration} minutes</p>

              <span>{workout.completed ? "Completed ✅" : "Pending ⏳"}</span>
              <button
                type="button"
                onClick={() => handleToggleWorkout(workout.id)}
              >
                {workout.completed ? "Mark as Pending" : "Mark as Completed"}
              </button>

              <button
                type="button"
                onClick={() => handleDeleteWorkout(workout.id)}
              >
                Delete
              </button>
              <button type="button" onClick={() => handleEditWorkout(workout)}>
                Edit
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
