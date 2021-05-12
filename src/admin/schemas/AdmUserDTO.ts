export const emptyAdmUserDTO: AdmUserDTO = {
    id: null,
    email: '',
    login: '',
    name: '',
    password: '',
    admIdProfiles: [],
    active: 'N',
    userProfiles: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
};

export const cleanAdmUserDTO: AdmUserDTO = {
    email: '',
    login: '',
    name: '',
    password: '',
    admIdProfiles: [],
    active: 'N',
    userProfiles: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
};

export interface AdmUserDTO {

    id?: number | null;
    email: string | null;
    login: string;
    name: string | null;
    password: string;
    admIdProfiles: number[];
    active: string | null;
    userProfiles: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;

}
