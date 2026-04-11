document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginLink = document.getElementById('login-link');
    const logoutBtn = document.getElementById('logout-btn');
    const priceFilter = document.getElementById('price-filter');
    const addReviewSection = document.getElementById('add-review');

    let allPlaces = [];

    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }

    function getPlaceIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }    

    function checkAuthentication() {
        const token = getCookie('token');

        if (loginLink && logoutBtn) {
            if (!token) {
                loginLink.style.display = 'inline-block';
                logoutBtn.style.display = 'none';
            } else {
                loginLink.style.display = 'none';
                logoutBtn.style.display = 'inline-block';
            }
        }
        if (addReviewSection) {
            if (!token) {
                addReviewSection.style.display = 'none';
            } else {
                addReviewSection.style.display = 'block';
            }
        }

        return token;
    }
    if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.href = 'index.html';
            });
        }
    async function loginUser(email, password) {
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        return response;
    }

    async function fetchPlaces(token) {
        try {

            const response = await fetch('http://localhost:5000/places/', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch places');
            }

            const places = await response.json();
            allPlaces = places;
            displayPlaces(allPlaces);
        } catch (error) {
            console.error('Error fetching places:', error);
        }
    }

    async function fetchPlaceDetails(token, placeId) {
    try {
        console.log('MY APP - Fetching place details for:', placeId);

        const response = await fetch(`http://localhost:5000/places/${placeId}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch place details');
        }

        const place = await response.json();
        displayPlaceDetails(place);
    } catch (error) {
        console.error('Error fetching place details:', error);
    }
    }

    async function fetchReviews(placeId) {
    try {
        const response = await fetch('http://localhost:5000/reviews/', {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }

        const reviews = await response.json();
        console.log('ALL REVIEWS:', reviews);
        console.log('CURRENT PLACE ID:', placeId);        
        const placeReviews = reviews.filter(review => review.place_id === placeId);
        console.log('FILTERED REVIEWS:', placeReviews);
        displayReviews(placeReviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}

function displayReviews(reviews) {
    const reviewsSection = document.getElementById('reviews');
    if (!reviewsSection) return;

    reviewsSection.innerHTML = '<h2>Reviews</h2>';

    if (reviews.length > 0) {
        reviews.forEach((review) => {
            const reviewCard = document.createElement('article');
            reviewCard.className = 'review-card';

            reviewCard.innerHTML = `
                <h3>User ${review.user_id.slice(0, 6)}</h3>
                <p class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                <p>${review.text || 'No comment provided.'}</p>
            `;

            reviewsSection.appendChild(reviewCard);
        });
    } else {
        const noReviews = document.createElement('p');
        noReviews.textContent = 'No reviews yet.';
        reviewsSection.appendChild(noReviews);
    }
}


const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');

let index = 0;

if (slides.length > 0) {
    setInterval(() => {
        index = (index + 1) % slides.length;
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    }, 3000);
}

function displayPlaceDetails(place) {
    const placeDetails = document.getElementById('place-details');
    const reviewsSection = document.getElementById('reviews');

    if (placeDetails) {
        placeDetails.innerHTML = `
            <div class="place-card-image-wrap">
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80" alt="Place image" class="place-card-image">
            </div>

            <div class="place-card-body">
                <h3 class="place-title">${place.title || place.name || 'Place'}</h3>

                <p class="place-location">
                    📍 ${place.latitude}, ${place.longitude}
                </p>
                
                <p class="place-description">${place.description || 'No description available.'}</p>

                <p class="place-price">
                <span class="price-amount">$${place.price || 0}</span>
                <span class="price-unit">per night</span>
                </p>
            </div>
        `;
    }

    if (placeDetails && place.amenities && place.amenities.length > 0) {
        const amenitiesTitle = document.createElement('h3');
        amenitiesTitle.textContent = 'Amenities';

        const amenitiesList = document.createElement('ul');

        place.amenities.forEach((amenity) => {
            const item = document.createElement('li');
            item.textContent = amenity.name || amenity;
            amenitiesList.appendChild(item);
        });

        placeDetails.appendChild(amenitiesTitle);
        placeDetails.appendChild(amenitiesList);
    }
}

    function displayPlaces(places) {
        const placesList = document.getElementById('places-list');
        if (!placesList) return;

        places.forEach((place) => {
            const placeCard = document.createElement('article');
            placeCard.className = 'place-card';

            placeCard.setAttribute('data-price', place.price || 0);

            placeCard.innerHTML = `
    <div class="place-card-image-wrap">
        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80" class="place-card-image">
    </div>

    <div class="place-card-body">
        <h3 class="place-title">${place.title || 'Place'}</h3>

        <p class="place-description">${place.description || 'No description available.'}</p>

        <p class="place-price">
            <span class="price-amount">$${place.price || 0}</span>
            <span class="price-unit">per night</span>
        </p>

        <a href="place.html?id=${place.id}" class="details-button">View Details</a>
    </div>
`;
          
            placesList.appendChild(placeCard);
        });
    }

    function filterPlacesByPrice(maxPrice) {
        const placeCards = document.querySelectorAll('.place-card');

        placeCards.forEach((card) => {
            const price = parseFloat(card.getAttribute('data-price'));

            if (maxPrice === 'all' || price <= parseFloat(maxPrice)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (priceFilter) {
        priceFilter.addEventListener('change', (event) => {
            filterPlacesByPrice(event.target.value);
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await loginUser(email, password);

                if (response.ok) {
                    const data = await response.json();
                    document.cookie = `token=${data.access_token}; path=/`;
                    window.location.href = 'index.html';
                } else {
                    alert('Login failed: Invalid email or password.');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('An error occurred while logging in.');
            }
        });
    }

    const token = checkAuthentication();

    if (document.getElementById('places-list')) {
        fetchPlaces(token);
    }
   
    if (document.getElementById('place-details')) {
    const placeId = getPlaceIdFromURL();
    console.log('MY APP - Place ID:', placeId);

    if (placeId) {
        fetchPlaceDetails(token, placeId);
        fetchReviews(placeId);
    }

    const reviewForm = document.getElementById('review-form');

    if (reviewForm) {
        reviewForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const reviewText = document.getElementById('review-text').value;
            const rating = document.getElementById('rating').value;

            try {
                const response = await fetch('http://localhost:5000/reviews/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        text: reviewText,
                        rating: parseInt(rating),
                        place_id: placeId
                    })
                });

                if (response.ok) {
                    alert('Review submitted successfully!');
                    reviewForm.reset();
                    window.location.reload();
                } else {
                    const errorData = await response.text();
                    console.error('Review failed:', errorData);
                    alert('Failed to submit review: ' + errorData);
                }

            } catch (error) {
                console.error('Error submitting review:', error);
                alert('Something went wrong');
            }
        });
    }
}    
});