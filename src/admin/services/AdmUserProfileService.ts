import { AdmUserProfile, PrismaClient } from '@prisma/client'

export class AdmUserProfileService {

    constructor(private prisma: PrismaClient) { }

    public async findAll() {
        return await this.prisma.admUserProfile.findMany();
    }

    public async findById(id: number) {
        return await this.prisma.admUserProfile.findUnique({
            where: { id: id },
        })
    }

    public async insert(obj: AdmUserProfile) {
        return await this.prisma.admUserProfile.create({
            data: obj
        })
    }

    public async update(id: number, obj: AdmUserProfile) {
        return await this.prisma.admUserProfile.update({
            where: { id: id },
            data: obj
        })
    }

    public async delete(id: number) {
        return await this.prisma.admUserProfile.delete({
            where: { id: id },
        })
    }
}