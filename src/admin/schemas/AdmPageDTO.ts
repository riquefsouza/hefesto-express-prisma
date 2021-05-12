export const emptyAdmPageDTO: AdmPageDTO = {
    id: null,
    description: '',
    url: '',
    admIdProfiles: [],
    pageProfiles: ''
};

export const cleanAdmPageDTO: AdmPageDTO = {
    description: '',
    url: '',
    admIdProfiles: [],
    pageProfiles: ''
};

export interface AdmPageDTO {

    id?: number | null;
    description: string;
    url?: string;
    admIdProfiles: number[];
    pageProfiles: string;
}
