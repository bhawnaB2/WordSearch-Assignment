import React , {useState}from "react"
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        return <p className="error">Enter a valid word.</p>;
      }
      return this.props.children;
    }
  }
  
export default function WordDetails(props){

    const[wordToSearch, setWordToSearch] = React.useState(props.inputValue)
    const [synsArray, setSynsArray] = useState([]);
    const [antsArray, setAntsArray] = useState([]);
    const [definition, setDefinition] = useState([]);
    const [error, setError] = useState("");

    //console.log(wordToSearch)
    async function GetWordInfo() {
    const response = await fetch(
        `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${wordToSearch}?key=6fd735b6-672f-44c3-98b1-8481c58bdaeb`
      );
      const data = await response.json();
      console.log(data)
        if (typeof data[0] === 'object') {

            const synonyms = data[0]?.meta?.syns || [];
            const antonyms = data[0]?.meta?.ants || [];

            const mergedSynsArray = synonyms.reduce((acc, curr) => [...acc, ...curr], []);
            const mergedAntsArray = antonyms.reduce((acc, curr) => [...acc, ...curr], []);

            setSynsArray(mergedSynsArray)
            setAntsArray(mergedAntsArray)
            setDefinition(data[0].shortdef[0] || "");
            setError("")
        } else {
            setError("Invalid word. Please try again.");
            setSynsArray([]);
            setAntsArray([]);
            setDefinition("");
        }
    }
  
    const handleClick= (element) =>{
        setWordToSearch(element);
        GetWordInfo();
    }

    React.useEffect(() => {GetWordInfo()},[])

   // console.log(definition)
    const handleGoBack =() =>{
        props.goBack();
       // console.log("Back button clicked")
    }
    return (
        //    this component should display word , its meaning, synonym and antonyms
        <div className="container">
            <div className="details">
                <h5>You Searched for : {wordToSearch}</h5>
                {error ? (
                    <p className="error">{error}</p>
                ) : (
                    <>
                        <h5>Definition of {wordToSearch} : {definition}</h5>

                        <div className="synsants">
                            <div className="synonyms">
                                <h3>Synonyms</h3>
                                {synsArray?.map((element, index) => (
                                    <div
                                        key={index}
                                        className="grid-item"
                                        onClick={() => handleClick(element)}
                                    >
                                        {element}
                                    </div>
                                ))}
                            </div>
                            <div className="antonyms">
                                <h3>Antonyms</h3>
                                {antsArray?.map((element, index) => (
                                    <div
                                        key={index}
                                        className="grid-item"
                                        onClick={() => handleClick(element)}
                                    >
                                        {element}
                                    </div>
                                ))}
                            </div>
                        </div >
                    </>
                )}
                {/* <button onClick={handleGoBack}>Go Back</button> */}
            </div>
        </div>
    );
}