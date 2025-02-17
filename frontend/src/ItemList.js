import { useEffect, useState } from "react";

const ItemList = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/data/${props.db}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setItems(data);
            })
            .catch((err) => console.error(err));
    }, []);

    return <h1>{props.title}</h1>
}

export default ItemList;