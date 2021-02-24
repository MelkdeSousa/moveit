import Head from 'next/head'

import ChallengeBox from '../components/ChallengeBox'
import CompletedChallenges from '../components/CompletedChallenges'
import Countdown from '../components/Countdown'
import ExperienceBar from '../components/ExperienceBar'
import Profile from '../components/Profile'

import { ChallengesProvider } from '../contexts/ChallengesContext'

import styles from '../styles/pages/Home.module.css'

const Home = () => (
  <ChallengesProvider>
    <div className={styles.container}>
      <Head>
        <title>Início | Moveit</title>
      </Head>

      <ExperienceBar />

      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
    </div>
  </ChallengesProvider>
)

export default Home
