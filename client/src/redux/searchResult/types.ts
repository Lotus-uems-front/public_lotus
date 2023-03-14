export type CompanyDataType = {
    data: any[]
    _id: string
  }
  
  export type FilteredCompanyData = {
    _id: string
    data: any[]
  }
  
  export enum StatusType {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
  }
  
  export type InitialStateType = {
    searchByNameResult: FilteredCompanyData[]
    searchByOccupationResult: FilteredCompanyData[]
    status: StatusType
  }
  
  