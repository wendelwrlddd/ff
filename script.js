    // Force start counters immediately to ensure they work
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        startCounter(counter);
    });

    // Scroll Reveal Animation (Visual only)
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // Number Counter Animation - Optimized & Robust
    function startCounter(element) {
        const target = +element.getAttribute('data-target');
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000; 
        
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Simple ease out
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            element.innerText = Math.floor(easeProgress * target).toLocaleString('pt-BR') + suffix;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                 element.innerText = target.toLocaleString('pt-BR') + suffix; // Ensure final value is exact
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
