import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ItemDetail = () => {
    const { mode } = useParams();
    const { id } = useParams();

    const [item, setItem] = useState();

    useEffect(() => {
        fetch(`http://localhost:5000/data/single/${mode}/${id}`)
        .then(res => res.json())
        .then(data => {
            
            setItem(data[0]);
        })
        .catch(err => {
            console.error(err);
        })
    },[mode, id])

    useEffect(() => {
        
    },[item])

    return (
        <div>
            <h1>{item && item.name}</h1>            
        </div>
    )
}

export default ItemDetail;