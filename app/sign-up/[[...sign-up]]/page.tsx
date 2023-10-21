import { SignUp } from '@clerk/nextjs'

function SignUpPage() {
  return (
    <SignUp
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
      redirectUrl="/new-user"
      afterSignUpUrl="/new-user"
    />
  )
}

export default SignUpPage
