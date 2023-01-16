import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import Image from "next/image";
import { useState } from "react";

export default function Yoarajota() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>ioweasy - yoarajota</title>
        <meta name="description" content="ioweasy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div className={styles.header}>
        <Link href={"/"}>
          <p>return</p>
        </Link>
      </motion.div>
      <main className={styles.main}>
        <motion.div
          animate={{ x: [-20, 0], opacity: [0, 1] }}
          transition={{ type: "spring" }}
          className={styles.description}
        >
          <div className={styles.wrap}>
            <h1>João Vítor Basso Sberse</h1>
            <p>aka yoarajota</p>
          </div>
        </motion.div>

        <div className={styles.aboutMeWrap}>
          <div>
            <h4>
              Full Stack WEB Developer. Immersed in the world of technology
              since 2020, always exploring the best of the wide area of ​​​​the
              world of programming.
            </h4>
            <p>consider know me better in</p>
          </div>
          <div className={styles.buttonsWrap}>
            <button
              title="mine linkedin profile"
              onClick={() => {
                setShow(true);

                window.open(
                  "https://www.linkedin.com/in/jo%C3%A3o-v%C3%ADtor-sberse-1b5a4021b"
                );
              }}
            >
              <p>Linkedin</p>
              <BsLinkedin />
            </button>
            <button className={styles.portifolioButton}>
              <p>Portifolio</p>
              <Image
                alt="YJ YJ YJ YJ YJ YJ YJ YJ YJ YJ YJ YJ YJ YJ YJ YJ YJ YJ YJ YJ YJ YJ YJ YJ YJ YJ YJ"
                src="/YJ.png"
                width={50}
                height={50}
              />
            </button>
            <button
              title="mine github profile"
              onClick={() => {
                setShow(true);

                window.open("https://github.com/yoarajota");
              }}
            >
              <p>Github</p>
              <BsGithub />
            </button>
          </div>

          {show && (
            <div className={styles.wrap100widthCenter}>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                i apreciate the interest :)
              </motion.p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
