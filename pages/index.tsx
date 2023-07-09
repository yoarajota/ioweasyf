import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useCallback, useEffect, useReducer, useState } from "react";
import { motion } from "framer-motion";
import Loading from "../public/components/loading";
import ListOfItems from "../public/components/listOfItems";
import Link from "next/link";
import { getFromHtml } from "../logic/helpers";
import sendToApi, { Response } from "../logic/sendToApi";
import type0Function from "../logic/type0Function";

const COMPARSION =
  "comparsion type will compare and show the account that u follow and dont follow you back";
const NORMAL = "normal type will get the list of unfollowers of the account";

const FOOTER_2 = () => {
  return (
    <div className={styles.footerWrap}>
      <h1>about</h1>
      <p>
        ioweasy list yours recent unfollowers
        <br />
        it doesn`t uses Meta`s API.
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
  user = "user",
  type = "type",
  followersFile = "followers_file",
  followingFile = "following_file",
}

interface Action {
  type: ActionType;
  payload?: number | string | File | null;
}

export interface Params {
  user: string;
  type: string | number;
  followers_file?: File;
  following_file?: File;
}

function reducer(state: Params, action: Action) {
  const { type, payload } = action;
  return { ...state, [type]: payload };
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, {
    user: "",
    type: 0,
  });
  const { user, type, followers_file, following_file } = state;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<any>();
  const [showStatus, setShowStatus] = useState<boolean>();
  const [lastUsername, setLastusername] = useState<string>("");

  useEffect(() => {
    dispatch({
      type: ActionType.user,
      payload: sessionStorage.getItem("username") ?? "",
    });
  }, []);

  const send = useCallback(async () => {
    let status: Response = {};
    if (type === 0) {
      let followersFileToSend, followingFileToSend;
      if (!followers_file || !following_file) {
        return;
      }

      setIsLoading(true);

      if (followers_file?.type === "text/html") {
        followersFileToSend = await getFromHtml(followers_file);
      }

      if (following_file?.type === "text/html") {
        followingFileToSend = await getFromHtml(following_file);
      }

      status = {
        message: "list of the diference between yor followers and following",
        status: "success",
        data: { list: type0Function(followersFileToSend, followingFileToSend) },
      };
    } else {

      ////////////////////////////////////////// TEMPORARY

      status = {
        message: "temporarily not working",
        status: "error",
      };


      // setLastusername(user);
      // if (user?.length < 4 || user === lastUsername) return;
      // setShowStatus(false);
      // setIsLoading(true);
      // status = await sendToApi(state);
      // if (status?.status === "success") {
      //   sessionStorage.setItem("username", user);
      // }
    }

    setShowStatus(true);
    setStatus(status);
    setIsLoading(false);
  }, [type, followers_file, following_file]);

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
                checked={type === 0}
                value="0"
                name="type"
                onChange={(e) => {
                  setLastusername("");
                  setStatus({});
                  dispatch({
                    type: ActionType.type,
                    payload: parseInt(e.target.value),
                  });
                }}
              />
              <p title={NORMAL}>data type</p>
              <input
                title={NORMAL}
                type="radio"
                checked={type === 1}
                value="1"
                name="type"
                onChange={(e) => {
                  setLastusername("");
                  setStatus({});
                  dispatch({
                    type: ActionType.type,
                    payload: parseInt(e.target.value),
                  });
                }}
              />
              <p title={NORMAL}>
                slowly type <b>(not working)</b>
              </p>
              <input
                title={COMPARSION}
                type="radio"
                checked={type === 2}
                value="2"
                name="type"
                onChange={(e) => {
                  setLastusername("");
                  setStatus({});
                  dispatch({
                    type: ActionType.type,
                    payload: parseInt(e.target.value),
                  });
                }}
              />
              <p title={COMPARSION}>
                comparsion type <b>(not working)</b>
              </p>
            </div>

            {type === 0 ? (
              <>
                <div className={styles.archiveDiv}>
                  <h5>followers file</h5>
                  <input
                    onChange={(e) =>
                      dispatch({
                        type: ActionType.followersFile,
                        payload: e.target.files?.[0],
                      })
                    }
                    type="file"
                  ></input>
                </div>
                <div className={styles.archiveDiv}>
                  <h5>following file</h5>
                  <input
                    onChange={(e) =>
                      dispatch({
                        type: ActionType.followingFile,
                        payload: e.target.files?.[0],
                      })
                    }
                    type="file"
                  ></input>
                </div>
              </>
            ) : (
              <>
                <h4>instagram user</h4>
                <input
                  value={user}
                  onChange={(e) =>
                    dispatch({
                      type: ActionType.user,
                      payload: e.target.value,
                    })
                  }
                  type="text"
                ></input>
              </>
            )}
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
              <ListOfItems items={status?.data?.list} />
            </motion.div>
          </motion.div>
        </div>
        {status ? (
          status?.data?.list.length > 0 ? (
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
