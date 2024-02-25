import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [CharacterAllowed, setCharacterAllowed] = useState(false)
  const passwordRef = useRef(0)
  const [password, setpassword] = useState("")


  const passwordGenerator = useCallback((first) => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str += "0123456789"
    }
    if (CharacterAllowed) {
      str += "!@#$%^&*(){}~`-_+=|.,><"
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)

    }
    setpassword(pass)
  }, [setpassword, length, numberAllowed, CharacterAllowed])

  const copyPassword = useCallback(() => {
    passwordRef.current.select()
    passwordRef.current.setSelectionRange(0, 99999)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => { passwordGenerator() }, [length, numberAllowed, CharacterAllowed, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-4xl text-center my-3 text-white'>Password Generator</h1>
        <div className="flex shadow-lg rounded-lg overflow-hidden mb-5">

          <input type="text" value={password} className='outline-none w-full py-2 px-3 ' placeholder="Password" readOnly ref={passwordRef} />
          <button onClick={copyPassword} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-none'>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              className='cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }}
            />
            <label>Length:{length} </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => { setNumberAllowed((prev) => !prev) }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={CharacterAllowed}
              id='CharacterInput'
              onChange={() => { setCharacterAllowed((prev) => !prev) }}
            />
            <label htmlFor="CharacterInput">Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
