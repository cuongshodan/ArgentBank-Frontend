import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, logOut } from '../../features/auth/authSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { apiSlice } from '../../app/api/apiSlice';

const Header = () => {
    const userName = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(logOut());
        dispatch(apiSlice.util.resetApiState());
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
            <>
                {userName ? (
                    <div className="flex gap-3">
                        <Link className="main-nav-item flex gap-2 items-center" to="/profile">
                            <div>
                                {userName}
                            </div>
                            <i className="fa fa-user-circle"></i>
                        </Link>
                        <Link className="main-nav-item" to="/settings">
                            <FontAwesomeIcon icon={faCog} />
                        </Link>
                        <Link className="main-nav-item flex gap-2 items-center" to="/" onClick={handleSignOut}>
                            Sign Out
                            <i className="fa fa-sign-out"></i>
                        </Link>
                    </div>
                ) : (
                    <Link className="main-nav-ite flex gap-2 items-center" to="/signin">
                        Sign In
                        <i className="fa fa-user-circle"></i>
                    </Link>
                )}
            </>
        </nav>
    );
};

export default Header;