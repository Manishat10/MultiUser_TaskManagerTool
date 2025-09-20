import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsersThunk } from '../../features/userSlice';

const AssignedToDropdown = ({ name, value, onChange, className }) => {
    const dispatch = useDispatch();
    const { allUsers, loading: usersLoading } = useSelector((state) => state.users);

    useEffect(() => {
        // Fetch users only once when the component mounts
        if (allUsers.length === 0) {
            dispatch(fetchAllUsersThunk());
        }
    }, [dispatch, allUsers.length]);

    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            className={className}
        >
            {usersLoading && <option>Loading users...</option>}
            {!usersLoading && allUsers.length > 0 && (
                <>
                    <option value="">Select a user</option>
                    {allUsers.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </>
            )}
        </select>
    );
};

export default AssignedToDropdown;