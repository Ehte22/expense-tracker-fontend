export interface TypeState {
    types: Type[]
    message: string,
    error: string | null,
    loading: boolean,
    page: number,
    limit: number,
    total: number
    isDeleteSuccess: boolean,
}

export interface Type {
    _id?: string,
    userId?: string,
    type: string,
    createdAt?: string,
    updateAt?: string,
    _v?: number
}
