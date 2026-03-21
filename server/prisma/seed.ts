import prisma from '../src/lib/prisma'

async function main() {
    await prisma.problem.create({
        data:{
            title: "Two Sum",
            slug: "two-sum",
            description: "Given an array of integers nums and an integer target, return indices of the numbers that add up to target.",
            difficulty: "EASY",
            tags: ["Arrays", "HashMap"]
        }
    })
    await prisma.problem.create({
        data:{
            title: "Reverse String",
            slug: "reverse-string",
            description: "Write a function that reverses a string. the input string is given as an array of characters.",
            difficulty:"EASY",
            tags: ["Strings", "Two Pointers"]
        }
    })
    await prisma.problem.create({
        data:{
            title: "Valid Parentheses",
            slug: "valid-parentheses",
            description: "Given a string containing just the characters (, ),{, }, [and], determine if the input string is valid.",
            difficulty:"MEDIUM",
            tags: ["Strings", "Stack"]
        }
    })
}
main()
.catch(console.error)
.finally(()=>prisma.$disconnect())