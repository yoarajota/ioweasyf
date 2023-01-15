import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { motion } from "framer-motion";
import Link from "next/link";
export default function Yoarajota() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="ioweasy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div className={styles.header}>
        <Link href={"/"}>
          <p>return</p>
        </Link>
      </motion.div>
      <main className={styles.main}></main>
    </>
  );
}
