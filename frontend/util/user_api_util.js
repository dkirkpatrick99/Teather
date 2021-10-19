export const fetchUser = userId => (
    $.ajax({
        url: `/api/users/${userId}`
    })
);

export const fetchUsers = () => (
    $.ajax({
        url: `/api/users`
    })
);

// export const fetchUsers = () => {
//     debugger
//     return $.ajax({
//         method: 'GET',
//         url: `/api/users`
//     })
// };