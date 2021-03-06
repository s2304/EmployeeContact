import React from 'react';
import Input from './Input';
import classes from '../style/popup.module.css';


// This is common pop up for the complete application. 
// Using this to creagte group, add contact, edit group
// and also edit contact. Made the pop up generic to 
//reduce redundant code.
const PopUp = (props) => {

    return(
        <div className={classes.group}> 
            <h3>{props.heading}</h3>
            <div>                           
                {props.errorMsg === undefined || props.errorMsg.length === 0 ? null : <h4>{props.errorMsg}</h4>}
            </div>
            <div className={classes.inputdiv}>            
                <Input type={props.firstInputType}     
                id = {props.firsInputId}
                name= {props.firstInputName}
                isRequired 
                placeholder= {props.firstPlaceholder}                                               
                onValueChange={props.onValueChange}
                inputValue ={props.firstInputValue}
                />
            
            </div>
            <div className={classes.inputdiv }>
                <Input type={props.secondInputType}   
                name={props.secondInputName}                         
                id ={props.secondInputId}
                isRequired 
                placeholder= {props.secondPlaceholder}  
                onValueChange={props.onValueChange}
                inputValue ={props.secondInputValue}
                />

            </div>
            <div className={classes.createBtn}>
                <button className={classes.logInBtn}                   
                onClick = {props.onSubmit}
                type="button">{props.buttonCaption}</button>                               
            </div>   
            <span onClick={props.onCloseButton} className={classes.closeBtn}></span>                      
        </div>
    )
    

}

export default PopUp;