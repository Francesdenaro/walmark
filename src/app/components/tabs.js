export default function tabs(container) {
    const buttons = container.querySelectorAll('.main__button');//
    let activeMain = container.querySelector('.active__main');//

    Array.from(buttons, button =>
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (activeMain) {
                if (button === activeMain) {
                    toggleNavs(button, false);
                } else {
                    toggleNavs(activeMain, false);
                    toggleNavs(button, true);
                }
            } else {
                toggleNavs(button, true);
            }
        })
    );

    function toggleNavs(button, show) {
        const subnav = container.querySelector(`[data-toggle=${button.id}]`);//

        if (show) {
            button.classList.add('active__main');
            subnav.classList.add('active__secondary');//
            activeMain = container.querySelector('.active__main');
        } else {
            subnav.classList.remove('active__secondary');//
            activeMain.classList.remove('active__main');
            activeMain = container.querySelector('.active__main');
        }
    }
}
