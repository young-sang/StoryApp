import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import './css/Detail.css';
import MyModal from "./modal.js";

const ItemDetail = () => {
    const navigate = useNavigate();
    const { category } = useParams();
    const { id } = useParams();

    const [isVisible, setIsVisible] = useState(false);
    const [isModalOn, setIsModalOn] = useState(false);

    const location = useLocation();
    const item = location.state;



    const handleUpdate = () => {
        navigate(`/data/UPDATE/${item.id}`, {state: {mode:"UPDATE", item: item}});
    }

    const handleDelete = () => {
        setIsModalOn(false);
        const datafetch = async () => {
            const res = await fetch(`http://localhost:5000/data/delete/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({item: item.imagePath})
            })
            const data = await res.json();
            
            navigate(`/${item.category}`);
        }
        
        datafetch();
    }

    return (item &&
        <div className="item-detail">
            <i class='bx bx-menu' onClick={() => setIsVisible(prev => !prev)}></i>
            {isVisible && (
                <ul>
                <li onClick={handleUpdate}>수정</li>
                <li onClick={() => setIsModalOn(true)}>삭제</li>
            </ul>
            )}
            {isModalOn && (
                <MyModal handleDelete={handleDelete} setIsOpen={setIsModalOn}/>
            )}
            <h1>{item.title}</h1>
            <img src={`http://localhost:5000${item.imagePath}` || null} />
            <ul>
                {}
            </ul>
            <p>{item.comment}</p>

        </div>
    )
}

export default ItemDetail;