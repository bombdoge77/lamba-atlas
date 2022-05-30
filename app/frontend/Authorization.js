import * as React from "react";
import { isLoggedIn } from "./helper/fetchcalls"
import { useRouter } from "next/router";

export default function Authorization(props) {
  const router = useRouter();
  const [success, setSuccess] = React.useState(null)
  React.useEffect(async () => {
    var loggedIn = await isLoggedIn()
    if (!loggedIn) {
      router.push('http://localhost:3000/login')
      setSuccess(false)
      return  
    }
    setSuccess(true)
  })
  return (success ? props.children : <></>)
}