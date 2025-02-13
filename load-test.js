import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

// Definindo as opções do teste (como o número de usuários simultâneos)
export let options = {
  stages: [
    { duration: '1m', target: 100 },  // 100 usuários durante 1 minuto
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% das requisições devem ser abaixo de 500ms
  },
};

export default function () {
  const res = http.get('https://sua-api-mock.com/endpoint');  // Substitua com o URL real da API

  // Verificando o status da requisição
  check(res, {
    'status é 200': (r) => r.status === 200,
    'resposta não demorou muito': (r) => r.timings.duration < 500,  // Garantindo que a resposta seja rápida
  });

  sleep(1);  // Espera de 1 segundo entre as requisições
}
