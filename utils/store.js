import { createStore } from 'vuex';

const store = createStore({
    state: {
        selectedDish: null
    },
    mutations: {
        setSelectedDish(state, dish) {
            state.selectedDish = dish;
        }
    }
});
export default store;