import { useState } from 'react'
import './App.css'

const playlists = [
  {
    id: 1,
    title: 'Chill Vibes',
    description: 'Relaxing songs for a peaceful evening',
  },
  {
    id: 2,
    title: 'Workout Energy',
    description: 'Powerful songs to keep you moving',
  },
]
function PlaylistCard({
  playlist,
  votes,
  percentage,
  onVote,
  isWinning,
}) {    return (
<article className={isWinning ? 'playlist-card winner' : 'playlist-card'}>      <h2>{playlist.title}</h2>
      <p>{playlist.description}</p>
<p>
  Votes: {votes} ({percentage}%)
</p>
      <button onClick={() => onVote(playlist.id)}>
        Vote
      </button>
    </article>
  )
}

function App() {
  function handleVote(playlistId) {
  if (playlistId === 1) {
    setFirstVotes(firstVotes + 1)
  } else {
    setSecondVotes(secondVotes + 1)
  }
}
function resetVotes() {
  setFirstVotes(0)
  setSecondVotes(0)
}
  const [firstVotes, setFirstVotes] = useState(0)
const [secondVotes, setSecondVotes] = useState(0)
const totalVotes = firstVotes + secondVotes
const firstPercentage =
  totalVotes === 0
    ? 0
    : Math.round((firstVotes / totalVotes) * 100)

const secondPercentage =
  totalVotes === 0
    ? 0
    : Math.round((secondVotes / totalVotes) * 100)

let resultMessage = 'Voting has not started'

if (totalVotes > 0) {
  if (firstVotes > secondVotes) {
    resultMessage = 'Chill Vibes is winning!'
  } else if (secondVotes > firstVotes) {
    resultMessage = 'Workout Energy is winning!'
  } else {
    resultMessage = 'The duel is tied!'
  }
}
return (
    <main>
      <h1>Playlist Duel</h1>
      <p>Choose the playlist that deserves your vote!</p>

      <section>
    {playlists.map((playlist) => (
  <PlaylistCard
    key={playlist.id}
    playlist={playlist}
    votes={playlist.id === 1 ? firstVotes : secondVotes}
    percentage={
  playlist.id === 1
    ? firstPercentage
    : secondPercentage
}
    onVote={handleVote}
    isWinning={
  playlist.id === 1
    ? firstVotes > secondVotes
    : secondVotes > firstVotes
}
  />
)
)}
<h2>{resultMessage}</h2>
<p>Total votes: {totalVotes}</p>
{totalVotes > 0 && (
  <button onClick={resetVotes}>
    Reset Duel
  </button>
)}
      </section>
    </main>
  )
}

export default App