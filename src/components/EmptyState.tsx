
import Heading from "./Heading";
import Button from "./Button";
import { useNavigate } from "react-router-dom";



interface EmptyStateProps {
    title?: string,
    subtitle?: string,
    showRest?: boolean,
}


const EmptyState: React.FC<EmptyStateProps> = ({
    title = 'No exact matches',
    subtitle = 'Try changing or removing some of your filters',
    showRest,
}) => {
    const navigate = useNavigate();
  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
        <Heading center title={title} subtitle={subtitle}  />
        <div className="w-48 mt-4">
          {
            showRest && (
              <Button outline label='Remove all filters' onClick={() => navigate('/')} />
            )
          }
        </div>
    </div>
  )
}

export default EmptyState