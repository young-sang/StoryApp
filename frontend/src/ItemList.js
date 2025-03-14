import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './css/List.css';

const ItemList = (props) => {
    const [items, setItems] = useState([]);
    const [mode, setMode] = useState();

    useEffect(() => {
        setMode(props.db);
    }, [props.db])

    useEffect(() => {
        if(!mode) return;
        fetch(`http://localhost:5000/data/list/${mode}`)
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
            })
            .catch((err) => console.error(err));
    }, [mode]);
    
    useEffect(() => {

    }, [items])

    return (
        <div>
            <h1>{props.title}</h1>
            
            <ul>
                {items.map((item, index) => {
                    return <li key={index}>
                        <Link to={`/detail/${mode}/${item.id}`}>
                            <h4>{item.name}</h4>
                            <img src={`http://localhost:5000${item.image_path}`} />
                        </Link>
                    </li>
                })}
            </ul>
            
        </div>
    )
}

export default ItemList;