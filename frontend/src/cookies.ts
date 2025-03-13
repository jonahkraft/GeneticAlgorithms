const standardValue = {
    username: "could not load username",
    role: "could not load role",
    signed_in: false,
    easy_speech: false,
    token: "",
}

interface CookieData {
    username: string;
    role: string;
    signed_in: boolean;
    easy_speech: boolean;
    token: string;
    [key: string]: string | boolean;
}

function getCookies(): CookieData {
    return document.cookie
        .split('; ')
        .reduce<CookieData>((cookies, cookie) => {
            const [key, value] = cookie.split('=');
            if (key && value) {
                cookies[key] = key === 'easy_speech' ? value === 'true' : decodeURIComponent(value);
            }
            return cookies;
        }, standardValue);
}

function saveCookies(obj: { username: string; role: string; signed_in: boolean, easy_speech: boolean, token: string }, days = 7) {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);

    console.log("saveCookies", typeof obj.easy_speech)

    for (const [key, value] of Object.entries(obj)) {
        document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    }
}

function deleteCookies() {
    const expires = new Date(0);

    for (const key in standardValue) {
        document.cookie = `${encodeURIComponent(key)}=; expires=${expires.toUTCString()}; path=/`;
    }
}

function isLoggedIn() {
    const data = getCookies();
    return data.signed_in;
}


export default { getCookies, saveCookies, deleteCookies, isLoggedIn };
