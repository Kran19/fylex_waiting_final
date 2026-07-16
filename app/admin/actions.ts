"use server"

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function deleteEntry(id: string) {
  try {
    await prisma.waitlist.delete({
      where: { id }
    })
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}
