// Initialize dayjs plugins
dayjs.extend(window.dayjs_plugin_isSameOrAfter);
dayjs.extend(window.dayjs_plugin_isSameOrBefore);
dayjs.extend(window.dayjs_plugin_customParseFormat);

// Constants
const TODAY = dayjs('2025-05-25');
const LS_MEMBERS = 'coop_members';
const LS_CREDITS = 'coop_credits';
const LS_SPENDING_HISTORY = 'coop_spending_history';

// Utility Functions
function generateUniqueKey(existingKeys) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let key;
    do {
        key = '';
        for (let i = 0; i < 8; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    } while (existingKeys.has(key));
    return key;
}

function isValidHKPhone(phone) {
    return /^[569]\d{7}$/.test(phone);
}

function formatDate(date) {
    return dayjs(date).format('YYYY-MM-DD');
}

function formatDateDisplay(date) {
    return dayjs(date).format('DD/MM/YYYY');
}

function formatDayMonth(date) {
    return dayjs(date).format('DD/MM');
}

// Tab Switching
function switchTab(tab) {
    const membershipTab = document.getElementById('membership-tab');
    const creditTab = document.getElementById('credit-tab');
    const membershipSection = document.getElementById('membership-section');
    const creditSection = document.getElementById('credit-section');

    if (tab === 'membership') {
        membershipTab.classList.add('active-tab');
        membershipTab.classList.remove('inactive-tab');
        creditTab.classList.add('inactive-tab');
        creditTab.classList.remove('active-tab');
        membershipSection.classList.remove('hidden');
        creditSection.classList.add('hidden');
    } else {
        creditTab.classList.add('active-tab');
        creditTab.classList.remove('inactive-tab');
        membershipTab.classList.add('inactive-tab');
        membershipTab.classList.remove('active-tab');
        creditSection.classList.remove('hidden');
        membershipSection.classList.add('hidden');
    }
}

// Local Storage Functions
function getFromStorage(key, defaultValue = []) {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch {
        return defaultValue;
    }
}

function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Initialize membership form
    initMembershipForm();
    
    // Initialize credit form
    initCreditForm();
    
    // Load initial data
    loadMembersList();
    loadCreditsList();
});

// Membership Functions
function initMembershipForm() {
    const form = document.getElementById('membership-form');
    form.innerHTML = `
        <div class="flex flex-wrap gap-4">
            <div class="flex-1 min-w-[180px]">
                <label class="block font-semibold mb-1">Name</label>
                <input type="text" id="member-name" class="w-full px-3 py-2 border rounded-lg text-lg" maxlength="30" required>
            </div>
            <div class="flex-1 min-w-[180px]">
                <label class="block font-semibold mb-1">Phone</label>
                <input type="text" id="member-phone" class="w-full px-3 py-2 border rounded-lg text-lg" maxlength="8" required>
            </div>
            <div class="flex-1 min-w-[180px]">
                <label class="block font-semibold mb-1">Spending (HKD)</label>
                <input type="number" id="member-spending" class="w-full px-3 py-2 border rounded-lg text-lg" required>
            </div>
        </div>
        <div class="mt-4">
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-bold">
                Add Member
            </button>
        </div>
    `;
    
    form.addEventListener('submit', handleMemberSubmit);
}

function handleMemberSubmit(e) {
    e.preventDefault();
    // Add member submission logic here
}

function loadMembersList() {
    const members = getFromStorage(LS_MEMBERS);
    const container = document.getElementById('members-list');
    // Add members list rendering logic here
}

// Credit Functions
function initCreditForm() {
    const form = document.getElementById('credit-form');
    form.innerHTML = `
        <div class="flex flex-wrap gap-4">
            <div class="flex-1 min-w-[180px]">
                <label class="block font-semibold mb-1">Name</label>
                <input type="text" id="credit-name" class="w-full px-3 py-2 border rounded-lg text-lg" maxlength="30" required>
            </div>
            <div class="flex-1 min-w-[180px]">
                <label class="block font-semibold mb-1">Phone</label>
                <input type="text" id="credit-phone" class="w-full px-3 py-2 border rounded-lg text-lg" maxlength="8" required>
            </div>
            <div class="flex-1 min-w-[180px]">
                <label class="block font-semibold mb-1">Amount (HKD)</label>
                <input type="number" id="credit-amount" class="w-full px-3 py-2 border rounded-lg text-lg" required>
            </div>
        </div>
        <div class="mt-4">
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-bold">
                Add Store Credit
            </button>
        </div>
    `;
    
    form.addEventListener('submit', handleCreditSubmit);
}

function handleCreditSubmit(e) {
    e.preventDefault();
    // Add credit submission logic here
}

function loadCreditsList() {
    const credits = getFromStorage(LS_CREDITS);
    const container = document.getElementById('credits-list');
    // Add credits list rendering logic here
} 