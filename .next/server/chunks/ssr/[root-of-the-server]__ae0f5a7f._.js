module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/app/theme-provider.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ThemeContext": (()=>ThemeContext),
    "default": (()=>ThemeProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [themeDir, setThemeDir] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('ltr');
    // themeMode
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (localStorage.getItem('theme') === 'dark-mode') {
            setIsDarkMode(true);
            const root = document.querySelector('html');
            if (root && !root.classList.contains('dark')) {
                root.classList.add('dark');
            }
        } else {
            setIsDarkMode(false);
            const root = document.querySelector('html');
            if (root) {
                root.classList.remove('dark');
            }
        }
    }, []);
    // themeDir
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
    }, []);
    // Update themeDir when it changes
    // This ensures that the document's direction is set correctly
    // when the themeDir state changes.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
    }, [
        themeDir
    ]);
    // toggleDarkMode
    // This function toggles the dark mode state and updates the localStorage
    // and the HTML class accordingly
    const toggleDarkMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (localStorage.getItem('theme') === 'light-mode') {
            setIsDarkMode(true);
            const root = document.querySelector('html');
            if (root && !root.classList.contains('dark')) {
                root.classList.add('dark');
            }
            localStorage.setItem('theme', 'dark-mode');
        } else {
            setIsDarkMode(false);
            const root = document.querySelector('html');
            if (root) {
                root.classList.remove('dark');
            }
            localStorage.setItem('theme', 'light-mode');
        }
    }, []);
    //
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            isDarkMode,
            toggleDarkMode,
            themeDir,
            setThemeDir
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/theme-provider.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/lib/auth/custom/client.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "authClient": (()=>authClient)
});
'use client';
function generateToken() {
    const arr = new Uint8Array(12);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, (v)=>v.toString(16).padStart(2, '0')).join('');
}
const user = {
    id: 'USR-000',
    avatar: '/assets/avatar.png',
    firstName: 'Sofia',
    lastName: 'Rivers',
    email: 'sofia@devias.io'
};
class AuthClient {
    async signUp(_) {
        // Make API request
        // We do not handle the API, so we'll just generate a token and store it in localStorage.
        const token = generateToken();
        localStorage.setItem('custom-auth-token', token);
        return {};
    }
    async signInWithOAuth(_) {
        return {
            error: 'Social authentication not implemented'
        };
    }
    async signInWithPassword(params) {
        const { email, password } = params;
        // Make API request
        // We do not handle the API, so we'll check if the credentials match with the hardcoded ones.
        if (email !== 'parallax@enerbosch.cl' || password !== 'enerbosch.2024') {
            return {
                error: 'Invalid credentials'
            };
        }
        const token = generateToken();
        localStorage.setItem('custom-auth-token', token);
        return {};
    }
    async resetPassword(_) {
        return {
            error: 'Password reset not implemented'
        };
    }
    async updatePassword(_) {
        return {
            error: 'Update reset not implemented'
        };
    }
    async getUser() {
        // Make API request
        // We do not handle the API, so just check if we have a token in localStorage.
        const token = localStorage.getItem('custom-auth-token');
        console.log('TOKEN:' + token);
        if (!token) {
            return {
                data: null
            };
        }
        return {
            data: user
        };
    }
    async signOut() {
        localStorage.removeItem('custom-auth-token');
        return {};
    }
}
const authClient = new AuthClient();
}}),
"[project]/src/lib/auth/strategy.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthStrategy": (()=>AuthStrategy)
});
const AuthStrategy = {
    CUSTOM: 'CUSTOM',
    AUTH0: 'AUTH0',
    COGNITO: 'COGNITO',
    FIREBASE: 'FIREBASE',
    SUPABASE: 'SUPABASE'
};
}}),
"[project]/src/lib/get-site-url.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getSiteURL": (()=>getSiteURL)
});
function getSiteURL() {
    let url = process.env.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.endsWith('/') ? url : `${url}/`;
    return url;
}
}}),
"[project]/src/config.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>config)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$strategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth/strategy.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$get$2d$site$2d$url$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/get-site-url.ts [app-ssr] (ecmascript)");
;
;
const config = {
    site: {
        name: 'Devias Kit Pro',
        description: '',
        colorScheme: 'light',
        themeColor: '#090a0b',
        primaryColor: 'neonBlue',
        url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$get$2d$site$2d$url$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSiteURL"])(),
        version: process.env.NEXT_PUBLIC_SITE_VERSION || '0.0.0'
    },
    logLevel: ("TURBOPACK compile-time value", "debug") || 'debug',
    auth: {
        strategy: process.env.NEXT_PUBLIC_AUTH_STRATEGY || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$strategy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthStrategy"].CUSTOM
    },
    auth0: {
        secret: process.env.AUTH0_SECRET,
        baseUrl: process.env.AUTH0_BASE_URL,
        issuerBaseUrl: process.env.AUTH0_ISSUER_BASE_URL,
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET
    },
    cognito: {
        identityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID,
        userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID,
        userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID
    },
    firebase: {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    },
    supabase: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    },
    mapbox: {
        apiKey: process.env.NEXT_PUBLIC_MAPBOX_API_KEY
    },
    gtm: {
        id: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID
    }
};
}}),
"[project]/src/lib/logger.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* eslint-disable no-console -- Allow */ // NOTE: A tracking system such as Sentry should replace the console
__turbopack_context__.s({
    "LogLevel": (()=>LogLevel),
    "Logger": (()=>Logger),
    "createLogger": (()=>createLogger)
});
const LogLevel = {
    NONE: 'NONE',
    ERROR: 'ERROR',
    WARN: 'WARN',
    DEBUG: 'DEBUG',
    ALL: 'ALL'
};
const LogLevelNumber = {
    NONE: 0,
    ERROR: 1,
    WARN: 2,
    DEBUG: 3,
    ALL: 4
};
class Logger {
    prefix;
    level;
    showLevel;
    levelNumber;
    constructor({ prefix = '', level = LogLevel.ALL, showLevel = true }){
        this.prefix = prefix;
        this.level = level;
        this.levelNumber = LogLevelNumber[this.level];
        this.showLevel = showLevel;
    }
    debug = (...args)=>{
        if (this.canWrite(LogLevel.DEBUG)) {
            this.write(LogLevel.DEBUG, ...args);
        }
    };
    warn = (...args)=>{
        if (this.canWrite(LogLevel.WARN)) {
            this.write(LogLevel.WARN, ...args);
        }
    };
    error = (...args)=>{
        if (this.canWrite(LogLevel.ERROR)) {
            this.write(LogLevel.ERROR, ...args);
        }
    };
    canWrite(level) {
        return this.levelNumber >= LogLevelNumber[level];
    }
    write(level, ...args) {
        let prefix = this.prefix;
        if (this.showLevel) {
            prefix = `- ${level} ${prefix}`;
        }
        if (level === LogLevel.ERROR) {
            console.error(prefix, ...args);
        } else {
            console.log(prefix, ...args);
        }
    }
}
function createLogger({ prefix, level } = {}) {
    return new Logger({
        prefix,
        level
    });
}
}}),
"[project]/src/lib/default-logger.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "logger": (()=>logger)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-ssr] (ecmascript)");
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createLogger"])({
    level: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].logLevel
});
}}),
"[project]/src/contexts/auth/custom/user-context.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "UserConsumer": (()=>UserConsumer),
    "UserContext": (()=>UserContext),
    "UserProvider": (()=>UserProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$custom$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth/custom/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$default$2d$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/default-logger.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const UserContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function UserProvider({ children }) {
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        user: null,
        error: null,
        isLoading: true
    });
    const checkSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$custom$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authClient"].getUser();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$default$2d$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logger"].debug("AUTH USER DATA:", data);
            if (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$default$2d$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logger"].error(error);
                setState((prev)=>({
                        ...prev,
                        user: null,
                        error: 'Something went wrong',
                        isLoading: false
                    }));
                return;
            }
            setState((prev)=>({
                    ...prev,
                    user: data ?? null,
                    error: null,
                    isLoading: false
                }));
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$default$2d$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logger"].error(err);
            setState((prev)=>({
                    ...prev,
                    user: null,
                    error: 'Something went wrong',
                    isLoading: false
                }));
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        checkSession().catch((err)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$default$2d$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logger"].error(err);
        // noop
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UserContext.Provider, {
        value: {
            ...state,
            checkSession
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/auth/custom/user-context.tsx",
        lineNumber: 51,
        columnNumber: 10
    }, this);
}
const UserConsumer = UserContext.Consumer;
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else {
                "TURBOPACK unreachable";
            }
        } else {
            "TURBOPACK unreachable";
        }
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__ae0f5a7f._.js.map