import React, { useState } from "react";
import styled from "@emotion/styled";
import { calcularMarca, obtenerDiferenciaYear, obtenerPlan } from "../helper";
const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`;
const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Boton = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
  margin-top: 2rem;

  &:hover {
    cursor: pointer;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;
const Formulario = ({ guardarResumen, guardarCargando }) => {
  const [datos, guardar] = useState({
    marca: "",
    year: "",
    plan: "",
  });
  const [error, guardarError] = useState(false);

  // extraer los valores del state

  const { marca, year, plan } = datos;

  // leer datos del formulario y colocarlos en state

  const obtenerInformacion = (evt) => {
    guardar({
      ...datos,
      [evt.target.name]: evt.target.value,
    });
  };

  // envio de datos para cotizacion

  const cotizarSeguro = (evt) => {
    evt.preventDefault();
    console.log("sss");

    if (marca.trim() === "" || year.trim() === "" || plan.trim() === "") {
      guardarError(true);
      return;
    }
    guardarError(false);

    // una base de 2000

    let resultado = 2000;

    // obtener la diferencia de años

    const diferencia = obtenerDiferenciaYear(year);

    // por año se resta el 3%
    resultado -= (diferencia * 3 * resultado) / 100;

    // Americano 15%
    // Asiatico 5%
    // Europeo 30%
    resultado = calcularMarca(marca) * resultado;

    let incrementoPlan = obtenerPlan(plan);

    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

    guardarCargando(true);

    setTimeout(() => {
      guardarCargando(false);
      guardarResumen({
        cotizacion: resultado,
        datos,
      });
    }, 3000);
  };
  return (
    <form onSubmit={cotizarSeguro}>
      {error ? <Error>Todos los campos son obligatorios</Error> : null}
      <Campo>
        <Label>Marca</Label>
        <Select name="marca" value={marca} onChange={obtenerInformacion}>
          <option value="">-- Seleccione --</option>
          <option value="americano">Americano</option>
          <option value="asiatico">Asiatico</option>
          <option value="europeo">Europeo</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Año</Label>
        <Select name="year" value={year} onChange={obtenerInformacion}>
          <option value="">-- Seleccione --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Plan</Label>
        <InputRadio
          type="radio"
          name="plan"
          value="basico"
          checked={plan === "basico"}
          onChange={obtenerInformacion}
        />
        Basico
        <InputRadio
          type="radio"
          name="plan"
          value="completo"
          checked={plan === "completo"}
          onChange={obtenerInformacion}
        />
        Completo
      </Campo>

      <Boton type="submit">Cotizar</Boton>
    </form>
  );
};

export default Formulario;
