import React from 'react'
import './Table.css';
import numeral from "numeral";

function Table({countries}) {
    return (
        <div className = "table">
           
            {countries.map(({country, cases}) => ( // Uses Map to map eachcountry in the first column,
            // and uses destructuring to destructure all countries into first column, all cases into 2nd.
                <tr>
                    <td>{country}</td>
                    <td>
                    <strong>{numeral(cases).format("0,0")}</strong></td>

                </tr>                

            ))}
        </div>
    )
}

export default Table
