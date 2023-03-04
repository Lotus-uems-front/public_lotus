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
  companyData: CompanyDataType[]
  filteredOccupationNames: string[]
  filteredCompanyData: FilteredCompanyData[]
  searchByName: FilteredCompanyData[]
  status: StatusType
  inn: string
}

