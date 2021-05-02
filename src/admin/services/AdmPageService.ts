import { AdmPage, PrismaClient } from '@prisma/client'

export class AdmPageService {

    constructor(private prisma: PrismaClient) { }

    public async findAll() {
        return await this.prisma.admPage.findMany();
    }

    public async findById(id: number) {
        return await this.prisma.admPage.findUnique({
            where: { id: id },
        })
    }

    public async insert(obj: AdmPage) {
        return await this.prisma.admPage.create({
            data: obj
        })
    }

    public async update(id: number, obj: AdmPage) {
        return await this.prisma.admPage.update({
            where: { id: id },
            data: obj
        })
    }

    public async delete(id: number) {
        return await this.prisma.admPage.delete({
            where: { id: id },
        })
    }
}