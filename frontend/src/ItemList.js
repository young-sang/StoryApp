import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './css/List.css';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [mode, setMode] = useState();

    const { category } = useParams()

    useEffect(() => {
        setMode(category);
    }, [category]);

    useEffect(() => {
        if(!mode) return;
        fetch(`http://localhost:5000/data/list/${mode}`)
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
            })
            .catch((err) => console.error(err));
    }, [mode]);
    
    useEffect(() => {}, [items])

    return (
        <div>
            <h1>{category}</h1>

            {items.length > 0 && (
                <ul>
                    {items.map((item, index) => {
                        const a = {
                            ...item,
                            ratings: JSON.parse(item.ratings)
                        }
                        return <li key={index}>
                            <Link to={`/detail/${mode}/${item.id}`} state={a}>
                                <h4>{item.title}</h4>
                                <img src={`http://localhost:5000${item.imagePath}` || null} />
                            </Link>
                        </li>
                    })}
                </ul>
            )}            
        </div>
    )
}

export default ItemList;