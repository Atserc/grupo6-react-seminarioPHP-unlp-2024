import { SwalAlert } from '../'

export default function DeleteButton({
  children, 
  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300" , 
  setLoading, 
  entityId, 
  type, 
  message,
  onDelete,
  ...props }){
  return <button {...props} className={`${className}`} onClick={() => SwalAlert({type, id : entityId, setLoading, onDelete, message})}>{children}</button>
}
