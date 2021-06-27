    import { UIAlert } from "./utility";

export const getData = async (SID) => {
     console.log(sessionStorage.getItem(SID));
    if (sessionStorage.getItem(SID) !== null) {
        try {
            const storedValue = await sessionStorage.getItem(SID);
             console.log(storedValue);
            if (typeof storedValue === 'undefined') {
                return {};
            } else {
                //  const bytes = CryptoJS.AES.decrypt(storedValue.toString(),X_AUTHORIZATION);
                const plaintext = storedValue.toString();
                return JSON.parse(plaintext);
            }
        } catch (error) {
            console.log(error);
            //TODO
            UIAlert("error", "There was error while loading the data");
        }
    }
};

// export const setData = async (key, data, callback) => {
//     try {
//         // const encrypted_data = CryptoJS.AES.encrypt(JSON.stringify(data),X_AUTHORIZATION);
//         await sessionStorage.setItem(key, JSON.stringify(data));
//         if (callback !== null && typeof callback === "function") {
//             callback();
//         }
//     } catch (error) {
//         console.log(error)
//         UIAlert("error", "There was error while loading the data");
//     }
// };

// export const clearStorage = async (key) => {
//     try {
//         await sessionStorage.removeItem(key);
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// export const setLocalStorageData =  (key, data, callback) => {
//     try {
//         // const encrypted_data = CryptoJS.AES.encrypt(JSON.stringify(data),X_AUTHORIZATION);
//          localStorage.setItem(key, JSON.stringify(data));
//         if (callback !== null && typeof callback === "function") {
//             callback();
//         }
//     } catch (error) {
//         console.log(error)
//         UIAlert("error", "There was error while loading the data");
//     }
// };
export const getLocalStorageData =  (SID) => {
    // console.log(sessionStorage.getItem(key));
    if (localStorage.getItem(SID) !== null) {
        try {
            const storedValue =  localStorage.getItem(SID);
            // console.log(storedValue);
            if (typeof storedValue === 'undefined') {
                return {};
            } else {
                //  const bytes = CryptoJS.AES.decrypt(storedValue.toString(),X_AUTHORIZATION);
                const plaintext = storedValue.toString();
                return JSON.parse(plaintext);
            }
        } catch (error) {
            console.log(error);
            //TODO
            UIAlert("error", "There was error while loading the data");
        }
    }
};

export const clearLocalStorage =  (SID) => {
    try {
         localStorage.removeItem(SID);
        return true;
    } catch (error) {
        return false;
    }
}
