import { prisma } from '@/utils/db'
import { auth } from '@clerk/nextjs'

const createNewUser = async () => {
  const { userId } = auth()

  const match = await prisma.user.findUnique({
    where: {
      clerkId: userId || void 0,
    },
  })

  console.log(match)
}

const NewUser = async () => {
  createNewUser()

  return <div>Hi</div>
}

export default NewUser
