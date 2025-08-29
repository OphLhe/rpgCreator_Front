import { checkToken } from "../Services/authServices";
import ConnexionPage from "../Pages/ConnexionPage";

const AuthWrapper = (props) => {
    const token = checkToken();

    return <>
    {!token ? <ConnexionPage /> : props.children}
    </>;
}
 
export default AuthWrapper;