import { PrismaClient } from '@prisma/client'
import { IncomingMessage, ServerResponse } from 'http'

const prisma = new PrismaClient()

export type Context = {
  req: IncomingMessage
  res: ServerResponse
  prisma: PrismaClient
}

export const context = ({
  req,
  res,
}: {
  req: IncomingMessage
  res: ServerResponse
}): Context => {
  return { req, res, prisma }
}
