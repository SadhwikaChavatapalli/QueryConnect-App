import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SearchComponent = () =>{
    return <>
    <input type="text" placeholder="Search Topic" className="input input-bordered input-lg w-full max-w-2xl" />
    <button className="btn btn-primary btn-lg" style={{margin:'8px'}}>GO</button>
    </>
    
}

export default SearchComponent;