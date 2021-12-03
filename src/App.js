import { useState } from 'react';
import './App.css';

function App() {
  const [number, setNumber] = useState('')
  const [numbers, setNumbers] = useState([])
  const [checkedNumbers, setCheckedNumbers] = useState([])


  const handleChange = (e) => {
    setNumber(e.target.value)

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setNumbers([...numbers, Number(number)])
    setNumber('')
  }

  const handleChecked = (e) => {
    let input = Number(e.target.value)
    if (checkedNumbers.indexOf(input) !== -1) {
      setCheckedNumbers(checkedNumbers.splice(input, 1))
    } else {
      setCheckedNumbers([...checkedNumbers, input])
    }
  }

  const arrSort = (arr) => {
    let newArr = []
    let num = 1
    let lastArr = []

    let sortedArr = arr.filter(v => checkedNumbers.indexOf(v) === -1) //Filter out the checkedNumbers

    arr.forEach(x => {
      if (x === Math.max(...sortedArr)) { // Determine the maximum number
        newArr.unshift(x) //Then add that maximum number to the begining of the array
      } else if (x === Math.min(...sortedArr)) { // Determine the minimum number
        lastArr = [x] //Create a new array for minimum number
        return lastArr
      } else {
        newArr.splice(num, 0, x) //
        num++
      }
    })
    return newArr.concat(lastArr) //Concatenate the minimum number to the end of the array
  }

  const renderItems = () => {

    return arrSort(numbers).map((number, index) => (
      <div className="row" key={number}>
        <input type="checkbox" value={number} onClick={(e) => handleChecked(e)} />
        <span className={checkedNumbers.includes(number) ? 'strike' : ''}>Number {number}</span>
    </div>
  ))
}

  return (

    <div className="App">
      <div className="column">
        {renderItems()}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="number" value={number} onChange={handleChange} />
      </form>
    </div>
  );
}

export default App;
