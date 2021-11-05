export const createMembership = membership => (
    $.ajax({
        url: 'api/memberships',
        method: 'POST',
        data: { membership }
    })
);

export const deleteMembership = membershipId => (
    $.ajax({
        url: `api/memberships/${membershipId}`,
        method: 'DELETE'
    })
)

export const fetchMemberships = () => (
    $.ajax({
        url: `api/memberships`
    })
);