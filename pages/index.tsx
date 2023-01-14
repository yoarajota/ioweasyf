import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useCallback, useEffect, useState } from 'react'
import sendUser from '../logic/sendUser'
import { motion } from 'framer-motion'
import { type } from 'os'
import Loading from '../public/components/loading'
import { stat } from 'fs'
import ListOfItems from '../public/components/listOfItems'

const FOOTER_2 = () => {
  return (
    <>
      <h1>
        about
      </h1>
      <p>
        ioweasy list yours recent unfollowers

        <br />

        it doesn't uses Meta's API.
        <br />

        ioweasy collect, store and compare the list of followers provided by Instagram user interface
      </p>
    </>
  )
}
const FOOTER_1 = () => {
  return (
    <>
      <h1>
        remember
      </h1>
      <p>
        the list may have wrong imprecise information because the algorithm use the instagram user interface
      </p>
    </>
  )
}

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [user, setUser] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<any>();

  // Save Data to Local Storage. localStorage.setItem(key, value);
  // Read Data from Local Storage. let lastname = localStorage.getItem(key);

  useEffect(() => {
    setUser(sessionStorage.getItem('username') ?? '')
  }, [])


  const send = useCallback(async () => {
    setStatus(false) // TALVEZ TIRAR ISSO
    if (user?.length < 4) return
    setIsLoading(true)
    let status = await sendUser(user);
    if (status?.status) {
      sessionStorage.setItem('username', user)
    }
    setStatus(status)
    setIsLoading(false)
  }, [user])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <motion.div animate={{ x: [-20, 0], opacity: [0, 1] }}
          transition={{ type: "spring" }} className={styles.description}>
          <div className={styles.wrap}>
            <h1>
              ioweasy
            </h1>
            <p>instagram user</p>
            <input value={user} onChange={(e) => setUser(e.target.value)} type={'text'}></input>
            <button className={styles.submitButton} onClick={() => send()}> <p>send</p> </button>
          </div>
        </motion.div>
        {isLoading && <div className={styles.wrap100widthCenter}><Loading /></div>}
        <p>{status?.message}</p>
        <motion.div
          className={styles.center}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01]
          }}
        >
          <motion.div
            className={styles.result}
            animate={{ height: status ? 'auto' : 0 }}
            transition={{
              type: 'spring'
            }}
          >
            <ListOfItems items={status?.data?.unfollowersList} />
          </motion.div>

          {status ? (status?.data?.unfollowersList.length > 1 ? <FOOTER_1 /> : <></>) : <FOOTER_2 />}
        </motion.div>
      </main>
    </>
  )
}
