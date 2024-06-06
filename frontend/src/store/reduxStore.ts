import {configureStore} from "@reduxjs/toolkit"
import userSlice from "@/store/user/userSlice"

export const reduxStore = configureStore({
    reducer: {
        user: userSlice
    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware({
            serializableCheck: false
        })
    )
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch