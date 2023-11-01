import { useNavigate } from "react-router-dom";


const Logo = () => {
  const navigate = useNavigate();
  return (
    <img onClick={() => navigate('/')} alt='logo' className="hidden md:block cursor-pointer" height={'100'} width={'100'} src='/images/logo.png' />
  )
}

export default Logo
