import axios from 'axios';

export default function (container) {
    const active = 'active';
    const boxes = [...container.querySelectorAll('.js-box')];
    const boxIcons = [...container.querySelectorAll('.js-icon-box')];
    const cross = 'js-cross';
    const hide = 'd-none';
    const inactive = 'inactive';
    const buttonTextArray = [...container.querySelectorAll('.js-text-btn')];
    const mailTimeBtn = container.querySelector('.js-mail-time-submit');
    const mailTime = container.querySelector('.js-mail-time');
    const reminder = container.querySelector('.js-reminder');
    const reminderBtn = container.querySelector('.js-reminder-submit');
    const resetBtn = container.querySelector('.js-reset-submit');
    const tick = 'js-tick';
    const toggleBoxes = [...container.querySelectorAll('.js-toggler')];
    const toggleTexts = [...container.querySelectorAll('.js-toggler-text')];

    toggleBoxes.forEach((toggler) => {
        const box = boxes.find(box => box.dataset.dayBox === toggler.dataset.dayBtn);
        toggler.addEventListener('click', () => {
            boxToggle(box);
            postRequest(box.dataset.dayBox, box.classList.contains(active));
        });
    });

    reminderBtn.addEventListener('click', () => {
        const reminderValue = reminder.value;
        postRequest('reminder', reminderValue);
    });

    mailTimeBtn.addEventListener('click', () => {
        const mailTimeValue = mailTime.value;
        postRequest('mailTime', mailTimeValue);
    });

    resetBtn.addEventListener('click', () => {
        postRequest('reset', true);
    });

    function boxToggle(box) {
        const boxClass = box.classList;
        const boxDataBox = box.dataset.dayBox;
        const buttonText = buttonTextArray.find(text => text.dataset.dayText === boxDataBox);
        const innerTick = boxIcons.find(icon => icon.dataset.dayIcon === boxDataBox && icon.classList.contains(tick));
        const innerCross = boxIcons.find(icon => icon.dataset.dayIcon === boxDataBox && icon.classList.contains(cross));

        if (!boxClass.contains(active) && !boxClass.contains(inactive)) {
            boxClass.toggle(active);
            innerTick.classList.toggle(hide);
            if (buttonText) buttonText.innerHTML = buttonText.dataset.dayTextActive;
        } else {
            boxClass.toggle(active);
            innerTick.classList.toggle(hide);
            boxClass.toggle(inactive);
            innerCross.classList.toggle(hide);

            if (buttonText) {
                boxClass.contains(active) ?
                    buttonText.innerHTML = buttonText.dataset.dayTextActive :
                    buttonText.innerHTML = buttonText.dataset.dayTextInactive;
            }
        }
    }

    function postRequest (valueName, value) {
        axios.post('', {
            [valueName]: value
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
