import rootReducer from './reducers';
import { createStore } from 'redux';
import { loadState, clearState } from './persistState';

export default function configureStore(initialState) {
    const savedState = loadState();
    clearState();

    const store = createStore(
        rootReducer,
        savedState != null ? savedState : initialState
    )

    
}