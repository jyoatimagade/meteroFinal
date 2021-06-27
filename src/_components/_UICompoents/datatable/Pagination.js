import React, { useEffect, useState, useMemo } from 'react';
import Pagination  from 'react-bootstrap/Pagination';
const PaginationTable = ({total=0, itemsPerpage=10, currentPage=1, onPageChange}) =>{
    const [totalPAges, setTotalPAges] = useState(0)
    useEffect(()=>{
        if(total>0 && itemsPerpage > 0)
        setTotalPAges(Math.ceil(total/itemsPerpage));
    }, [total, itemsPerpage]);

    const paginationItems = useMemo(()=>{
        const pages = [];
        for (let i=1; i<=totalPAges; i++){
            pages.push(<Pagination.Item key={i} active={i===currentPage} onClick={()=>onPageChange(i)}>
                {i}
            </Pagination.Item>)
        }
    }, [totalPAges, currentPage]);

    if(totalPAges === 0) return null;
    return(
        <>
        <h1>This is pagination</h1>
       <Pagination>
           <Pagination.Prev onClick={()=>onPageChange(currentPage -1)} disabled={currentPage === 1} />
           {paginationItems}
           <Pagination.Next onClick={()=>onPageChange(currentPage +1)} disabled={currentPage === 1} />
       </Pagination>
       </> 
    )
}

export default PaginationTable;