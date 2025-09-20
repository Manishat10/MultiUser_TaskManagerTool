import { useDispatch } from "react-redux";
import Button from "../components/Button";
import { logout } from "../features/authSlice";
const Header = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="bg-gradient-to-l from-blue-700 to-blue-900 text-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10">
            <h1 className="text-2xl font-bold">Task-Manager</h1>
            <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 font-bold" text="Logout" />
        </header>
    );
};
export default Header;