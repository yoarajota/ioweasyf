import styles from "../../styles/Home.module.css";
import { uid } from "../../logic/helpers";
import { motion } from "framer-motion";


type Items = {
  items: Array<any>;
};

const ListOfItems = ({ items }: Items) => {
  return (
    <div className={styles.listContainer}>
      {items?.map((item: string, index) => {
        return (
          <motion.div key={uid() + index}>
            <a
              target="_blank"
              href={`https://www.instagram.com/${item}/`}
              rel="noreferrer"
            >
              {item}
            </a>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ListOfItems;
