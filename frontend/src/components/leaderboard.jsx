import { useState, useEffect } from "react"
import cityService from '../services/cities'


const Leaderboard = () => {

    const [leaderboard, setLeaderboard] = useState(null)

    useEffect(() => {
        cityService
            .getLeaderboard()
            .then(data => {
                setLeaderboard(data)
            })
    }, [])

    if (!leaderboard) {
        return null
    }

    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold text-center">Leaderboard</h1>
            </div>
            {leaderboard.map(user =>
                <div key={user.id}>{user.username} {user.highscore}</div>
            )}
        </div>
    )
}

export default Leaderboard