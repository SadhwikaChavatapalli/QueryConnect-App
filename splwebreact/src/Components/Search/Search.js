import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchComponent = () =>{
    
    const [keywords, setKeywords] = useState('');
    const OnSearchClick = (keywords) => {
        localStorage.setItem('searchKeywords', keywords);
    }
    return <>
    <input type="text" 
            placeholder="Search Topic" 
            className="input input-bordered input-lg w-full max-w-2xl"
            value={keywords}
            onChange={(event) => {setKeywords(event.target.value)}} />
            
    <button className="btn btn-primary btn-lg" style={{margin:'8px'}} onClick={() => {OnSearchClick()}}>GO</button>
    </>
    
}

export default SearchComponent;