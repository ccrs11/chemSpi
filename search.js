export async function searchByName() {
    try {
        const name = document.querySelector('#compoundName').value;
        const url = 'https://api.rsc.org/compounds/v1/filter/name';
        const options = {
            method: 'POST',
            headers: {
                apikey: 'NMqJM4CgsoOPGYZmBihS1rdjXCALSffn',
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
        // const resultss = searchFormuleByCsId(chemId.results[0]);
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
            "apikey": "NMqJM4CgsoOPGYZmBihS1rdjXCALSffn",
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
            let chemid = data.results[0]
            searchImageByCsId(chemid);
            searchNameByCsId(chemid);
            searchFormuleByCsId(chemid);
            searchAvMassByCsId(chemid);
            searchMolWeightByCsId(chemid);
            searchmol3d(chemid);
            let selectorFormula = document.querySelector(".info");
            selectorFormula.insertAdjacentHTML("beforeend", `<p> ChemId : ${chemid}</p>`);


        })
        .catch(err => {
            console.error(err);
        });
}

function searchImageByCsId(chemId) {
    const url = `https://api.rsc.org/compounds/v1/records/${chemId}/image`;
    const options = {
        method: "GET",
        headers: {
            "apikey": "NMqJM4CgsoOPGYZmBihS1rdjXCALSffn",
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
            console.log(data.image);
            const selectorImage = document.querySelector(".image2d");
            selectorImage.innerHTML = `<img src="data:image/png;base64,${data.image}" alt="imagen 2D compuesto" width="auto"/>`;

        })
        .catch(err => {
            console.error(err);
        });
}

function searchNameByCsId(chemId) {
    const url = `https://api.rsc.org/compounds/v1/records/${chemId}/details?fields=CommonName`;
    const options = {
        method: "GET",
        headers: {
            "apikey": "NMqJM4CgsoOPGYZmBihS1rdjXCALSffn",
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
            let commonName = data.commonName;
            let selectorName = document.querySelector(".info");
            selectorName.insertAdjacentHTML("beforeend", `<h2>${commonName}</h2>`);

        })
        .catch(err => {
            console.error(err);
        });
}
function searchFormuleByCsId(chemId) {
    const url = `https://api.rsc.org/compounds/v1/records/${chemId}/details?fields=Formula`;
    // `https://api.rsc.org/compounds/v1/records/${chemId}/details?fields=AverageMass&fields=StdInChIKey`;
    const options = {
        method: "GET",
        headers: {
            "apikey": "NMqJM4CgsoOPGYZmBihS1rdjXCALSffn",
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
            let formula = data.formula;
            let selectorFormula = document.querySelector(".info");
            selectorFormula.insertAdjacentHTML("beforeend", `<h3>Formula: ${formula}</h3>`);
        })
        .catch(err => {
            console.error(err);
        });
}
function searchAvMassByCsId(chemId) {
    const url = `https://api.rsc.org/compounds/v1/records/${chemId}/details?fields=AverageMass`;
    const options = {
        method: "GET",
        headers: {
            "apikey": "NMqJM4CgsoOPGYZmBihS1rdjXCALSffn",
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
            let avMass = data.averageMass;
            let selectorFormula = document.querySelector(".info");
            selectorFormula.insertAdjacentHTML("beforeend", `<p> Average Mass : ${avMass}</p>`);
        })
        .catch(err => {
            console.error(err);
        });
}

function searchMolWeightByCsId(chemId) {
    const url = `https://api.rsc.org/compounds/v1/records/${chemId}/details?fields=MolecularWeight`;
    const options = {
        method: "GET",
        headers: {
            "apikey": "NMqJM4CgsoOPGYZmBihS1rdjXCALSffn",
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
            let molecularWeight = data.molecularWeight;
            let selectorFormula = document.querySelector(".info");
            selectorFormula.insertAdjacentHTML("beforeend", `<p> Molecular Weight : ${molecularWeight}</p>`);
        })
        .catch(err => {
            console.error(err);
        });
}

function searchmol3d(chemId) {
    const url = `https://api.rsc.org/compounds/v1/records/${chemId}/details?fields=Mol3D`;
    const options = {
        method: "GET",
        headers: {
            "apikey": "NMqJM4CgsoOPGYZmBihS1rdjXCALSffn",
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
            console.log(data.mol3D);
            const selectorImage3d = document.querySelector(".image3d");
            let res=jmolAppletInline(400,`${data.mol3D}`);
            console.log(res._code);
            selectorImage3d.innerHTML=res._code;

        })
        .catch(err => {
            console.error(err);
        });
}