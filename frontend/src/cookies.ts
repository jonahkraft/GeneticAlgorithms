function getCookies() {
    return document.cookie
        .split('; ')
        .reduce((cookies, cookie) => {
            const [key, value] = cookie.split('=');
            cookies[key] = decodeURIComponent(value);
            return cookies;
        }, {
            username: "Nutzername konnte nicht geladen werden",
            role: "Rolle konnte nicht geladen werden"
        });
}

function saveCookies(obj, days = 7) {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);

    for (const [key, value] of Object.entries(obj)) {
        document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
    }
}

export default { getCookies, saveCookies };