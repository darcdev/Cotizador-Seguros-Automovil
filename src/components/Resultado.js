import React from "react";
import styled from "@emotion/styled";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Mensaje = styled.p`
  background-color: rgb(127, 224, 237);
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
`;

const ResultadoCotizacion = styled.div`
  text-align: center;
  padding: 0.5rem;
  border: 1px solid #26c6da;
  background-color: rgb(127, 224, 237);
`;

const TextoCotizacion = styled.p`
  color: #00838f;
  padding: 1rem;
  font-weight: bold;
  margin: 0;
  text-transform: uppercase;
`;

const Resultado = ({ cotizacion }) => {
  return cotizacion === 0 ? (
    <Mensaje>Elige Marca , año y tipo de seguro</Mensaje>
  ) : (
    <ResultadoCotizacion>
      <TransitionGroup component="p" className="resultado">
        <CSSTransition
          classNames="resultado"
          key={cotizacion}
          timeout={{ enter: 500, exit: 500 }}
        >
          <TextoCotizacion>El total es ${cotizacion}</TextoCotizacion>
        </CSSTransition>
      </TransitionGroup>
    </ResultadoCotizacion>
  );
};

export default Resultado;