import { useState } from "react";

export const WheatherApp = () => {

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = '0ac7bce12e55b7a9f0f48d503af98a93'
  const difKelvin = 273.15;

  const [ciudad, setciudad] = useState('')
  const [dataClima, setdataClima] = useState(null)

  const handleCambioCiudad = (e) => {
    setciudad(e.target.value)
  }

  const handleSumbit = (e) => {
    e.preventDefault()

    if(ciudad.length > 0) fetchClima()
  }

  const fetchClima = async () => {
    try{
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
      const data = await response.json()
      setdataClima(data)
    }catch(error){
      console.error('Ocurrio el siguiente problema', error)
    }
  }


  return (
    <div className="container">
      <h1>Aplicación de Clima</h1>
      <form  onSubmit={handleSumbit}>
        <input 
        type="text" 
        value={ciudad}
        onChange={handleCambioCiudad} />
        <button type="submit">Buscar</button>
      </form>
      {
      dataClima && (
        <div>
          <h2>{dataClima.name}</h2>
          <p>Temperatura:{parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
          <p>Condicion meteorologica: {dataClima.weather[0].description}</p>
          <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
        </div>
      )
      }
    </div>
  )
}
