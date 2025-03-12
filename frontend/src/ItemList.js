import { useEffect, useState } from "react";

const ItemList = (props) => {
    const [items, setItems] = useState([]);
    const [mode, setMode] = useState();

    useEffect(() => {
        setMode(props.db);
    }, [props.db])

    useEffect(() => {
        if(!mode) return;
        fetch(`http://localhost:5000/data/${mode}`)
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
            })
            .catch((err) => console.error(err));
    }, [mode]);

    useEffect(() => {
        console.log(items);
    }, [items])

    useEffect(() => {

    }, [items])

    return (
        <div>
            <h1>{props.title}</h1>
            
            <ul>
                {items.map((item, index) => {
                    return <li>{item.name}</li>
                })}
            </ul>
            
        </div>
    )
}

export default ItemList;