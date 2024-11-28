import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfileMutation } from '../../features/auth/authApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentToken, updateUserName } from '../../features/auth/authSlice';
import { useGetProfileQuery } from '../../features/auth/authApiSlice';
import BankStatusCard from '../../components/BankStatusCard/BankStatusCard';

const Settings = () => {
    const [userName, setUserName] = useState('');
    const firstName = useGetProfileQuery().data?.body.firstName;
    const lastName = useGetProfileQuery().data?.body.lastName;
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
        <main className="flex flex-col justify-center items-center m-16">
            <div className="w-96 m-4">
                <h1 className="text-2xl">Edit user info</h1>
                {error && <div className="error">{error}</div>}

                <div className="input-wrapper m-4">
                    <label htmlFor="username">New Username:</label>
                    <input
                        className="border"
                        type="text"
                        id="username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="input-wrapper m-4">
                    <label htmlFor="username">First name:</label>
                    <input
                        className="border bg-slate-100"
                        type="text"
                        id="username"
                        value={firstName}
                        placeholder={firstName}
                        disabled
                    />
                </div>
                <div className="input-wrapper m-4">
                    <label htmlFor="username">Last name:</label>
                    <input
                        className="border bg-slate-100"
                        type="text"
                        id="username"
                        value={lastName}
                        placeholder={lastName}
                        disabled

                    />
                </div>

                <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-green-500 rounded-md p-2 text-base m-2 text-white w-28"
                >
                    Save
                </button>
                <button
                    className="bg-green-500 rounded-md p-2 text-base m-2 text-white w-28"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </div>
            <div className="w-full mt-10 flex flex-col items-center">
                <BankStatusCard />
                <BankStatusCard />
                <BankStatusCard />
            </div>
        </main>
    );
};

export default Settings;