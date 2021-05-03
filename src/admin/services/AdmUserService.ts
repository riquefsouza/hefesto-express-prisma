import { AdmUser, PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

export class AdmUserService {

    constructor(private prisma: PrismaClient) { }

    public async findAll() {
        return await this.prisma.admUser.findMany();
    }

    public async findById(id: number) {
        return await this.prisma.admUser.findUnique({
            where: { id: id },
        })
    }

    public async insert(obj: AdmUser) {
        return await this.prisma.admUser.create({
            data: obj
        })
    }

    public async update(id: number, obj: AdmUser) {
        return await this.prisma.admUser.update({
            where: { id: id },
            data: obj
        })
    }

    public async delete(id: number) {
        return await this.prisma.admUser.delete({
            where: { id: id },
        })
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