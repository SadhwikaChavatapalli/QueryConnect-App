import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DescriptionPage = () =>{

    const {interactionId} = useParams();

    return <>
    This is description page. ID is {interactionId}
    </>
    
}

export default DescriptionPage;