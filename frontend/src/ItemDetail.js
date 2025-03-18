import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import './css/Detail.css';

const ItemDetail = () => {
    const { mode } = useParams();
    const { id } = useParams();

    // const [item, setItem] = useState();

    const location = useLocation();
    const item = location.state;

    console.log(location.state);

    useEffect(() => {
        
    },[item])

    return (item &&
        <div className="item-detail">
            <h1>{item.title}</h1>
            <img src={`http://localhost:5000${item.imagePath}`} />
            <ul>
                {}
            </ul>
            <p>{item.comment}</p>

        </div>
    )
}

export default ItemDetail;