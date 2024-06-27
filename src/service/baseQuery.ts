/* eslint no-console:"off" */
/* eslint @typescript-eslint/no-explicit-any:"off" */
import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { getLocalStorage, setLocalStorage } from "../utils/localHelpers";
import { LOCAL_CONSTANTS } from "../constants";

interface IUserWithTokens {
    accessToken: string;
    refreshToken: string;
}

const mutex = new Mutex();

export const resetAuth = (): void => {
    localStorage.removeItem(LOCAL_CONSTANTS.REFRESH);
    localStorage.removeItem(LOCAL_CONSTANTS.ACCESS);
    localStorage.removeItem(LOCAL_CONSTANTS.USER);
    window.location.href = "/";
};

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL || "",
    prepareHeaders: (headers) => {
        const token = getLocalStorage(LOCAL_CONSTANTS.ACCESS);
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshToken = getLocalStorage(LOCAL_CONSTANTS.REFRESH);

                if (refreshToken) {
                    const refreshResult: any  = await baseQuery(
                        {
                            url: "/auth/refreshToken",
                            method: "POST",
                            body: { refreshToken },
                        },
                        api,
                        extraOptions
                    );
                    if (refreshResult.data) {
                        const userWithTokens = refreshResult.data.data as IUserWithTokens;
                        setLocalStorage(LOCAL_CONSTANTS.ACCESS, userWithTokens.accessToken);
                        setLocalStorage(LOCAL_CONSTANTS.REFRESH, userWithTokens.refreshToken);
                    } else {
                        resetAuth();
                    }
                }
            } catch (error) {
                console.log(error);
                resetAuth();
            } finally {
                release();
            }
        }

        result = await baseQuery(args, api, extraOptions);
    }
    return result;
};