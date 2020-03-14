export interface Service
{
    objectId: string,
    name    : string,
    logo    : string,
    description: string,
}

export interface ServiceToken
{
    name        : string,
    objectId    : string,
    accessToken : string,
    secretToken : string,
    logo        : string,
    isConnected : boolean,
}
