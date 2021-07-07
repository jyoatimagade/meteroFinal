import React, {useState} from 'react';
import { searchcloseIcon } from "../../../_config/images";

const Search = ({showClose, onSearch, onBackPress}) =>{
    let searchTerm = "";
    const [search, setSearch] = useState('');
    const onInputChange = (value)=>{
        searchTerm = value;
        setSearch(value);
        onSearch(value);
    }
    const onBack = (keyCode) => {
        setTimeout(() => {
            if(keyCode !== 8) return; 
            // console.log(searchTerm);
            onBackPress(searchTerm);
        }, 50);
    }
    return(
        <>
        <div className="search-container" style={{position:'relative'}}>
       <input type="text"
       className="form-control"
       placeholder="Search"
       onChange={(e)=>onInputChange(e.target.value)}
       onKeyDown={(e)=>onBack(e.keyCode)}
       value={search}
       style={{
           paddingRight: showClose && search.length ? '30px !important' : '12px !important'
       }}
       />
       { showClose && search.length ? <img onClick={()=>{setSearch('');onSearch('')}} style={{position:'absolute',top:'50%',right:'10px',transform:'translateY(-50%)',cursor:'pointer'}} src={searchcloseIcon} /> : ''}
       </div>
        </>
    )
}

export default Search;
