import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.item.create({
    data: {
      title: 'Lâmpadas',
      image: 'lampadas.svg',
    },
  })
  await prisma.item.create({
    data: {
      title: 'Pilhas e Baterias',
      image: 'baterias.svg',
    },
  })
  await prisma.item.create({
    data: {
      title: 'Papeis e Papelão',
      image: 'papeis-papelao.svg',
    },
  })
  await prisma.item.create({
    data: {
      title: 'Resíduos Eletrônicos',
      image: 'eletronicos.svg',
    },
  })
  await prisma.item.create({
    data: {
      title: 'Resíduos Orgânicos',
      image: 'organicos.svg',
    },
  })
  await prisma.item.create({
    data: {
      title: 'Óleo de Cozinha',
      image: 'oleo.svg',
    },
  })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })
