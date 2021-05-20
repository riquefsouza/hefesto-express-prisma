import { AdmMenu, AdmPage, PrismaClient } from '@prisma/client'
import { MenuItemDTO } from '../../base/models/MenuItemDTO';
import { AdmPageService } from '../services/index';

type menuDTO = {
    "mnu_seq": 0,
    "mnu_description": "",
    "mnu_parent_seq": 0,
    "mnu_pag_seq": 0,
    "mnu_order": 0,
};        

export class AdmMenuService {

    private pageService: AdmPageService;

    constructor(private prisma: PrismaClient) { 
        this.pageService = new AdmPageService(prisma);
    }
  
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

    public async setTransientWithoutSubMenusList(listAdmMenu: AdmMenu[]): Promise<(AdmMenu
        & {admPage: AdmPage | null; admMenuParent: AdmMenu | null;})[]> {

        const listDTO: (AdmMenu & {admPage: AdmPage | null; admMenuParent: AdmMenu | null;})[] = [];

        for (const menu of listAdmMenu) {
            await this.setTransientWithoutSubMenus(menu)
            .then((item: (AdmMenu & 
                {admPage: AdmPage | null; admMenuParent: AdmMenu | null;}) | null) => {
                if (item!=null) {
                    listDTO.push(item);
                }
            });
        };
        return listDTO;
    }

    public async setTransientWithoutSubMenus(item: AdmMenu): Promise<(AdmMenu 
        & {admPage: AdmPage | null; admMenuParent: AdmMenu | null;}) | null> {

        return await this.prisma.admMenu.findUnique({
            where: { id: item.id },
            include: { 
                admPage: true,
                admMenuParent: true
            }
        })
    }

    public async setTransientSubMenus(item: AdmMenu): Promise<(AdmMenu 
        & {admPage: AdmPage | null; admMenuParent: AdmMenu | null; admSubMenus: AdmMenu[]}) | null> {

        return await this.prisma.admMenu.findUnique({
            where: { id: item.id },
            include: { 
                admPage: true,
                admMenuParent: true,
                admSubMenus: true
            }
        })
    }

    private setAdmMenuList(listsql: menuDTO[]): AdmMenu[] {
        const listMenus: AdmMenu[] = [];
        for (const dto of listsql) {
            let menu: AdmMenu = {
                id: dto.mnu_seq,
                description: dto.mnu_description,
                idMenuParent: dto.mnu_parent_seq,
                idPage: dto.mnu_pag_seq,
                order: dto.mnu_order
            }
    
            listMenus.push(menu);
        }
        return listMenus;    
    }

    public async findMenuByIdProfiles(listaIdProfile: number[], admMenu: AdmMenu): Promise<AdmMenu[]> {
        let sql = `select distinct mnu.mnu_seq, mnu.mnu_description, mnu.mnu_parent_seq, 
            mnu.mnu_pag_seq, mnu.mnu_order
            from adm_profile prf 
            inner join adm_page_profile pgl on prf.prf_seq=pgl.pgl_prf_seq 
            inner join adm_page pag on pgl.pgl_pag_seq=pag.pag_seq 
            inner join adm_menu mnu on pag.pag_seq=mnu.mnu_pag_seq 
            where prf.prf_seq in (${listaIdProfile}) and mnu.mnu_seq > 9 and mnu.mnu_parent_seq=${admMenu.id}
            order by mnu.mnu_seq, mnu.mnu_order;`;

        sql = sql.replace(/(\r\n|\n|\r)/gm, "");    

        const listsql = await this.prisma.$queryRaw<menuDTO[]>(sql);
            
        const listMenus: AdmMenu[] = this.setAdmMenuList(listsql);
        
        return listMenus;
    }

    public async findAdminMenuByIdProfiles(listaIdProfile: number[], admMenu: AdmMenu): Promise<AdmMenu[]> {
        let sql = `select distinct mnu.mnu_seq, mnu.mnu_description, mnu.mnu_parent_seq, 
            mnu.mnu_pag_seq, mnu.mnu_order
            from adm_profile prf 
            inner join adm_page_profile pgl on prf.prf_seq=pgl.pgl_prf_seq 
            inner join adm_page pag on pgl.pgl_pag_seq=pag.pag_seq 
            inner join adm_menu mnu on pag.pag_seq=mnu.mnu_pag_seq 
            where prf.prf_seq in (${listaIdProfile}) and mnu.mnu_seq <= 9 and mnu.mnu_parent_seq=${admMenu.id}
            order by mnu.mnu_seq, mnu.mnu_order;`;
        
        sql = sql.replace(/(\r\n|\n|\r)/gm, "");

        const listsql = await this.prisma.$queryRaw<menuDTO[]>(sql);
        
        const listMenus: AdmMenu[] = this.setAdmMenuList(listsql);
        
        return listMenus;
    }
    
    public async findMenuParentByIdProfiles(listaIdProfile: number[]): Promise<(AdmMenu 
        & {admPage: AdmPage | null; admMenuParent: AdmMenu | null; admSubMenus: AdmMenu[]})[]> {
        let subsql = `select distinct mnu.mnu_parent_seq from adm_profile prf 
                inner join adm_page_profile pgl on prf.prf_seq=pgl.pgl_prf_seq 
                inner join adm_page pag on pgl.pgl_pag_seq=pag.pag_seq 
                inner join adm_menu mnu on pag.pag_seq=mnu.mnu_pag_seq 
                where prf.prf_seq in (${listaIdProfile}) and mnu.mnu_seq > 9`;
        
        subsql = subsql.replace(/(\r\n|\n|\r)/gm, "");

        type parentDTO = {
            "mnu_parent_seq": 0
        }

        const sublist = await this.prisma.$queryRaw<parentDTO[]>(subsql);

        const listparent: number[] = [];
        for (const parentId of sublist) {
            listparent.push(parentId.mnu_parent_seq);
        }

        const newListMenus: (AdmMenu 
            & {admPage: AdmPage | null; admMenuParent: AdmMenu | null; admSubMenus: AdmMenu[]})[] = [];

        if (listparent.length > 0) {
            let sql = `select distinct mnu_seq, mnu_description, mnu_parent_seq, mnu_pag_seq, mnu_order  
            from adm_menu where mnu_seq in (${listparent}) 
            order by mnu_order, mnu_seq`;

            sql = sql.replace(/(\r\n|\n|\r)/gm, "");

            const listsql = await this.prisma.$queryRaw<menuDTO[]>(sql);

            const listMenus: AdmMenu[] = this.setAdmMenuList(listsql);
    
            for (let menu of listMenus) {
                let plist = await this.findMenuByIdProfiles(listaIdProfile, menu);
                plist = await this.setTransientWithoutSubMenusList(plist);
                let nmenu = await this.setTransientSubMenus(menu);
                if (nmenu!=null) {
                    newListMenus.push(nmenu);
                }
            }
        }

        return newListMenus;
    }

    public async findAdminMenuParentByIdProfiles(listaIdProfile: number[]): Promise<(AdmMenu 
        & {admPage: AdmPage | null; admMenuParent: AdmMenu | null; admSubMenus: AdmMenu[]})[]> {

        let subsql = `select distinct mnu.mnu_parent_seq from adm_profile prf 
                inner join adm_page_profile pgl on prf.prf_seq=pgl.pgl_prf_seq 
                inner join adm_page pag on pgl.pgl_pag_seq=pag.pag_seq 
                inner join adm_menu mnu on pag.pag_seq=mnu.mnu_pag_seq 
                where prf.prf_seq in (${listaIdProfile}) and mnu.mnu_seq <= 9`;
        
        subsql = subsql.replace(/(\r\n|\n|\r)/gm, "");

        type parentDTO = {
            "mnu_parent_seq": 0
        }

        const sublist = await this.prisma.$queryRaw<parentDTO[]>(subsql);

        const listparent: number[] = [];
        for (const parentId of sublist) {
            listparent.push(parentId.mnu_parent_seq);
        }

        const newListMenus: (AdmMenu 
            & {admPage: AdmPage | null; admMenuParent: AdmMenu | null; admSubMenus: AdmMenu[]})[] = [];

        if (listparent.length > 0) {
            let sql = `select distinct mnu_seq, mnu_description, mnu_parent_seq, mnu_pag_seq, mnu_order  
            from adm_menu where mnu_seq in (${listparent}) 
            order by mnu_order, mnu_seq`;

            sql = sql.replace(/(\r\n|\n|\r)/gm, "");

            const listsql = await this.prisma.$queryRaw<menuDTO[]>(sql);

            const listMenus: AdmMenu[] = this.setAdmMenuList(listsql);
    
            for (let menu of listMenus) {
                let plist = await this.findMenuByIdProfiles(listaIdProfile, menu);
                plist = await this.setTransientWithoutSubMenusList(plist);
                let nmenu = await this.setTransientSubMenus(menu);
                if (nmenu!=null) {
                    newListMenus.push(nmenu);
                }
            }
        }

        return newListMenus;
    }

    public async mountMenuItem(listaIdProfile: number[]): Promise<MenuItemDTO[]> {

        const lista: MenuItemDTO[] = [];

        const listMenus = await this.findMenuParentByIdProfiles(listaIdProfile);
        for (const menu of listMenus) {
            const item: MenuItemDTO[] = [];
            let urlmenu = "";

            if (menu.idPage!=null) {
                const admPage = await this.pageService.findById(Number(menu.idPage));
                if (admPage!=null){
                    urlmenu = String(admPage.url);
                }    
            }

            //menu.admSubMenus.forEach(async (submenu: AdmMenu) => {
            for (const submenu of menu.admSubMenus) {    
                let urlsubmenu = "";

                if (submenu.idPage!=null) {
                    const admPage = await this.pageService.findById(Number(submenu.idPage));
                    if (admPage!=null){
                        urlsubmenu = String(admPage.url);
                    }
                }

                let submenuVO: MenuItemDTO = {
                    "label": submenu.description,
                    "routerLink": urlsubmenu,
                    "url": urlsubmenu,
                    "to": urlsubmenu,
                    "item": []
                }
                item.push(submenuVO);
            }

            let vo: MenuItemDTO = {
                "label": menu.description,
                "routerLink": urlmenu,
                "url": urlmenu,
                "to": urlmenu,
                "item": []
            }
            lista.push(vo);
        }

        const listAdminMenus = await this.findAdminMenuParentByIdProfiles(listaIdProfile);
        for (const menu of listAdminMenus) {
            const item: MenuItemDTO[] = [];
            let urlmenu = "";

            if (menu.idPage!=null) {
                const admPage = await this.pageService.findById(Number(menu.idPage));
                if (admPage!=null){
                    urlmenu = String(admPage.url);
                }
            }

            //menu.admSubMenus.forEach(async (submenu: AdmMenu) => {
            for (const submenu of menu.admSubMenus) {    
                let urlsubmenu = "";

                if (submenu.idPage!=null) {
                    const admPage = await this.pageService.findById(Number(submenu.idPage));
                    if (admPage!=null){
                        urlsubmenu = String(admPage.url);
                    }
                }
                
                let submenuVO: MenuItemDTO = {
                    "label": submenu.description,
                    "routerLink": urlsubmenu,
                    "url": urlsubmenu,
                    "to": urlsubmenu,
                    "item": []
                }
                item.push(submenuVO);
            }

            let vo: MenuItemDTO = {
                "label": menu.description,
                "routerLink": urlmenu,
                "url": urlmenu,
                "to": urlmenu,
                "item": []
            }
            lista.push(vo);        
        }
        
        return lista;
    }


}