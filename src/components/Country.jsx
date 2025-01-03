import React from 'react'

const Country = ({ data }) => {
  if (!data || data.length === 0) {
    return (
    <div className="loader">
      <div className="spinner">
        <i className="fa-regular fa-circle-notch fa-spin icon"></i>
      </div>
    </div>
    ); 
  }
  console.log(data);

  return (
    // TODO: Country component
    <>
      {data.map(({ name, population, region, capital, flags }) =>

        <a href="#" className="country scale-effect" key={name.common}>
          <div className="country-flag">
            <img src={flags.png} alt={name.common} />
          </div>
          <div className="country-info">
            <h2 className="country-title">{name.common}</h2>
            <ul className="country-brief">
              <li><strong>population: </strong>{population}</li>
              <li><strong>Region: </strong>{region}</li>
              <li><strong>capital: </strong>{capital}</li>
            </ul>
          </div>
        </a>
      )

      }

    </>

  )
}

export default Country