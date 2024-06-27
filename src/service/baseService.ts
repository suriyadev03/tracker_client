import { baseQueryWithReauth } from "./baseQuery";
import {
    createApi
} from "@reduxjs/toolkit/query/react";

const baseService = createApi({
    reducerPath: "baseService",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (user) => ({
                url: 'login',
                method: 'POST',
                body: user
            })
        })
    }),
    
});
export const { useLoginUserMutation } = baseService
export default baseService;



