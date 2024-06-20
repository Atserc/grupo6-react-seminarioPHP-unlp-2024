export default function AddButton({
  children, 
  className= 'bg-blue-500 text-white py-1 px-3 text-sm rounded hover:bg-blue-700 transition duration-300', 
  ...props 
}){
  return <button {...props} className={`${className}`}>{children}</button>
}
