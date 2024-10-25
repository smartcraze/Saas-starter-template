import React, { FormEvent } from 'react'
import { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { json } from 'stream/consumers'


function Signup() {
  const {isLoaded,signUp,setActive} = useSignUp()
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState("")
  const router = useRouter()

  if (!isLoaded) {
    return null;
  }
  async function Submit(e:React.FormEvent){
    e.preventDefault()
    if(!isLoaded){
      return
    }
    try {

      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({
        strategy:"email_code"        
      })
      setPendingVerification(true)

    } catch (error:any) {
      console.log(JSON.stringify(error)) ;
      setError(error.error[0].message)
      }
    
  }

  async function OnpressVerify(e:React.FocusEvent){
      e.preventDefault()
      if(!isLoaded){
        return
      }
      try {
        const completesignup = await signUp.attemptEmailAddressVerification({code});

        if(completesignup.status !== "complete"){
          console.log(JSON.stringify(completesignup,null,2));

        }
        if(completesignup.status === "complete"){
          console.log(JSON.stringify(completesignup,null,2));
        }

        
      } catch (error) {
        
      }
  }
}

export default Signup