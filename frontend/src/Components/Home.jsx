import React, { useEffect, useState } from 'react'
import "./Home.css"
// import Select from "react-select";
import axios from 'axios'
export default function Home() {

  const [selectedOptions, setSelectedOptions] = useState("");

  // Array of all options
  const [optionList,setOptionList] =useState({
    movie:"",
    poster:""
  });

 
  const onchange= e =>{
    
    setSelectedOptions(e.target.value);
}
  const onsubmit=async(e)=>{
    e.preventDefault();
    console.log("yup");
    var myParams = {
      data: selectedOptions
  }
    await axios.post("http://127.0.0.1:5000/recommend", myParams).then(
      (response) => {
        let result = response.data;
        setOptionList(result)
        
      },
      (error) => {
        console.log(error);
      }
      );
      setSelectedOptions("");
  
    // navigate("/");        
    
}

  return (
    <div style={{background:'grey'}}>
      <div className="container" >
        <div className='heading' style={{ textAlign: 'center', marginBottom: "25px", marginTop: "10px" }}>
          <h1 >Movie Recommendation System</h1>
        </div>
        <form className="searchbar" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: "100px" }} onSubmit={(e)=>onsubmit(e)}>
          <input
            type={"text"} 
            value={selectedOptions}
            name="selectedOptions"
            onChange={onchange}
          />
          <button className="btn btn-primary"  type='submit' style={{ marginTop: "10px" }}>Search</button>
        
        </form>
        {optionList.movie.length == 0?"":
        <div className="recommendation" style={{ display: 'flex', margin: '0px 0px',padding:'5px' }}>
          <div className="card" style={{ "width": "18rem",margin:'5px',padding:'5px' }}>
          <img className="card-img-top" src={optionList.poster[0]} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">{optionList.movie[0]}</h5>
              {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}

            </div>
          </div>
          <div className="card" style={{ "width": "18rem",margin:'5px',padding:'5px' }}>
          <img className="card-img-top" src={optionList.poster[1]} alt="Card image cap" />
            <div className="card-body">
            <h5 className="card-title">{optionList.movie[1]}</h5>
              {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}

            </div>
          </div>
          <div className="card" style={{ "width": "18rem" ,margin:'5px',padding:'5px'}}>
          <img className="card-img-top" src={optionList.poster[2]} alt="Card image cap" />
            <div className="card-body">
            <h5 className="card-title">{optionList.movie[2]}</h5>
              {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}

            </div>
          </div>
          <div className="card" style={{ "width": "18rem",margin:'5px',padding:'5px' }}>
          <img className="card-img-top" src={optionList.poster[3]} alt="Card image cap" />
            <div className="card-body">
            <h5 className="card-title">{optionList.movie[3]}</h5>
              {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}

            </div>
          </div>
          <div className="card" style={{ "width": "18rem",margin:'5px',padding:'5px' }}>
            <img className="card-img-top" src={optionList.poster[4]} alt="Card image cap" />
            <div className="card-body">
            <h5 className="card-title">{optionList.movie[4]}</h5>
              {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}

            </div>
          </div>

        </div>
        
}
      </div >
    </div>
  )
}
