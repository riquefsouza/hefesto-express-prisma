import { AdmPage, AdmUser } from '@prisma/client';
import { AdmPageDTO } from './AdmPageDTO';
import { AdmUserDTO } from './AdmUserDTO';

export const emptyAdmProfileDTO: AdmProfileDTO = {
    id: null,
    administrator: 'N',
    description: '',
    general: 'N',
    admPages: [],
    admUsers: [],
    profilePages: '',
    profileUsers: ''
};

export const cleanAdmProfileDTO: AdmProfileDTO = {
    administrator: 'N',
    description: '',
    general: 'N',
    admPages: [],
    admUsers: [],
    profilePages: '',
    profileUsers: ''
};

export interface AdmProfileDTO {

    id?: number | null;
    administrator: string | null;
    description: string;
    general: string | null;
    admPages: AdmPage[];
    admUsers: AdmUser[];
    profilePages: string;
    profileUsers: string;

}
