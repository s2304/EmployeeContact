import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router'
import SignIn from '../components/signin';
import Registration from '../components/resgistration';
import { userRegistration, userAuthentication } from '../proxy/serviceproxy';
import { AppContext } from './appContext';

const Authentication = () => {

    let initializeAuthData = {
        email:"",
        password:"",
        firstName:"",
        lastName:"",
        adharNo:"",
        authenticationError: ""
    }

    const {context, setContext} = useContext(AppContext);
   
    const [autheticationData, setAuthenticationData] = useState(initializeAuthData);

    const navigate = useNavigate();  

    const onValueChange = (event) =>{
        setAuthenticationData({...autheticationData, [event.target.name]: event.target.value})
    }

    const onSignIn = () => { 
        const {email, password} = autheticationData;
        userAuthentication({email, password})
        .then(result => { 
            if(result.success)
            { 
                setContext({email: result.email});
                localStorage.setItem("loginToken", result.token);
                navigate('/home');
            }
            // else
            // {
            //     setAuthenticationData({...setAuthenticationData, authenticationError: result.error});
            // }
        })
        .catch(error => {
            setAuthenticationData({...setAuthenticationData, authenticationError: error.errorMessage});
        })
    }

    const onRegister = () =>{
        console.log("Register data", autheticationData)
        userRegistration(autheticationData)
        .then(result => {
            console.log("Register data1", result);
            const {success} = result;
            if(success)
            { 
                setAuthenticationData(initializeAuthData);
                navigate('/signin')
            }
            else
            {
                setAuthenticationData({...setAuthenticationData, authenticationError: result.errorMessage});
            }
        })
        .catch(error => {
            console.log("Register data1 failed", error);
            setAuthenticationData({...setAuthenticationData, authenticationError: error.errorMessage});
        })
    }


    let path = window.location;
    let renderScreen;
    
    
    if(path.toString().includes("/register"))
    {
            renderScreen =      <Registration
                                emailId="emailId" 
                                passwordId="password"
                                firstNameId="firstNameId" 
                                lastNameId="lastNameId"
                                adharId="adharId"
                                isRequired="true" 
                                emailPlaceholder = "example@inmar.com"    
                                passwordPlaceholder = "Enter password" 
                                firstNamePlaceholder = "Enter first name"    
                                lastNamePlaceholder = "Enter last name"  
                                adharPlaceholder = "Enter adhar no" 
                                onValueChange={onValueChange} 
                                email = {autheticationData.email}
                                password = {autheticationData.password}    
                                firstName = {autheticationData.firstName}
                                lastName = {autheticationData.lastName}  
                                adharNo = {autheticationData.adharNo}                             
                                errorMsg = {autheticationData.authenticationError}
                                onRerister = {onRegister}
                            />;
    }
    else
    {
            renderScreen =    <SignIn emailId="emailId" 
                                passwordId="password"
                                isRequired="true" 
                                emailPlaceholder = "example@inmar.com"    
                                passwordPlaceholder = "Enter password"    
                                onValueChange={onValueChange} 
                                onSignIn={onSignIn} 
                                email = {autheticationData.email}
                                password = {autheticationData.password}                               
                                errorMsg = {autheticationData.authenticationError}      
                                />;
    }
 

    return renderScreen;
    // return (
    //     <AppContext.Provider value={autheticationData.email}>
    //         {renderScreen}
    //     </AppContext.Provider>
    // );
}

export default Authentication;