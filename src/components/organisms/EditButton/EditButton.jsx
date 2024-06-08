export default function EditButton({
  children, 
  className= 'bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 transition duration-300', 
  ...props 
}){
  return <button {...props} className={`${className}`}>{children}</button>
}