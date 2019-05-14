import moment from 'moment'
import utils from '../utils';

export const isAuthenticated = () => {
    const token = utils.storageGetItem('@JDriveToken');
    if(token) {
        const decodedToken = utils.jwtDecode(token);
        const expiresAt = moment.unix(decodedToken.exp);
        return moment().isBefore(expiresAt);
    }
    return false;
} 