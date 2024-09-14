const Content = ({ text, active }) => {
    return <div className="flex items-center justify-center">

        <div className={`${active ? "text-white" : "text-gray-400"} text-md 
        font-semibold hover:text-white cursor-pointer`}>
            {text}
        </div>
    </div>
}

export default Content;