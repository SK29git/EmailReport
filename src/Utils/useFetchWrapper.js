export { fetcher };

const getAuthData = () => {
    return {
        token: localStorage.getItem("user-token")
    }
}

let auth = getAuthData();

function fetcher() {
    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE')
    };

    function request(method) {
        return async (url, body) => {
            const requestOptions = {
                method,
                headers: authHeader(url),
                body
            };
            if (body) {
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = body;
            }
            const response = await fetch(url, requestOptions);
            return handleResponse(response);
        }
    }

    // helper functions
    function authHeader(url) {
        // return auth header with jwt if user is logged in and request is to the api url
        const auth = getAuthData();
        const token = auth?.token;
        const isLoggedIn = !!token;
        const isApiUrl = true;// url.startsWith(process.env.REACT_APP_API_URL);
        if (isLoggedIn && isApiUrl) {
            return { Authorization: `Bearer ${token}` };
        } else {
            return {};
        }
    }

    function handleResponse(response) {
        return new Promise((resolve, reject) => {
            const auth = getAuthData();
            if (!response.ok) {
                if ([401, 403].includes(response.status) && auth?.token) {
                    console.log('Your session has expired. Access denied!');
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    localStorage.removeItem('user-token');
                    localStorage.removeItem("user-data");
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 5000);
                    reject(response);
                    return;
                }
            }
            resolve(response);
        });
    }
}