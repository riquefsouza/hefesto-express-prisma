import { AdmMenu, PrismaClient } from '@prisma/client'
import { MenuItemDTO } from '../../base/models/MenuItemDTO';

export class AdmMenuService {

    constructor(private prisma: PrismaClient) { }
  
    public async findAll() {
        return await this.prisma.admMenu.findMany({
            include: { 
                admPage: true,
                admMenuParent: true
            }
        })
    }

    public async findById(id: number) {
        return await this.prisma.admMenu.findUnique({
            where: { id: id },
            include: { 
                admPage: true,
                admMenuParent: true
            }
        })
    }

    public async insert(obj: AdmMenu) {
        return await this.prisma.admMenu.create({
            data: obj,
            include: { 
                admPage: true,
                admMenuParent: true
            }
        })
    }

    public async update(id: number, obj: AdmMenu) {
        return await this.prisma.admMenu.update({
            where: { id: id },
            data: obj,
            include: { 
                admPage: true,
                admMenuParent: true
            }
        })
    }

    public async delete(id: number) {
        return await this.prisma.admMenu.delete({
            where: { id: id },
            include: { 
                admPage: true,
                admMenuParent: true
            }            
        })
    }

    public async setTransientWithoutSubMenusList(listAdmMenu: AdmMenu[]): Promise<AdmMenu[]> {
        const listDTO: AdmMenu[] = [];        
        for (const menu of listAdmMenu) {
            await this.setTransientWithoutSubMenus(menu)
            .then((item: AdmMenu | null) => {
                if (item!=null) {
                    listDTO.push(item);
                }
            });
        };
        return listDTO;
    }

    public async setTransientWithoutSubMenus(item: AdmMenu): Promise<AdmMenu | null> {
        return await this.prisma.admMenu.findUnique({
            where: { id: item.id },
            include: { 
                admPage: true,
                admMenuParent: true
            }
        })
    }

    public async setTransientSubMenus(item: AdmMenu): Promise<AdmMenu | null> {
        return await this.prisma.admMenu.findUnique({
            where: { id: item.id },
            include: { 
                admPage: true,
                admMenuParent: true,
                admSubMenus: true
            }
        })
    }

    public async findMenuByIdProfiles(listaIdProfile: number[], admMenu: AdmMenu): Promise<AdmMenu[]> {
        const sql = `select distinct mnu.mnu_seq, mnu.mnu_description, mnu.mnu_parent_seq, 
            mnu.mnu_pag_seq, mnu.mnu_order
            from adm_profile prf 
            inner join adm_page_profile pgl on prf.prf_seq=pgl.pgl_prf_seq 
            inner join adm_page pag on pgl.pgl_pag_seq=pag.pag_seq 
            inner join adm_menu mnu on pag.pag_seq=mnu.mnu_pag_seq 
            where prf.prf_seq in (${listaIdProfile}) and mnu.mnu_seq > 9 and mnu.mnu_parent_seq=${admMenu.id}
            order by mnu.mnu_seq, mnu.mnu_order;`;
        
        return await this.prisma.$queryRaw<AdmMenu[]>(sql);
    }

    public async findAdminMenuByIdProfiles(listaIdProfile: number[], admMenu: AdmMenu): Promise<AdmMenu[]> {
        const sql = `select distinct mnu.mnu_seq, mnu.mnu_description, mnu.mnu_parent_seq, 
            mnu.mnu_pag_seq, mnu.mnu_order
            from adm_profile prf 
            inner join adm_page_profile pgl on prf.prf_seq=pgl.pgl_prf_seq 
            inner join adm_page pag on pgl.pgl_pag_seq=pag.pag_seq 
            inner join adm_menu mnu on pag.pag_seq=mnu.mnu_pag_seq 
            where prf.prf_seq in (${listaIdProfile}) and mnu.mnu_seq <= 9 and mnu.mnu_parent_seq=${admMenu.id}
            order by mnu.mnu_seq, mnu.mnu_order;`;
        
        return await this.prisma.$queryRaw<AdmMenu[]>(sql);
    }
    
    public async findMenuParentByIdProfiles(listaIdProfile: number[]): Promise<AdmMenu[]> {
        const sql = `select distinct mnu0.mnu_seq, mnu0.mnu_description, mnu0.mnu_parent_seq, 
            mnu0.mnu_pag_seq, mnu0.mnu_order
            from adm_menu mnu0 
            where mnu0.mnu_seq in (
                select mnu.mnu_parent_seq from adm_profile prf 
                inner join adm_page_profile pgl on prf.prf_seq=pgl.pgl_prf_seq 
                inner join adm_page pag on pgl.pgl_pag_seq=pag.pag_seq 
                inner join adm_menu mnu on pag.pag_seq=mnu.mnu_pag_seq 
                where prf.prf_seq in (${listaIdProfile}) and mnu.mnu_seq > 9
            ) 
            order by mnu0.mnu_order, mnu0.mnu_seq`;

        const listMenus = await this.prisma.$queryRaw<AdmMenu[]>(sql);

        for (const menu of listMenus) {
            const plist = await this.findMenuByIdProfiles(listaIdProfile, menu);
            const obj = await this.setTransientWithoutSubMenusList(plist);
            const obj = await this.setTransientSubMenus(menu);
        }
        return listMenus;
    }

    public async findAdminMenuParentByIdProfiles(listaIdProfile: number[]): Promise<AdmMenu[]> {
        const sql = `select distinct mnu0.mnu_seq, mnu0.mnu_description, mnu0.mnu_parent_seq, 
            mnu0.mnu_pag_seq, mnu0.mnu_order
            from adm_menu mnu0 
            where mnu0.mnu_seq in (
                select mnu.mnu_parent_seq from adm_profile prf 
                inner join adm_page_profile pgl on prf.prf_seq=pgl.pgl_prf_seq 
                inner join adm_page pag on pgl.pgl_pag_seq=pag.pag_seq 
                inner join adm_menu mnu on pag.pag_seq=mnu.mnu_pag_seq 
                where prf.prf_seq in (${listaIdProfile}) and mnu.mnu_seq <= 9
            ) 
            order by mnu0.mnu_order, mnu0.mnu_seq`;

        const listMenus = await this.prisma.$queryRaw<AdmMenu[]>(sql);

        for (const menu of listMenus) {
            const plist = await this.findAdminMenuByIdProfiles(listaIdProfile, menu);
            this.setTransientWithoutSubMenus(plist);
            this.setTransientSubMenus(menu, plist);
        }
        return listMenus;    
    }

    public async mountMenuItem(listaIdProfile: number[]): Promise<MenuItemDTO[]> {

        const lista: MenuItemDTO[] = [];

        const listMenus = await this.findMenuParentByIdProfiles(listaIdProfile);
        for (const menu of listMenus) {
            //const item: MenuItemDTO[] = [];
            //List<MenuItemDTO> item = new List<MenuItemDTO>();
            //List<AdmMenu> admSubMenus = new List<AdmMenu>(menu.InverseAdmMenuParent);                
            
        };
    }


}