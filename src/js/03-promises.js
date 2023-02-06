import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  const firstDelayValue = Number(delay.value);
  const delayStepValue = Number(step.value);
  const amountValue = Number(amount.value);
  for (let position = 1; position <= amountValue; position += 1) {
    const delay = firstDelayValue + delayStepValue * (position - 1);
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
