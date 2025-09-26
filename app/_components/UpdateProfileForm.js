"use client"
import { useState } from "react";
import { updateProfile } from "../_lib/action";
import FormButton from "./FormButton";

function UpdateProfileForm({children, user}) {
    const [count, setCount]= useState();
    const { fullName, email, nationality, countryFlag, nationalID } = user

    return (
        <form action={updateProfile} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
            <div className="space-y-2">
            <label>Full name</label>
            <input
                name="fullName"
                disabled
                className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                defaultValue={fullName}
            />
            </div>

            <div className="space-y-2">
            <label>Email address</label>
            <input
                name="email"
                disabled
                className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                defaultValue={email}
            />
            </div>

        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label htmlFor="nationality">Where are you from?</label>
                <img
                    src={countryFlag}
                    alt="Country flag"
                    className="h-5 rounded-sm"
                />
            </div>

            {children}
        </div>

        <div className="space-y-2">
            <label htmlFor="nationalID">National ID number</label>
            <input
                name="nationalID"
                className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                defaultValue={nationalID}
                
            />
        </div>

        <div className="flex justify-end items-center gap-6">
            <FormButton updatingLabel="updating..">
                Update profile
            </FormButton>
        </div>
        </form>
    )
}


export default UpdateProfileForm
