import React, { useEffect, useState, useContext } from 'react';
import Conatct from '../components/contactitem';
import SearchPanel from '../components/searchpanel';
import classes from '../style/groups.module.css';
import PopUp from '../components/popup';
import { deleteConatctApi, updateContactApi } from '../proxy/serviceproxy';
import ConatctItem from '../components/contactitem';


const Contacts = () => {

    let items = [];
    const initializeContacts = {
        email: "",
        phoneNumber: "",
        groupId: "",
        id: "",
        error: ""
    }

    let conatactRef = React.useRef(null);
    const[contactDetails, setContactDetails] = useState(initializeContacts);
    const [contacts, setContacts] = useState([]);
    const [selectedIndex, setIndex] = useState(-1);

    useEffect(()=> {

        if(localStorage.getItem("Groups"))
        {
            let contacts = [];
            let groups = JSON.parse(localStorage.getItem("Groups") || "[]");
            groups.forEach(group => {
                if(group.contacts !== undefined && group.contacts.length > 0)
                {
                    contacts = contacts.concat(...group.contacts);
                }
                
            });

            setContacts(contacts);

        }
        conatactRef.current.style.display = "none";
        
    }, [])

    const onSearch = (event) => {
        
    }

    const onRemoveContact = (index) => {
        deleteConatctApi(contacts[index].groupId, contacts[index].id)
        .then(result => {

        })
        .catch(error => {

        })
    }

    const onConatctEdit = (index) => {

        setContactDetails({...contactDetails, 
            email: contacts[index].email, 
            phoneNumber: contacts[index].phoneNumber});
        setIndex(index);
        conatactRef.current.style.display = "block";        
    }

    const onSubmit = () => {
        updateContactApi(contacts[selectedIndex].groupId, 
            {
                id: contacts[selectedIndex].id,
                email: contactDetails.email, 
                phoneNumber: contactDetails.phoneNumber
            })
        .then(result => {
            if(result.success)
            {

            }
            else
            {

            }
        })
        .catch(error => {

        })
        .finally(()=> conatactRef.current.style.display = "none")        
    }

    const onCloseButton =() => {
        setContactDetails(initializeContacts);
        conatactRef.current.style.display = "none";
    }

    const onValueChange = (event) =>{
        setContactDetails({...contactDetails, [event.target.name]: event.target.value});
    }

    return (
        <div>
            <SearchPanel onSearch = {onSearch}/>
            <div className={classes.displayGroup}> 
                {
                    contacts.length > 0 ?
                    <ul className={classes.usergroups}>                                    
                    {
                        contacts.map((contact, index) => {
                            return(
                            <li>
                                <ConatctItem 
                                email = {contact.email}
                                phoneNumber = {contact.phoneNumber}
                                onConatctEdit={()=> onConatctEdit.call(null, index)}
                                onRemoveGroup = {()=> onRemoveContact.call(null, index)}
                                />
                            </li>
                            )
                        })
                    }              
                                                    
                    </ul> : <>User Dont have any contact</>
                }               
                
            </div>
            <div className={classes.createContact} ref={conatactRef}>
                
                        <PopUp 
                            heading = "Edit contact"
                            firstHeading = "Email"
                            secondHeading = "Phone Number"
                            firstInputType= "email"
                            secondInputType = "tel"
                            firsInputId = "emailId"              
                            secondInputId = "phoneNumberId"
                            firstInputName = "email"
                            secondInputName = "phoneNumber"
                            firstPlaceholder = "Enter email id"
                            secondPlaceholder = "Enter phone number"
                            buttonCaption = "Add Contact"
                            firstInputValue = {contactDetails.email}
                            secondInputValue = {contactDetails.phoneNumber}
                            onValueChange = {onValueChange}
                            onSubmit = {onSubmit}
                            onCloseButton={onCloseButton}/>
            </div>
        </div>
    )
}

export default Contacts;