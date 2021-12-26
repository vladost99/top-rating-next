import {  DetailedHTMLProps, GetDerivedStateFromError, InputHTMLAttributes } from "react";
import {FieldError} from 'react-hook-form'

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    error?: FieldError;
}