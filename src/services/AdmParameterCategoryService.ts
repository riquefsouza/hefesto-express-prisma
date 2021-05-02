import { AdmParameterCategory, PrismaClient } from '@prisma/client'

export class AdmParameterCategoryService {

    constructor(private prisma: PrismaClient) { }

    public async findAll() {
        return await this.prisma.admParameterCategory.findMany();
    }

    public async findById(id: number) {
        return await this.prisma.admParameterCategory.findUnique({
            where: { id: id },
        })
    }

    public async insert(obj: AdmParameterCategory) {
        return await this.prisma.admParameterCategory.create({
            data: obj
        })
    }

    public async update(id: number, obj: AdmParameterCategory) {
        return await this.prisma.admParameterCategory.update({
            where: { id: id },
            data: obj
        })
    }

    public async delete(id: number) {
        return await this.prisma.admParameterCategory.delete({
            where: { id: id },
        })
    }
}