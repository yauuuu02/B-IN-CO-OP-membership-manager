// Constants
const TODAY = dayjs('2025-05-25');
const LS_MEMBERS = 'coop_members';
const LS_CREDITS = 'coop_credits';
const LS_SPENDING_HISTORY = 'coop_spending_history';

// Create element helper function
const e = React.createElement;

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

// Local Storage Hook
function useLocalStorageArray(key, defaultValue) {
    const [data, setData] = React.useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : defaultValue;
        } catch {
            return defaultValue;
        }
    });
    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data));
    }, [key, data]);
    return [data, setData];
}

// Main App Component
function App() {
    const [tab, setTab] = React.useState('membership');
    
    return e('div', { 
        className: "max-w-[810px] mx-auto min-h-screen bg-white shadow-lg flex flex-col" 
    }, [
        e('header', { className: "flex-none" }, [
            e('h1', { 
                className: "text-2xl font-bold text-center py-4 bg-blue-700 text-white tracking-wide"
            }, "Co-op Membership & Store Credit"),
            e('nav', { className: "flex border-b-2 border-gray-200" }, [
                e('button', {
                    className: `flex-1 tab py-3 text-lg font-semibold ${
                        tab === 'membership' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-blue-700'
                    } transition`,
                    onClick: () => setTab('membership')
                }, "Membership"),
                e('button', {
                    className: `flex-1 tab py-3 text-lg font-semibold ${
                        tab === 'credit' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-blue-700'
                    } transition`,
                    onClick: () => setTab('credit')
                }, "Store Credit")
            ])
        ]),
        e('main', { className: "flex-1 overflow-y-auto p-4" },
            tab === 'membership' ? e(MembershipSection) : e(StoreCreditSection)
        ),
        e('footer', { className: "text-center text-xs text-gray-400 py-2" },
            "© 2025 Co-op Membership System. Data stored locally."
        )
    ]);
}

// Initialize the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e(App)); 