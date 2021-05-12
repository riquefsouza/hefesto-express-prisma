import { AdmPage, AdmUser, AdmProfile, PrismaClient } from '@prisma/client'
import { AdmProfileDTO } from './../schemas/AdmProfileDTO';
import { AdmPageProfileService, AdmUserProfileService } from '../services/index';

export class AdmProfileService {

    private pageProfileService: AdmPageProfileService;
    private userProfileService: AdmUserProfileService;

    constructor(private prisma: PrismaClient) { 
        this.pageProfileService = new AdmPageProfileService(prisma);
        this.userProfileService = new AdmUserProfileService(prisma);
    }

    public async setTransientList(listAdmProfile: AdmProfile[]): Promise<AdmProfileDTO[]> {
        const listDTO: AdmProfileDTO[] = [];        
        for (const profile of listAdmProfile) {
            await this.setTransient(profile)
            .then((item: AdmProfileDTO) => {
                listDTO.push(item);
            });
        };
        return listDTO;
    }    

    public async setTransient(profile: AdmProfile): Promise<AdmProfileDTO> {
        let item: AdmProfileDTO = {
            id: profile.id,
            administrator: profile.administrator,
            description: profile.description,
            general: profile.general,
            admPages: [],
            admUsers: [],
            profilePages: "",
            profileUsers: ""
        }

        const listPages = await this.pageProfileService.getPagesByProfile(Number(item.id));
        listPages.forEach((page: AdmPage) => item.admPages.push(page));

        const listProfilePages: string[] = [];
        listPages.forEach((page: AdmPage) => listProfilePages.push(page.description));
        item.profilePages = listProfilePages.join();

        const listUsers = await this.userProfileService.getUsersByProfile(Number(item.id));
        listUsers.forEach((user: AdmUser) => item.admUsers.push(user));

        const listProfileUsers: string[] = [];
        listUsers.forEach((user: AdmUser) => listProfileUsers.push(String(user.name)));
        item.profileUsers = listProfileUsers.join();

        return item;
    }

    public async findAll(): Promise<AdmProfileDTO[]> {
        const res = new Promise<AdmProfileDTO[]>((resolve, reject) => {
            this.prisma.admProfile.findMany()
            .then((listAdmProfile: AdmProfile[]) => {
                resolve(this.setTransientList(listAdmProfile));
            })
            .catch(err => { reject(err); })
        });

        return res;
    }

    public async findById(id: number): Promise<AdmProfileDTO | null> {
        const res = new Promise<AdmProfileDTO | null>((resolve, reject) => {
            this.prisma.admProfile.findUnique({
                where: { id: id },
            })
            .then((profile: AdmProfile | null) => {
                if (profile != null) {
                    this.setTransient(profile).then((item: AdmProfileDTO) => {
                        resolve(item);    
                    });
                }
            })
            .catch(err => { reject(err); })
        });

        return res;
    }

    public async insert(obj: AdmProfile): Promise<AdmProfileDTO> {
        const res = new Promise<AdmProfileDTO>((resolve, reject) => {
            this.prisma.admProfile.create({
                data: obj
            })
            .then((profile: AdmProfile) => {
                this.setTransient(profile).then((item: AdmProfileDTO) => {
                    resolve(item);    
                });
            })
            .catch(err => { reject(err); })
        });

        return res;
    }

    public async update(id: number, obj: AdmProfile): Promise<AdmProfileDTO> {
        const res = new Promise<AdmProfileDTO>((resolve, reject) => {
            this.prisma.admProfile.update({
                where: { id: id },
                data: obj
            })
            .then((profile: AdmProfile) => {
                this.setTransient(profile).then((item: AdmProfileDTO) => {
                    resolve(item);    
                });
            })
            .catch(err => { reject(err); })
        });

        return res;
    }

    public async delete(id: number): Promise<AdmProfileDTO> {
        const res = new Promise<AdmProfileDTO>((resolve, reject) => {
            this.prisma.admProfile.delete({
                where: { id: id },
            })
            .then((profile: AdmProfile) => {
                this.setTransient(profile).then((item: AdmProfileDTO) => {
                    resolve(item);    
                });
            })
            .catch(err => { reject(err); })
        });

        return res;
    }

    public async findProfilesByUser(userId: number): Promise<AdmProfile[]> {
        return await this.userProfileService.getProfilesByUser(userId);
    }

    public async findProfilesByPage(pageId: number): Promise<AdmProfile[]> {
        return await this.pageProfileService.getProfilesByPage(pageId);
    }

}

