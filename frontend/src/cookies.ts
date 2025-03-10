const standardValue = {
    username: "could not load username",
    role: "simulator",
    signed_in: false,
}

interface CookieData {
    username: string;
    role: string;
    signed_in: boolean
    [key: string]: string | boolean;
}

function getCookies(): CookieData {
    return document.cookie
        .split('; ')
        .reduce<CookieData>((cookies, cookie) => {
            const [key, value] = cookie.split('=');
            if (key && value) {
                cookies[key] = decodeURIComponent(value);
            }
            return cookies;
        }, standardValue);
}

function saveCookies(obj: CookieData, days = 7) {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);

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

export default { getCookies, saveCookies, deleteCookies };
