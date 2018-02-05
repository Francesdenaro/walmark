export default function tabs(container) {
    const active = 'active';
    const tabs = [...container.querySelectorAll('[data-tabs-tab]')];
    const contents = [...container.querySelectorAll('[data-tabs-content]')];
    let tabActive = tabs.find(tab => tab.classList.contains(active));
    let contentActive = contents.find(content => content.classList.contains(active));

    tabs.forEach((tab) => {
        const content = contents.find(content => content.dataset.tabsContent === tab.dataset.tabsTab);
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            if (tabActive) {
                if (tab === tabActive) {
                    toggleContent(tab);
                } else {
                    toggleContent(tab);
                    toggleContent(tab, content);
                }
            } else {
                toggleContent(tab, content);
            }
        });
    });

    function toggleContent(tab, content) {
        if (content) {
            tab.classList.toggle(active);
            content.classList.toggle(active);
            tabActive = tab;
            contentActive = content;
        } else {
            tabActive.classList.toggle(active);
            contentActive.classList.toggle(active);
            tabActive = null;
            contentActive = null;
        }
    }
}
