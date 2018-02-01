export default function tabs(container) {
    const active = 'active';
    const tabs = container.querySelectorAll('.tabs__button');
    let tabActive = container.querySelector('.js-tabs .active');
    const contents = [...container.querySelectorAll('.js-content')];
    let contentActive = contents.find(content => content.classList.contains(active));

    Array.from(tabs, tab =>
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            if (tabActive) {
                if (tab === tabActive) {
                    toggleContent(tab, false);
                } else {
                    toggleContent(tabActive, false);
                    toggleContent(tab, true);
                }
            } else {
                toggleContent(tab, true);
            }
        })
    );

    function toggleContent(tab, show) {
        const contentRef = contents.find(content => content.dataset.tabsContent === tab.dataset.tabsTab);
        if (show) {
            tab.classList.add(active);
            tabActive = tab;
            contentRef.classList.add(active);
            contentActive = contentRef;
        } else {
            tabActive.classList.remove(active);
            tabActive = null;
            contentActive.classList.remove(active);
            contentActive = null;
        }
    }
}
