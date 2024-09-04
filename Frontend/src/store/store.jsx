import { configureStore } from '@reduxjs/toolkit'
import login_info_slice from '../slices/login_info/index'

const store = configureStore({
    reducer:{
        info: login_info_slice,
    }

})

export default store;