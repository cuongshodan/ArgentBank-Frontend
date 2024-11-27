import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentToken, updateUserName } from '../../features/auth/authSlice';
import { useGetProfileQuery } from '../../features/auth/authApiSlice';
import DropdownTransaction from '../../components/DropdownTransaction/DropdownTransaction';

const Profile = () => {
    const token = useSelector(selectCurrentToken);
    const navigate = useNavigate();
    const { data: profile, isLoading } = useGetProfileQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!token) {
            navigate('/signin');
        }
    }, [token, navigate]);

    // Add this useEffect to update userName in the Redux store when profile changes
    useEffect(() => {
        if (profile?.body.userName) {
            dispatch(updateUserName({ userName: profile.body.userName }));
        }
    }, [profile, dispatch]);

    if (isLoading) return <div>Loading...</div>;
    if (!profile?.body) return <div>Please sign in</div>;

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1 className="bg-green-800">
                    Welcome back<br />
                    {profile.body.userName}!
                </h1>

                <div>
                    <DropdownTransaction />
                </div>

            </div>
        </main>
    );
};

export default Profile;