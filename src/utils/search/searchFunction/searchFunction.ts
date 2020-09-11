import {ServerResponseObjectType} from "../../../api/appApi";

export const searchFunction = (text: string, arrItems: Array<ServerResponseObjectType>) => {
    if (!text) {
        return arrItems
    }
    return arrItems.filter(item => {
        if (
            item.firstName.toLowerCase().indexOf(text.toLocaleLowerCase()) > -1 ||
            item.lastName.toLowerCase().indexOf(text.toLocaleLowerCase()) > -1 ||
            item.email.toLowerCase().indexOf(text.toLocaleLowerCase()) > -1 ||
            item.phone.toLowerCase().indexOf(text.toLocaleLowerCase()) > -1
        ) {
            return item
        }
        return undefined;
    })
}