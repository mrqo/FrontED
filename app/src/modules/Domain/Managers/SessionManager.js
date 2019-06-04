export const userService = {
    login,
    logout,
};

export function authHeader() {
    // return authorization header with basic auth credentials
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.authdata) {
        return {
            'Authorization': 'Basic ' + user.authdata,
            'Content-Type': 'application/json'
        };
    } else {
        return { 'Content-Type': 'application/json' };
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
                detail.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(detail.authdata));
                return true;
            }
            return false;
        })
        .catch(error => false);
}

export function logout() {
    const requestOptions = {
        method: 'POST',
        crossDomain: true,
        headers: authHeader(),
        body: JSON.stringify({revoke_token: false})
    };
    localStorage.removeItem('user');

    return fetch(`/accounts/logout/`, requestOptions)
}

export function getProjects() {
    // pobierz wszystkie projekty (wystarczy byc zalogowanym)
    // zwraca JSON:
    // [
    //    {id: 1, name: "Test", source: "JSON_IN_STRING"},
    // ]

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/ed/projects/`, requestOptions)
    .then(handleResponse)
    .catch(error => false)
    .then(response => {
        if (response["detail"] == "Authentication credentials were not provided.")
            return false;
        
        return response;
    });
}

export function getProject(project_id) {
    // pobierz pojedynczy projekt (podajac id)
    // {id: 1, name: "Test", source: "JSON_IN_STRING"}
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/ed/projects/${project_id}/`, requestOptions).then(handleResponse);
}

export function addProject(projectName, projectSource) {
    // opcja tworzenia nowego projektu
    // projectSource to JSON ale przekonwertowany do String
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({name: projectName, source: projectName })
    };

    return fetch(`/ed/projects/`, requestOptions).then(handleResponse);
}

export function getProfile(projectName, projectSource) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`/accounts/profile/`, requestOptions)
        .then(handleResponse)
        .then(profile => {
            if (profile["detail"] == "Authentication credentials were not provided.") {
                return false;
            } else {
                /*
                // response:
                {
                    "id": 1,
                    "username": "guest",
                    "first_name": "Guest",
                    "last_name": "Guest",
                    "email": ""
                }
                */
                return profile;
            }
        })
        .catch(err => false);
}

export function saveProject(projectId, projectName, projectSource) {
    // zmien Name or Source w projekcie (opcja zapisu)
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({name: projectName, source: projectSource })
    };

    return fetch(`/ed/projects/${projectId}/`, requestOptions).then(handleResponse);
}

export function generateProject(projectId) {
    // Konwertuj projekt do htmla (zwraca go)
    // Przykladowa odpowiedz (html jest w kluczu "result")
    // {
    //     "result": "<body class=\"test-class\" >\n\n</body>"
    // }
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/ed/projects/render/${projectId}/`, requestOptions).then(handleResponse);
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
