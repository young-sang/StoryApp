import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FormRating = ({mode, formData, handleOnChange}) => {
    return (
        <div className="ratingItem">
        <label htmlFor={mode}>{mode}</label>
        <select id={mode} name={mode} value={formData[mode]} onChange={handleOnChange}>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={1.5}>1.5</option>
            <option value={2}>2</option>
            <option value={2.5}>2.5</option>
            <option value={3}>3</option>
            <option value={3.5}>3.5</option>
            <option value={4}>4</option>
            <option value={4.5}>4.5</option>
            <option value={5}>5</option>
        </select>
        </div>
    )
} 

const ItemControl = (props) => {
    const [previewSrc, setPreveiwSrc] = useState("");
    const [uploadFile, setUploadFile] = useState();
    const [formData, setFormData] = useState({
        title: '',
        category: null,
        imagePath: '', // 초기화 시 '' 입력 없을 시 Null UseEffect에 걸리지 않기 위해
        story: 0,
        worldview: 0,
        characters: 0,
        drawing: 0,
        ost: 0,
        production: 0,
        desc: ''
    });

    const modes = ["story", "worldview", "characters", "drawing", "ost", "production"]; // 별점 모드 저장

    const navigate = useNavigate();

    useEffect(() => {
        // console.log(formData.imagePath);
    },[formData, uploadFile]);

    // handleSubmit에서 처리 불가
    useEffect(() => {
        if(formData.imagePath != '' && formData.category != null){
            fetch('http://localhost:5000/data/dbUpload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(data => {
                console.log('데이터 저장 성공');
                navigate(`/${formData.category}`)
            })
            .catch(error => {
                // alert('데이터 저장 실패');
            });
        }
        
    }, [formData.imagePath])


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
        setFormData((prevData) => ({...prevData, [name]: value}));
    }

    // Form 제출
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if(formData.category == 'notSelected' || !uploadFile){
            return;
        }
        
        const imgData = new FormData();
        imgData.append('image', uploadFile);

        fetch('http://localhost:5000/upload/imageUpload',{
            method: 'POST',
            body: imgData
        })
        .then(res => res.json())
        .then(data => setFormData((prevData) => ({
            ...prevData, 
            imagePath: data.filePath
        })))
        .catch(error => console.error(error)); 

        // Form 제출 => useEffect([formData.imagePath])
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
            {modes.map(mode => (
                <FormRating mode={mode}formData={formData} handleOnChange={handleOnChange}/>
            ))}

            {/* 설명 */}
            <label htmlFor="desc">설명</label>
            <textarea id="desc" name="desc" value={formData.desc} onChange={handleOnChange}/>

            <input type="submit" value="추가" />
        </form>
    )
}

export default ItemControl;