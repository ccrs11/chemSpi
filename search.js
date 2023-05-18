function searchByQueryId(queryId) {
    const url = `https://api.rsc.org/compounds/v1/filter/${queryId}/results?count=10`;
    const options = {
        method: "GET",
        headers: {
            "apikey": "VlvG7ppdHFFGAVqGM3AiTYFxNbb4kjnY",
            "Accept": "application/json"
        },
    };
    fetch(url, options).then(
        response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(err => {
                return Promise.reject({
                    status: response.status,
                    statusText: response.statusText,
                    errorMessage: err,
                });
            });
        })
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(err => {
            console.error(err);
        });
}


export function searchByName() {
    const name = document.querySelector('#compoundName').value;
    const url = `https://api.rsc.org/compounds/v1/filter/name`;
    const options = {
        method: "POST",
        headers: {
            "apikey": "VlvG7ppdHFFGAVqGM3AiTYFxNbb4kjnY",
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": `${name}`
        }),
    };
    fetch(url, options).then(
        response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(err => {
                return Promise.reject({
                    status: response.status,
                    statusText: response.statusText,
                    errorMessage: err,
                });
            });
        })
        .then(data => {
            console.log(data.queryId);
            searchByQueryId(data.queryId);
            
            return searchByQueryId(data.queryId);
        })
        .catch(err => {
            return console.error(err);
        });
    }
    

