import { useState } from 'react'

const ThemeComponent = () => {
  const themeMap = {
    dark: "solar",
    solar: "light",
    light: "dark"
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  const [theme, setTheme] = useState(localStorage.getItem('theme'))

  if(theme === null  || theme === undefined) {
    localStorage.setItem('theme', prefersDark ? Object.keys(themeMap)[0] : Object.keys(themeMap)[2])
    setTheme(localStorage.getItem('theme'))
  }

  localStorage.setItem('theme', theme)
  
  const bodyClass = document.body.classList
  bodyClass.add(localStorage.getItem('theme'));
  
  function toggleTheme() {
    const current = localStorage.getItem('theme')
    const next = themeMap[current]
    setTheme(next)
  
    bodyClass.replace(current, next)
    localStorage.setItem('theme', next)
  }

  return (
    <>
      <p className="test-paragraph">Current Theme is: {theme}, but user prefers { prefersDark ? "dark" : "light" }</p>
      <button className="btn btn-block" onClick={toggleTheme}>Change</button>
    </>
  );
}

export default ThemeComponent