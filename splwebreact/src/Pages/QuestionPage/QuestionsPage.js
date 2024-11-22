import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const QuestionsPage = () =>{

    const [data, setData] = useState([]);
    const [intrType, setIntrType] = useState("all");
    const navigate = useNavigate();

    //#region Search Logic

    const [keywords, setKeywords] = useState('');

    const OnSearchClick = (keywords) => {
        setKeywords(keywords);
    }

    //#endregion Search Logic

    const loadInteractionsByType = (type) => {

        if (type === "all")
        {
            axios.get(`http://localhost:8080/interactions`)
                .then(response => {
                    setData(response.data);
                });
        }
        else
        {
            axios.get(`http://localhost:8080/interactions/type?intrType=${type}`)
                .then(response => {
                    setData(response.data);
                });
        }
        
    }

    const loadInteractionsByKeywords = (keywords) => {
        axios.get(`http://localhost:8080/interactions/search?tags=${keywords}`)
                .then(response => {
                    setData(response.data);
                });
    }

    const openDescriptionPage = (id) => {
        navigate(`/question/${id}`);
    }

    // Function to handle the dropdown change 
    const handleDropdownChange = (event) => { 
        const value = event.target.value; 
        console.log("Selected value:", value); 
        setIntrType(value);
        loadInteractionsByType();
    };

    //#region Pagination Logic

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10); // Number of rows per page

    const indexOfLastRow = currentPage * rowsPerPage; 
    const indexOfFirstRow = indexOfLastRow - rowsPerPage; 
    const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(data.length / rowsPerPage); 
    const handleClick = (page) => setCurrentPage(page)

    //#endregion Pagination Logic

    useEffect(() => {
        //loadInteractionsByType(intrType);
        loadInteractionsByKeywords(keywords);
    },[keywords])

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
                placeholder="Search Topic" 
                className="input input-bordered input-lg w-full max-w-2xl"
                value={keywords}
                onChange={(event) => {setKeywords(event.target.value)}} />
                
                <button className="btn btn-primary btn-lg" onClick={() => {OnSearchClick()}}>GO</button>
                <button className="btn btn-default btn-lg" onClick={() => {OnSearchClick()}}>Clear</button>
            </div>
            
            {/* --- Search ---- */}

            {/* --- Search results ---- */}
            <div className=" overflow-x-auto">
                <table className="table bg-base-100">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Topic</th>
                        <th>Type</th>
                        <th>Tags</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.map(item => ( 
                                        <tr key={item.ObjectId} className="hover" onClick={() => openDescriptionPage(item.ObjectId)}>
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