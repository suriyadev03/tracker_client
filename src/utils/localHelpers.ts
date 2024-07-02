
/* eslint @typescript-eslint/ban-types:"off" */
type tplotOptions = {
    [key: string]: object | string
};

const getLocalStorage = (key: string) => {
    return localStorage.getItem(key);
};

const setLocalStorage = (key: string, payload: string | Object) => {
    localStorage.setItem(key, typeof payload === "object" ? JSON.stringify(payload) : payload);
};

const setLocalStorageObject = (obj: tplotOptions) => {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const payload = obj[key];
            localStorage.setItem(key, typeof payload === "object" ? JSON.stringify(payload) : payload);
        }
    }
};

const getBirthMonth = (monthInDigit: string) => {
    const month = String(monthInDigit.slice(5, 7))
    const monthNumber = month.toString();
    const date = new Date(0, Number(monthNumber) - 1);
    const monthName = date.toLocaleString('default', { month: 'long' }).slice(0, 3);
    return monthName

  }

export {
    getLocalStorage,
    setLocalStorage,
    setLocalStorageObject,
    getBirthMonth,

};