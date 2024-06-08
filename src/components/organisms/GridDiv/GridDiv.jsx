export default function GridDiv({ children, className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4' }){
  return <div className={`${className}`}>{children}</div>;
};