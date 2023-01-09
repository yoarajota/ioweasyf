import { motion } from 'framer-motion'
import styles from '../../styles/Home.module.css'

const Loading = () => {

    return (
        <motion.div className={styles.loadingWrap} transition={{ duration: 0.5, delay: 0.2 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.span transition={{ duration: 1, repeat: Infinity }} animate={{ x: [0, 100, 0] }} />
        </motion.div>
    )
}

export default Loading