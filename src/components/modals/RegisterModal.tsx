'use client'


import React from 'react'

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { login, signUp } from '../../features/auth/authSlice';
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";

// import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
// import Heading from "../Heading";
import Button from "../Button";
import Heading from '../Heading';
import useLoginModal from '../../hooks/useLoginModal';
import useAuthStore from '../../hooks/useAuthStore';
import { useAppDispatch } from '../../features/store';
// import { Input } from 'postcss';

const RegisterModal = () => {

    // dispatch
    const dispatch = useAppDispatch();

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    // const authStore = useAuthStore();
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },

    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });
    console.log(registerModal.isOpen, 'yyyyyyyy');



    const toggle = useCallback(() => {
      registerModal.onClose();
      loginModal.onOpen();
    },[loginModal, registerModal])

    const bodyContent = (
        <div className='flex flex-col gap-2 '>
            <Heading title={'Welcome to Airbnb'} subtitle='Create an Account!' />
            <Input id='email' disabled={isLoading} label='Email' register={register} errors={errors} required  />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

        </div>
    );
    const footerContent = (
    <div className="flex flex-col gap-2 mt-3">
      <hr />
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}} 
      />
      {/* <Button putline label='Continue with Google' /> */}
      <Button 
        outline 
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>Already have an account?
          <span 
            onClick={toggle} 
            className="
              text-neutral-800
                cursor-pointer 
                hover:underline
                hover:font-semibold
            "
            > Log in</span>
        </p>
      </div>
    </div>
  )

    let onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        // const {name, email, password} = data;
        try {
          
          dispatch(signUp(data));
          toast.success("user created successfully");
          setIsLoading(false);
          registerModal.onClose();

        }  catch(error) {
          toast.error("something went wrong");
        } 
    }
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal ;