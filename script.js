document.addEventListener('DOMContentLoaded', () => {
    
    // Scroll Reveal Animation with better thresholds
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before element is fully in view
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counters if this is the stats section
                if (entry.target.classList.contains('stat-card')) {
                    const counter = entry.target.querySelector('.counter');
                    if (counter && !counter.classList.contains('counted')) {
                        startCounter(counter);
                        counter.classList.add('counted');
                    }
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // Number Counter Animation - Optimized
    function startCounter(element) {
        const target = +element.getAttribute('data-target');
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds
        
        // Use requestAnimationFrame for smoother animation
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Easing function for "tech" feel (easeOutExpo)
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            element.innerText = Math.floor(easeProgress * target).toLocaleString('pt-BR') + suffix;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    }

    // Countdown Timer logic
    function startTimer(duration) {
        let timer = duration, minutes, seconds;
        const display = document.querySelector('#countdown');
        
        setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            if (display) {
                display.textContent = minutes + ":" + seconds;
            }

            if (--timer < 0) {
                timer = duration; // Loop the timer
            }
        }, 1000);
    }
    
    // Initialize timer
    startTimer(10 * 60);
});
