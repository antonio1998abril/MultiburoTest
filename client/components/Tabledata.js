import React from 'react'

function Tabledata({data}) {
   let  d = new Date(data.createdAt)
    return (
        <>
        <tr >
            <td className="text-sm">
                <b>{data.name} </b>
            </td>
            <td>
                <small>{data.email}</small> 
            </td>
                
            <td>
                <small>{data.address}</small>
            </td>

            <td>
                <small>{data.age}</small>
            </td>
            <td>
                <small>{d.getUTCDate()}/{d.getMonth()}/{d.getFullYear()} at {d.getHours()}:{d.getMinutes()}</small>
            </td>                 
        </tr>
        </> 
    )
}

export default Tabledata
