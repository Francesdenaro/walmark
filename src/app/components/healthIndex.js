export default function healthIndex (container) {
    const pointer = container.querySelector('.js-pointer');
    const value = Number(container.querySelector('.js-value').innerHTML);

    function isVisible(element) {
        const rect = element.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || container.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || container.documentElement.clientWidth)
        );
    }

    function animation() {
        if (isVisible(pointer)) {
            pointer.style.transform = `translateY(50%) rotate(${(value / 10) * 18}deg)`;
        }
    }

    animation();
    window.addEventListener('scroll', animation);
}
