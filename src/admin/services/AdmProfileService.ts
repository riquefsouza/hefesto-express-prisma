import { AdmProfile, PrismaClient } from '@prisma/client'
import { MenuItemDTO } from '../../base/models/MenuItemDTO';

export class AdmProfileService {

    constructor(private prisma: PrismaClient) { }

    public async findAll() {
        return await this.prisma.admProfile.findMany();
    }

    public async findById(id: number) {
        return await this.prisma.admProfile.findUnique({
            where: { id: id },
        })
    }

    public async insert(obj: AdmProfile) {
        return await this.prisma.admProfile.create({
            data: obj
        })
    }

    public async update(id: number, obj: AdmProfile) {
        return await this.prisma.admProfile.update({
            where: { id: id },
            data: obj
        })
    }

    public async delete(id: number) {
        return await this.prisma.admProfile.delete({
            where: { id: id },
        })
    }

    public async mountMenuItem(listaIdProfile: number[]) {
       //: MenuItemDTO[] {
        throw new Error('Method not implemented.');
    }

    public async findProfilesByUser(userId?: number) {
        throw new Error('Method not implemented.');
    }

    public async findProfilesByPage(pageId?: number) {
        throw new Error('Method not implemented.');
    }

}