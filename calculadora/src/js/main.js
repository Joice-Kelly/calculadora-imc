document.addEventListener('DOMContentLoaded', () => {
  //Capturando o evento de submit do formulário
  const form = document.querySelector('#form');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); //Prevenir o comportamento padrão do formulário
    const inputPeso = e.target.querySelector('#peso');
    const inputAltura = e.target.querySelector('#altura');
    const peso = parseFloat(inputPeso.value);
    const altura = parseFloat(inputAltura.value);
    if (isNaN(peso) || peso <= 0) {
      setResultado('Preencha o peso', false);
      return;
    }
    if (isNaN(altura) || altura <= 0) {
      setResultado('Altura inválida', false);
      return;
    }
    const imc = calculateImc(peso, altura);
    const nivelImc = determineImcLevel(imc);
    const msg = `Seu imc é ${imc}(${nivelImc}).`;
    setResultado(msg, true);

  })
  function calculateImc(peso, altura) {
    return (peso / (altura ** 2)).toFixed(2);
  }

  function determineImcLevel(imc) {
    const levels = ['Abaixo do peso',
      'Peso normal',
      'Sobrepeso',
      'Obesidade grau 1',
      'Obesidade grau 2',
      'Obesidade grau 3'];
    if (imc >= 39.9) return levels[5];
    if (imc >= 34.9) return levels[4];
    if (imc >= 29.9) return levels[3];
    if (imc >= 24.9) return levels[2];
    if (imc >= 18.5) return levels[1];
    return levels[0];
  }
  function setResultado(msg, isValid) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';
    const p = document.createElement('p');
    p.className = isValid ? 'paragrafo-resultado' : 'bad';
    p.textContent = msg;
    resultado.appendChild(p);
  }
})