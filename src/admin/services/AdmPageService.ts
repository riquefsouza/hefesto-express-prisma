import { AdmPageDTO } from './../schemas/AdmPageDTO';
import { AdmPage, AdmProfile, PrismaClient } from '@prisma/client'
import { AdmPageProfileService } from '../services/index';

export class AdmPageService {

    private pageProfileService: AdmPageProfileService;

    constructor(private prisma: PrismaClient) { 
        this.pageProfileService = new AdmPageProfileService(prisma);
    }

    public async setTransientList(listAdmPage: AdmPage[]): Promise<AdmPageDTO[]> {
        const listDTO: AdmPageDTO[] = [];        
        for (const page of listAdmPage) {
            await this.setTransient(page)
            .then((item: AdmPageDTO) => {
                listDTO.push(item);
            });
        };
        return listDTO;
    }

    public async setTransient(page: AdmPage): Promise<AdmPageDTO> {
        let item: AdmPageDTO = {
            id: page.id,
            description: page.description,
            url: page.url,
            admIdProfiles: [],
            pageProfiles: ""   
        }

        const obj = await this.pageProfileService.getProfilesByPage(Number(item.id));
        obj.forEach((profile: AdmProfile) => item.admIdProfiles.push(profile.id));

        const listPageProfiles: string[] = [];
        obj.forEach((profile: AdmProfile) => listPageProfiles.push(profile.description));
        item.pageProfiles = listPageProfiles.join();

        return item;
    }

    public async findAll(): Promise<AdmPageDTO[]> {
        const res = new Promise<AdmPageDTO[]>((resolve, reject) => {
            this.prisma.admPage.findMany()
            .then((listAdmPage: AdmPage[]) => {
                resolve(this.setTransientList(listAdmPage));
            })
            .catch(err => { reject(err); })
        });

        return res;
    }

    public async findById(id: number): Promise<AdmPageDTO | null> {
        const res = new Promise<AdmPageDTO | null>((resolve, reject) => {
            this.prisma.admPage.findUnique({
                where: { id: id },
            })
            .then((page: AdmPage | null) => {
                if (page != null) {
                    this.setTransient(page).then((item: AdmPageDTO) => {
                        resolve(item);    
                    });
                }
            })
            .catch(err => { reject(err); })
        });

        return res;
    }

    public async insert(obj: AdmPage): Promise<AdmPageDTO> {
        const res = new Promise<AdmPageDTO>((resolve, reject) => {
            this.prisma.admPage.create({
                data: obj
            })
            .then((page: AdmPage) => {
                this.setTransient(page).then((item: AdmPageDTO) => {
                    resolve(item);    
                });
            })
            .catch(err => { reject(err); })
        });

        return res;
    }

    public async update(id: number, obj: AdmPage): Promise<AdmPageDTO> {
        const res = new Promise<AdmPageDTO>((resolve, reject) => {
            this.prisma.admPage.update({
                where: { id: id },
                data: obj
            })
            .then((page: AdmPage) => {
                this.setTransient(page).then((item: AdmPageDTO) => {
                    resolve(item);    
                });
            })
            .catch(err => { reject(err); })
        });

        return res;
    }

    public async delete(id: number): Promise<AdmPageDTO> {
        const res = new Promise<AdmPageDTO>((resolve, reject) => {
            this.prisma.admPage.delete({
                where: { id: id },
            })
            .then((page: AdmPage) => {
                this.setTransient(page).then((item: AdmPageDTO) => {
                    resolve(item);    
                });
            })
            .catch(err => { reject(err); })
        });

        return res;
    }
}