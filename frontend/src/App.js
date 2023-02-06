import React, { useState, useEffect } from "react";

import "./App.css";

import Select from "react-select";
import api from "./service";

import MapImage from "./assets/map.png";


function App() {
  const [countries, setCountries] = useState([]);
  const [initialCountry, setInitialCountry] = useState("");
  const [finalCountry, setFinalCountry] = useState("");
  const [result, setResult] = useState([]);
  const [bestProfit, setBestProfit] = useState(0);
  const [stock, setStock] = useState([]);
  const [maxWeight, setMaxWeight] = useState(0);
  const [productName, setProductName] = useState("");
  const [weight, setWeight] = useState("");
  const [value, setValue] = useState("");

  useEffect(()=>{
    const initCountries = async () => {
      const res = await api.get('/countries');
      const parsedCountries = res.data.countries.map((e)=>{
        return {
          value: e,
          label: e
        }
      })
      setCountries(parsedCountries)
    }

    initCountries();
  },[])

  const findPath = async () => {
    const res = await api.post("find_path", {
      source: initialCountry,
      destination: finalCountry
    })
    setResult(res.data.path);
    findBestProfit();
  }

  const findBestProfit = async () => {
    let weights = [];
    let values = [];
    stock.forEach((e) => {
      weights.push(e.weight);
      values.push(e.value);
    })
    const res = await api.post("merchandise", {
      max_weight: maxWeight,
      weights,
      values
    })
    setBestProfit(res.data.profit);
  }

  const registerProduct = async () => {
    setStock([...stock, {productName, weight, value}])
  }

  return (
    <div className="App">

      <h1>RPG MAP</h1>

      <img src={MapImage} alt="Map" className="Map" />

      <div className="InputContainer" style={{ margin: "10px" }}>
          <div className="InputLabel">
            <label className="Label">Peso máximo:</label>
            <input
              placeholder="Peso máximo" 
              value={maxWeight}
              onChange={e=>setMaxWeight(e.target.value)}
              className="InputField"
            />
          </div>

      </div>

      <div className="InputContainer">

        <div className="InputLabel">
          <label className="Label">País inicial:</label>
          <Select
            options={countries}
            placeholder="País inicial"
            onChange={(e)=>{
                setInitialCountry(e.value);
            }}
            className="SelectField"
          />
        </div>

        <div className="InputLabel">
          <label className="Label">País destino</label>
          <Select
            options={countries}
            placeholder="País destino"
            onChange={(e)=>{
                setFinalCountry(e.value);
            }}
            className="SelectField"
          />
        </div>

      </div>

      <div className="InputContainer" style={{ margin: "10px" }}>
        <div className="InputLabel">
          <label className="Label">Nome do produto:</label>
          <input
              placeholder="Nome do produto" 
              value={productName}
              onChange={e=>setProductName(e.target.value)}
              className="InputField"
          />
        </div>
        <div className="InputLabel">
          <label className="Label">Peso do produto:</label>
          <input
              placeholder="Peso do produto" 
              value={weight}
              onChange={e=>setWeight(e.target.value)}
              className="InputField"
          />
        </div>
        <div className="InputLabel">
          <label className="Label">Valor do produto:</label>
          <input
              placeholder="Valor do produto" 
              value={value}
              onChange={e=>setValue(e.target.value)}
              className="InputField"
          />
        </div>

        <button type="submit" onClick={registerProduct} className="Button" style={{marginLeft: "5px", marginTop: "25px"}}>Registrar</button>


      </div>

      <button type="submit" onClick={findPath} className="SendButton">Enviar</button>

      {
        stock.length > 0 && (
          <ul>
            <p style={{color: "pink"}}>Estoque disponível:</p>
                {stock.map((p) => (
                    <li>Nome: {p.productName} Peso: {p.weight} Valor: {p.value}</li>
                ))}
          </ul>
        )
      }
      
      {
        result.length > 0 && (
            <ul>
              <p style={{color: "pink"}}>Instruções para ir de {initialCountry} para {finalCountry}:</p>
                {result.map((country)=>(
                  <li> Vá para {country}</li>
                ))}
              <p style={{color: "yellow"}}>Lucro máximo: {bestProfit}g</p>
            </ul>
        )
      }
       
    </div>
  );
}

export default App;