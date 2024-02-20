import React from "react";
import { Button } from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";

function ESI(){
  const navigate = useNavigate();

  const handleOnClick =()=>{
    navigate ('/tds');
  }

    return (
      <div className="container mx-auto py-16">  
      <h1> ESI OCR Page will render in this page !!</h1>
      <Button variant="filled" onClick={handleOnClick}>Click Here</Button>
    </div>
    );
}

export default ESI;