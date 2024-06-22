import { triggerWarning } from '../../../utils' 

export default function DeleteButton({
  children, 
  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300" , 
  setLoading, 
  entityId, 
  type, 
  message,
  onDelete,
  ...props }){
  return <button {...props} className={`${className}`} onClick={() => triggerWarning({id: entityId, type, setLoading, onDelete, message})}>{children}</button>
}
