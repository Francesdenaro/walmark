import axios from 'axios';

export default function (container) {
    const actionItems = [...container.querySelectorAll('[data-action-name]')];
    const actionSubmits = [...container.querySelectorAll('[data-action-btn]')];
    const activeClass = 'active';
    const boxes = [...container.querySelectorAll('.js-box')];
    const boxIcons = [...container.querySelectorAll('.js-icon-box')];
    const buttonTextArray = [...container.querySelectorAll('.js-text-btn')];
    const crossClass = 'js-cross';
    const hiddenClass = 'd-none';
    const inactiveClass = 'inactive';
    const mailTimeBtn = container.querySelector('.js-mail-time-submit');
    const mailTime = container.querySelector('.js-mail-time');
    const reminder = container.querySelector('.js-reminder');
    const reminderBtn = container.querySelector('.js-reminder-submit');
    const resetBtn = container.querySelector('.js-reset-submit');
    const tickClass = 'js-tick';
    const toggleBoxes = [...container.querySelectorAll('.js-toggler')];
    const toggleTexts = [...container.querySelectorAll('.js-toggler-text')];

    toggleBoxes.forEach((toggler) => {
        const currentDayBox = boxes.find(box => box.dataset.dayBox === toggler.dataset.dayBtn);
        toggler.addEventListener('click', () => {
            boxToggle(currentDayBox);
            makeRequest('post', { [currentDayBox.dataset.dayBox]: currentDayBox.classList.contains(activeClass) });
        });
    });

    actionSubmits.forEach((button) => {
        const relatedAction = actionItems.find(action => action.dataset.actionName === button.dataset.actionBtn);
        const relatedActionName = relatedAction.dataset.actionName;
        const requestMethod = button.dataset.actionMethod;

        button.addEventListener('click', () => {
            if (relatedActionName === 'reset') {
                makeRequest(requestMethod, { [relatedActionName]: true });
            } else {
                makeRequest(requestMethod, { [relatedActionName]: relatedAction.value });
            }
        });
    });

    function boxToggle(box) {
        const boxClassList = box.classList;
        const dayBox = box.dataset.dayBox;
        const buttonText = buttonTextArray.find(text => text.dataset.dayText === dayBox);
        const innerCross = boxIcons.find(icon => icon.dataset.dayIcon === dayBox && icon.classList.contains(crossClass));
        const innerTick = boxIcons.find(icon => icon.dataset.dayIcon === dayBox && icon.classList.contains(tickClass));

        if (!boxClassList.contains(activeClass) && !boxClassList.contains(inactiveClass)) {
            boxClassList.toggle(activeClass);
            innerTick.classList.toggle(hiddenClass);
            if (buttonText) buttonText.innerHTML = buttonText.dataset.dayTextActive;
        } else {
            boxClassList.toggle(activeClass);
            innerTick.classList.toggle(hiddenClass);
            boxClassList.toggle(inactiveClass);
            innerCross.classList.toggle(hiddenClass);

            if (buttonText) {
                boxClassList.contains(activeClass) ?
                    buttonText.innerHTML = buttonText.dataset.dayTextActive :
                    buttonText.innerHTML = buttonText.dataset.dayTextInactive;
            }
        }
    }

    function makeRequest(method, data, url = '') {
        try {
            axios({
                method,
                url,
                data
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }
}
