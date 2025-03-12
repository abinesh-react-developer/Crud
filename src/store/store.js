import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";



const config = {
    key: 'root',
    storage: localStorage
}

const reducerConfig = persistReducer(config, rootReducer)

const store =configureStore({
    reducer:reducerConfig,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoreActions:['persist/PERSIST']
            }
        })
    
})

const persistor = persistStore(store)

export {store,persistor}