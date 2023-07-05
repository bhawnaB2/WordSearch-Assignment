import React from "react"
import WordDetails from "./WordDetails"

export default function App(){

  const[showComponent, setShowComponent] = React.useState(false)
  const[inputValue, setInputValue] = React.useState('')

  function handleClick(){
    setShowComponent(true)
  }

  const handleInputChange = (event) =>{
    setInputValue(event.target.value)
  }

  const handleGoBack = () => {
    setShowComponent(false);
  };

  return(
    <div className="initial">
      {!showComponent ?(
        <div>
          <h1 className="heading">Word Search</h1>
          <div style={{margin: "12rem 0 0 0"}}>

              <input
                type="text"
                placeholder="Type your word here"
                value={inputValue}
                onChange={handleInputChange}
                className="inputbox"
                style={{ width: "350px", height: "50px", fontSize: "30px", marginBottom: "20px", padding:"8px", borderRadius: "8px", marginRight: "1rem"}}
              />
              
              <button className="wordinfobutton"onClick={handleClick}>Get word Info</button>
          </div>

        </div>
      ) : (
          <div>
            <button className="backbutton" onClick={handleGoBack}>Go Back</button>
            <WordDetails inputValue={inputValue} goBack ={handleGoBack}/>
          </div>
      )}
    </div>
  )
}