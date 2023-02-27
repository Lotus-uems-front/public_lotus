export type CompanyDataType = {
  data: any[]
}

export enum StatusType  {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}
  
  export type InitialStateType = {
    companyData: CompanyDataType[],
    filteredCompanyData: string[],
    status: StatusType
  }