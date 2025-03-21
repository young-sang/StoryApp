import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import './css/Form.css';

const FormRating = ({mode, formData, handleOnChange}) => {
    return (
        <div className="ratingItem">
        <label htmlFor={mode}>{mode}</label>
        <select id={mode} name={mode} onChange={handleOnChange}>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
        </select>
        </div>
    )
} 

const ItemControl = (props) => {
    const navigate = useNavigate();

    const [previewSrc, setPreveiwSrc] = useState("");
    const [uploadFile, setUploadFile] = useState();
    const [category, setCategory] = useState(null);

    const { mode } = useParams();

    const location = useLocation();
    const item = location.state;

    const ratingFields = {
        notSelected: [],
        ani : ["story", "worldview", "characters", "drawing", "ost", "production"],
        manga: ["story", "worldview", "characters", "drawing", "production"],
        novel: ["story", "worldview", "characters"]
    };

    const [formData, setFormData] = useState({
        title: '',
        category: "notSelected",
        imagePath: '',
        comment: '',
        ratings: {}
    });

    // useEffect(() => {
    //     if(mode == "updateItem"){
    //         setFormData(item)
    //     }
    // }, [])

    useEffect(() => {},[formData, uploadFile]);

    useEffect(() => {
        if (category !== "notSelected" && ratingFields[category]) {
            const newRatings = {};
            ratingFields[category].forEach(field => {
                newRatings[field] = 0; // 각 항목에 대한 초기값 설정
            });
            setFormData(prev => ({
                ...prev,
                category,
                ratings: newRatings
            }));
        }
    }, [category])

    // 드래그 이벤트
    const handleOnDragOver = (e) => e.preventDefault();

    const handleOnDrop = (e) => {
        e.preventDefault();
        
        const files = e.dataTransfer.files;
        if(files.length > 0){
            const file = files[0];

            // 이미지 파일 확인
            if(file.type.startsWith('image/')){
                setUploadFile(file);
                const reader = new FileReader();

                // 파일이 로드되면 실행
                reader.onload = (e) => {
                setPreveiwSrc(e.target.result);
                };

                reader.readAsDataURL(file);

            } else{
                // alert('이미지 파일만 업로드 가능하다.');
            }
        }
    }

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        if(name == "category"){
            setCategory(value);
        } else if(ratingFields[category]?.includes(name)){
            setFormData(prev => ({
                ...prev,
                ratings: {...prev.ratings, [name]: value}
            }));
        }else{
            setFormData((prevData) => ({...prevData, [name]: value}));
        }
    }

    // Form 제출
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if(formData.category == 'notSelected' || !uploadFile){
            return;
        }
      
        const imgData = new FormData();
        imgData.append('image', uploadFile);

        const imgRes = await fetch('http://localhost:5000/upload/imageUpload',{
            method: 'POST',
            body: imgData
        })

        const imgDataRes = await imgRes.json()
        
        const updateFormData = {
            ...formData, 
            imagePath: imgDataRes.filePath
        };

        
        const formRes = await fetch('http://localhost:5000/data/dbUpload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateFormData)
        })

        const formDataRes = await formRes.json();
        updateFormData.id = formDataRes;

        navigate(`/detail/${updateFormData.category}/${formDataRes}`, {state: updateFormData})
    }


    return (
        <form onSubmit={handleOnSubmit}>
            {/* 제목 */}
            <label htmlFor="title">제목</label>
            <input type="text" name="title" value={formData.title} onChange={handleOnChange} required/>

            {/* 카테고리 */}
            <label htmlFor="category">카테고리</label>
            <select id="category" name="category" value={formData.category} onChange={handleOnChange}>
                <option value="notSelected">==선택==</option>
                <option value="ani">애니</option>
                <option value="manga">만화</option>
                <option value="novel">소설</option>
            </select>


            {/* 이미지 */}
            <label htmlFor="image">이미지</label>
            <div id="drop-zone" style={{ width: "100px", height: "100px", border: ".5px solid #111"}} onDragOver={handleOnDragOver} onDrop={handleOnDrop}>
                <img src={previewSrc} alt="이미지 미리보기" id="preview"></img>
            </div>
            <input type="hidden" name="imagePath" value={formData.imagePath} required/>
            

            {/* 별점 */}
            {category !== "notSelected" && ratingFields[category] &&
             ratingFields[category].map(mode => (
                <FormRating key={mode} mode={mode} formData={formData} handleOnChange={handleOnChange}/>
            ))}

            {/* 설명 */}
            <label htmlFor="comment">설명</label>
            <textarea id="comment" name="comment" value={formData.comment} onChange={handleOnChange}/>

            <input type="submit" value="추가" />
        </form>
    )
}

export default ItemControl;