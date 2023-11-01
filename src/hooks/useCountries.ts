// import { continents, countries, languages } from 'countries-list'
// import { getCountryCode, getCountryData, getCountryDataList, getEmojiFlag } from 'countries-list';
// import type {
//     ICountry,
//     ICountryData,
//     ILanguage,
//     TContinentCode,
//     TCountryCode,
//     TLanguageCode,
//   } from 'countries-list'
  
import countries from "world-countries";


const formattedCountries = countries.map((country) => (
    {
        value: country?.cca2,
        label: country?.name?.common,
        flag: country?.flag,
        latlng: country?.latlng,
        region: country?.region,
    }
    
));

// const formattedCountries: any = [];

// let country: TCountryCode;
// for (country in countries) {
//     formattedCountries.push({
//         value: getCountryCode(countries[country]['name']),
//         label: countries[country]['name'],
//         // flag: getEmojiFlag('AT'),
        
//     }
//     );
// }



const useCountries = () => {
    const getAll = () => formattedCountries;
    const getByValue = (value: string) => {
        return formattedCountries.find((item: any) => item?.value === value);
    }
    return {
        getAll,
        getByValue,
    }
}

export default useCountries;


