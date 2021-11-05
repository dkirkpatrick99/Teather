import * as MembershipApiUtil from '../util/membership_api_util';

export const RECEIVE_MEMBERSHIP = 'RECEIVE_MEMBERSHIP';
export const REMOVE_MEMBERSHIP = 'REMOVE_MEMBERSHIP';
export const RECEIVE_MEMBERSHIPS = 'RECEIVE_MEMBERSHIPS';


const receiveMembership = membership => ({
    type: RECEIVE_MEMBERSHIP,
    membership
})

const removeMembership = membershipId => ({
    type: REMOVE_MEMBERSHIP,
    membershipId
})

const receiveMemberships = memberships => ({
    type: RECEIVE_MEMBERSHIPS,
    memberships
})

export const createMembership = membership => dispatch => MembershipApiUtil.createMembership(membership)
    .then(membership => dispatch(receiveMembership(membership)));

export const deleteMembership = membershipId => dispatch => MembershipApiUtil.deleteMembership(membershipId)
    .then((membership) => dispatch(removeMembership(membership.id)));

export const fetchMemberships = () => dispatch => MembershipApiUtil.fetchMemberships()
    .then(memberships => dispatch(receiveMemberships(memberships)),
        errors => dispatch(receiveErrors(errors.responseJSON)));
