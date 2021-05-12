import { AdmPageDTO, emptyAdmPageDTO } from './AdmPageDTO';

export const emptyAdmMenuDTO: AdmMenuDTO = {
    id: null,
    description: '',
    order: 0,
    idPage: 0,
    idMenuParent: 0,
    admPage: emptyAdmPageDTO,
    admMenuParent: null
};

export const cleanAdmMenuDTO: AdmMenuDTO = {
    description: '',
    order: 0,
    idPage: 0,
    idMenuParent: 0,
    admPage: emptyAdmPageDTO,
    admMenuParent: null
};

export interface AdmMenuDTO {

    id?: number | null;
    description: string;
    order: number;
    idPage: number;
    idMenuParent: number;
    admPage: AdmPageDTO;
    admMenuParent: AdmMenuDTO | null;
}
