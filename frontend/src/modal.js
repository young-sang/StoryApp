const MyModal = ({handleDelete, setIsOpen}) => {
    return (
        <div>
            <p>삭제하시겠습니까?</p>
            <button onClick={handleDelete}>예</button>
            <button onClick={() => setIsOpen(false)}>아니요</button>
        </div>
    )
}

export default MyModal;