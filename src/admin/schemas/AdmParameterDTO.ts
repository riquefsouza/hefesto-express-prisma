import { AdmParameterCategoryDTO, emptyAdmParameterCategoryDTO } from './AdmParameterCategoryDTO';

export const emptyAdmParameterDTO: AdmParameterDTO = {
    id: null,
    code: '',
    description: '',
    value: '',
    admParameterCategory: emptyAdmParameterCategoryDTO
};

export const cleanAdmParameterDTO: AdmParameterDTO = {
    code: '',
    description: '',
    value: '',
    admParameterCategory: emptyAdmParameterCategoryDTO
};

export interface AdmParameterDTO {

    id?: number | null;
    code: string;
    description: string;
    value: string;
    admParameterCategory: AdmParameterCategoryDTO;

}
