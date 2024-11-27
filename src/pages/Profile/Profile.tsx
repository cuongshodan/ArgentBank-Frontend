import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentToken, updateUserName } from '../../features/auth/authSlice';
import { useGetProfileQuery } from '../../features/auth/authApiSlice';
import DropdownTransaction from '../../components/DropdownTransaction/DropdownTransaction';
import mockData from '../../../mocks/mockData.json';
import BankStatusCard from '../../components/BankStatusCard/BankStatusCard';

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
            <div className="bg-slate-700 text-white rounded-md p-4 m-4 mt-10 text-2xl">
                <div>
                    Welcome back
                    <div className="text-4xl mt-4">
                        {profile.body.userName}!
                    </div>
                </div>


                <button
                    className="bg-green-500 rounded-md p-2 text-base m-4 mt-6"
                    onClick={() => navigate('/settings')}>
                    modify
                </button>
            </div>
            <div className="w-full flex justify-center m-2">
                <BankStatusCard />
            </div>

            <div className="flex flex-col w-full max-w-[730px] p-2 mb-10 gap-3">
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
                        transactionType={transaction.transactionType}
                        category={transaction.category}
                        note={transaction.note}
                    />
                ))}
            </div>
        </main>
    );
};

export default Profile;