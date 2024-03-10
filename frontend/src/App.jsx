import { useEffect, useState } from 'react'
import Game from './components/game'
import Leaderboard from './components/leaderboard'

function App() {


  // Main Menu, Game, Leaderboard, Lost
  const [pageState, setPageState] = useState('Main Menu')

  const [isPlayingGame, setIsPlayingGame] = useState(false)
  const [buttonText, setButtonText] = useState('Play')


  const TogglePlayingGame = () => {
    setButtonText(!isPlayingGame ? 'Main Menu' : 'Play');
    setIsPlayingGame(!isPlayingGame)
  }

  const ToggleLeaderboard = () => {
    setPageState('Leaderboard')
  }


  return (
    <div>

      
      <h1 className="text-3xl font-bold text-center">Higher Lower for Weather Around the World</h1>
      {isPlayingGame ? <Game /> : null}
      <button onClick={TogglePlayingGame} className="mx-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{buttonText}</button>
      {pageState !== 'Leaderboard' ? <button onClick={ToggleLeaderboard} className="mx-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Leaderboard</button> : null}
      {pageState === 'Leaderboard' ? <Leaderboard /> : null}
  
    </div>
  )
}

export default App
