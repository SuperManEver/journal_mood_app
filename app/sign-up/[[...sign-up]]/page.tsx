import { SignUp } from '@clerk/nextjs'

function SignUpPage() {
  return <SignUp afterSignInUrl="/new-user" redirectUrl="/new-user" />
}

export default SignUpPage
