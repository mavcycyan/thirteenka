export interface UserData {
    displayName?: string,
    email: string,
    expiresIn: number,
    idToken: string,
    kind?: string,
    localId?: string,
    refreshToken: string,
    registered?: boolean
}

export interface StudentData {
    _id: string,
    surname: string,
    firstName: string,
    patronymic: string,
    birthday: string,
    citizenship: string,
    nativeCity: string,
    address: string,
    schoolFinished: string,
    chair: string,
    speciality: string,
    group: string,
    educForm: string,
    curator: string,
    degree: string,
    yearStart: string,
    yearEnd: string,
    status: string,
    budget: boolean,
    scholarship: boolean
}

export interface ChairData {
    _id?: string,
    name: string,
    description: string
}

export interface SpecData {
    _id?: string,
    name: string,
    description: string,
    chair?: string
}

export interface FilterParam {
    type: string,
    value: string
}