import React, {useState} from 'react';
import { closeIcon } from "../../../_config/images";

const Search = ({showClose, onSearch}) =>{
    const [search, setSearch] = useState('');
    const onInputChange = (value)=>{
        setSearch(value);
        onSearch(value);
    }
    return(
        <>
        <div className="search-container" style={{position:'relative'}}>
       <input type="text"
       className="form-control"
       placeholder="Search"
       onChange={(e)=>onInputChange(e.target.value)}
       value={search}
       style={{
           paddingRight: showClose && search.length ? '30px !important' : '12px !important'
       }}
       />
       { showClose && search.length ? <img onClick={()=>{setSearch('');onSearch('')}} style={{position:'absolute',top:'50%',right:'10px',transform:'translateY(-50%)',cursor:'pointer'}} src={closeIcon} /> : ''}
       </div>
        </>
    )
}

export default Search;
