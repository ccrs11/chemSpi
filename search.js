export async function searchByName() {
    try {
        const name = document.querySelector('#compoundName').value;
        const url = 'https://api.rsc.org/compounds/v1/filter/name';
        const options = {
            method: 'POST',
            headers: {
                apikey: 'VlvG7ppdHFFGAVqGM3AiTYFxNbb4kjnY',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: `${name}`,
            }),
        };

        const response = await fetch(url, options);
        if (!response.ok) {
            const err = await response.json();
            throw {
                status: response.status,
                statusText: response.statusText,
                errorMessage: err,
            };
        }

        const data = await response.json();
        console.log(data.queryId);
        await searchByQueryId(data.queryId);
        // console.log(chemId);
        // const resultss = searchByChemspiderId(chemId.results[0]);
        // console.log(resultss);
        // return resultss;
    } catch (err) {
        console.error(err);
    }
}

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
            //console.log(data);
            searchByChemspiderId(data.results[0]);

        })
        .catch(err => {
            console.error(err);
        });
}
function searchByChemspiderId(chemId) {
    const url = `https://api.rsc.org/compounds/v1/records/${chemId}/details?fields=Formula`;
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
                return response.text();
            }
            return response.text().then(err => {
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

