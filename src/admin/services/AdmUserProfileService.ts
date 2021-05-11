import { AdmUserProfile, AdmProfile, AdmUser, PrismaClient } from '@prisma/client'

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

    public async getProfilesByUser(admUserId: number): Promise<AdmProfile[]>  {
        const res = new Promise<AdmProfile[]>((resolve, reject) => {
            this.prisma.admUserProfile.findMany({
                where: { idUser: admUserId },
                include: { admProfile: true }
            }).then((admUserProfile: (AdmUserProfile & {admProfile: AdmProfile;})[]) => {
                const listProfile: AdmProfile[] = [];
                admUserProfile.forEach((item: (AdmUserProfile & {admProfile: AdmProfile;})) => {
                    listProfile.push(item.admProfile)
                });
                resolve(listProfile);
            }).catch(err => {
                reject(err);
            })
        });
        return res;
    }        

    public async getUsersByProfile(admProfileId: number): Promise<AdmUser[]> {
       const res = new Promise<AdmUser[]>((resolve, reject) => {
            this.prisma.admUserProfile.findMany({
                where: { idProfile: admProfileId },
                include: { admUser: true }
            }).then((admUserProfile: (AdmUserProfile & {admUser: AdmUser;})[]) => {
                const listUser: AdmUser[] = [];
                admUserProfile.forEach((item: (AdmUserProfile & {admUser: AdmUser;})) => {
                    listUser.push(item.admUser)
                });
                resolve(listUser);
            }).catch(err => {
                reject(err);
            })
        });
        return res;
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