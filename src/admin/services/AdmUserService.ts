import { AdmUserDTO } from './../schemas/AdmUserDTO';
import { AdmUser, AdmProfile, PrismaClient } from '@prisma/client'
import { AdmUserProfileService } from '../services/index';
import bcrypt from 'bcrypt';

export class AdmUserService {

    private userProfileService: AdmUserProfileService;

    constructor(private prisma: PrismaClient) { 
        this.userProfileService = new AdmUserProfileService(prisma);
    }

    public async setTransientList(listAdmUser: AdmUser[]): Promise<AdmUserDTO[]> {
        const listDTO: AdmUserDTO[] = [];        
        for (const user of listAdmUser) {
            await this.setTransient(user)
            .then((item: AdmUserDTO) => {
                listDTO.push(item);
            });
        };
        return listDTO;
    }

    public async setTransient(user: AdmUser): Promise<AdmUserDTO> {
        let item: AdmUserDTO = {
            id: user.id,
            email: user.email,
            login: user.login,
            name: user.name,
            password: user.password,
            active: user.active,
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
            admIdProfiles: [],            
            userProfiles: ""   
        }

        const obj = await this.userProfileService.getProfilesByUser(Number(item.id));
        obj.forEach((profile: AdmProfile) => item.admIdProfiles.push(profile.id));

        const listUserProfiles: string[] = [];
        obj.forEach((profile: AdmProfile) => listUserProfiles.push(profile.description));
        item.userProfiles = listUserProfiles.join();

        return item;
    }

    public async findAll(): Promise<AdmUserDTO[]> {
        const res = new Promise<AdmUserDTO[]>((resolve, reject) => {
            this.prisma.admUser.findMany()
            .then((listAdmUser: AdmUser[]) => {
                resolve(this.setTransientList(listAdmUser));
            })
            .catch(err => { reject(err); })
        });

        return res;
    }

    public async findById(id: number): Promise<AdmUserDTO | null> {
        const res = new Promise<AdmUserDTO | null>((resolve, reject) => {
            this.prisma.admUser.findUnique({
                where: { id: id },
            })
            .then((user: AdmUser | null) => {
                if (user != null) {
                    this.setTransient(user).then((item: AdmUserDTO) => {
                        resolve(item);    
                    });
                }
            })
            .catch(err => { reject(err); })
        });

        return res;
    }

    public async insert(obj: AdmUser): Promise<AdmUserDTO> {
        const res = new Promise<AdmUserDTO>((resolve, reject) => {
            this.prisma.admUser.create({
                data: obj
            })
            .then((user: AdmUser) => {
                this.setTransient(user).then((item: AdmUserDTO) => {
                    resolve(item);    
                });
            })
            .catch(err => { reject(err); })
        });

        return res;
    }

    public async update(id: number, obj: AdmUser): Promise<AdmUserDTO> {
        const res = new Promise<AdmUserDTO>((resolve, reject) => {
            this.prisma.admUser.update({
                where: { id: id },
                data: obj
            })
            .then((user: AdmUser) => {
                this.setTransient(user).then((item: AdmUserDTO) => {
                    resolve(item);    
                });
            })
            .catch(err => { reject(err); })
        });

        return res;
    }

    public async delete(id: number): Promise<AdmUserDTO> {
        const res = new Promise<AdmUserDTO>((resolve, reject) => {
            this.prisma.admUser.delete({
                where: { id: id },
            })
            .then((user: AdmUser) => {
                this.setTransient(user).then((item: AdmUserDTO) => {
                    resolve(item);    
                });
            })
            .catch(err => { reject(err); })
        });

        return res;
    }

    public authenticate(login: string, password: string): Promise<AdmUser | null> {
        const res = new Promise<AdmUser | null>((resolve, reject) => {

            this.prisma.admUser.findUnique({
                where: { login: login },
            }).then((admUser: AdmUser | null) => {
                if (admUser != null){
                    this.verifyPassword(password, admUser.password).then((result: boolean) => {
                        if (result) {
                            resolve(admUser);    
                        }
                        reject(null);
                    }).catch(err => {
                        reject(err);
                    });
                }    
            }).catch(err => {
                reject(err);
            })

        });

        return res;
    }

    public async verifyPassword(password: string, hashPassword: string): Promise<boolean> {        
        return await bcrypt.compare(password, hashPassword);
    }

    public register(model: AdmUser): void {
        const saltRounds = 10;
        bcrypt.hash(model.password, saltRounds, function(err: any, hash: string) {
            model.password = hash;
        });
    }

}