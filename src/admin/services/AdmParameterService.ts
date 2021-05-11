import { AdmParameter, PrismaClient } from '@prisma/client'

export class AdmParameterService {

    constructor(private prisma: PrismaClient) { }

    public async findAll() {
        return await this.prisma.admParameter.findMany({
            include: { 
                admParameterCategory: true 
            }
        })
    }

    public async findById(id: number) {
        return await this.prisma.admParameter.findUnique({
            where: { id: id },
            include: { 
                admParameterCategory: true 
            }
        })
    }

    public async insert(obj: AdmParameter) {
        return await this.prisma.admParameter.create({
            data: obj,
            include: { 
                admParameterCategory: true 
            }
        })
    }

    public async update(id: number, obj: AdmParameter) {
        return await this.prisma.admParameter.update({
            where: { id: id },
            data: obj,
            include: { 
                admParameterCategory: true 
            }
        })
    }

    public async delete(id: number) {
        return await this.prisma.admParameter.delete({
            where: { id: id },
            include: { 
                admParameterCategory: true 
            }
        })
    }
}