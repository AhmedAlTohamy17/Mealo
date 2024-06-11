import { TIME_OUT } from "./config.js";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};


export const AJAX = async function (url, uploadData = undefined) {
    try {
        const fetchPro = uploadData
            ? fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(uploadData),
            })
            : fetch(url);

        const res = await Promise.race([fetchPro, timeout(TIME_OUT)]);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (err) {
        throw err;
    }
};

export const reformulate = function (object) {
    let res = {
        //Just wooooow
        ...(object.key && { key: object.key })
    }
    const keys = Object.keys(object)
    let currentKey;
    keys.map(key => { if (!key.includes("_")) res[key] = object[key]; return key })
        .forEach(key => {
            currentKey = key;
            const splitted = key.split("_")
                .map((key, i) => { if (i > 0) key = key.replace(key[0], key[0].toUpperCase()); return key })
            res[splitted.join("")] = object[currentKey]
        })
    return res;
}