import { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { geoAPIoptions, GEO_API_URL } from '../features/api/api'

function Search({onSearchChange}) {
  const [search, setSearch] = useState(null)
  
  const loadOptions = (inputValue) => {
    if (inputValue !== '') {
      return fetch(`${GEO_API_URL}/cities?minPopulation=5000&namePrefix= ${inputValue}`, geoAPIoptions)
    .then(response => response.json())
    .then(response => {
      return {
        options: response.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          }
        })
      }
    })
    .catch(err => console.error(err));
  }
  return null
  }

  const onChange = (searchData) => {
    setSearch(searchData)
    onSearchChange(searchData)
  }

  const customStyles = {
    control: provided => ({
      ...provided,
      borderRadius: '5px',
      border: '1px solid #e6e6e6',
      textAlign: 'left',
      margin: '0 0 1rem 0'
    }),

    input: provided => ({
      ...provided,
      fontFamily: 'inherit',
    }),

    option: provided => ({
      ...provided,
      textAlign: 'left'
    })
  }

  return (
    <AsyncPaginate 
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={onChange}
      loadOptions={loadOptions}
      styles={customStyles}
    />
  )
}

export default Search