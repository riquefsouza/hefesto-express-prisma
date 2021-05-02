import { AdmMenu, PrismaClient } from '@prisma/client'

export class AdmMenuService {

    constructor(private prisma: PrismaClient) { }

    public async findAll() {
        return await this.prisma.admMenu.findMany();
    }

    public async findById(id: number) {
        return await this.prisma.admMenu.findUnique({
            where: { id: id },
        })
    }

    public async insert(obj: AdmMenu) {
        return await this.prisma.admMenu.create({
            data: obj
        })
    }

    public async update(id: number, obj: AdmMenu) {
        return await this.prisma.admMenu.update({
            where: { id: id },
            data: obj
        })
    }

    public async delete(id: number) {
        return await this.prisma.admMenu.delete({
            where: { id: id },
        })
    }
}