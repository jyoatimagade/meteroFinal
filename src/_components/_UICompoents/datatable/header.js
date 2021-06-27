import React, {} from 'react';
const Header = ({headers}) =>{
    return(
        <>
        <thead>
            <tr>
                {headers.map(head =>(<th key={head.dataField}>{head.text}</th>))}              
            </tr>
        </thead>
        </>
    )
}

export default Header;