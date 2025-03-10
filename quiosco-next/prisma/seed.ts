import { categories } from "./data/categories";
import { products } from "./data/products";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

async function main() {
    try {
        await prisma.category.createMany({
            data: categories
        })
        await prisma.producto.createMany({
            data: products
        })
    } catch (error) {
        console.log('error en PismaClient',error)
    }
}

// segun la documentacion tengo que llamar la funcion pero pasar algo mas de informacion para aseguramente que se termino el proceso.

main()
    .then(async ()=> {
        await prisma.$disconnect()
    })
    .catch( async (e) =>{
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })