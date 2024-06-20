export default function ClearButton({
  text, 
  className="bg-black text-white text-sm py-1 px-3 rounded hover:bg-white hover:text-zinc-900 transition duration-300" , 
  onClick,
  ...props }){
  return <button {...props} className={`${className}`} onClick={() => onClick()}>{text}</button>
}
