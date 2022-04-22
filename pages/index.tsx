import type { NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../components/Header'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Movie Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* banner goes here */}
      <main>
        <section>
          {/* rows go here */}
          {/* rows go here */}
          {/* rows go here */}
          {/* rows go here */}
          {/* rows go here */}
          {/* rows go here */}
        </section>
      </main>
      {/* modal goes here */}
    </div>
  )
}

export default Home
