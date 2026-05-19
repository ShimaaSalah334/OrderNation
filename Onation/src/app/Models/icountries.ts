export interface Icountries {
  countryId: number,
    countryName: string,
    countryContinent: string,
    countryDescription: string,
    favoriteCountry?: boolean,
    countryImages: string[],
    countryGroups: string[],
 hovered?:boolean;
}
