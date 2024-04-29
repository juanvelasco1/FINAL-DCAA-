export const redirect = (payload:any) => {
    return {
        action: 'redirect',
        payload: payload
    }
}