import uuid from 'uuid';
import {
    SET_ALERT
} from './types';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        data: {
            msg,
            alertType,
            id
        }
    });

};