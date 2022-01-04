export interface UserData {
    displayName?: string,
    email: string,
    expiresIn?: string,
    idToken: string,
    kind?: string,
    localId?: string,
    refreshToken?: string,
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
    faculty: string,
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