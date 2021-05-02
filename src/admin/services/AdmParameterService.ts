import { AdmParameter, PrismaClient } from '@prisma/client'

export class AdmParameterService {

    constructor(private prisma: PrismaClient) { }

    public async findAll() {
        return await this.prisma.admParameter.findMany();
    }

    public async findById(id: number) {
        return await this.prisma.admParameter.findUnique({
            where: { id: id },
        })
    }

    public async insert(obj: AdmParameter) {
        return await this.prisma.admParameter.create({
            data: obj
        })
    }

    public async update(id: number, obj: AdmParameter) {
        return await this.prisma.admParameter.update({
            where: { id: id },
            data: obj
        })
    }

    public async delete(id: number) {
        return await this.prisma.admParameter.delete({
            where: { id: id },
        })
    }
}