import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { HttpStatusCode } from 'axios';

const AddQuestion = () => {
  const navigate = useNavigate();
  const [type, setType] = useState(0);
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  

  const SubmitInteraction = (e) => {
    //e.preventDefault();
    console.log(`Interaction topic: ${topic} type: ${type} description: ${description}`);
    //navigate('/home');
    const inputJson = {
                  "InteractionType": type,
                  "Topic": topic,
                  "Tags":tags,
                  "OwnerId":"5ca6ad2c58fb5828cc0b3cb2",
                  "Description":description
                };
    console.log(inputJson);
    axios.post(`http://localhost:8080/interactions`, inputJson,
      { 
        headers: { 'Content-Type': 'application/json' } 
      }
    ).then(response => {
      console.log(response.data);
      if (response.status === HttpStatusCode.Created){
        setAlertMessage("Post added successfully!");
        setAlertVisible(true);
        setTimeout(() => { navigate('/home'); }, 2000);
        
      }
  })
  .catch(ex => {
      console.error(ex); return false;
  });
  };

  const handleDropdownChange = (event) => {
    const value = Number(event.target.value); 
        console.log("Selected value type:", value.type); 
        setType(value);
  }

  return (
    <div className="flex h-screen justify-center justify-items-center">
      <div className="card flex-1 bg-base-100 shadow-x max-w-xl">
        <div className="card-body">
          <h2 className="card-title">Create New Post</h2>
          <input type="text" 
                  placeholder="Specify Topic Name Here" 
                  className="input input-bordered w-full max-w-xl mt-8"
                  value={topic}
                  onChange={(event) => {setTopic(event.target.value)}} />

          <label className="form-control w-full max-w-xl">
            <div className="label">
              <span className="label-text">Type</span>
            </div>
            <select className="select select-bordered w-full max-w-xl" value={type} onChange={handleDropdownChange}>
              <option value={0}>Question</option>
              <option value={2}>Discussion</option>
              <option value={1}>Debate</option>
            </select>
          </label>

          <div className="label">Description</div>
          <textarea className="textarea textarea-bordered w-full max-w-xl" 
                    placeholder="Add description for your topic here"
                    value={description}
                    onChange={(event) => {setDescription(event.target.value)}} />

          <input type="text" 
                  placeholder="Specify tags in comma separated list" 
                  className="input input-bordered w-full max-w-xl mt-8"
                  value={tags}
                  onChange={(event) => {setTags(event.target.value)}} />
                  {alertVisible && ( <div className="flex alert alert-success"> <span>{alertMessage}</span> </div>)}
          <button type='submit' className="btn btn-primary w-full max-w-xl" onClick={SubmitInteraction}>Post</button>
          <button type='cancel' className="btn btn-link w-full max-w-xl">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
