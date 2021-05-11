import { AdmPageDTO, emptyAdmPageDTO } from './../schemas/AdmPageDTO';
import { AdmPage, AdmMenu, AdmPageProfile, AdmProfile, PrismaClient } from '@prisma/client'
import { AdmPageProfileService, AdmProfileService } from '../services/index';

export class AdmPageService {

    private pageProfileService: AdmPageProfileService;
    private profileService: AdmProfileService;

    constructor(private prisma: PrismaClient) { 
        this.pageProfileService = new AdmPageProfileService(prisma);
        this.profileService = new AdmProfileService(prisma);
    }

    public async findAll(): Promise<AdmPageDTO[]> {
        const res = new Promise<AdmPageDTO[]>((resolve, reject) => {
            this.prisma.admPage.findMany({
                include: { 
                    admMenus: true,
                    admPageProfiles: true
                }
            }).then((listAdmPage: (AdmPage & {
                admMenus: AdmMenu[];
                admPageProfiles: AdmPageProfile[];
            })[]) => {
                const listDTO: AdmPageDTO[] = [];        

                listAdmPage.forEach(page => {
                    let dto: AdmPageDTO = {
                        id: page.id,
                        description: page.description,
                        url: page.url,
                        admIdProfiles: [],
                        pageProfiles: ""   
                    }
                    
                    page.admPageProfiles.forEach((pp: AdmPageProfile) => {
                       if (pp.idPage === page.id) {
                            dto.admIdProfiles?.push(pp.idProfile);
                       }                    
                    });
                    
                    listDTO.push(dto); 
                });
                                                
                //resolve(listDTO);

                return listDTO;
            })
            .then(async (listDTO: AdmPageDTO[]) => {

                listDTO.forEach(async dto => {
                    //const teste = await 
                    await this.pageProfileService.getProfilesByPage(Number(dto.id))
                    .then((listProfile: AdmProfile[]) => {
                        //return listProfile;                        
                        listProfile.forEach(profile => {
                            dto.pageProfiles += profile.description;
                        });
                        
                    });
                });

                resolve(listDTO);
            })        
            .catch(err => {
                reject(err);
            })
        });

        return res;      
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