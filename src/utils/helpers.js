import { backendUrl } from "../utils/url"

var allCookies = document.cookie;
const parseCookies = () => {
    var cookies = {};
    document.cookie.split(';').forEach(function (cookie) {
        var parts = cookie.split('=');
        cookies[parts[0].trim()] = parts[1].trim();
    });
    return cookies;
}
const getTokenFromCookies = () => {
    var cookiesObject = parseCookies();
    var token = cookiesObject['token'];
    return token;
}

export const unauthenticatedPostRequest = async (route, body) => {
    const fullUrl = backendUrl + route;
    const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const newResponse = await response.json();
    return newResponse;
};

export const authenticatedPostRequest = async (route, body) => {
    const token = getTokenFromCookies();
    const fullUrl = backendUrl + route;
    const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body),

    });
    const newResponse = await response.json();
    return newResponse;
}

export const authenticatedGetRequest = async (route) => {
    const token = getTokenFromCookies();
    const fullUrl = backendUrl + route;
    const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },


    });
    const newResponse = await response.json();
    return newResponse;
}