import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import LevelUpModal from '../components/LevelUpModal'

import challenges from '../../challenges.json'

interface ChallengesProviderProps {
  children: ReactNode
  level: number
  currentExperience: number
  challengesCompleted: number
}

interface ChallengesContextData {
  level: number
  currentExperience: number
  experienceToNextLevel: number
  challengesCompleted: number
  activeChallenge: Challenge | null
  levelUp: () => void
  startNewChallenge: () => void
  resetChallenge: () => void
  completeChallenge: () => void
  closeLevelUpModal: () => void
}

interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}

const ChallengesContext = createContext({} as ChallengesContextData)

const ChallengesProvider = ({
  children,
  ...props
}: ChallengesProviderProps) => {
  const [level, setLevel] = useState(props.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(
    props.currentExperience ?? 0
  )
  const [challengesCompleted, setChallengesCompleted] = useState(
    props.challengesCompleted ?? 0
  )
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', level.toString())
    Cookies.set('currentExperience', currentExperience.toString())
    Cookies.set('challengesCompleted', challengesCompleted.toString())
  }, [level, currentExperience, challengesCompleted])

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  const levelUp = () => {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex] as Challenge

    setActiveChallenge(challenge)

    if (Notification.permission === 'granted') {
      new Audio('/notification.mp3').play()

      new Notification('Novo desafio! 🎉', {
        body: `Novo desafio valendo ${challenge.amount}xp!`,
      })
    }
  }

  const resetChallenge = () => setActiveChallenge(null)

  const completeChallenge = () => {
    if (!activeChallenge) {
      return
    }

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  const closeLevelUpModal = () => setIsLevelUpModalOpen(false)

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}

export { ChallengesProvider, ChallengesContext }
