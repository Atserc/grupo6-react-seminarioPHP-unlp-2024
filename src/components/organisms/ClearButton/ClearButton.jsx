export default function ClearButton({
  text, 
  className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-700 transition duration-300" , 
  onClick,
  ...props }){
  return <button {...props} className={`${className}`} onClick={() => onClick()}>{text}</button>
}
