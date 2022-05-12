import { all } from 'redux-saga'
import reserve from './reserve/sagas';

export default function* rootSaga(){
    return yield all([
        reserve,
    ])
}