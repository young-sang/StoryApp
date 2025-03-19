import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import './css/Detail.css';

const ItemDetail = () => {
    const navigate = useNavigate();
    const { category } = useParams();
    const { id } = useParams();

    const [isVisible, setIsVisible] = useState(false);

    const location = useLocation();
    const item = location.state;



    useEffect(() => {},[item])

    const handleUpdate = () => {
        navigate(`/data/updateItem/${item.id}`, {state: item})
    }

    const handleDelete = () => {

    }

    return (item &&
        <div className="item-detail">
            <i class='bx bx-menu' onClick={() => setIsVisible(prev => !prev)}></i>
            {isVisible && (
                <ul>
                <li onClick={handleUpdate}>수정</li>
                <li><button onClick={handleDelete}/></li>
            </ul>
            )}
            
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