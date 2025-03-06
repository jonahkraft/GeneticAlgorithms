interface CookieData {
    username: string;
    role: string;
    [key: string]: string;
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
        }, {
            username: "could not load username",
            role: "could not load role"
        });
}

function saveCookies(obj: CookieData, days = 7) {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);

    for (const [key, value] of Object.entries(obj)) {
        document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
    }
}

export default { getCookies, saveCookies };