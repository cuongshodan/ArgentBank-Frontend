import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentToken, updateUserName } from '../../features/auth/authSlice';
import { useGetProfileQuery } from '../../features/auth/authApiSlice';
import DropdownTransaction from '../../components/DropdownTransaction/DropdownTransaction';
import mockData from '../../../mocks/mockData.json';

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
        <main className="flex flex-col items-center justify-center">
            <h1 className="">
                Welcome back<br />
                {profile.body.userName}!
            </h1>
            <div className="flex flex-col w-full max-w-[730px] p-2 gap-3">

                <div className="flex justify-between text-black gap-3 p-2">
                    <div className="w-2/6 text-start">Date</div>
                    <div className="w-1/2 text-start ">Description</div>
                    <div className="w-1/6">Amount</div>
                    <div className="w-1/6">Balance</div>
                    <div className="w-1/6">
                    </div>
                </div>

                {mockData.transactions.map((transaction) => (
                    <DropdownTransaction
                        key={transaction.date + transaction.description}
                        date={transaction.date}
                        description={transaction.description}
                        amount={transaction.amount}
                        balance={transaction.balance}
                    />
                ))}
            </div>
        </main>
    );
};

export default Profile;