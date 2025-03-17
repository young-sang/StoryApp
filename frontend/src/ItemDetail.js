import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './css/Detail.css';

const ItemDetail = () => {
    const { mode } = useParams();
    const { id } = useParams();

    const [item, setItem] = useState();

    useEffect(() => {
        fetch(`http://localhost:5000/data/single/${mode}/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setItem(data[0]);
        })
        .catch(err => {
            console.error(err);
        })
    },[mode, id])

    useEffect(() => {
        
    },[item])

    return (item &&
        <div className="item-detail">
            <h1>{item.name}</h1>
            <img src={`http://localhost:5000${item.image_path}`} />
            <p>{item.comment}</p>

        </div>
    )
}

export default ItemDetail;