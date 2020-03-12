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
    token       : string,
    logo        : string,
    isConnected : boolean,
}
