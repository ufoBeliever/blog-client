import {auth} from "../utils/auth";
import InputWithCaption from "./InputWithCaption";
import SubmitButton from "./SubmitButton";
import ResetButton from "./ResetButton";
import React, {FormEvent, useState} from "react";

interface SignUpFormProps{
    setIsError:(a:boolean)=>any,
    setErrorMessage:(a: string)=>any
}

const SignUpForm:React.FC<SignUpFormProps> = (props) => {
    const [signUpData, setSignUpData] = useState({
        email: "",
        password: "",
        name: "",
        extra_details:"",
        skills: "",
        profession: "",
        details: ""
    })

    async function formSubmitHandler(e:FormEvent<HTMLFormElement>){
        e.preventDefault()
        const res = await auth.signUp(signUpData)
        clearForm()

        if(res?.error && (typeof res.data === "string")){
            props.setIsError(true)
            props.setErrorMessage(res.data)
        }

        else {
            window.location.href = '/auth/signin'
        }
    }

    function setField(field:string | symbol, value:string){
        setSignUpData({...signUpData, [field]:value})
    }

    function clearForm(){
        setSignUpData({
            ...signUpData,
            email: "",
            password: "",
            name: "",
            extra_details:"",
            skills: "",
            profession: "",
            details: ""
        })
    }

    return (
        <div className="bg-neutral-100 rounded-3xl">
            <form className="xl:w-4/5 w-full space-y-8 flex flex-col" onSubmit={formSubmitHandler}>
                <InputWithCaption
                    caption="Email"
                    type="email"
                    changeHandler={(e)=>setField('email', e.target.value)}
                    inputValue={signUpData.email}
                />
                <InputWithCaption
                    caption="Password"
                    type="password"
                    changeHandler={(e)=>setField('password', e.target.value)}
                    inputValue={signUpData.password}
                />
                <InputWithCaption
                    caption="Name"
                    type="text"
                    changeHandler={(e)=>setField('name', e.target.value)}
                    inputValue={signUpData.name}
                />
                <InputWithCaption
                    caption="Extra details"
                    type="text"
                    changeHandler={(e)=>setField('extra_details', e.target.value)}
                    inputValue={signUpData.extra_details}
                />
                <InputWithCaption
                    caption="Skills"
                    type="text"
                    changeHandler={(e)=>setField('skills', e.target.value)}
                    inputValue={signUpData.skills}
                />
                <InputWithCaption
                    caption="Profession"
                    type="text"
                    changeHandler={(e)=>setField('profession', e.target.value)}
                    inputValue={signUpData.profession}
                />
                <InputWithCaption
                    caption="Details"
                    type="text"
                    changeHandler={(e)=>setField('details', e.target.value)}
                    inputValue={signUpData.details}
                />
                <div className="w-44 flex justify-between">
                    <SubmitButton />
                    <ResetButton clickHandler={clearForm}/>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm