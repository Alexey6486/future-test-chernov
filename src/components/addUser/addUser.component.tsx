import React, {PropsWithChildren} from "react";
import './addUser.styles.scss';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../utils/formFields/formFields";
import { fieldRequired } from "../../utils/formValidation/formValidation";

export type AddUserFormDataType = {
    firstName: string
    lastName: string
    email: string
    phone: string
}
type PropsType = ExtraPropsType & {
    addUser: (payload: AddUserFormDataType) => void
}
type ExtraPropsType = {
    onClose: () => void
}

export const AddUserComponent = (props: PropsType) => {

    const {onClose, addUser} = props;

    const onSubmit = (formData: AddUserFormDataType) => {
        const {email, firstName, lastName, phone} = formData;
        addUser({email, firstName, lastName, phone});
        onClose();
    }

    return (
        <div className={'addUserBlock'}>
            <AddUserReduxForm onSubmit={onSubmit} onClose={onClose}/>
        </div>
    )
};

const AddUserForm: React.FC<InjectedFormProps<AddUserFormDataType, ExtraPropsType> & ExtraPropsType> = (props: PropsWithChildren<InjectedFormProps<AddUserFormDataType, ExtraPropsType>> & ExtraPropsType) => {

    const {onClose, invalid} = props;

    const onCloseClick = () => onClose();

    return (
        <form onSubmit={props.handleSubmit} className={'addUserForm'}>
            <div className={'formGroup'}>
                <Field component={Input} name={'firstName'} placeholder={'First Name'} type={'text'} validate={[fieldRequired]}/>
            </div>
            <div className={'formGroup'}>
                <Field component={Input} name={'lastName'} placeholder={'Last Name'} type={'text'} validate={[fieldRequired]}/>
            </div>
            <div className={'formGroup'}>
                <Field component={Input} name={'email'} placeholder={'Email'} type={'email'} validate={[fieldRequired]}/>
            </div>
            <div className={'formGroup'}>
                <Field component={Input} name={'phone'} placeholder={'Phone'} type={'number'} validate={[fieldRequired]}/>
            </div>
            <div className={'formGroup'}>
                <button disabled={invalid}>Add to the table</button>
            </div>
            <div className={'close'} onClick={onCloseClick}></div>
        </form>
    )
};

const AddUserReduxForm = reduxForm<AddUserFormDataType, ExtraPropsType>({
    form: 'AddUserForm'
})(AddUserForm);

