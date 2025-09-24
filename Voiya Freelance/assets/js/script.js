// Wait for the document to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const header = document.getElementById('main-header');

    if (menuToggle && header) {
        menuToggle.addEventListener('click', () => {
            header.classList.toggle('is-open');
        });
    }

    // --- Mobile Menu Toggle ---
    const menuHomeToggle = document.getElementById('menu-home-toggle');
    const homeHeader = document.getElementById('main-home-header');

    if (menuHomeToggle && homeHeader) {
        menuHomeToggle.addEventListener('click', () => {
            homeHeader.classList.toggle('is-open');
        });
    }

    // --- Homepage Hero Section Logic ---
    const sideMenuItems = document.querySelectorAll('.side-menu ul li');
    const heroImages = document.querySelectorAll('.hero img.hero-bg');
    const cityName = document.querySelector('.city-name');

    // This block will ONLY run on the Homepage
    if (sideMenuItems.length > 0 && heroImages.length > 0 && cityName) {
        const cities = [
            { name: "Abu Dhabi", index: 0 },
            { name: "Dubai", index: 1 },
            { name: "Sharjah", index: 2 },
            { name: "Ajman", index: 3 }
        ];

        let currentIndex = 1; // Start with Dubai
        let heroInterval;

        function showCity(index) {
            currentIndex = index;

            document.querySelector('.side-menu ul li.active')?.classList.remove('active');
            sideMenuItems[index].classList.add('active');

            heroImages.forEach(img => img.classList.remove('active'));
            heroImages[index].classList.add('active');
            
            cityName.textContent = cities[index].name;
        }
        
        sideMenuItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                showCity(i);
                clearInterval(heroInterval);
                heroInterval = setInterval(autoSwitch, 5000);
            });
        });

        function autoSwitch() {
            currentIndex = (currentIndex + 1) % cities.length;
            showCity(currentIndex);
        }

        showCity(currentIndex); // Initialize
        heroInterval = setInterval(autoSwitch, 5000);
    }

    // --- Details Page Image Gallery Logic ---
    const mainImage = document.getElementById('main-resort-image');
    const thumbnails = document.querySelectorAll('.thumb-gallery .thumbnail');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // This block will ONLY run on the Details Page
    if (mainImage && thumbnails.length > 0 && prevBtn && nextBtn) {
        const galleryImages = [mainImage.src, ...Array.from(thumbnails).map(thumb => thumb.src)];
        let currentIndex = 0;

        const updateGallery = (newIndex) => {
            currentIndex = (newIndex + galleryImages.length) % galleryImages.length;
            const newMainImageSrc = galleryImages[currentIndex];
            const thumbnailSources = galleryImages.filter(src => src !== newMainImageSrc);
            
            mainImage.src = newMainImageSrc;

            thumbnails.forEach((thumb, i) => {
                thumb.src = thumbnailSources[i];
            });
        };

        nextBtn.addEventListener('click', () => updateGallery(currentIndex + 1));
        prevBtn.addEventListener('click', () => updateGallery(currentIndex - 1));

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const newIndex = galleryImages.findIndex(src => src === thumb.src);
                if (newIndex !== -1) {
                    updateGallery(newIndex);
                }
            });
        });

        const wishlistIcon = document.querySelector('.wishlist-icon');
        if (wishlistIcon) {
            wishlistIcon.addEventListener('click', () => {
                const heart = wishlistIcon.querySelector('.fa-heart');
                heart.classList.toggle('fa-regular');
                heart.classList.toggle('fa-solid');
            });
        }
    }

    // --- SITE-WIDE LOGIC (can run on any page) ---

    // --- Navigation Link Active State Handler ---
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPage = window.location.pathname.split('/').pop() || "index.html"; 

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            document.querySelector('nav ul li a.active')?.classList.remove('active');
            link.classList.add('active');
        }
    });

    // --- Modal Logic ---
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    
    window.openLogin = function() {
        if (loginModal) loginModal.style.display = 'flex';
    }
    window.openSignup = function() {
        if (signupModal) signupModal.style.display = 'flex';
    }
    window.closeModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) modal.style.display = 'none';
    }
    window.onclick = function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    }

    // --- Footer Calendar Logic ---
    const checkInWrapper = document.getElementById('checkInWrapper');
    const checkOutWrapper = document.getElementById('checkOutWrapper');
    if (checkInWrapper && checkOutWrapper) {
        const checkInDate = document.getElementById('checkInDate');
        const checkOutDate = document.getElementById('checkOutDate');
        const checkInText = document.getElementById('checkInText');
        const checkOutText = document.getElementById('checkOutText');

        checkInWrapper.addEventListener('click', () => checkInDate.showPicker());
        checkOutWrapper.addEventListener('click', () => checkOutDate.showPicker());

        checkInDate.addEventListener('change', () => {
            checkInText.textContent = checkInDate.value || "Check In";
        });
        checkOutDate.addEventListener('change', () => {
            checkOutText.textContent = checkOutDate.value || "Check Out";
        });
    }

    // --- Destination Page: Filter Tab & Pagination Interactivity ---
    const filterTabs = document.querySelectorAll('.filter-tabs .tab');
    const pageNumbers = document.querySelectorAll('.pagination .page-number');

    if (filterTabs.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelector('.filter-tabs .tab.active')?.classList.remove('active');
                tab.classList.add('active');
            });
        });
    }

    if (pageNumbers.length > 0) {
        pageNumbers.forEach(page => {
            page.addEventListener('click', (event) => {
                event.preventDefault();
                document.querySelector('.pagination .page-number.active')?.classList.remove('active');
                page.classList.add('active');
            });
        });
    }

        // --- Destination Page: Pagination Arrows ---
    const arrows = document.querySelectorAll('.pagination .arrow');

    if (pageNumbers.length > 0 && arrows.length === 2) {
        const prevArrow = arrows[0];
        const nextArrow = arrows[1];

        function changePage(offset) {
            const currentPageEl = document.querySelector('.pagination .page-number.active');
            if (!currentPageEl) return;

            const currentIndex = Array.from(pageNumbers).indexOf(currentPageEl);
            const newIndex = currentIndex + offset;

            if (newIndex >= 0 && newIndex < pageNumbers.length) {
                currentPageEl.classList.remove('active');
                pageNumbers[newIndex].classList.add('active');
            }
        }

        prevArrow.addEventListener('click', (event) => {
            event.preventDefault();
            changePage(-1);
        });

        nextArrow.addEventListener('click', (event) => {
            event.preventDefault();
            changePage(1);
        });
    }

});
