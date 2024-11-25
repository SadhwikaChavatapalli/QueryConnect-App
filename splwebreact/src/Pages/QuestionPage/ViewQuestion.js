import {React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, { HttpStatusCode } from 'axios';

const ViewQuestion = () => {
  const { id } = useParams(); // Get question ID from URL

  const [data, setData] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [userResponse, setUserResponse] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    console.log('In useEffect');
      getQuestionDataById();
  },[id])

  const getQuestionDataById = () => {
    axios.get(`http://localhost:8080/interactions/interaction?interactionobjectid=${id}`)
            .then(response => {
                setData(response.data[0]);
                axios.get(`http://localhost:8080/responses/${id}`)
                      .then(response => {
                        setResponses(response.data)
                        setLoading(false);
                      });
            });
  }

  const postResponse = () => {
    const userResponseToPost = {
                InteractionId: id,
                ResponseType:data.InteractionType, //0 answer for question, 1 opinion in debate, 2 point in discussion
                OwnerId:localStorage.getItem("user"),
                ResponseContent:userResponse};

                axios.post(`http://localhost:8080/responses`, userResponseToPost,
                  { 
                    headers: { 'Content-Type': 'application/json' } 
                  }
                ).then(response => {
                  console.log(response.data);
                  if (response.status === HttpStatusCode.Created){
                    setUserResponse("");
                    setAlertMessage("Response added successfully!");
                    setAlertVisible(true);
                    setTimeout(() => { setAlertVisible(false); getQuestionDataById();}, 2000);
                    
                    
                  }
              })
              .catch(ex => {
                  console.error(ex); return false;
              });
  }

// Display loading message while fetching data 
if (loading) 
  { 
    return <div>Loading...</div>; 
  }

  return (
    <div className="min-h-screen px-64 py-16">
      <div className="card shadow-xl">
        <div className="card-body bg-base-100">
          <div className='space-x-1'>
            {data.InteractionType === 0 && <div className="badge badge-neutral">Question</div>}
            {data.InteractionType === 1 && <div className="badge badge-neutral">Debate</div>}
            {data.InteractionType === 2 && <div className="badge badge-neutral">Discussion</div>}

            {data.Tags.split(',').map(tag => <div className="badge badge-outline">{tag}</div>)}
          </div>

        <div className='card-title'>{data.Topic}</div>
          <p className="font-medium">{data.Description}</p>

          {responses.length > 0 && (<>
            {data.InteractionType === 0 && <div class="divider">Answers</div>}
            {data.InteractionType === 1 && <div class="divider">Opinions</div>}
            {data.InteractionType === 2 && <div class="divider">Points</div>}

              <>{responses.map(item =>
                                <div className="card bg-base-100 shadow-xl">
                                <div className="card-body bg-base-200">
                                  <p className="font-medium">{item.ResponseContent}</p>
                                  <div className='italic font-light mt-4 text-xs float-right'>Posted on: {new Date(item.DateUpdated).toLocaleDateString()}, at {new Date(item.DateUpdated).toLocaleTimeString()}</div>
                                </div>
                              </div>)
                }</>
          </>)}
          
          <div className="form-control py-16">
            <textarea placeholder="Type your response here" 
                      className="textarea textarea-bordered bg-base-100"
                      value={userResponse}
                      onChange={(event) => {setUserResponse(event.target.value)}}/>
          </div>
          {alertVisible && ( <div className="flex alert alert-success"> <span>{alertMessage}</span> </div>)}

          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={postResponse}>Post Response</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuestion;
