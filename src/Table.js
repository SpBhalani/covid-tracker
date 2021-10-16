import React from 'react'
import './table.css'
/**
* @author
* @function Table
**/

export const Table = ({countries}) => {
    return (
        <div className="table">
              {
                  countries.map((country) => {
                      return <tr>
                          <td>{country.country}</td>
                          <td>{country.cases}</td>
                      </tr>
                  })
              }
        </div>
    )

}