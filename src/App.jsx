import React, {useState, useEffect, useRef} from "react"


function App() {
  //Many developer use all caps for variables that will be used throughout an app
  const STARTING_TIME = 10
  // Here we set state where needed
  const [text, setText] = useState("")
  const [timerOn, setTimerOn] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
  const [wordCount, setWordCount] = useState(0)
  const textareaRef = useRef(null)

  //This function uses the event object's target property to update the text value
  function handleChange(e) {
    const {name, value} = e.target 
    setText(value)
  }

  function calculateWordCount(text) {
    //Firstly calculate number of words in textarea. Trim() makes sure that spaces are not included.
    const wordsArr = text.trim().split(" ")
    //Next filter out any spaces, specifically if user hasn't typed anything and clicks submit.
    return wordsArr.filter(word => word !== "").length
  }

  //This function turns the timer on, passes the starting time to how much time is remaining and updates text state.
  function startGame() {
      setTimerOn(true)
      setTimeRemaining(STARTING_TIME)
      setText("")
      textareaRef.current.disabled = false
      textareaRef.current.focus()
  }

  function endGame() {
      setTimerOn(false)
      setWordCount(calculateWordCount(text))
  }

  //In this use effect we ask - if time is running and time remaining
  //is less that one, reduce time remaining by one second - if not - end game
  //the dependencies we pass check for changes in timeRemaining and timerOn
  useEffect(() => {
    if(timerOn && timeRemaining > 0) {
        setTimeout(() => {
            setTimeRemaining(time => time - 1)
        }, 1000)
    } else if(timeRemaining === 0) {
      endGame()
  }
}, [timeRemaining, timerOn])

  return (
    //both textarea and button have a disabled property which we make use of here.
    <div>
        <h1>How fast can you type?</h1>
        <textarea 
        name="text"
        value={text}
        onChange={handleChange}
        disabled={!timerOn}
        ref={textareaRef}
        />
        <h4>Time remaining: {timeRemaining}</h4>
        <button 
        onClick={startGame}
        disabled={timerOn}
        >Start Game</button>
        <h1>Word count: {wordCount}</h1>
    </div>
  )
}


export default App
