import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.filltext.com/',

});

export interface ServerResponseObjectType extends Record<string, any> {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: {
        streetAddress: string,
        city: string,
        state: string,
        zip: string
    },
    description: string,
}

export const appApi = {
    getData(rowsNumber: number) {
        return instance
            .get<Array<ServerResponseObjectType>>(`?rows=${rowsNumber}&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
            .then(res => {
                return res.data
            })
    }
}