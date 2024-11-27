import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfileMutation } from '../../features/auth/authApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentToken, updateUserName } from '../../features/auth/authSlice';

const Settings = () => {
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = useSelector(selectCurrentToken);
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();
    const dispatch = useDispatch();

    const handleSave = async () => {
        try {
            const updatedProfile = await updateProfile({ userName }).unwrap();
            // Update the username in the Redux store if needed
            dispatch(updateUserName({ userName: updatedProfile.body.userName }));
            navigate('/profile');
        } catch (err) {
            setError('Failed to update username');
            console.error('Update error:', err);
        }
    };

    const handleCancel = () => {
        navigate('/profile');
    };

    if (!token) {
        navigate('/signin');
        return null;
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>User Settings</h1>
                {error && <div className="error">{error}</div>}
                <div className="input-wrapper">
                    <label htmlFor="username">New Username</label>
                    <input
                        type="text"
                        id="username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <button onClick={handleSave} disabled={isLoading}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </main>
    );
};

export default Settings;