import axios from 'axios';

const initialState = {
    tnt_payments_list: [],
    mgr_payments_list: []
}

//action constants
const UPDATE_PAYMENTS_TNT = 'UPDATE_PAYMENTS_TNT';
const UPDATE_PAYMENTS_MGR = 'UPDATE_PAYMENTS_MGR'

//action creators
export function updatePaymentsTnt(user_id) {
    let payload = axios.get(`/api/tenant/${user_id}/payments`).then(res => res)
    return {
        type: UPDATE_PAYMENTS_TNT,
        payload: payload
    };
};

export function updatePaymentsMgr() {
    let payload = axios.get(`/api/manager/payments`).then(res => res)
    return {
        type: UPDATE_PAYMENTS_MGR,
        payload: payload
    };
};


//reducer function
export default function paymentReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_PAYMENTS_TNT + '_FULFILLED':
            console.log(action.payload)
            return { ...state, tnt_payments_list: action.payload.data }
        case UPDATE_PAYMENTS_MGR + '_FULFILLED':
            return { ...state, mgr_payments_list: action.payload.data }
        default:
            return state
    }
}