
import { useParams, useSearchParams } from "react-router-dom";
import qs from 'query-string'
import React, { useCallback } from 'react'
import { IconType } from 'react-icons'
import { useNavigate } from 'react-router-dom'

interface CategoryBoxProps {
    label: string,
    icon: IconType,
    selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({label, icon: Icon, selected}) => {

    const navigate =  useNavigate();
    const {category} = useParams();
    let [searchParams, setSearchParams] = useSearchParams();

    const params: any = [];

    searchParams.forEach((value, key) => {
        params.push({[key]: value});
      });


    const handleClick = useCallback(() => {
        let currentQuery = {};
        if (searchParams) {
            currentQuery = qs.parse(searchParams.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label,
        }

        if (category === label) {
            delete updatedQuery.category;
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
          }, { skipNull: true });
      
          navigate(url);

        
    }, [label, ])
  return (
    <div onClick={handleClick} className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${selected ? 'border-b-neutral-800' : 'border-transparent'} ${selected ? 'text-neutral-800' : 'text-neutral-500'}`} >
        <Icon size={26} />
        <div className='font-medium text-sm'>
            {label}
        </div>
    </div>
  )
}

export default CategoryBox