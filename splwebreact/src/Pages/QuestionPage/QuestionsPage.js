import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const QuestionsPage = () =>{

    const [data, setData] = useState([]);
    useEffect(() => {
        var questions = axios.get(`http://localhost:8080/interactions/question`)
                                .then(response => {
                                    setData(response.data);
                                });
        console.log(questions);
    },[])

    
    return (
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>Topic</th>
                            <th>Tags</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map(item => ( 
                                            <tr key={item.InteractionId} className="hover">
                                                <th>{item.Topic}</th>
                                                <td>{item.Tags}</td>
                                            </tr> ))}
                        </tbody>
                    </table>
                </div>
            )
}
export default QuestionsPage;