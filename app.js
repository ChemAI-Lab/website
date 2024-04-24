const options = {
    root: null,
    threshold: 0.04, // Adjust the threshold value to 0.9 for 90% visibility
    rootMargin: "0px", // Adjust as needed
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        console.log("The intersectionRatio is:  " + entry.intersectionRatio);
        if (entry.isIntersecting) { // Checking if more than 40% visible
            entry.target.classList.add('show');
        } 
        // else if (!entry.isIntersecting) { // If not intersecting at all, remove 'show' class
        //     entry.target.classList.remove('show');
        // }
    });
}, options);

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));