// calcular diferencia años actual - carro
export function obtenerDiferenciaYear(year) {
  return new Date().getFullYear() - year;
}

// calcula el total a pagar segun marca

export function calcularMarca(marca) {
  let incremento;
  switch (marca) {
    case "europeo":
      incremento = 1.3;
      break;
    case "americano":
      incremento = 1.15;
      break;

    case "americano":
      incremento = 1.05;
      break;
    default:
      break;
  }
  return incremento;
}

// calcular tipo seguro

export function obtenerPlan(plan) {
  return plan === "basico" ? 1.2 : 1.5;
}
