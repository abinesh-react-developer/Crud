
const ButtonHoc = (WrappedComponent) => ({ onClick, children, className }) => (
    <WrappedComponent onClick={onClick} className={`px-3 py-1 rounded cursor-pointer ${className}`}>
    {children}
  </WrappedComponent>
  );

  export default ButtonHoc;