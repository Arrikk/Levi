const TabButton = (props) => {
    const { active, text, onClick, className } = props;

    return (
        <button onClick={onClick} className={`rounded-full px-5 py-2 outline-gray-200 ${active ? 'bg-leviplatte text-white' : 'bg-gray-100  text-black'} ${className}`}>
            {text}
        </button>
    )
}
export default TabButton