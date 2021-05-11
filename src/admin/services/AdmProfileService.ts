import { AdmPageProfile, AdmProfile, PrismaClient } from '@prisma/client'
import { MenuItemDTO } from '../../base/models/MenuItemDTO';
import { AdmPageProfileService, AdmUserProfileService } from '../services/index';

export class AdmProfileService {

    private pageProfileService: AdmPageProfileService;
    private userProfileService: AdmUserProfileService;

    constructor(private prisma: PrismaClient) { 
        this.pageProfileService = new AdmPageProfileService(prisma);
        this.userProfileService = new AdmUserProfileService(prisma);
    }

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

    public async findProfilesByUser(userId: number) {
        return await this.userProfileService.getProfilesByUser(userId);
    }

    public async findProfilesByPage(pageId: number): Promise<AdmProfile[]> {
        return await this.pageProfileService.getProfilesByPage(pageId);
    }

}

