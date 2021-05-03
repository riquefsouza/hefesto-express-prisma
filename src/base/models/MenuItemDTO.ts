export const emptyMenuItemDTO: MenuItemDTO = {
    label: '',
    routerLink: '',
    url: '',
    to: '',
    item: []
}

export interface MenuItemDTO {
    label: string;
    routerLink: string;
    url: string;
    to: string;
    item: MenuItemDTO[];
}
