import axios from 'axios';

export default function (container) {
    const boxes = [...container.querySelectorAll('.js-box')];
    const toggleBoxes = [...container.querySelectorAll('.js-toggler')];
    const toggleTexts = [...container.querySelectorAll('.js-toggler-text')];
    const boxIcons = [...container.querySelectorAll('.js-icon-box')];
    const reminderBtn = container.querySelector('.js-reminder-submit');
    const reminder = container.querySelector('.js-reminder');
    const mailTimeBtn = container.querySelector('.js-mail-time-submit');
    const mailTime = container.querySelector('.js-mail-time');
    const resetBtn = container.querySelector('.js-reset-submit');
    const active = 'active';
    const inactive = 'inactive';
    const hide = 'v-hide';

    toggleBoxes.forEach((toggler) => {
        const box = boxes.find(box => box.dataset.dayBox === toggler.dataset.dayBtn);
        const innerText = toggleTexts.find(text => text.dataset.dayText === toggler.dataset.dayBtn);
        toggler.addEventListener('click', () => {
            boxToggle(box);
            postRequest(String(box.dataset.dayBox), String(box.classList.contains(active)));

            if (box.classList.contains(active)) {
                innerText.innerHTML = 'Unmark';
            } else if (box.classList.contains(inactive)) {
                innerText.innerHTML = 'Remark';
            }
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
        const innerTick = boxIcons.find(icon => icon.dataset.dayIcon === box.dataset.dayBox && icon.classList.contains('js-tick'));
        const innerCross = boxIcons.find(icon => icon.dataset.dayIcon === box.dataset.dayBox && icon.classList.contains('js-cross'));
        if (!box.classList.contains(active) && !box.classList.contains(inactive)) {
            box.classList.toggle(active);
            innerTick.classList.toggle(hide);
        } else {
            box.classList.toggle(active);
            innerTick.classList.toggle(hide);
            box.classList.toggle(inactive);
            innerCross.classList.toggle(hide);
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
