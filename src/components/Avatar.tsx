
interface AvatarProps {
    src: string | null | undefined
}
const Avatar: React.FC<AvatarProps> = ({src}) => {
  return (
    <div>
        <img 
            className="rounded-full w-[30px] h-[30px]" 
            alt="Avatar" 
            src={src || '/images/placeholder.jpg'}
            />
    </div>
  )
}

export default Avatar