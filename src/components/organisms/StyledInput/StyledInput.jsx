export default function StyledInput({
  children,
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", 
  type, value, label, id, name, placeholder, onChange, 
  ...props}){
  return <input 
    className={`${className}`}
    type={type}
    id={id}
    name={name}
    placeholder={placeholder}
    value={value} 
    onChange={onChange}
    {...props}></input>
}
