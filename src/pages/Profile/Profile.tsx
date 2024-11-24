import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../features/auth/authSlice';
import { useGetProfileQuery } from '../../features/auth/authApiSlice';

const Profile = () => {
    const token = useSelector(selectCurrentToken);
    const navigate = useNavigate();
    const { data: profile, isLoading } = useGetProfileQuery();

    useEffect(() => {
        if (!token) {
            navigate('/signin');
        }
    }, [token, navigate]);

    if (isLoading) return <div>Loading...</div>;
    if (!profile?.body) return <div>Please sign in</div>;

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back<br />
                    {profile.body.userName}!
                </h1>

                <p>Email: {profile.body.email}</p>
                <p>First Name: {profile.body.firstName}</p>
                <p>Last Name: {profile.body.lastName}</p>
                <p>Created At: {profile.body.createdAt}</p>
                <p>Updated At: {profile.body.updatedAt}</p>
                <p>ID: {profile.body.id}</p>
            </div>
        </main>
    );
};

export default Profile;