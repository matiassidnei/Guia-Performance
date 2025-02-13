import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 100, // Número de usuários virtuais simultâneos
  duration: '30s', // Tempo total do teste
};

export default function () {
  let res = http.get('https://jsonplaceholder.typicode.com/users');

  check(res, {
    'status é 200': (r) => r.status === 200,
    'tempo de resposta < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1); // Simula um pequeno intervalo entre requisições
}
