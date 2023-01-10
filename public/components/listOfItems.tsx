import styles from '../../styles/Home.module.css'

type Items = {
    items: Array<any>
}

const ListOfItems = ({ items }: Items) => {
    const columnCount = Math.ceil(items?.length / 10);
    const columnWidth = `repeat(${columnCount}, 1fr)`;

    return (
        <div className={styles.listContainer} style={{ gridTemplateColumns: columnWidth }}>
            {items?.map((item: string, index) => {
                return <p key={index}>{item}</p>
            })}
        </div>
    )
}

export default ListOfItems