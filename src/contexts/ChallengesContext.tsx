import { createContext, ReactNode, useState } from 'react'

import challenges from '../../challenges.json'

interface ChallengesProviderProps {
  children: ReactNode
}

interface ChallengesContextData {
  level: number
  currentExperience: number
  experienceToNextLevel: number
  challengeCompleted: number
  activeChallenge: Challenge | null
  levelUp: () => void
  startNewChallenge: () => void
  resetChallenge: () => void
}

interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}

const ChallengesContext = createContext({} as ChallengesContextData)

const ChallengesProvider = ({ children }: ChallengesProviderProps) => {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentexperience] = useState(0)
  const [challengeCompleted, setChallengeComplechallengeCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  const levelUp = () => setLevel(level + 1)

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex] as Challenge

    setActiveChallenge(challenge)
  }

  const resetChallenge = () => setActiveChallenge(null)

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengeCompleted,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}

export { ChallengesProvider, ChallengesContext }
