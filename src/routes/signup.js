import { Icon } from '@iconify/react';
import TextInput from "../components/shared/input";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { unauthenticatedPostRequest } from '../utils/helpers';
import { useCookies } from 'react-cookie';


const SignupComponent = () => {
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmemail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();

    const signUp = async () => {
        if (email !== confirmEmail) {
            alert("Email and Confirm email fields must match");
            return;
        }
        const Data = { email, password, firstName, lastName, username }
        const response = await unauthenticatedPostRequest("/auth/register", Data);
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
        <div className="input w-1/3 py-10 flex flex-col items-center justify-center">
            <div className='font-bold mb-8 text-xl '>
                Sign up for free to start listening.
            </div>
            <TextInput label="Email address" placeholder="Enter your email" type="Email" value={email} setValue={setEmail} />
            <TextInput label="Confirm Email address" placeholder="Enter your email again" type="Email" value={confirmEmail} setValue={setConfirmemail} />
            <TextInput label="Username" placeholder="Enter username" type="text" value={username} setValue={setUsername} />
            <TextInput label="Create a Password" placeholder="Password" type="password" value={password} setValue={setPassword} />
            <div className='w-full flex items-center justify-between space-x-8'>
                <TextInput label="What should we call you?" placeholder="Write your First Name" type="Email" value={firstName} setValue={setFirstname} />
                <TextInput label="Last Name" placeholder="Write your Last Name" type="Email" value={lastName} setValue={setLastname} />
            </div>

            <div className='w-full flex justify-center mt-12 mb-8'>
                <button className="bg-button-green font-semibold text-lg p-3 px-12 rounded-full w-1/2" onClick={(e) => {
                    e.preventDefault();
                    signUp();
                }}>
                    Sign up
                </button>
            </div>
            <div className='border border-solid border-gray-250 w-full mt-6'></div>
            <div className='my-6 font-semibold text-lg'>
                Already have an account?
            </div>
            <div className='border border-gray-400 w-full flex justify-center py-2 rounded-full text-gray-500 font-bold'>
                {/* increases effeciency as comapred to a tag */}
                <Link to="/login">
                    Log in here
                </Link>
            </div>
        </div>
    </div>
}



export default SignupComponent;