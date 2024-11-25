import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const QuestionsPage = () =>{

    const userID = localStorage.getItem("user");
    const [data, setData] = useState([]);
    const [intrType, setIntrType] = useState("all");
    const navigate = useNavigate();
    const [typeInt, setTypeInt] = useState(-1);

    //#region Search Logic

    const [keywords, setKeywords] = useState('');

    const OnSearchClick = () => {
        //setKeywords(keywords);
        loadInteractionsByKeywords();
    }

    const OnClearClick = () => {
        
        setKeywords('');
        setIntrType('all');
        loadInteractionsByType();
    }

    const loadInteractionsByKeywords = useCallback(() => {
        axios.get(`http://localhost:8080/interactions/search?tags=${keywords}`)
                .then(response => {
                    setData(response.data);
                });
    },[keywords])

    //#endregion Search Logic

    //#region Dropdown Logic

    const loadInteractionsByType = useCallback(() => {

        if ((keywords === undefined || keywords === '') && intrType === "all")
        {
            axios.get(`http://localhost:8080/interactions`)
                .then(response => {
                    console.log('Getting all data...');
                    setData(response.data);
                    setTypeInt(-1);
                });
                return;
        }
        else if (intrType === "all")
        {
            loadInteractionsByKeywords();
            setTypeInt(-1);
            return;
        }

        const typeInt = intrType === 'question' ? 0 : (intrType === 'debate' ? 1 : 2);

        setTypeInt(typeInt);
        
    }, [intrType])

    // Function to handle the dropdown change 
    const handleDropdownChange = (event) => { 
        const value = event.target.value; 
        console.log("Selected value:", value); 
        setIntrType(value);
        //loadInteractionsByType();
    };

    //#endregion Dropdown Logic

    //#region Pagination Logic

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10); // Number of rows per page

    const indexOfLastRow = currentPage * rowsPerPage; 
    const indexOfFirstRow = indexOfLastRow - rowsPerPage; 

    const filteredData = data != null ? data.filter(item => typeInt === -1 || item.InteractionType === typeInt) : [];
    const currentData = filteredData != null ? filteredData.slice(indexOfFirstRow, indexOfLastRow) : [];
    const totalPages = filteredData != null ? Math.ceil(filteredData.length / rowsPerPage) : 0; 
    
    const handleClick = (page) => {
        setCurrentPage(page)
    }

    //#endregion Pagination Logic

    //#region Action dropdown Logic

    const [actionDropdownOpen, setActionDropdownOpen] = useState(false);

    const editQuestion = (questionId) => {
        navigate(`/edit-question/${questionId}`);
    }

    //#endregion Action dropdown Logic
    const openDescriptionPage = (id) => {
        navigate(`/question/${id}`);
    }

    useEffect(() => {
        loadInteractionsByType();
        //loadInteractionsByKeywords(keywords);
    },[intrType, loadInteractionsByType])

    return (
        <div className='flex flex-col gap-4'>
            
            {/* --- Search ---- */}
            <div className='flex flex-row gap-4 justify-center'>

                <label className="form-control w-fit">

                    <select className="select select-lg select-bordered" value={intrType} onChange={handleDropdownChange}>
                    <option value="all">All</option>
                    <option value="question">Questions</option>
                    <option value="discussion">Discussions</option>
                    <option value="debate">Debates</option>
                </select>
                </label>

                <input type="text" 
                placeholder="Provide comma separated keywords for search" 
                className="input input-bordered input-lg w-full max-w-2xl"
                value={keywords}
                onChange={(event) => {setKeywords(event.target.value)}} />
                
                <button className="btn btn-primary btn-lg" onClick={() => {OnSearchClick()}}>GO</button>
                <button className="btn btn-default btn-lg" 
                        onClick={() => { OnClearClick()}}>Clear</button>
            </div>
            
            {/* --- Search ---- */}

            {/* --- Search results ---- */}
            <div className=" overflow-x-auto">
                <table className="table bg-base-100">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Actions</th>
                        <th>Topic</th>
                        <th>Type</th>
                        <th>Tags</th>
                        <th className='float-right'>Last Update</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.length === 0 && <h3>No records found...</h3>}
                    {currentData.length > 0 && currentData.map(item => (
                        (typeInt === -1 || item.InteractionType === typeInt) &&
                                        <tr key={item.ObjectId} className="hover" onClick={() => {if (!actionDropdownOpen) openDescriptionPage(item.ObjectId)}}>
                                            <td>
                                                <div className="dropdown">
                                                    <button className="btn btn-link" onMouseEnter={() => setActionDropdownOpen(true)} onMouseLeave={() => setActionDropdownOpen(false)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                                    </svg>

                                                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-26 p-2 shadow">
                                                            {userID == item.OwnerId && <li><button className='btn btn-sm' onClick={() => editQuestion(item.ObjectId)}>Edit</button></li>}
                                                            {userID != item.OwnerId && <li><button className='btn btn-sm btn-disabled'>Edit</button></li>}
                                                            {userID == item.OwnerId && <li><button className='btn btn-sm'>Delete</button></li>}
                                                            {userID != item.OwnerId && <li><button className='btn btn-sm btn-disabled'>Delete</button></li>}
                                                        </ul>
                                                    </button>
                                                </div>
                                            </td>

                                            <th>{item.Topic}</th>
                                            <div>
                                            {item.InteractionType === 0 && <td>Question</td>}
                                            {item.InteractionType === 1 && <td>Debate</td>}
                                            {item.InteractionType === 2 && <td>Discussion</td>}
                                            </div>
                                            
                                            <td>
                                                <div className='space-x-1'>
                                                    {item.Tags.split(',').map(tag => <div className="badge badge-outline">{tag}</div>)}
                                                </div>
                                            </td> 

                                            <td className='font-light text-sm float-right'>{new Date(item.DateUpdated).toLocaleDateString()}, at {new Date(item.DateUpdated).toLocaleTimeString()}</td>

                                        </tr> ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4"> 
                <div className="join"> 
                {Array.from({ length: totalPages }, (_, index) => ( 
                    <button key={index + 1} 
                            onClick={() => handleClick(index + 1)} 
                            className={`btn join-item ${currentPage === index + 1 ? 'btn-active' : ''}`} > {index + 1} </button> ))} 
                            </div> 
            </div>
            {/* --- Search results ---- */}
        </div>)
}
export default QuestionsPage;