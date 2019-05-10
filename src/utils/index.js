import decode from 'jwt-decode';

const utils = {
    storageSetItem (name, value) {
        sessionStorage.setItem(name, value);
    },

    storageGetItem (name) {
        const result = sessionStorage.getItem(name)
        return result;
    },

    storageRemoveItem (nome) {
        sessionStorage.removeItem(nome);
    },

    async jwtDecode (token){
        const result = await decode(token);
        return result;
    }
}

export default utils;