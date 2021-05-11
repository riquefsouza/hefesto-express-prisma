import { AdmPageProfile, AdmProfile, AdmPage, PrismaClient } from '@prisma/client'

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

    public getProfilesByPage(admPageId: number)  {
        const res = new Promise<AdmProfile[]>((resolve, reject) => {
            let listProfile: AdmProfile[] = [];

            this.prisma.admPageProfile.findMany({
                where: { idPage: admPageId },
                include: { admProfile: true }
            }).then((admPageProfile: (AdmPageProfile & {admProfile: AdmProfile;})[]) => {
                admPageProfile.forEach((item: (AdmPageProfile & {admProfile: AdmProfile;})) => {
                    listProfile.push(item.admProfile)
                });
                resolve(listProfile);

            }).catch(err => {
                reject(err);
            });
        });
        return res;
    }

    public getPagesByProfile(admProfileId: number): Promise<AdmPage[]> {
       const res = new Promise<AdmPage[]>((resolve, reject) => {
            this.prisma.admPageProfile.findMany({
                where: { idProfile: admProfileId },
                include: { admPage: true }
            }).then((admPageProfile: (AdmPageProfile & {admPage: AdmPage;})[]) => {
                const listPage: AdmPage[] = [];
                admPageProfile.forEach((item: (AdmPageProfile & {admPage: AdmPage;})) => {
                    listPage.push(item.admPage)
                });
                resolve(listPage);
            }).catch(err => {
                reject(err);
            })
        });
        return res;
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