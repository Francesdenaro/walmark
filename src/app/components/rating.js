export default function rating (container) {
    const activeClass = 'active';
    const stars = [...container.querySelectorAll('.js-star')];
    
    stars.forEach((star) => {
        const starIndex = stars.indexOf(star);
        
        star.addEventListener('click', () => {
            toggleStars(star);
        });
    });
    
    function toggleStars (currentStar) {
        const activeStars = stars.filter(star => star.classList.contains(activeClass));
        const currentStars = stars.filter(star => stars.indexOf(star) <= stars.indexOf(currentStar));
        const nextStars = stars.filter(star => stars.indexOf(star) > stars.indexOf(currentStar));
        if(currentStars.length == activeStars.length) {
            currentStars.forEach(star => star.classList.toggle(activeClass));
        } else {
            currentStars.forEach((star) => {
                if(!star.classList.contains(activeClass)) {
                    star.classList.toggle(activeClass);
                }
            });
    
            nextStars.forEach((star) => {
                if(star.classList.contains(activeClass)) {
                    star.classList.toggle(activeClass);
                }
            });
        }
    }
}
