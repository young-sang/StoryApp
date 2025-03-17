import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './css/List.css';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [mode, setMode] = useState();

    const { category } = useParams()

    const waitTime = async () => {
        try{
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        waitTime();
        console.log("category");
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
    
    useEffect(() => {
        console.log("item");
        console.log(items);
    }, [items])

    return (
        <div>
            <h1>{category}</h1>

            {items.length > 0 && (
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
            )}            
        </div>
    )
}

export default ItemList;