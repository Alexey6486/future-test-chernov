import React, {PropsWithChildren} from "react";
import './search.styles.scss';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../formFields/formFields";

type FormType = {
    text: string
}
type PropsType = {
    onSearch: (text: string) => void
}

export const SearchComponent = (props: PropsType) => {

    const {onSearch} = props;

    const onSubmit = (formData: FormType) => {
        const {text} = formData;
        onSearch(text);
    }

    return (
        <div className={'searchBlock'}>
            <SearchReduxForm onSubmit={onSubmit}/>
        </div>
    )
};

const SearchForm: React.FC<InjectedFormProps<FormType>> = (props: PropsWithChildren<InjectedFormProps<FormType>>) => {
    return (
        <form onSubmit={props.handleSubmit} className={'searchForm'}>
            <div className={'formGroup'}>
                <Field component={Input} type={'text'} name={`text`}
                       placeholder={`search for...`}/>
            </div>
            <div className={'formGroup'}>
                <button>Search</button>
            </div>
        </form>
    )
};

const SearchReduxForm = reduxForm<FormType>({
    form: 'SearchForm'
})(SearchForm);