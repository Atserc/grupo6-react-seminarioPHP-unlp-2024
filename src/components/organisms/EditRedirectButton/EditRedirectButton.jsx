export default function EditRedirectButton({ 
  children, 
  className= 'bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300', 
  ...props }){
  return <div {...props} className={`${className}`}>{children}</div>
}