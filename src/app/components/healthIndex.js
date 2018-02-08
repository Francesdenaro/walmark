import { isVisible } from './../helpers';

export default function healthIndex (container) {
    const pointer = container.querySelector('.js-pointer');
    const valueWrap = container.querySelector('.js-value');
    const value = Number(valueWrap.dataset.value);

    valueWrap.innerHTML = value;

    const animatePointer = () => {
        if (isVisible(pointer)) {
            pointer.style.transform = `translateY(50%) rotate(${(value / 10) * 18}deg)`;
        }
    };

    animatePointer();
    window.addEventListener('scroll', animatePointer);
}
