import React from "react";
import './formField.styles.scss';

const FormField = (Element: string) => ({input, meta, ...props}: any) => {

    const error = meta.touched && meta.error;

    return (
        <>
            <Element {...input} {...props}/>
            {
                error &&
                <div className={'formFieldError'}>{meta.error}</div>
            }
        </>
    )
};

export const Input = FormField('input');
