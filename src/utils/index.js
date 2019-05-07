import decode from 'jwt-decode';

const utils = {
    storageSetItem (name, value) {
        localStorage.setItem(name, value);
    },

    storageGetItem (name) {
        const result = localStorage.getItem(name)
        return result;
    },

    storageRemoveItem (nome) {
        localStorage.removeItem(nome);
    },

    async jwtDecode (token){
        const result = await decode(token);
        return result;
    }
}

export default utils;