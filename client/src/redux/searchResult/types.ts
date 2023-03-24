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

  type SearchByNameData = {
    namesCompanies: any[]
    lengthArr: number
  }

  type SearchByOccupationData = {
    companyOccupation: any[]
    lengthArr: number
  }
  
  export type InitialStateType = {
    // searchByNameResult: FilteredCompanyData[]
    // searchByOccupationResult: FilteredCompanyData[]
    status: StatusType
    currentPage: number
    iconUrl: string | null
    companiesCount: number
    companiesCountName: number
    searchByNameData: SearchByNameData
    searchByOccupationData: SearchByOccupationData
  }
  
  