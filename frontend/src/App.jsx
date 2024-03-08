import { useEffect, useState } from 'react'
import Game from './components/game'
import Leaderboard from './components/leaderboard'

function App() {

  const [isPlayingGame, setIsPlayingGame] = useState(false)


  const testing = () => {
    setIsPlayingGame(!isPlayingGame)
  }


  return (
    <div>

      
      <h1 className="text-3xl font-bold text-center">Higher Lower for Weather Around the World</h1>
      {isPlayingGame ? <Game /> : null}
      <button onClick={testing} className="mx-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Play</button>
      <Leaderboard />
  
    </div>
  )
}

export default App
