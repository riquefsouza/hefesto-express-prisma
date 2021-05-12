export const emptyAdmParameterCategoryDTO: AdmParameterCategoryDTO = {
    id: null,
    description: '',
    order: 0
};

export const cleanAdmParameterCategoryDTO: AdmParameterCategoryDTO = {
    description: '',
    order: 0
};

export interface AdmParameterCategoryDTO {

    id?: number | null;
    description: string;
    order: number;

}
