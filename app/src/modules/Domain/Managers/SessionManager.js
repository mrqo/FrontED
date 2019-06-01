export const userService = {
    login,
    logout,
};

export function authHeader() {
    // return authorization header with basic auth credentials
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.authdata) {
        return { 'Authorization': 'Basic ' + user.authdata };
    } else {
        return {};
    }
}

export function login(username, password) {
    const requestOptions = {
        method: 'POST',
        crossDomain: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({login: username, password: password })
    };

    return fetch(`/accounts/login/`, requestOptions)
        .then(handleResponse)
        .then(detail => {
            console.log(detail);
            if (detail.detail == "Login successful") {
                // store user details and basic auth credentials in local storage
                // to keep user logged in between page refreshes
                //user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(detail.authdata));
            }
            return detail;
        });
}

export function logout() {
    localStorage.removeItem('user');
}

export function getProjects() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/ed/projects/`, requestOptions).then(handleResponse);
}

export function getProject(project_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/ed/projects/${project_id}/`, requestOptions).then(handleResponse);
}

export function handleResponse(response) {
    return response.text().then(text => {
        console.log(text);
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
