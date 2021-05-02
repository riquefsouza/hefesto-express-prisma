import { AdmPageProfile, PrismaClient } from '@prisma/client'

export class AdmPageProfileService {

    constructor(private prisma: PrismaClient) { }

    public async findAll() {
        return await this.prisma.admPageProfile.findMany();
    }

    public async findById(id: number) {
        return await this.prisma.admPageProfile.findUnique({
            where: { id: id },
        })
    }

    public async insert(obj: AdmPageProfile) {
        return await this.prisma.admPageProfile.create({
            data: obj
        })
    }

    public async update(id: number, obj: AdmPageProfile) {
        return await this.prisma.admPageProfile.update({
            where: { id: id },
            data: obj
        })
    }

    public async delete(id: number) {
        return await this.prisma.admPageProfile.delete({
            where: { id: id },
        })
    }
}