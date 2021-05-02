import { AdmUser, PrismaClient } from '@prisma/client'

export class AdmUserService {

    constructor(private prisma: PrismaClient) { }

    public async findAll() {
        return await this.prisma.admUser.findMany();
    }

    public async findById(id: number) {
        return await this.prisma.admUser.findUnique({
            where: { id: id },
        })
    }

    public async insert(obj: AdmUser) {
        return await this.prisma.admUser.create({
            data: obj
        })
    }

    public async update(id: number, obj: AdmUser) {
        return await this.prisma.admUser.update({
            where: { id: id },
            data: obj
        })
    }

    public async delete(id: number) {
        return await this.prisma.admUser.delete({
            where: { id: id },
        })
    }
}