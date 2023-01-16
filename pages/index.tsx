import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useCallback, useEffect, useReducer, useState } from "react";
import sendUser from "../logic/sendUser";
import { motion } from "framer-motion";
import Loading from "../public/components/loading";
import ListOfItems from "../public/components/listOfItems";
import Link from "next/link";

const COMPARSION = "comparsion type will compare and show the account that u follow and dont follow you back"
const NORMAL = "normal type will get the list of unfollowers of the account";


const FOOTER_2 = () => {
  return (
    <div className={styles.footerWrap}>
      <h1>about</h1>
      <p>
        ioweasy list yours recent unfollowers
        <br />
        it doesn't uses Meta's API.
        <br />
        ioweasy collect, store and compare the list of followers provided by
        Instagram user interface
      </p>
    </div>
  );
};
const FOOTER_1 = () => {
  return (
    <div className={styles.footerWrap}>
      <h1>remember</h1>
      <p>
        the list may have imprecise information because the algorithm use the
        instagram user interface
      </p>
    </div>
  );
};

const inter = Inter({ subsets: ["latin"] });

enum ActionType {
  user = 'user',
  type = 'type',
}

interface Action {
  type: ActionType;
  payload: number | string;
}

export interface Params {
  user: string;
  type: string|number;
}

function reducer(state: Params, action: Action) {
  const { type, payload } = action;
  return { ...state, [type]: payload };
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, { user: "", type: 1 });
  const {user, type} = state;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<any>();
  const [showStatus, setShowStatus] = useState<boolean>();
  const [lastUsername, setLastusername] = useState<string>('');

  useEffect(() => {
    dispatch({
      type: ActionType.user,
      payload: sessionStorage.getItem("username") ?? "",
    });
  }, []);
  
  const send = useCallback(async () => {
    setLastusername(user)
    if (user?.length < 4 || user === lastUsername) return;
    setShowStatus(false)
    setIsLoading(true);
    let status = await sendUser(state);
    if (status?.status === "success") {
      sessionStorage.setItem("username", user);
    }

    setShowStatus(true)
    setStatus(status);
    setIsLoading(false);
  }, [user, lastUsername, state]);

  return (
    <>
      <Head>
        <title>ioweasy</title>
        <meta name="description" content="ioweasy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div className={styles.header}>
        <Link href={"/yoarajota"}>
          <p>about yoarajota</p>
        </Link>
      </motion.div>
      <main className={styles.main}>
        <motion.div
          animate={{ x: [-20, 0], opacity: [0, 1] }}
          transition={{ type: "spring" }}
          className={styles.description}
        >
          <div className={styles.wrap}>
            <h1>ioweasy</h1>
            <div>
              <input
                title={NORMAL}
                type="radio"
                checked={type === 1}
                value="1"
                name="type"
                onChange={(e) => {
                  dispatch({
                    type: ActionType.type,
                    payload: parseInt(e.target.value),
                  });
                }}
              />
              <p title={NORMAL}>normal type</p>
              <input
                title={COMPARSION}
                type="radio"
                checked={type === 2}
                value="2"
                name="type"
                onChange={(e) => {
                  dispatch({
                    type: ActionType.type,
                    payload: parseInt(e.target.value),
                  });
                }}
              />
              <p title={COMPARSION}>comparsion type</p>
            </div>
            <h4>instagram user</h4>
            <input
              value={user}
              onChange={(e) =>
                dispatch({
                  type: ActionType.user,
                  payload: e.target.value,
                })
              }
              type={"text"}
            ></input>
            <button className={styles.submitButton} onClick={() => send()}>
              <p>send</p>
            </button>
            {showStatus && <p>{status?.message}</p>}
          </div>
        </motion.div>
        <div className={styles.content}>
          {isLoading && (
            <div className={styles.wrap100widthCenter}>
              <Loading />
            </div>
          )}
          <motion.div
            className={styles.center}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <motion.div
              className={styles.result}
              animate={{ height: status && showStatus ? "auto" : 0 }}
              transition={{
                type: "spring",
              }}
            >
              <ListOfItems items={status?.data?.unfollowersList} />
            </motion.div>
          </motion.div>
        </div>
        {status ? (
          status?.data?.unfollowersList.length > 0 ? (
            <FOOTER_1 />
          ) : (
            <></>
          )
        ) : (
          <FOOTER_2 />
        )}
      </main>
    </>
  );
}
