
export const setInitialState = (state) => {
    return {
        ...state,
        isFetching: false,
        isSuccess: false,
        isError: false,
        error: null,
    }
};