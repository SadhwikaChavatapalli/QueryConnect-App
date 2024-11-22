import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const QuestionsPage = () =>{

    const [data, setData] = useState([]);
    const [intrType, setIntrType] = useState("all");
    const navigate = useNavigate();

    useEffect(() => {
        loadInteractionsByType(intrType);
    },[intrType])

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

    const openDescriptionPage = (id) => {
        navigate(`/question/${id}`);
    }

    // Function to handle the dropdown change 
    const handleDropdownChange = (event) => { 
        const value = event.target.value; 
        console.log("Selected value:", value); 
        setIntrType(value);
        //loadInteractionsByType(value);
    };

    return (
        <div className='flex flex-col gap-4'>
            <label className="form-control w-fit">
                <div className="label">
                <span className="label-text">Showing category</span>
                </div>
                <select className="select select-bordered" value={intrType} onChange={handleDropdownChange}>
                <option value="all">All</option>
                <option value="question">Questions</option>
                <option value="discussion">Discussions</option>
                <option value="debate">Debates</option>
            </select>
            </label>
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
                    {data.map(item => ( 
                                        <tr key={item.ObjectId} className="hover" onClick={() => openDescriptionPage(item.ObjectId)}>
                                            <th>{item.Topic}</th>
                                            <div>
                                            {item.InteractionType === 0 && <td>Question</td>}
                                            {item.InteractionType === 1 && <td>Debate</td>}
                                            {item.InteractionType === 2 && <td>Discussion</td>}
                                            </div>
                                            
                                            <td>{item.Tags}</td>                                                
                                        </tr> ))}
                    </tbody>
                </table>
            </div>
        </div>)
}
export default QuestionsPage;