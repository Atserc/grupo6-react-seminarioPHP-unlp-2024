export default function AddButton({
  children, 
  className= 'absolute bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300', 
  ...props 
}){
  return <button {...props} className={`${className}`}>{children}</button>
}
