const url = "http://mtracker28.herokuapp.com/api/v2";
const api = {};
  
api.get = (endpoint, token) => {
    return fetch(`${url}${endpoint}`, {
        method: "GET",
        headers: {
            "Accept": "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
            "content-type": "application/json"
        }
    });
};
  
api.post = (endpoint, data, token) => {
    return fetch(`${url}${endpoint}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Accept": "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
            "content-type": "application/json"
        }
    });
};
  
api.update = (endpoint, data, token) => {
    return fetch(`${url}${endpoint}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Accept": "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
            "content-type": "application/json"
        }
    });
};
  
api.delete = (endpoint, data, token) => {
    return fetch(`${url}${endpoint}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json"
        }
    });
};
  
export default api;