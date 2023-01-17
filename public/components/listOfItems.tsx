import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css'

type Items = {
    items: Array<any>
}

const ListOfItems = ({ items }: Items) => {
    const [columnWidth, setColumnWidth] = useState<string>('repeat(4, 200px)')
    useEffect(() => {
        // inside useEffect, the window is always present
        const updateWindowSize = () => {
            setColumnWidth(() => {
                var columnCount = window.innerWidth < 1000 ? items?.length < 10 ? 1 : Math.ceil(window.innerWidth / 250) :
                    Math.ceil(items?.length / 10) < 8 ? Math.ceil(items?.length / 10) : Math.ceil(items?.length / 20);
                return `repeat(${columnCount}, 200px)`;
            });
        };

        if (items) updateWindowSize(); // as soon as we are on the client, run this handler

        window.addEventListener('resize', updateWindowSize); // works only on resize events

        return () => {
            window.removeEventListener('resize', updateWindowSize); // clean up
        };
    }, [items]); // attach this once


    useEffect(() => {console.log(columnWidth)}, [columnWidth])
    // if (window.innerWidth <)

    return (
        <div className={styles.listContainer} style={{ gridTemplateColumns: columnWidth }}>
            {items?.map((item: string, index) => {
                return <p key={index}>{item}</p>
            })}
        </div>
    )
}

export default ListOfItems