import api from '../../services/api';
import { addReserveSucess, updateAmountReserve, updateAmountSucess} from './actions'
import { select,call, put, all, takeLatest } from 'redux-saga';

function* addToReserve({ id}){

    const tripExists = yield select(
        state => state.reserve.find(trip => trip.id === id)
    );

    const myStock = yield call(api.get, `/stock/${id}`);
    const stockAmount = myStock.data.amount;

    const currentStock = tripExists ? tripExists.amount : 0;
    const amount = currentStock + 1;

    if(amount > stockAmount){
        alert("Quantidade máxima atingida.")
        return;
    }else{
        if(tripExists){
            const amount = tripExists.amount +1;
            yield put(updateAmountSucess(id, amount));
        }else{
            const response = yield call(api.get, `trips/${id}`);
    
            const data = {
                ...response.data,
                amount: 1,
            }
            yield put(addReserveSucess(response.data))
            history.push('/reservas');
        }
    }

}

function* updateAmount({id, amount}){
    if(amount <= 0){
        return;
    }
    const myStock = yield call(api.get, `/stock/${id}`);

    const stockAmount = myStock.data.amount;
    if(amount > stockAmount){
        alert("Quantidade máxima atingida.")
        return;
    }else{
        yield put(updateAmountSucess(id, amount));
    }
}

export default all([
    takeLatest('ADD_RESERVE_REQUEST', addToReserve),
    takeLatest('UPDATE_RESERVE_REQUEST', updateAmount)
])