import React from 'react';
import SignInComp from "../../Component/SignInComp/SignInComp";
import SignUpComp from "../../Component/SignUpComp/SignUpComp";
import './SignIn.scss';
const SignIn = ()=>(
    <div className='sign-in-up'>
        <SignInComp/>
        <SignUpComp/>
    </div>
);
export default SignIn;