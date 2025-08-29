// Cook Fine on a Dime - Single Page Application

// Global variables
let selectedIngredients = [];
let selectedMealType = '';
let selectedDietary = '';
let currentRecipes = [];
let userRatings = JSON.parse(localStorage.getItem('userRatings') || '{}');
let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
let userMealPlan = JSON.parse(localStorage.getItem('userMealPlan') || '{}');
let currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');

// Recipe database with enhanced details
const recipeDatabase = [
    {
        id: 'pannkakor',
        name: 'Pannkakor (Swedish Pancakes)',
        ingredients: ['eggs', 'milk', 'flour'],
        image: 'pannkakor.jpg',
        time: 20,
        cost: 8,
        servings: 4,
        dietary: ['vegetarian'],
        rating: 4.5,
        ratingCount: 234,
        mealPlanCount: 156,
        description: 'Traditional Swedish pancakes perfect for any meal',
        instructions: [
            'Mix 3 eggs, 500ml milk, and 200g flour until smooth',
            'Let batter rest for 10 minutes',
            'Heat butter in pan and pour thin layer of batter',
            'Cook until golden, flip and cook other side',
            'Serve with lingonberry jam and sugar'
        ]
    },
    {
        id: 'grilled-cheese',
        name: 'Swedish Grilled Cheese',
        ingredients: ['bread', 'cheese', 'butter'],
        image: 'grilled-cheese.jpg',
        time: 10,
        cost: 15,
        servings: 2,
        dietary: ['vegetarian'],
        rating: 4.2,
        ratingCount: 189,
        mealPlanCount: 203,
        description: 'Crispy grilled cheese with Swedish västerbottensost',
        instructions: [
            'Butter bread slices on outside',
            'Add Swedish cheese between slices',
            'Cook in pan until golden and cheese melts',
            'Serve hot with pickles'
        ]
    },
    {
        id: 'kottbullar',
        name: 'Budget Köttbullar',
        ingredients: ['meat', 'potatoes', 'onion'],
        image: 'kottbullar.jpg',
        time: 45,
        cost: 22,
        servings: 4,
        dietary: ['halal-option'],
        rating: 4.7,
        ratingCount: 456,
        mealPlanCount: 389,
        description: 'Classic Swedish meatballs made budget-friendly',
        instructions: [
            'Mix 500g ground meat with diced onion and breadcrumbs',
            'Form small balls and fry until golden',
            'Make cream sauce with pan drippings',
            'Serve with boiled potatoes and lingonberry jam'
        ]
    },
    {
        id: 'hasselback',
        name: 'Hasselbackspotatis',
        ingredients: ['potatoes', 'butter'],
        image: 'hasselback.jpg',
        time: 60,
        cost: 12,
        servings: 4,
        dietary: ['vegetarian', 'vegan-option', 'gluten-free'],
        rating: 4.3,
        ratingCount: 178,
        mealPlanCount: 134,
        description: 'Crispy sliced Swedish baked potatoes',
        instructions: [
            'Slice potatoes thinly without cutting through',
            'Brush with melted butter and season',
            'Bake at 200°C for 45-60 minutes',
            'Garnish with herbs and serve'
        ]
    },
    {
        id: 'artsoppa',
        name: 'Ärtsoppa (Pea Soup)',
        ingredients: ['peas', 'meat', 'vegetables'],
        image: 'artsoppa.jpg',
        time: 120,
        cost: 18,
        servings: 6,
        dietary: ['gluten-free'],
        rating: 4.4,
        ratingCount: 267,
        mealPlanCount: 89,
        description: 'Traditional Swedish pea soup, perfect for winter',
        instructions: [
            'Soak dried peas overnight',
            'Cook with pork and vegetables for 2 hours',
            'Season with salt and pepper',
            'Serve with mustard and crisp bread'
        ],
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 'pasta-carbonara',
        name: 'Budget Carbonara',
        ingredients: ['pasta', 'eggs', 'cheese'],
        image: 'grilled-cheese.jpg',
        time: 15,
        cost: 12,
        servings: 2,
        dietary: ['vegetarian'],
        rating: 4.6,
        ratingCount: 324,
        mealPlanCount: 278,
        description: 'Creamy pasta without cream - just eggs and cheese',
        instructions: [
            'Cook pasta until al dente',
            'Mix eggs and grated cheese in bowl',
            'Toss hot pasta with egg mixture off heat',
            'Season with pepper and serve immediately'
        ],
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 'rice-and-beans',
        name: 'Swedish Rice & Bean Bowl',
        ingredients: ['rice', 'vegetables', 'onion'],
        image: 'artsoppa.jpg',
        time: 25,
        cost: 9,
        servings: 4,
        dietary: ['vegan', 'gluten-free'],
        rating: 4.1,
        ratingCount: 156,
        mealPlanCount: 145,
        description: 'Complete protein meal with Swedish herbs',
        instructions: [
            'Cook rice according to package directions',
            'Sauté onion and mixed vegetables',
            'Add cooked beans and Swedish seasonings',
            'Serve over rice with lingonberry sauce'
        ]
    },
    {
        id: 'egg-fried-rice',
        name: 'Swedish Egg Fried Rice',
        ingredients: ['rice', 'eggs', 'vegetables'],
        image: 'pannkakor.jpg',
        time: 12,
        cost: 11,
        servings: 3,
        dietary: ['vegetarian', 'gluten-free'],
        rating: 4.3,
        ratingCount: 198,
        mealPlanCount: 167,
        description: 'Quick fried rice with Swedish twist',
        instructions: [
            'Use day-old rice for best texture',
            'Scramble eggs and set aside',
            'Stir-fry rice with vegetables',
            'Add eggs back and season with dill'
        ]
    },
    {
        id: 'potato-soup',
        name: 'Creamy Potato Soup',
        ingredients: ['potatoes', 'milk', 'butter'],
        image: 'hasselback.jpg',
        time: 35,
        cost: 13,
        servings: 4,
        dietary: ['vegetarian', 'gluten-free'],
        rating: 4.4,
        ratingCount: 201,
        mealPlanCount: 123,
        description: 'Hearty soup perfect for cold days',
        instructions: [
            'Dice potatoes and boil until tender',
            'Mash half the potatoes for thickness',
            'Add milk and butter, season well',
            'Garnish with chives and serve hot'
        ],
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 'veggie-pasta',
        name: 'Garden Veggie Pasta',
        ingredients: ['pasta', 'vegetables', 'cheese'],
        image: 'kottbullar.jpg',
        time: 18,
        cost: 14,
        servings: 3,
        dietary: ['vegetarian'],
        rating: 4.2,
        ratingCount: 167,
        mealPlanCount: 189,
        description: 'Fresh vegetables with pasta and cheese',
        instructions: [
            'Cook pasta until al dente',
            'Sauté seasonal vegetables until tender',
            'Toss pasta with vegetables',
            'Top with grated cheese and herbs'
        ]
    },
    {
        id: 'meat-and-potatoes',
        name: 'Simple Meat & Potatoes',
        ingredients: ['meat', 'potatoes', 'vegetables'],
        image: 'kottbullar.jpg',
        time: 40,
        cost: 19,
        servings: 4,
        dietary: ['gluten-free'],
        rating: 4.5,
        ratingCount: 289,
        mealPlanCount: 245,
        description: 'Classic comfort food combination',
        instructions: [
            'Season and brown meat in pan',
            'Add diced potatoes and vegetables',
            'Cover and simmer until tender',
            'Serve with Swedish mustard'
        ]
    },
    {
        id: 'breakfast-bowl',
        name: 'Swedish Breakfast Bowl',
        ingredients: ['eggs', 'potatoes', 'cheese'],
        image: 'pannkakor.jpg',
        time: 20,
        cost: 16,
        servings: 2,
        dietary: ['vegetarian', 'gluten-free'],
        rating: 4.7,
        ratingCount: 178,
        mealPlanCount: 234,
        description: 'Hearty breakfast to start your day',
        instructions: [
            'Roast diced potatoes until crispy',
            'Fry or scramble eggs to preference',
            'Layer in bowl with cheese',
            'Season with salt, pepper, and herbs'
        ],
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
];

// Hide loading screen
window.addEventListener('load', function() {
    setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('hidden');
        }
    }, 1500);
});

// Main search functionality
function handleMainSearch(event) {
    if (event.key === 'Enter') {
        performMainSearch();
    }
}

function performMainSearch() {
    const searchInput = document.getElementById('mainSearch');
    if (!searchInput || !searchInput.value.trim()) return;

    // Parse ingredients from search
    parseIngredientsFromSearch(searchInput.value);
    
    // Show filter section
    showFilterSection();
    
    // Track analytics
    trackEvent('search', 'ingredient_search', searchInput.value);
}

function parseIngredientsFromSearch(searchText) {
    selectedIngredients = [];
    const terms = searchText.toLowerCase().split(/[,\s]+/).filter(term => term.length > 1);
    
    const ingredientMap = {
        'egg': 'eggs', 'eggs': 'eggs',
        'milk': 'milk',
        'bread': 'bread', 'toast': 'bread',
        'butter': 'butter',
        'flour': 'flour',
        'cheese': 'cheese',
        'potato': 'potatoes', 'potatoes': 'potatoes',
        'onion': 'onion', 'onions': 'onion',
        'meat': 'meat', 'beef': 'meat', 'pork': 'meat', 'chicken': 'meat',
        'pasta': 'pasta',
        'rice': 'rice',
        'peas': 'peas',
        'vegetable': 'vegetables', 'vegetables': 'vegetables'
    };
    
    terms.forEach(term => {
        const mapped = ingredientMap[term];
        if (mapped && !selectedIngredients.includes(mapped)) {
            selectedIngredients.push(mapped);
        }
    });
}

function showFilterSection() {
    const filtersSection = document.getElementById('filtersSection');
    const quickIngredients = document.getElementById('quickIngredients');
    
    if (filtersSection) {
        filtersSection.classList.remove('hidden');
        filtersSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    if (quickIngredients) {
        quickIngredients.classList.remove('hidden');
    }
}

// Filter system
function selectMealType(type) {
    selectedMealType = type;
    
    // Update UI
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('selected');
    
    // Show dietary filter
    setTimeout(() => {
        document.getElementById('typeFilter').classList.add('hidden');
        document.getElementById('dietaryFilter').classList.remove('hidden');
    }, 300);
    
    trackEvent('filter', 'meal_type', type);
}

function selectDietary(dietary) {
    selectedDietary = dietary;
    
    // Update UI
    document.querySelectorAll('.dietary-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.querySelector(`[data-diet="${dietary}"]`).classList.add('selected');
    
    // Enable continue button
    document.getElementById('continueBtn').style.opacity = '1';
    document.getElementById('continueBtn').style.pointerEvents = 'auto';
    
    trackEvent('filter', 'dietary', dietary);
}

function showResults() {
    // Filter recipes based on selection
    filterRecipes();
    
    // Show results section
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth' });
    
    // Update results title
    const resultsTitle = document.getElementById('resultsTitle');
    const ingredientText = selectedIngredients.length > 0 ? ` with ${selectedIngredients.join(', ')}` : '';
    resultsTitle.textContent = `${selectedMealType} recipes${ingredientText}`;
    
    trackEvent('results', 'show_results', `${selectedMealType}_${selectedDietary}`);
}

function filterRecipes() {
    currentRecipes = recipeDatabase.filter(recipe => {
        // Check ingredient matches
        let hasIngredients = selectedIngredients.length === 0;
        if (selectedIngredients.length > 0) {
            hasIngredients = selectedIngredients.some(ingredient => 
                recipe.ingredients.includes(ingredient)
            );
        }
        
        // Check meal type
        let matchesMealType = true;
        if (selectedMealType === 'quick' && recipe.time > 30) {
            matchesMealType = false;
        }
        if (selectedMealType === 'budget' && recipe.cost > 25) {
            matchesMealType = false;
        }
        if (selectedMealType === 'both' && (recipe.time > 30 || recipe.cost > 25)) {
            matchesMealType = false;
        }
        
        // Check dietary requirements
        let matchesDietary = true;
        if (selectedDietary !== 'none') {
            matchesDietary = recipe.dietary.includes(selectedDietary) || 
                           recipe.dietary.includes(`${selectedDietary}-option`);
        }
        
        return hasIngredients && matchesMealType && matchesDietary;
    });
    
    displayRecipes(currentRecipes);
}

function displayRecipes(recipes) {
    const recipeGrid = document.getElementById('recipeGrid');
    if (!recipeGrid) return;
    
    if (recipes.length === 0) {
        recipeGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <h3>No recipes found matching your criteria</h3>
                <p>Try adjusting your filters or adding different ingredients</p>
            </div>
        `;
        return;
    }
    
    recipeGrid.innerHTML = recipes.map(recipe => `
        <div class="modern-recipe-card" onclick="openRecipeModal('${recipe.id}')">
            <div class="recipe-image-container">
                <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
                <div class="recipe-badges">
                    ${recipe.dietary.map(diet => `
                        <span class="badge ${diet}">${formatDietary(diet)}</span>
                    `).join('')}
                </div>
            </div>
            <div class="recipe-info">
                <h3 class="recipe-title">${recipe.name}</h3>
                <div class="recipe-stats">
                    <div class="stat-item">
                        <i class="fas fa-clock"></i>
                        <span>${recipe.time} min</span>
                    </div>
                    <div class="stat-item cost-highlight">
                        <i class="fas fa-coins"></i>
                        <span>${recipe.cost} kr</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-users"></i>
                        <span>${recipe.servings} servings</span>
                    </div>
                </div>
                <div class="recipe-rating">
                    <div class="stars">
                        ${generateStars(recipe.rating)}
                    </div>
                    <span class="rating-count">(${recipe.ratingCount})</span>
                </div>
                <div class="meal-plan-count">
                    <i class="fas fa-calendar-alt"></i>
                    ${recipe.mealPlanCount} people planned this
                </div>
            </div>
        </div>
    `).join('');
}

function formatDietary(dietary) {
    const labels = {
        'vegetarian': 'Veggie',
        'vegan': 'Vegan',
        'vegan-option': 'Vegan opt.',
        'halal': 'Halal',
        'halal-option': 'Halal opt.',
        'kosher': 'Kosher',
        'gluten-free': 'GF',
        'lactose-free': 'LF',
        'paleo': 'Paleo'
    };
    return labels[dietary] || dietary;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt star"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star star"></i>';
    }
    
    return stars;
}

function sortResults() {
    const sortBy = document.getElementById('sortBy').value;
    
    currentRecipes.sort((a, b) => {
        switch (sortBy) {
            case 'cost':
                return a.cost - b.cost;
            case 'time':
                return a.time - b.time;
            case 'rating':
                return b.rating - a.rating;
            case 'popularity':
            default:
                return b.mealPlanCount - a.mealPlanCount;
        }
    });
    
    displayRecipes(currentRecipes);
    trackEvent('sort', 'recipes', sortBy);
}


// Modal functionality
function openRecipeModal(recipeId) {
    const recipe = recipeDatabase.find(r => r.id === recipeId);
    if (!recipe) return;
    
    const modal = document.getElementById('recipeModal');
    const modalBody = document.getElementById('recipeModalBody');
    
    const userRating = userRatings[recipeId] || 0;
    const isFavorite = favoriteRecipes.includes(recipeId);
    
    modalBody.innerHTML = `
        <div class="recipe-header">
            <div class="recipe-image-container">
                <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
                ${recipe.video ? `
                    <div class="recipe-video">
                        <h4>Watch How to Make It:</h4>
                        <iframe width="100%" height="315" src="${recipe.video}" frameborder="0" allowfullscreen></iframe>
                    </div>
                ` : ''}
            </div>
            <div class="recipe-meta">
                <h1>${recipe.name}</h1>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-stats">
                    <div class="stat">
                        <span class="stat-label">Time</span>
                        <span class="stat-value">${recipe.time} min</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Cost</span>
                        <span class="stat-value">${recipe.cost} kr</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Serves</span>
                        <span class="stat-value">${recipe.servings}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Rating</span>
                        <span class="stat-value">${recipe.rating} ⭐</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="recipe-actions">
            <button class="recipe-action-btn" onclick="rateRecipe('${recipeId}')">
                <i class="fas fa-star"></i>
                <span>${userRating > 0 ? `You rated: ${userRating}⭐` : 'Rate this recipe'}</span>
            </button>
            <button class="recipe-action-btn" onclick="addToMealPlan('${recipeId}')">
                <i class="fas fa-calendar-plus"></i>
                <span>Add to Meal Plan</span>
            </button>
            <button class="recipe-action-btn" onclick="toggleFavorite('${recipeId}')" id="favoriteBtn-${recipeId}">
                <i class="fas fa-heart${isFavorite ? '' : '-o'}"></i>
                <span>${isFavorite ? 'Remove from' : 'Add to'} Favorites</span>
            </button>
            <button class="recipe-action-btn" onclick="editRecipe('${recipeId}')">
                <i class="fas fa-edit"></i>
                <span>Edit & Save</span>
            </button>
            <button class="recipe-action-btn" onclick="createVariation('${recipeId}')">
                <i class="fas fa-copy"></i>
                <span>Create Variation</span>
            </button>
            <button class="recipe-action-btn" onclick="showSubstitutions('${recipeId}')">
                <i class="fas fa-exchange-alt"></i>
                <span>Ingredient Swaps</span>
            </button>
        </div>
        
        <div class="recipe-content">
            <div class="ingredients-section">
                <h3>Ingredients</h3>
                <ul class="ingredients-list">
                    ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
            
            <div class="instructions-section">
                <h3>Instructions</h3>
                <ol class="instructions-list">
                    ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                </ol>
            </div>
        </div>
        
        <div class="social-sharing">
            <h4>Share this recipe:</h4>
            <div style="display: flex; gap: 1rem;">
                <button class="social-btn facebook" onclick="shareRecipe('${recipeId}', 'facebook')">
                    <i class="fab fa-facebook-f"></i>
                </button>
                <button class="social-btn twitter" onclick="shareRecipe('${recipeId}', 'twitter')">
                    <i class="fab fa-twitter"></i>
                </button>
                <button class="social-btn pinterest" onclick="shareRecipe('${recipeId}', 'pinterest')">
                    <i class="fab fa-pinterest"></i>
                </button>
                <button class="social-btn whatsapp" onclick="shareRecipe('${recipeId}', 'whatsapp')">
                    <i class="fab fa-whatsapp"></i>
                </button>
            </div>
        </div>
        
        <div class="recipe-comments">
            <h4>Comments & Reviews</h4>
            <div class="comment-form">
                <div class="rating-input">
                    <span>Your rating:</span>
                    <div class="rating-stars" id="ratingStars-${recipeId}">
                        ${[1,2,3,4,5].map(i => `
                            <button class="rating-star ${i <= userRating ? 'active' : ''}" 
                                    onclick="setRating('${recipeId}', ${i})">${i <= userRating ? '★' : '☆'}</button>
                        `).join('')}
                    </div>
                </div>
                <textarea placeholder="Share your experience with this recipe..." rows="3"></textarea>
                <button class="cta-button" onclick="submitComment('${recipeId}')">Post Comment</button>
            </div>
            
            <div class="comments-list" id="comments-${recipeId}">
                <!-- Comments would be loaded from backend -->
                <div class="comment">
                    <div class="comment-author">Anna L. <span class="comment-date">2 days ago</span></div>
                    <div class="comment-rating">${generateStars(5)}</div>
                    <p>Perfect recipe! Made it for my family and everyone loved it. Great for beginners too.</p>
                </div>
                <div class="comment">
                    <div class="comment-author">Erik S. <span class="comment-date">1 week ago</span></div>
                    <div class="comment-rating">${generateStars(4)}</div>
                    <p>Really good, though I added more seasoning to taste. Will make again!</p>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    trackEvent('recipe', 'view_recipe', recipeId);
}

// Authentication functions
function checkLogin() {
    return currentUser !== null;
}

function requireLogin(callback, feature = 'this feature') {
    if (!checkLogin()) {
        showLoginModal(callback, feature);
        return false;
    }
    return true;
}

function showLoginModal(callback = null, feature = 'this feature') {
    const modal = document.getElementById('loginModal');
    const modalBody = document.getElementById('loginModalBody');
    
    modalBody.innerHTML = `
        <div class="login-form">
            <div class="auth-tabs">
                <button class="auth-tab active" onclick="switchAuthTab('login')">Login</button>
                <button class="auth-tab" onclick="switchAuthTab('signup')">Sign Up</button>
            </div>
            
            <div id="loginTab" class="auth-content">
                <h3>Welcome Back!</h3>
                <p>Login to access ${feature}</p>
                <form onsubmit="handleLogin(event)" class="auth-form">
                    <input type="email" id="loginEmail" placeholder="Email" required>
                    <input type="password" id="loginPassword" placeholder="Password" required>
                    <button type="submit" class="auth-button">Login</button>
                </form>
            </div>
            
            <div id="signupTab" class="auth-content hidden">
                <h3>Join Us!</h3>
                <p>Create an account to save favorites and meal plans</p>
                <form onsubmit="handleSignup(event)" class="auth-form">
                    <input type="text" id="signupName" placeholder="Full Name" required>
                    <input type="email" id="signupEmail" placeholder="Email" required>
                    <input type="password" id="signupPassword" placeholder="Password" minlength="6" required>
                    <input type="password" id="signupConfirm" placeholder="Confirm Password" required>
                    <button type="submit" class="auth-button">Sign Up</button>
                </form>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Store callback for after login
    modal.dataset.callback = callback ? callback.toString() : '';
}

function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-content').forEach(c => c.classList.add('hidden'));
    
    document.querySelector(`[onclick="switchAuthTab('${tab}')"]`).classList.add('active');
    document.getElementById(`${tab}Tab`).classList.remove('hidden');
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (registeredUsers[email] && registeredUsers[email].password === password) {
        currentUser = {
            email: email,
            name: registeredUsers[email].name
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        alert(`Welcome back, ${currentUser.name}!`);
        closeModal('loginModal');
        
        // Execute callback if exists
        const modal = document.getElementById('loginModal');
        if (modal.dataset.callback) {
            eval(modal.dataset.callback);
        }
        
        trackEvent('auth', 'login_success', email);
    } else {
        alert('Invalid email or password');
    }
}

function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;
    
    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }
    
    if (registeredUsers[email]) {
        alert('Account already exists with this email');
        return;
    }
    
    registeredUsers[email] = {
        name: name,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    currentUser = { email: email, name: name };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert(`Welcome to Cook Fine on a Dime, ${name}!`);
    closeModal('loginModal');
    
    trackEvent('auth', 'signup_success', email);
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    alert('You have been logged out');
    trackEvent('auth', 'logout');
}

// Navigation modal functions
function openMealPlanner() {
    if (!requireLogin(() => openMealPlanner(), 'meal planner with PDF download')) {
        return;
    }
    
    const modal = document.getElementById('mealPlannerModal');
    const modalBody = document.getElementById('mealPlannerBody');
    
    modalBody.innerHTML = `
        <div class="meal-planner-step">
            <h3>What's your goal for this week?</h3>
            <div class="goal-options">
                <button class="goal-btn" onclick="setMealPlanGoal('budget')">
                    <i class="fas fa-piggy-bank"></i>
                    <span>Save Money</span>
                    <small>Budget-friendly meals</small>
                </button>
                <button class="goal-btn" onclick="setMealPlanGoal('healthy')">
                    <i class="fas fa-heart"></i>
                    <span>Eat Healthy</span>
                    <small>Nutritious balanced meals</small>
                </button>
                <button class="goal-btn" onclick="setMealPlanGoal('quick')">
                    <i class="fas fa-clock"></i>
                    <span>Save Time</span>
                    <small>Quick & easy meals</small>
                </button>
                <button class="goal-btn" onclick="setMealPlanGoal('variety')">
                    <i class="fas fa-star"></i>
                    <span>Try New Things</span>
                    <small>Discover new recipes</small>
                </button>
            </div>
        </div>
        
        <div class="meal-planner-step">
            <h3>What ingredients do you already have?</h3>
            <div class="ingredient-grid">
                ${['eggs', 'milk', 'bread', 'butter', 'flour', 'cheese', 'potatoes', 'onion', 'meat', 'vegetables'].map(ingredient => `
                    <label class="ingredient-item">
                        <input type="checkbox" value="${ingredient}">
                        <span>${ingredient}</span>
                    </label>
                `).join('')}
            </div>
        </div>
        
        <div class="meal-planner-step">
            <h3>Target calories per day:</h3>
            <select id="calorieTarget">
                <option value="1500">1500 kcal (Weight loss)</option>
                <option value="2000" selected>2000 kcal (Maintenance)</option>
                <option value="2500">2500 kcal (Active lifestyle)</option>
                <option value="custom">Custom amount</option>
            </select>
        </div>
        
        <button class="cta-button" onclick="generateMealPlan()">Generate My Meal Plan</button>
        
        <div class="meal-calendar hidden" id="mealCalendar">
            <h3>Your Weekly Meal Plan</h3>
            <div class="meal-calendar">
                ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => `
                    <div class="calendar-day">
                        <h4>${day}</h4>
                        <div class="meal-slot" data-meal="breakfast">+ Breakfast</div>
                        <div class="meal-slot" data-meal="lunch">+ Lunch</div>
                        <div class="meal-slot" data-meal="dinner">+ Dinner</div>
                    </div>
                `).join('')}
            </div>
            <div class="meal-plan-actions">
                <button class="cta-button" onclick="saveMealPlan()">Save Meal Plan</button>
                <button class="cta-button secondary" onclick="downloadMealPlanPDF()">Download PDF</button>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    trackEvent('modal', 'open_meal_planner');
}

function openRecipeBank() {
    const modal = document.getElementById('recipeBookModal');
    const modalBody = document.getElementById('recipeBookBody');
    
    modalBody.innerHTML = `
        <div class="recipe-book-tabs">
            <button class="tab-btn active" onclick="showRecipeBookTab('all')">
                <i class="fas fa-book"></i> All Recipes (${recipeDatabase.length})
            </button>
            <button class="tab-btn" onclick="showRecipeBookTab('categories')">
                <i class="fas fa-tags"></i> Categories
            </button>
            <button class="tab-btn" onclick="showRecipeBookTab('popular')">
                <i class="fas fa-fire"></i> Most Popular
            </button>
        </div>
        
        <div class="recipe-book-content" id="recipeBookContent">
            ${renderAllRecipes()}
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    trackEvent('modal', 'open_recipe_bank');
}

function openMyFavorites() {
    if (!requireLogin(() => openMyFavorites(), 'your saved favorites')) {
        return;
    }
    
    const modal = document.getElementById('myFavoritesModal');
    const modalBody = document.getElementById('myFavoritesBody');
    
    modalBody.innerHTML = `
        <div class="favorites-content">
            <div class="user-info">
                <h3>Welcome, ${currentUser.name}!</h3>
                <p>Your saved favorite recipes (${favoriteRecipes.length})</p>
                <button class="logout-btn" onclick="logout()">Logout</button>
            </div>
            
            ${favoriteRecipes.length === 0 ? `
                <div class="empty-favorites">
                    <i class="fas fa-heart-broken"></i>
                    <h3>No favorites yet</h3>
                    <p>Start exploring recipes and click the heart icon to save your favorites!</p>
                    <button class="cta-button" onclick="closeModal('myFavoritesModal')">Browse Recipes</button>
                </div>
            ` : `
                <div class="favorites-grid">
                    ${renderFavoriteRecipes()}
                </div>
            `}
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    trackEvent('modal', 'open_my_favorites');
}

function openSubmitRecipe() {
    const modal = document.getElementById('submitRecipeModal');
    const modalBody = document.getElementById('submitRecipeBody');
    
    modalBody.innerHTML = `
        <form class="recipe-submission-form" onsubmit="submitNewRecipe(event)">
            <div class="form-group">
                <label for="recipeName">Recipe Name *</label>
                <input type="text" id="recipeName" required placeholder="e.g., My Budget Pasta">
            </div>
            
            <div class="form-group">
                <label for="recipeDescription">Description *</label>
                <textarea id="recipeDescription" required rows="2" placeholder="Brief description of your recipe..."></textarea>
            </div>
            
            <div class="ingredients-section">
                <h4>Ingredients</h4>
                <div id="ingredientsList">
                    <div class="ingredient-row">
                        <input type="text" placeholder="Ingredient name" required>
                        <input type="text" placeholder="Amount" required>
                        <input type="number" placeholder="Cost (kr)" step="0.1" min="0">
                        <button type="button" onclick="removeIngredient(this)">❌</button>
                    </div>
                </div>
                <button type="button" class="add-ingredient" onclick="addIngredient()">+ Add Ingredient</button>
            </div>
            
            <div class="form-group">
                <label for="cookingTime">Cooking Time (minutes) *</label>
                <input type="number" id="cookingTime" required min="1" max="300">
            </div>
            
            <div class="form-group">
                <label for="servings">Number of Servings *</label>
                <input type="number" id="servings" required min="1" max="12">
            </div>
            
            <div class="form-group">
                <label>Dietary Options</label>
                <div class="dietary-options">
                    <label class="checkbox-label">
                        <input type="checkbox" value="vegetarian"> Vegetarian
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="vegan"> Vegan
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="halal"> Halal
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="kosher"> Kosher
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="gluten-free"> Gluten-Free
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" value="lactose-free"> Lactose-Free
                    </label>
                </div>
            </div>
            
            <div class="form-group">
                <label for="instructions">Cooking Instructions *</label>
                <textarea id="instructions" required rows="6" placeholder="Step by step instructions..."></textarea>
            </div>
            
            <div class="total-cost-display">
                <strong>Estimated total cost: <span id="totalCost">0 kr</span></strong>
                <br>
                <strong>Cost per serving: <span id="costPerServing">0 kr</span></strong>
            </div>
            
            <button type="submit" class="submit-button">Submit Recipe</button>
        </form>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    trackEvent('modal', 'open_submit_recipe');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Recipe interaction functions
function toggleFavorite(recipeId) {
    const index = favoriteRecipes.indexOf(recipeId);
    const btn = document.getElementById(`favoriteBtn-${recipeId}`);
    
    if (index > -1) {
        favoriteRecipes.splice(index, 1);
        btn.innerHTML = '<i class="far fa-heart"></i><span>Add to Favorites</span>';
    } else {
        favoriteRecipes.push(recipeId);
        btn.innerHTML = '<i class="fas fa-heart"></i><span>Remove from Favorites</span>';
    }
    
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    trackEvent('recipe', 'toggle_favorite', recipeId);
}

function setRating(recipeId, rating) {
    userRatings[recipeId] = rating;
    localStorage.setItem('userRatings', JSON.stringify(userRatings));
    
    // Update UI
    const stars = document.querySelectorAll(`#ratingStars-${recipeId} .rating-star`);
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
            star.textContent = '★';
        } else {
            star.classList.remove('active');
            star.textContent = '☆';
        }
    });
    
    trackEvent('recipe', 'rate_recipe', `${recipeId}:${rating}`);
}

function shareRecipe(recipeId, platform) {
    const recipe = recipeDatabase.find(r => r.id === recipeId);
    const url = window.location.href;
    const text = `Check out this amazing recipe: ${recipe.name} - Cook fine on a dime!`;
    
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    trackEvent('social', 'share_recipe', `${recipeId}:${platform}`);
}

// Analytics tracking
function trackEvent(category, action, label) {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Console log for debugging
    console.log(`Analytics: ${category} - ${action} - ${label}`);
}

// Utility functions
function renderFavoriteRecipes() {
    if (favoriteRecipes.length === 0) {
        return '<p>No favorite recipes yet. Start exploring and add some recipes to your favorites!</p>';
    }
    
    return `
        <div class="recipe-grid">
            ${favoriteRecipes.map(recipeId => {
                const recipe = recipeDatabase.find(r => r.id === recipeId);
                return recipe ? `
                    <div class="recipe-card" onclick="openRecipeModal('${recipe.id}')">
                        <img src="${recipe.image}" alt="${recipe.name}">
                        <div class="recipe-info">
                            <h4>${recipe.name}</h4>
                            <p>Cost: ${recipe.cost} kr per serving</p>
                        </div>
                    </div>
                ` : '';
            }).join('')}
        </div>
    `;
}

function renderAllRecipes() {
    return `
        <div class="recipe-grid">
            ${recipeDatabase.map(recipe => `
                <div class="recipe-card" onclick="openRecipeModal('${recipe.id}')">
                    <img src="${recipe.image}" alt="${recipe.name}">
                    <div class="recipe-info">
                        <h4>${recipe.name}</h4>
                        <p class="recipe-cost">Cost: ${recipe.cost} kr per serving</p>
                        <p class="recipe-time">Time: ${recipe.time} minutes</p>
                        <div class="recipe-rating">
                            ${generateStars(recipe.rating)} (${recipe.ratingCount})
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function downloadMealPlanPDF() {
    // Create PDF content
    const mealPlan = {};
    document.querySelectorAll('.meal-slot.filled').forEach(slot => {
        const day = slot.closest('.calendar-day').querySelector('h4').textContent;
        const meal = slot.getAttribute('data-meal');
        if (!mealPlan[day]) mealPlan[day] = {};
        mealPlan[day][meal] = slot.textContent;
    });
    
    if (Object.keys(mealPlan).length === 0) {
        alert('Please generate a meal plan first before downloading PDF');
        return;
    }
    
    // Create PDF content as text (in a real app, you'd use a PDF library)
    let pdfContent = `
COOK FINE ON A DIME - WEEKLY MEAL PLAN
Generated for: ${currentUser.name}
Date: ${new Date().toLocaleDateString()}

=============================================

`;
    
    Object.entries(mealPlan).forEach(([day, meals]) => {
        pdfContent += `${day.toUpperCase()}\\n`;
        pdfContent += '─────────────────\\n';
        Object.entries(meals).forEach(([mealType, recipeName]) => {
            pdfContent += `${mealType.charAt(0).toUpperCase() + mealType.slice(1)}: ${recipeName}\\n`;
        });
        pdfContent += '\\n';
    });
    
    pdfContent += `
=============================================
Enjoy your week of delicious, budget-friendly meals!
Visit cookfineonadime.com for more recipes.
`;
    
    // Create and download file
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `meal-plan-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    
    alert('Meal plan downloaded! (Note: In a real app, this would be a formatted PDF)');
    trackEvent('meal_planner', 'download_pdf');
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize filter section as hidden
    const filtersSection = document.getElementById('filtersSection');
    if (filtersSection) {
        filtersSection.classList.add('hidden');
    }
    
    // Focus on main search
    const mainSearch = document.getElementById('mainSearch');
    if (mainSearch) {
        mainSearch.focus();
    }
    
    // Show login status if logged in
    if (currentUser) {
        console.log(`Welcome back, ${currentUser.name}!`);
    }
});

// Additional missing functions for complete functionality

// Meal planner functions
function setMealPlanGoal(goal, element) {
    // Save goal and update UI
    document.querySelectorAll('.goal-btn').forEach(btn => btn.classList.remove('selected'));
    if (element) element.classList.add('selected');
    trackEvent('meal_planner', 'set_goal', goal);
}

function generateMealPlan() {
    const calendar = document.getElementById('mealCalendar');
    if (calendar) {
        calendar.classList.remove('hidden');
        
        // Generate random meal suggestions based on available recipes
        const meals = ['breakfast', 'lunch', 'dinner'];
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        
        days.forEach((day, dayIndex) => {
            meals.forEach(meal => {
                const slot = document.querySelector(`.calendar-day:nth-child(${dayIndex + 1}) [data-meal="${meal}"]`);
                if (slot && Math.random() > 0.3) { // 70% chance to fill slot
                    const randomRecipe = recipeDatabase[Math.floor(Math.random() * recipeDatabase.length)];
                    slot.textContent = randomRecipe.name;
                    slot.classList.add('filled');
                    slot.onclick = () => openRecipeModal(randomRecipe.id);
                }
            });
        });
        
        trackEvent('meal_planner', 'generate_plan');
    }
}

function saveMealPlan() {
    // Save current meal plan to localStorage
    const mealPlan = {};
    document.querySelectorAll('.meal-slot.filled').forEach(slot => {
        const day = slot.closest('.calendar-day').querySelector('h4').textContent;
        const meal = slot.getAttribute('data-meal');
        if (!mealPlan[day]) mealPlan[day] = {};
        mealPlan[day][meal] = slot.textContent;
    });
    
    localStorage.setItem('userMealPlan', JSON.stringify(mealPlan));
    alert('Meal plan saved! You can access it from your Recipe Book.');
    trackEvent('meal_planner', 'save_plan');
}

function addToMealPlan(recipeId) {
    // This would open a date picker to add recipe to specific meal
    const recipe = recipeDatabase.find(r => r.id === recipeId);
    alert(`"${recipe.name}" will be added to your meal planner! (Feature coming soon)`);
    trackEvent('recipe', 'add_to_meal_plan', recipeId);
}

// Recipe book functions
function showRecipeBookTab(tab, element) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if (element) element.classList.add('selected');
    
    const content = document.getElementById('recipeBookContent');
    
    switch(tab) {
        case 'favorites':
            content.innerHTML = renderFavoriteRecipes();
            break;
        case 'custom':
            content.innerHTML = '<p>Your custom recipes will appear here. Submit some recipes to get started!</p>';
            break;
        case 'planned':
            content.innerHTML = renderMealPlan();
            break;
    }
    
    trackEvent('recipe_book', 'switch_tab', tab);
}

function renderMealPlan() {
    const mealPlan = JSON.parse(localStorage.getItem('userMealPlan') || '{}');
    if (Object.keys(mealPlan).length === 0) {
        return '<p>No meal plan yet. Use the Meal Planner to create your weekly menu!</p>';
    }
    
    return `
        <div class="meal-plan-view">
            ${Object.entries(mealPlan).map(([day, meals]) => `
                <div class="meal-plan-day">
                    <h4>${day}</h4>
                    ${Object.entries(meals).map(([mealType, recipeName]) => `
                        <div class="meal-plan-item">
                            <strong>${mealType}:</strong> ${recipeName}
                        </div>
                    `).join('')}
                </div>
            `).join('')}
        </div>
    `;
}

// Recipe editing functions
function editRecipe(recipeId) {
    alert('Recipe editing feature coming soon! You\'ll be able to modify ingredients and instructions.');
    trackEvent('recipe', 'edit_recipe', recipeId);
}

function createVariation(recipeId) {
    const recipe = recipeDatabase.find(r => r.id === recipeId);
    alert(`Create your own variation of "${recipe.name}"! This feature is coming soon.`);
    trackEvent('recipe', 'create_variation', recipeId);
}

function showSubstitutions(recipeId) {
    const recipe = recipeDatabase.find(r => r.id === recipeId);
    const substitutions = {
        'eggs': [
            { name: 'Flax Eggs', desc: '1 tbsp ground flaxseed + 3 tbsp water per egg' },
            { name: 'Applesauce', desc: '¼ cup unsweetened applesauce per egg' },
            { name: 'Banana', desc: '¼ mashed banana per egg (adds sweetness)' },
            { name: 'Yogurt', desc: '¼ cup plain yogurt per egg' }
        ],
        'milk': [
            { name: 'Oat Milk', desc: 'Same amount, creamy texture' },
            { name: 'Almond Milk', desc: 'Same amount, lighter flavor' },
            { name: 'Soy Milk', desc: 'Same amount, protein-rich' },
            { name: 'Coconut Milk', desc: 'Same amount, rich and creamy' }
        ],
        'butter': [
            { name: 'Coconut Oil', desc: 'Same amount, solid at room temp' },
            { name: 'Olive Oil', desc: '¾ the amount, liquid' },
            { name: 'Yogurt', desc: '½ the amount, for baking' },
            { name: 'Margarine', desc: 'Same amount, vegan option' }
        ],
        'flour': [
            { name: 'Almond Flour', desc: '¾ the amount, nutty flavor' },
            { name: 'Rice Flour', desc: 'Same amount, gluten-free' },
            { name: 'Oat Flour', desc: 'Same amount, slightly sweet' },
            { name: 'Coconut Flour', desc: '¼ the amount, very absorbent' }
        ],
        'cheese': [
            { name: 'Nutritional Yeast', desc: '2 tbsp per ¼ cup cheese, cheesy flavor' },
            { name: 'Cashew Cheese', desc: 'Same amount, creamy texture' },
            { name: 'Vegan Cheese', desc: 'Same amount, various flavors' }
        ],
        'meat': [
            { name: 'Mushrooms', desc: 'Same weight, umami flavor' },
            { name: 'Lentils', desc: 'Same weight cooked, protein-rich' },
            { name: 'Tofu', desc: 'Same weight, absorbs flavors' },
            { name: 'Tempeh', desc: 'Same weight, nutty flavor' }
        ],
        'potatoes': [
            { name: 'Sweet Potatoes', desc: 'Same amount, sweeter flavor' },
            { name: 'Cauliflower', desc: 'Same amount, lower carb' },
            { name: 'Turnips', desc: 'Same amount, similar texture' }
        ],
        'pasta': [
            { name: 'Zucchini Noodles', desc: 'Same amount, low carb' },
            { name: 'Rice Noodles', desc: 'Same amount, gluten-free' },
            { name: 'Lentil Pasta', desc: 'Same amount, high protein' }
        ],
        'rice': [
            { name: 'Quinoa', desc: 'Same amount cooked, protein-rich' },
            { name: 'Cauliflower Rice', desc: 'Same amount, low carb' },
            { name: 'Brown Rice', desc: 'Same amount, more fiber' }
        ]
    };
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content substitution-modal">
            <div class="modal-header">
                <h2><i class="fas fa-exchange-alt"></i> Ingredient Substitutions for ${recipe.name}</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <p>Here are healthy alternatives you can use:</p>
                <div class="substitution-list">
                    ${recipe.ingredients.map(ingredient => {
                        const subs = substitutions[ingredient];
                        if (!subs) return '';
                        return `
                            <div class="ingredient-substitution">
                                <h4>Instead of ${ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}:</h4>
                                <div class="substitution-options">
                                    ${subs.map(sub => `
                                        <div class="substitution-option">
                                            <strong>${sub.name}</strong>
                                            <span class="substitution-desc">${sub.desc}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `;
                    }).filter(Boolean).join('')}
                </div>
                ${recipe.ingredients.filter(ing => !substitutions[ing]).length > 0 ? `
                    <div class="no-substitutions">
                        <p><em>No common substitutions available for: ${recipe.ingredients.filter(ing => !substitutions[ing]).join(', ')}</em></p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    trackEvent('recipe', 'view_substitutions', recipeId);
}

function rateRecipe() {
    alert('Click the stars below to rate this recipe!');
}

function submitComment(recipeId) {
    const textarea = document.querySelector(`#comments-${recipeId} textarea`);
    if (textarea && textarea.value.trim()) {
        alert('Thank you for your comment! (Comments will be reviewed before publishing)');
        textarea.value = '';
        trackEvent('recipe', 'submit_comment', recipeId);
    } else {
        alert('Please write a comment before submitting.');
    }
}

// Recipe submission functions
function addIngredient() {
    const ingredientsList = document.getElementById('ingredientsList');
    if (!ingredientsList) return;
    
    const newRow = document.createElement('div');
    newRow.className = 'ingredient-row';
    newRow.innerHTML = `
        <input type="text" placeholder="Ingredient name" required>
        <input type="text" placeholder="Amount" required>
        <input type="number" placeholder="Cost (kr)" step="0.1" min="0" onchange="calculateTotalCost()">
        <button type="button" onclick="removeIngredient(this)">❌</button>
    `;
    ingredientsList.appendChild(newRow);
}

function removeIngredient(button) {
    const row = button.closest('.ingredient-row');
    row.remove();
    calculateTotalCost();
}

function calculateTotalCost() {
    const costInputs = document.querySelectorAll('input[type="number"][placeholder*="Cost"]');
    const servingsInput = document.getElementById('servings');
    let total = 0;
    
    costInputs.forEach(input => {
        if (input.value) {
            total += parseFloat(input.value);
        }
    });
    
    const totalCostSpan = document.getElementById('totalCost');
    const costPerServingSpan = document.getElementById('costPerServing');
    
    if (totalCostSpan) {
        totalCostSpan.textContent = total.toFixed(2) + ' kr';
    }
    
    if (costPerServingSpan && servingsInput) {
        const servings = parseInt(servingsInput.value) || 1;
        const perServing = (total / servings).toFixed(2);
        costPerServingSpan.textContent = perServing + ' kr';
    }
}

function submitNewRecipe(event) {
    event.preventDefault();
    
    // Collect form data
    const recipeData = {
        name: document.getElementById('recipeName').value,
        description: document.getElementById('recipeDescription').value,
        time: document.getElementById('cookingTime').value,
        servings: document.getElementById('servings').value,
        instructions: document.getElementById('instructions').value
    };
    
    // Show success message
    alert('Thank you for submitting your recipe! It will be reviewed and added to our collection.');
    closeModal('submitRecipeModal');
    
    trackEvent('recipe', 'submit_recipe', recipeData.name);
}

// Set up event listeners for cost calculation
document.addEventListener('change', function(event) {
    if (event.target.type === 'number' && event.target.placeholder && event.target.placeholder.includes('Cost')) {
        calculateTotalCost();
    }
    if (event.target.id === 'servings') {
        calculateTotalCost();
    }
});

// Close modals when clicking overlay
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // ESC key closes modals
    if (event.key === 'Escape') {
        const openModal = document.querySelector('.modal-overlay:not(.hidden)');
        if (openModal) {
            openModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }
});