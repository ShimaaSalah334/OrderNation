export interface ICountry {
  countryId:number;
    countryName: string,
    countryContinent: string,
    countryNotes: string,
    countryDescription: string,
    favoriteCountry?: boolean|null,
    countryImages?: string[]

}
