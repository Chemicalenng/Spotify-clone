import { Icon } from '@iconify/react';
import TextInput from "../components/shared/input";
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { unauthenticatedPostRequest } from '../utils/helpers';

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();

    const login = async () => {
        const Data = { email, password }
        const response = await unauthenticatedPostRequest("/auth/login", Data);

        if (response && !response.err) {
            //console.log(response);
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token, { path: "/", expires: date })//first arguement contains name and second one value and third one will contain options
            alert("Success");
            navigate("/loggedhome");
        }
        else {
            alert("Failure");
        }
    }

    return <div className="w-full h-full flex flex-col items-center font-Poppins">
        <div className="logo p-5 border-b border-solid border-gray-250 w-full flex justify-center">
            <Icon icon="logos:spotify" width="155" />
        </div>
        <div className="input w-1/4 py-10 flex flex-col items-center justify-center">
            <div className='font-bold mb-8 '>To continue,log in to Spotify.</div>
            <TextInput label="Email address or username" placeholder="Email address or username" type="Email" value={email} setValue={setEmail} />
            <div className='w-full pt-5'>
                <TextInput label="Password" placeholder="Password" type="password" value={password} setValue={setPassword} />
            </div>
            <div className='w-full flex justify-center mt-12 mb-8'>
                <button className="bg-button-green font-semibold p-3 px-12 rounded-full w-full" onClick={(e) => {
                    e.preventDefault();
                    login();
                }}>
                    LOG IN
                </button>
            </div>
            <div className='border border-solid border-gray-250 w-full mt-6'></div>
            <div className='my-6 font-semibold text-lg'>
                Don't have an account?
            </div>
            <div className='border border-gray-400 w-full flex justify-center py-2 rounded-full text-gray-500 font-bold'>
                <Link to="/signup">
                    Sign up for Spotify
                </Link>
            </div>
        </div>
    </div>;
}

export default LoginComponent;