import { Icon } from '@iconify/react';


const Text = ({ iconName, text, active,onClick }) => {
  return <div className="flex items-center justify-start">
    <div className='px-3 py-2 '>
      <Icon icon={iconName} color={active ? "white" : "gray"} fontSize={25} />
    </div>
    <div className={`${active ? "text-white" : "text-gray-400"} text-sm font-semibold hover:text-white`} onClick={onClick}>
      {text}
    </div>


  </div>
}

export default Text;