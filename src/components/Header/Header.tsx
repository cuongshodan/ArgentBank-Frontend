import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, logOut } from '../../features/auth/authSlice';
import { useGetProfileQuery } from '../../features/auth/authApiSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: profile } = useGetProfileQuery(undefined, {
        skip: !user
    });

    const handleSignOut = () => {
        dispatch(logOut());
        navigate('/');
    };

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src="/img/argentBankLogo.png"
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {user ? (
                    <>
                        <Link className="main-nav-item" to="/profile">
                            <i className="fa fa-user-circle"></i>
                            {profile?.body.firstName}
                        </Link>
                        <Link className="main-nav-item" to="/" onClick={handleSignOut}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </Link>
                    </>
                ) : (
                    <Link className="main-nav-item" to="/signin">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Header;