import { Component } from '@angular/core';
import { ILinks } from '../../Models/ilinks';
import { IPurpose } from '../../Models/ipurpose';
import { ICountry } from '../../Models/icountry';
import { IPaper } from '../../Models/ipaper';
import { IEmbassy } from '../../Models/iembassy';
import { ICountryGroup } from '../../Models/icountry-group';
import { ITouristicPlace } from '../../Models/itouristic-place';
import { ICity } from '../../Models/icity';
import { AddAuthorizationService } from '../../Services/add-authorization.service';
import { DeleteAuthorizationService } from '../../Services/delete-authorization.service';
import { EditAuthorizationService } from '../../Services/edit-authorization.service';
import { NgForm } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { showHideSettingsAnimation } from '../../app.component';
import { LoadingServiceService } from '../../Services/loading-service.service';

@Component({
  selector: 'app-admin-authorization',
  templateUrl: './admin-authorization.component.html',
  styleUrl: './admin-authorization.component.css',
  animations: [
    showHideSettingsAnimation,
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
})
export class AdminAuthorizationComponent {
  countries: ICountry[] = [];
  countryAdd: ICountry = {} as ICountry;
  countryDelete: ICountry = {} as ICountry;
  countryEdit: ICountry = {} as ICountry;
  selectedDeleteCountry: ICountry | null = null;
  selectedEditCountry: ICountry | null = null;

  alertAddCountry: boolean = false;
  alertAddCountryError: boolean = false;
  alertDeleteCountry: boolean = false;
  alertDeleteCountryError: boolean = false;
  alertEditCountry: boolean = false;
  alertEditCountryError: boolean = false;

  selectedCountryId: number | null = null;

  filteredCities: ICity[] = [];
  cities: ICity[] = [];
  cityAdd: ICity = {} as ICity;
  cityDelete: ICity = {} as ICity;
  cityEdit: ICity = {} as ICity;

  selectedCountryAddCity: ICountry | null = null;
  selectedDeleteCity: ICity | null = null;
  selectedCountryEditCity: ICountry | null = null;
  selectedEditCity: ICity | null = null;

  alertAddCity: boolean = false;
  alertAddCityError: boolean = false;
  alertDeleteCity: boolean = false;
  alertDeleteCityError: boolean = false;
  alertEditCity: boolean = false;
  alertEditCityError: boolean = false;

  selectedCityId: number | null = null;

  filteredTouristicPlaces: ITouristicPlace[] = [];
  touristicPlaces: ITouristicPlace[] = [];
  touristicPlaceAdd: ITouristicPlace = {} as ITouristicPlace;
  touristicPlaceDelete: ITouristicPlace = {} as ITouristicPlace;
  touristicPlaceEdit: ITouristicPlace = {} as ITouristicPlace;
  alertAddTouristicPlace: boolean = false;
  alertAddTouristicPlaceError: boolean = false;
  alertDeleteTouristicPlace: boolean = false;
  alertDeleteTouristicPlaceError: boolean = false;
  alertEditTouristicPlace: boolean = false;
  alertEditTouristicPlaceError: boolean = false;

  selectedCountryAddTouristicPlace: ICountry | null = null;
  selectedDeleteTouristicPlace: ITouristicPlace | null = null;
  selectedCountryEditTouristicPlace: ICountry | null = null;
  selectedEditTouristicPlace: ITouristicPlace | null = null;

  filteredDeleteCountryGroups: ICountryGroup[] = [];
  filteredEditCountryGroups: ICountryGroup[] = [];
  countryGroups: ICountryGroup[] = [];
  countryGroupAdd: ICountryGroup = {} as ICountryGroup;
  countryGroupDelete: ICountryGroup = {} as ICountryGroup;
  countryGroupEdit: ICountryGroup = {} as ICountryGroup;

  selectedCountryAddCountryGroup: ICountry | null = null;
  selectedCountryDeleteCountryGroup: ICountry | null = null;
  selectedDeleteCountryGroup: ICountryGroup | null = null;
  selectedCountryEditCountryGroup: ICountry | null = null;
  selectedEditCountryGroup: ICountryGroup | null = null;

  alertAddCountryGroup: boolean = false;
  alertAddCountryGroupError: boolean = false;
  alertDeleteCountryGroup: boolean = false;
  alertDeleteCountryGroupError: boolean = false;
  alertEditCountryGroup: boolean = false;
  alertEditCountryGroupError: boolean = false;

  purposes: IPurpose[] = [];
  filteredEditPurposes: IPurpose[] = [];
  purposeAdd: IPurpose = {} as IPurpose;
  purposeDelete: IPurpose = {} as IPurpose;
  purposeEdit: IPurpose = {} as IPurpose;

  alertAddPurpose: boolean = false;
  alertAddPurposeError: boolean = false;
  alertDeletePurpose: boolean = false;
  alertDeletePurposeError: boolean = false;
  alertEditPurpose: boolean = false;
  alertEditPurposeError: boolean = false;

  selectedCountryAddPurpose: ICountry | null = null;
  selectedCountryDeletePurpose: ICountry | null = null;
  selectedDeletePurpose: IPurpose | null = null;
  selectedCountryEditPurpose: ICountry | null = null;
  selectedEditPurpose: IPurpose | null = null;

  selectedPurposeId: number | null = null;

  filteredEmbassies: IEmbassy[] = [];
  embassies: IEmbassy[] = [];
  embassyAdd: IEmbassy = {} as IEmbassy;
  embassyDelelte: IEmbassy = {} as IEmbassy;
  embassyEdit: IEmbassy = {} as IEmbassy;

  alertAddEmbassy: boolean = false;
  alertAddEmbassyError: boolean = false;
  alertDelelteEmbassy: boolean = false;
  alertDeleteEmbassyError: boolean = false;
  alertEditEmbassy: boolean = false;
  alertEditEmbassyError: boolean = false;

  selectedCountryAddEmbassy: ICountry | null = null;
  selectedDeleteEmbassy: IEmbassy | null = null;
  selectedCountryEditEmbassy: ICountry | null = null;
  selectedEditEmbassy: IEmbassy | null = null;

  filteredPurposesAddPaper: IPurpose[] = [];
  filteredPurposesDeletePaper: IPurpose[] = [];
  filteredPurposesEditPaper: IPurpose[] = [];
  filteredDeletePaper: IPaper[] = [];
  filteredEditPaper: IPaper[] = [];
  papers: IPaper[] = [];
  paperAdd: IPaper = {} as IPaper;
  paperDelete: IPaper = {} as IPaper;
  paperEdit: IPaper = {} as IPaper;

  alertAddPaper: boolean = false;
  alertAddPaperError: boolean = false;
  alertDeletePaper: boolean = false;
  alertDeletePaperError: boolean = false;
  alertEditPaper: boolean = false;
  alertEditPaperError: boolean = false;

  selectedCountryAddPaper: ICountry | null = null;
  selectedPurposeAddPaper: IPurpose | null = null;
  selectedCountryDeletePaper: ICountry | null = null;
  selectedPurposeDeletePaper: IPurpose | null = null;
  selectedDeletePaper: IPaper | null = null;
  selectedCountryEditPaper: ICountry | null = null;
  selectedPurposeEditPaper: IPurpose | null = null;
  selectedEditPaper: IPaper | null = null;

  filteredPurposesAddLink: IPurpose[] = [];
  filteredPurposesEditLink: IPurpose[] = [];
  filteredEditLink: ILinks[] = [];
  links: ILinks[] = [];
  linkAdd: ILinks = {} as ILinks;
  linkDelete: ILinks = {} as ILinks;
  linkEdit: ILinks = {} as ILinks;
  alertAddLink: boolean = false;
  alertAddLinkError: boolean = false;
  alertDeleteLink: boolean = false;
  alertDeleteLinkError: boolean = false;
  alertEditLink: boolean = false;
  alertEditLinkError: boolean = false;

  selectedCountryAddLink: ICountry | null = null;
  selectedPurposeAddLink: IPurpose | null = null;
  selectedDeleteLink: ILinks | null = null;
  selectedCountryEditLink: ICountry | null = null;
  selectedPurposeEditLink: IPurpose | null = null;
  selectedEditLink: ILinks | null = null;

  showCountry: boolean = false;
  showAddCountry: boolean = false;
  showDeleteCountry: boolean = false;
  showEditCountry: boolean = false;
  arrowImageCountry!: HTMLImageElement;
  arrowImageAddCountry!: HTMLImageElement;
  arrowImageDeleteCountry!: HTMLImageElement;
  arrowImageEditCountry!: HTMLImageElement;

  showCity: boolean = false;
  showAddCity: boolean = false;
  showDeleteCity: boolean = false;
  showEditCity: boolean = false;
  arrowImageCity!: HTMLImageElement;
  arrowImageAddCity!: HTMLImageElement;
  arrowImageDeleteCity!: HTMLImageElement;
  arrowImageEditCity!: HTMLImageElement;

  showTouristicPlace: boolean = false;
  showAddTouristicPlace: boolean = false;
  showDeleteTouristicPlace: boolean = false;
  showEditTouristicPlace: boolean = false;
  arrowImageTouristicPlace!: HTMLImageElement;
  arrowImageAddTouristicPlace!: HTMLImageElement;
  arrowImageDeleteTouristicPlace!: HTMLImageElement;
  arrowImageEditTouristicPlace!: HTMLImageElement;

  showCountryGroup: boolean = false;
  showAddCountryGroup: boolean = false;
  showDeleteCountryGroup: boolean = false;
  showEditCountryGroup: boolean = false;
  arrowImageCountryGroup!: HTMLImageElement;
  arrowImageAddCountryGroup!: HTMLImageElement;
  arrowImageDeleteCountryGroup!: HTMLImageElement;
  arrowImageEditCountryGroup!: HTMLImageElement;

  showPurpose: boolean = false;
  showAddPurpose: boolean = false;
  showDeletePurpose: boolean = false;
  showEditPurpose: boolean = false;
  arrowImagePurpose!: HTMLImageElement;
  arrowImageAddPurpose!: HTMLImageElement;
  arrowImageDeletePurpose!: HTMLImageElement;
  arrowImageEditPurpose!: HTMLImageElement;

  showEmbassy: boolean = false;
  showAddEmbassy: boolean = false;
  showDeleteEmbassy: boolean = false;
  showEditEmbassy: boolean = false;
  arrowImageEmbassy!: HTMLImageElement;
  arrowImageAddEmbassy!: HTMLImageElement;
  arrowImageDeleteEmbassy!: HTMLImageElement;
  arrowImageEditEmbassy!: HTMLImageElement;

  showPaper: boolean = false;
  showAddPaper: boolean = false;
  showDeletePaper: boolean = false;
  showEditPaper: boolean = false;
  arrowImagePaper!: HTMLImageElement;
  arrowImageAddPaper!: HTMLImageElement;
  arrowImageDeletePaper!: HTMLImageElement;
  arrowImageEditPaper!: HTMLImageElement;

  showLinks: boolean = false;
  showAddLinks: boolean = false;
  showDeleteLinks: boolean = false;
  showEditLinks: boolean = false;
  arrowImageLinks!: HTMLImageElement;
  arrowImageAddLinks!: HTMLImageElement;
  arrowImageDeleteLinks!: HTMLImageElement;
  arrowImageEditLinks!: HTMLImageElement;
  constructor(
    private addService: AddAuthorizationService,
    private deleteService: DeleteAuthorizationService,
    private editService: EditAuthorizationService,
    private loadingService: LoadingServiceService
  ) {}
  openCountry() {
    if ((this.showCountry = !this.showCountry)) {
      this.arrowImageCountry = document.getElementById(
        'arrow-country'
      ) as HTMLImageElement;
      this.arrowImageCountry.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageCountry.src = 'assets/arrow-down.png';
    }
  }
  openAddCountry() {
    if ((this.showAddCountry = !this.showAddCountry)) {
      this.arrowImageAddCountry = document.getElementById(
        'arrow-addcountry'
      ) as HTMLImageElement;
      this.arrowImageAddCountry.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageAddCountry.src = 'assets/arrow-down.png';
    }
  }
  openDeleteCountry() {
    if ((this.showDeleteCountry = !this.showDeleteCountry)) {
      this.arrowImageDeleteCountry = document.getElementById(
        'arrow-deletecountry'
      ) as HTMLImageElement;
      this.arrowImageDeleteCountry.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageDeleteCountry.src = 'assets/arrow-down.png';
    }
  }
  openEditCountry() {
    if ((this.showEditCountry = !this.showEditCountry)) {
      this.arrowImageEditCountry = document.getElementById(
        'arrow-editcountry'
      ) as HTMLImageElement;
      this.arrowImageEditCountry.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageEditCountry.src = 'assets/arrow-down.png';
    }
  }
  openCity() {
    if ((this.showCity = !this.showCity)) {
      this.arrowImageCity = document.getElementById(
        'arrow-city'
      ) as HTMLImageElement;
      this.arrowImageCity.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageCity.src = 'assets/arrow-down.png';
    }
  }
  openAddCity() {
    if ((this.showAddCity = !this.showAddCity)) {
      this.arrowImageAddCity = document.getElementById(
        'arrow-addcity'
      ) as HTMLImageElement;
      this.arrowImageAddCity.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageAddCity.src = 'assets/arrow-down.png';
    }
  }
  openDeleteCity() {
    if ((this.showDeleteCity = !this.showDeleteCity)) {
      this.arrowImageDeleteCity = document.getElementById(
        'arrow-deletecity'
      ) as HTMLImageElement;
      this.arrowImageDeleteCity.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageDeleteCity.src = 'assets/arrow-down.png';
    }
  }
  openEditCity() {
    if ((this.showEditCity = !this.showEditCity)) {
      this.arrowImageEditCity = document.getElementById(
        'arrow-editcity'
      ) as HTMLImageElement;
      this.arrowImageEditCity.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageEditCity.src = 'assets/arrow-down.png';
    }
  }
  openTouristicPlace() {
    if ((this.showTouristicPlace = !this.showTouristicPlace)) {
      this.arrowImageTouristicPlace = document.getElementById(
        'arrow-touristicplace'
      ) as HTMLImageElement;
      this.arrowImageTouristicPlace.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageTouristicPlace.src = 'assets/arrow-down.png';
    }
  }
  openAddTouristicPlace() {
    if ((this.showAddTouristicPlace = !this.showAddTouristicPlace)) {
      this.arrowImageAddTouristicPlace = document.getElementById(
        'arrow-addtouristicplace'
      ) as HTMLImageElement;
      this.arrowImageAddTouristicPlace.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageTouristicPlace.src = 'assets/arrow-down.png';
    }
  }
  openDeleteTouristicPlace() {
    if ((this.showDeleteTouristicPlace = !this.showDeleteTouristicPlace)) {
      this.arrowImageDeleteTouristicPlace = document.getElementById(
        'arrow-deletetouristicplace'
      ) as HTMLImageElement;
      this.arrowImageDeleteTouristicPlace.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageDeleteTouristicPlace.src = 'assets/arrow-down.png';
    }
  }
  openEditTouristicPlace() {
    if ((this.showEditTouristicPlace = !this.showEditTouristicPlace)) {
      this.arrowImageEditTouristicPlace = document.getElementById(
        'arrow-edittouristicplace'
      ) as HTMLImageElement;
      this.arrowImageEditTouristicPlace.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageEditTouristicPlace.src = 'assets/arrow-down.png';
    }
  }

  openCountryGroup() {
    if ((this.showCountryGroup = !this.showCountryGroup)) {
      this.arrowImageCountryGroup = document.getElementById(
        'arrow-countrygroup'
      ) as HTMLImageElement;
      this.arrowImageCountryGroup.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageCountryGroup.src = 'assets/arrow-down.png';
    }
  }
  openAddCountryGroup() {
    if ((this.showAddCountryGroup = !this.showAddCountryGroup)) {
      this.arrowImageAddCountryGroup = document.getElementById(
        'arrow-addcountrygroup'
      ) as HTMLImageElement;
      this.arrowImageAddCountryGroup.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageAddCountryGroup.src = 'assets/arrow-down.png';
    }
  }
  openDeleteCountryGroup() {
    if ((this.showDeleteCountryGroup = !this.showDeleteCountryGroup)) {
      this.arrowImageDeleteCountryGroup = document.getElementById(
        'arrow-deletecountrygroup'
      ) as HTMLImageElement;
      this.arrowImageDeleteCountryGroup.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageDeleteCountryGroup.src = 'assets/arrow-down.png';
    }
  }
  openEditCountryGroup() {
    if ((this.showEditCountryGroup = !this.showEditCountryGroup)) {
      this.arrowImageEditCountryGroup = document.getElementById(
        'arrow-editcountrygroup'
      ) as HTMLImageElement;
      this.arrowImageEditCountryGroup.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageEditCountryGroup.src = 'assets/arrow-down.png';
    }
  }
  openPurpose() {
    if ((this.showPurpose = !this.showPurpose)) {
      this.arrowImagePurpose = document.getElementById(
        'arrow-purpose'
      ) as HTMLImageElement;
      this.arrowImagePurpose.src = 'assets/arrow-up.png';
    } else {
      this.arrowImagePurpose.src = 'assets/arrow-down.png';
    }
  }
  openAddPurpose() {
    if ((this.showAddPurpose = !this.showAddPurpose)) {
      this.arrowImageAddPurpose = document.getElementById(
        'arrow-addpurpose'
      ) as HTMLImageElement;
      this.arrowImageAddPurpose.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageAddPurpose.src = 'assets/arrow-down.png';
    }
  }
  openDeletePurpose() {
    if ((this.showDeletePurpose = !this.showDeletePurpose)) {
      this.arrowImageDeletePurpose = document.getElementById(
        'arrow-deletepurpose'
      ) as HTMLImageElement;
      this.arrowImageDeletePurpose.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageDeletePurpose.src = 'assets/arrow-down.png';
    }
  }
  openEditPurpose() {
    if ((this.showEditPurpose = !this.showEditPurpose)) {
      this.arrowImageEditPurpose = document.getElementById(
        'arrow-editpurpose'
      ) as HTMLImageElement;
      this.arrowImageEditPurpose.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageEditPurpose.src = 'assets/arrow-down.png';
    }
  }
  openEmbassy() {
    if ((this.showEmbassy = !this.showEmbassy)) {
      this.arrowImageEmbassy = document.getElementById(
        'arrow-embassy'
      ) as HTMLImageElement;
      this.arrowImageEmbassy.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageEmbassy.src = 'assets/arrow-down.png';
    }
  }
  openAddEmbassy() {
    if ((this.showAddEmbassy = !this.showAddEmbassy)) {
      this.arrowImageAddEmbassy = document.getElementById(
        'arrow-addembassy'
      ) as HTMLImageElement;
      this.arrowImageAddEmbassy.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageAddEmbassy.src = 'assets/arrow-down.png';
    }
  }
  openDeleteEmbassy() {
    if ((this.showDeleteEmbassy = !this.showDeleteEmbassy)) {
      this.arrowImageDeleteEmbassy = document.getElementById(
        'arrow-deleteembassy'
      ) as HTMLImageElement;
      this.arrowImageDeleteEmbassy.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageDeleteEmbassy.src = 'assets/arrow-down.png';
    }
  }
  openEditEmbassy() {
    if ((this.showEditEmbassy = !this.showEditEmbassy)) {
      this.arrowImageEditEmbassy = document.getElementById(
        'arrow-editembassy'
      ) as HTMLImageElement;
      this.arrowImageEditEmbassy.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageEditEmbassy.src = 'assets/arrow-down.png';
    }
  }
  openPaper() {
    if ((this.showPaper = !this.showPaper)) {
      this.arrowImagePaper = document.getElementById(
        'arrow-paper'
      ) as HTMLImageElement;
      this.arrowImagePaper.src = 'assets/arrow-up.png';
    } else {
      this.arrowImagePaper.src = 'assets/arrow-down.png';
    }
  }
  openAddPaper() {
    if ((this.showAddPaper = !this.showAddPaper)) {
      this.arrowImageAddPaper = document.getElementById(
        'arrow-addpaper'
      ) as HTMLImageElement;
      this.arrowImageAddPaper.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageAddPaper.src = 'assets/arrow-down.png';
    }
  }
  openDeletePaper() {
    if ((this.showDeletePaper = !this.showDeletePaper)) {
      this.arrowImageDeletePaper = document.getElementById(
        'arrow-deletepaper'
      ) as HTMLImageElement;
      this.arrowImageDeletePaper.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageDeletePaper.src = 'assets/arrow-down.png';
    }
  }
  openEditPaper() {
    if ((this.showEditPaper = !this.showEditPaper)) {
      this.arrowImageEditPaper = document.getElementById(
        'arrow-editpaper'
      ) as HTMLImageElement;
      this.arrowImageEditPaper.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageEditPaper.src = 'assets/arrow-down.png';
    }
  }
  openLinks() {
    if ((this.showLinks = !this.showLinks)) {
      this.arrowImageLinks = document.getElementById(
        'arrow-links'
      ) as HTMLImageElement;
      this.arrowImageLinks.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageLinks.src = 'assets/arrow-down.png';
    }
  }
  openAddLinks() {
    if ((this.showAddLinks = !this.showAddLinks)) {
      this.arrowImageAddLinks = document.getElementById(
        'arrow-addlinks'
      ) as HTMLImageElement;
      this.arrowImageAddLinks.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageAddLinks.src = 'assets/arrow-down.png';
    }
  }
  openDeleteLinks() {
    if ((this.showDeleteLinks = !this.showDeleteLinks)) {
      this.arrowImageDeleteLinks = document.getElementById(
        'arrow-deletelinks'
      ) as HTMLImageElement;
      this.arrowImageDeleteLinks.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageDeleteLinks.src = 'assets/arrow-down.png';
    }
  }
  openEditLinks() {
    if ((this.showEditLinks = !this.showEditLinks)) {
      this.arrowImageEditLinks = document.getElementById(
        'arrow-editlinks'
      ) as HTMLImageElement;
      this.arrowImageEditLinks.src = 'assets/arrow-up.png';
    } else {
      this.arrowImageEditLinks.src = 'assets/arrow-down.png';
    }
  }

  ngOnInit() {
    this.fetchCountries();
    this.fetchPurposes();
    this.fetchCities();
    this.fetchCountryGroups();
    this.fetchTouristicPlaces();
    this.fetchEmbassies();
    this.fetchPapers();
    this.fetchLinks();
  }

  fetchCountries() {
    // Implement the fetchCountries method in AddAuthorizationService
    this.addService.getCountries().subscribe({
      next: (countries) => (this.countries = countries),
      error: (error) => console.log('Error fetching countries', error),
    });
  }
  fetchPurposes() {
    // Implement the fetchCountries method in AddAuthorizationService
    this.addService.getPurposes().subscribe({
      next: (purposes) => (this.purposes = purposes),
      error: (error) => console.log('Error fetching purpose', error),
    });
  }
  fetchCities() {
    // Implement the fetchCountries method in AddAuthorizationService
    this.addService.getCities().subscribe({
      next: (cities) => (this.cities = cities),
      error: (error) => console.log('Error fetching cities', error),
    });
  }
  fetchCountryGroups() {
    // Implement the fetchCountries method in AddAuthorizationService
    this.addService.getCountryGroups().subscribe({
      next: (countryGroup) => (this.countryGroups = countryGroup),
      error: (error) => console.log('Error fetching countryGroups', error),
    });
  }
  fetchTouristicPlaces() {
    // Implement the fetchCountries method in AddAuthorizationService
    this.addService.getTouristicPlaces().subscribe({
      next: (touristicplaces) => (this.touristicPlaces = touristicplaces),
      error: (error) => console.log('Error fetching touristicPlaces', error),
    });
  }
  fetchEmbassies() {
    // Implement the fetchCountries method in AddAuthorizationService
    this.addService.getEmbassies().subscribe({
      next: (embassies) => (this.embassies = embassies),
      error: (error) => console.log('Error fetching embassies', error),
    });
  }
  fetchPapers() {
    // Implement the fetchCountries method in AddAuthorizationService
    this.addService.getPapers().subscribe({
      next: (papers) => (this.papers = papers),
      error: (error) => console.log('Error fetching papers', error),
    });
  }
  fetchLinks() {
    // Implement the fetchCountries method in AddAuthorizationService
    this.addService.getLinks().subscribe({
      next: (links) => (this.links = links),
      error: (error) => console.log('Error fetching links', error),
    });
  }

  addCountry(form: NgForm) {
    this.addService.addCountry(this.countryAdd).subscribe({
      next: (response) => {
        this.loadingService.hideProgressBar();
        console.log(response), form.reset();
        const imageUrlInput = document.getElementById(
          'addcountry_img'
        ) as HTMLInputElement;
        if (imageUrlInput) {
          imageUrlInput.value = '';
        }
        this.alertAddCountry = !this.alertAddCountry;

        setTimeout(() => {
          this.alertAddCountry = false;
        }, 2000);
      },
      error: (error) => {
        this.loadingService.hideProgressBar();
        console.log('There was an error!', error.message);
        this.alertAddCountryError = !this.alertAddCountryError;
        setTimeout(() => {
          this.alertAddCountryError = false;
        }, 2000);
      },
    });
  }
  onImageUrlChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      this.countryAdd.countryImages = [input.value];
    }
  }
  deleteCountry(form: NgForm) {
    this.loadingService.showProgressBar();

    if (this.selectedDeleteCountry) {
      this.countryDelete.countryId = this.selectedDeleteCountry.countryId;
      this.deleteService.deleteCountry(this.countryDelete).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();
          console.log(response), localStorage.getItem('authToken');
          form.reset();
          this.alertDeleteCountry = !this.alertDeleteCountry;

          setTimeout(() => {
            this.alertDeleteCountry = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();

          console.log('There was an error!', error.message);
          this.alertDeleteCountryError = !this.alertDeleteCountryError;
          setTimeout(() => {
            this.alertDeleteCountryError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar();

      console.error('No country selected for the CountryGroup');
      this.alertDeleteCountryError = !this.alertDeleteCountryError;
      setTimeout(() => {
        this.alertDeleteCountryError = false;
      }, 2000);
    }
  }

  editCountry(form: NgForm) {
    this.loadingService.showProgressBar();
    if (this.selectedEditCountry) {
      this.countryEdit.countryId = this.selectedEditCountry.countryId;
      this.countryEdit.countryName = this.selectedEditCountry.countryName;
      this.editService.editCountry(this.countryEdit).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();

          console.log(response);
          localStorage.getItem('authToken');

          form.reset();

          this.alertEditCountry = !this.alertEditCountry;

          setTimeout(() => {
            this.alertEditCountry = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();

          console.log('There was an error!', error.message);
          this.alertEditCountryError = !this.alertEditCountryError;
          setTimeout(() => {
            this.alertEditCountryError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar();

      console.error('No country selected for editing');
      this.alertEditCountryError = !this.alertEditCountryError;
      setTimeout(() => {
        this.alertEditCountryError = false;
      }, 2000);
    }
  }
  addCity(form: NgForm) {
    this.loadingService.showProgressBar();
    if (this.selectedCountryAddCity) {
      this.cityAdd.countryId = this.selectedCountryAddCity.countryId;
      this.addService.addCity(this.cityAdd).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();
          console.log(response);
          form.reset();
          this.alertAddCity = !this.alertAddCity;

          setTimeout(() => {
            this.alertAddCity = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();

          console.error('There was an error!', error.message);
          this.alertAddCityError = !this.alertAddCityError;
          setTimeout(() => {
            this.alertAddCityError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar();

      console.error('No country selected for the city');
      this.alertAddCityError = !this.alertAddCityError;
      setTimeout(() => {
        this.alertAddCityError = false;
      }, 2000);
    }
  }
  deleteCity(form: NgForm) {
    this.loadingService.showProgressBar();
    if (this.selectedDeleteCity) {
      this.cityDelete.countryCity1 = this.selectedDeleteCity.countryCity1;
      this.deleteService.deleteCity(this.cityDelete).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();
          console.log(response), localStorage.getItem('authToken');
          form.reset();
          this.alertDeleteCity = !this.alertDeleteCity;

          setTimeout(() => {
            this.alertDeleteCity = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();

          console.log('There was an error!', error.message);
          this.alertDeleteCityError = !this.alertDeleteCityError;
          setTimeout(() => {
            this.alertDeleteCityError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar();

      console.error('No country selected for the CountryGroup');
      this.alertDeleteCityError = !this.alertDeleteCityError;
      setTimeout(() => {
        this.alertDeleteCityError = false;
      }, 2000);
    }
  }
  editCity(form: NgForm) {
    this.loadingService.showProgressBar();
    if (this.selectedCountryEditCity && this.selectedEditCity) {
      this.cityEdit.countryId = this.selectedCountryEditCity.countryId;
      this.cityEdit.countryCity1 = this.selectedEditCity.countryCity1;

      this.editService.editCity(this.cityEdit).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();
          console.log(response), localStorage.getItem('authToken');
          form.reset();
          this.alertEditCity = !this.alertEditCity;

          setTimeout(() => {
            this.alertEditCity = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();

          console.log('There was an error!', error.message);
          this.alertEditCityError = !this.alertEditCityError;
          setTimeout(() => {
            this.alertEditCityError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar();

      console.error('No country selected for the CountryGroup');
      this.alertEditCityError = !this.alertEditCityError;
      setTimeout(() => {
        this.alertEditCityError = false;
      }, 2000);
    }
  }
  addTouristicplace(form: NgForm) {
    this.loadingService.showProgressBar();
    if (this.selectedCountryAddTouristicPlace) {
      this.touristicPlaceAdd.countryId =
        this.selectedCountryAddTouristicPlace.countryId;
      this.addService.addTouristicPlace(this.touristicPlaceAdd).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();
          console.log(response);
          form.reset();
          this.alertAddTouristicPlace = !this.alertAddTouristicPlace;

          setTimeout(() => {
            this.alertAddTouristicPlace = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();
          console.error('There was an error!', error.message);
          this.alertAddTouristicPlaceError = !this.alertAddTouristicPlaceError;
          setTimeout(() => {
            this.alertAddTouristicPlaceError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar();
      console.error('No country selected for the city');
      this.alertAddTouristicPlaceError = !this.alertAddTouristicPlaceError;
      setTimeout(() => {
        this.alertAddTouristicPlaceError = false;
      }, 2000);
    }
  }
  deleteTouristicPlace(form: NgForm) {
    this.loadingService.showProgressBar();
    if (this.selectedDeleteTouristicPlace) {
      this.touristicPlaceDelete.touristicPlaceId =
        this.selectedDeleteTouristicPlace.touristicPlaceId;
      this.deleteService
        .deleteTouristicPlace(this.touristicPlaceDelete)
        .subscribe({
          next: (response) => {
            this.loadingService.hideProgressBar();
            console.log(response), localStorage.getItem('authToken');
            form.reset();
            this.alertDeleteTouristicPlace = !this.alertDeleteTouristicPlace;

            setTimeout(() => {
              this.alertDeleteTouristicPlace = false;
            }, 2000);
          },
          error: (error) => {
            this.loadingService.hideProgressBar();

            console.log('There was an error!', error.message);
            this.alertDeleteTouristicPlaceError =
              !this.alertDeleteTouristicPlaceError;
            setTimeout(() => {
              this.alertDeleteTouristicPlaceError = false;
            }, 2000);
          },
        });
    } else {
      this.loadingService.hideProgressBar();

      console.error('No country selected for the CountryGroup');
      this.alertDeleteTouristicPlaceError =
        !this.alertDeleteTouristicPlaceError;
      setTimeout(() => {
        this.alertDeleteTouristicPlaceError = false;
      }, 2000);
    }
  }
  editTouristicPlace(form: NgForm) {
    this.loadingService.showProgressBar()
    if (
      this.selectedCountryEditTouristicPlace &&
      this.selectedEditTouristicPlace
    ) {
      this.touristicPlaceEdit.countryId =
        this.selectedCountryEditTouristicPlace.countryId;
      this.touristicPlaceEdit.touristicPlaceId =
        this.selectedEditTouristicPlace.touristicPlaceId;

      this.editService.editTouristicPlace(this.touristicPlaceEdit).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();
          console.log(response), localStorage.getItem('authToken');
          form.reset();
          this.alertEditTouristicPlace = !this.alertEditTouristicPlace;

          setTimeout(() => {
            this.alertEditTouristicPlace = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();

          console.log('There was an error!', error.message);
          this.alertEditTouristicPlaceError =
            !this.alertEditTouristicPlaceError;
          setTimeout(() => {
            this.alertEditTouristicPlaceError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar();

      console.error('No country selected for the CountryGroup');
      this.alertEditTouristicPlaceError = !this.alertEditTouristicPlaceError;
      setTimeout(() => {
        this.alertEditTouristicPlaceError = false;
      }, 2000);
    }
  }
  addCountryGroup(form: NgForm) {
    this.loadingService.showProgressBar();
    if (this.selectedCountryAddCountryGroup) {
      this.countryGroupAdd.countryId =
        this.selectedCountryAddCountryGroup.countryId;
      this.countryGroupAdd.countyName =
        this.selectedCountryAddCountryGroup.countryName;
      this.addService.addCountryGroup(this.countryGroupAdd).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();
          console.log(response);
          form.reset();
          this.alertAddCountryGroup = !this.alertAddCountryGroup;

          setTimeout(() => {
            this.alertAddCountryGroup = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();

          console.error('There was an error!', error.message);
          this.alertAddCountryGroupError = !this.alertAddCountryGroupError;
          setTimeout(() => {
            this.alertAddCountryGroupError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar();

      console.error('No country selected for the CountryGroup');
      this.alertAddCountryGroupError = !this.alertAddCountryGroupError;
      setTimeout(() => {
        this.alertAddCountryGroupError = false;
      }, 2000);
    }
  }
  deleteCountryGroup(form: NgForm) {
    this.loadingService.showProgressBar();
    if (
      this.selectedCountryDeleteCountryGroup &&
      this.selectedDeleteCountryGroup
    ) {
      this.countryGroupDelete.countryId =
        this.selectedCountryDeleteCountryGroup.countryId;
      this.countryGroupDelete.id = this.selectedDeleteCountryGroup.id;

      this.deleteService.deleteCountryGroup(this.countryGroupDelete).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();

          console.log(response), localStorage.getItem('authToken');
          form.reset();
          this.alertDeleteCountryGroup = !this.alertDeleteCountryGroup;

          setTimeout(() => {
            this.alertDeleteCountryGroup = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();

          console.log('There was an error!', error.message);
          this.alertDeleteCountryGroupError =
            !this.alertDeleteCountryGroupError;
          setTimeout(() => {
            this.alertDeleteCountryGroupError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar();

      console.error('No country selected for the CountryGroup');
      this.alertDeleteCountryGroupError = !this.alertDeleteCountryGroupError;
      setTimeout(() => {
        this.alertDeleteCountryGroupError = false;
      }, 2000);
    }
  }
  editCountryGroup(form: NgForm) {
    this.loadingService.showProgressBar()
    if (this.selectedCountryEditCountryGroup && this.selectedEditCountryGroup) {
      this.countryGroupEdit.countryId =
        this.selectedCountryEditCountryGroup.countryId;
      this.countryGroupEdit.id = this.selectedEditCountryGroup.id;

      this.editService.editCountryGroup(this.countryGroupEdit).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();

          console.log(response), localStorage.getItem('authToken');
          form.reset();
          this.alertEditCountryGroup = !this.alertEditCountryGroup;

          setTimeout(() => {
            this.alertEditCountryGroup = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();

          console.log('There was an error!', error.message);
          this.alertEditCountryGroupError = !this.alertEditCountryGroupError;
          setTimeout(() => {
            this.alertEditCountryGroupError = false;
          }, 2000);
        },
      });
    } else {
      console.error('No country selected for the CountryGroup');
      this.alertEditCountryGroupError = !this.alertEditCountryGroupError;
      setTimeout(() => {
        this.alertEditCountryGroupError = false;
      }, 2000);
    }
  }
  addPurpose(form: NgForm) {
    this.loadingService.showProgressBar();
    if (this.selectedCountryAddPurpose) {
      this.purposeAdd.countryId = this.selectedCountryAddPurpose.countryId;
      this.addService.addPurpose(this.purposeAdd).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();

          console.log(response), localStorage.getItem('authToken');
          form.reset();
          this.alertAddPurpose = !this.alertAddPurpose;

          setTimeout(() => {
            this.alertAddPurpose = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();

          console.log('There was an error!', error.message);
          this.alertAddPurposeError = !this.alertAddPurposeError;
          setTimeout(() => {
            this.alertAddPurposeError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar();

      console.error('No country selected for the CountryGroup');
      this.alertAddPurposeError = !this.alertAddPurposeError;
      setTimeout(() => {
        this.alertAddPurposeError = false;
      }, 2000);
    }
  }

  deletePurpose(form: NgForm) {
    this.loadingService.showProgressBar()
    if (this.selectedDeletePurpose) {
      this.purposeDelete.purposeId = this.selectedDeletePurpose.purposeId;
      this.deleteService.deletePurpose(this.purposeDelete).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();

          console.log(response), localStorage.getItem('authToken');
          form.reset();
          this.alertDeletePurpose = !this.alertDeletePurpose;

          setTimeout(() => {
            this.alertDeletePurpose = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();

          console.log('There was an error!', error.message);
          this.alertDeletePurposeError = !this.alertDeletePurposeError;
          setTimeout(() => {
            this.alertDeletePurposeError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar();

      console.error('No country selected for the Purposes');
      this.alertDeletePurposeError = !this.alertDeletePurposeError;
      setTimeout(() => {
        this.alertDeletePurposeError = false;
      }, 2000);
    }
  }
  editPurpose(form: NgForm) {
    this.loadingService.showProgressBar();
    if (this.selectedCountryEditPurpose && this.selectedEditPurpose) {
      this.purposeEdit.countryId = this.selectedCountryEditPurpose.countryId;

      this.purposeEdit.purposeName = this.selectedEditPurpose.purposeName;

      this.editService.editPurpose(this.purposeEdit).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();

          console.log(response), localStorage.getItem('authToken');
          form.reset();
          this.alertEditPurpose = !this.alertEditPurpose;

          setTimeout(() => {
            this.alertEditPurpose = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();

          console.log('There was an error!', error.message);
          this.alertEditPurposeError = !this.alertEditPurposeError;
          setTimeout(() => {
            this.alertEditPurposeError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar();

      console.error('No country selected for the CountryGroup');
      this.alertEditPurposeError = !this.alertEditPurposeError;
      setTimeout(() => {
        this.alertEditPurposeError = false;
      }, 2000);
    }
  }
  addEmbassy(form: NgForm) {
    this.loadingService.showProgressBar();
    if (this.selectedCountryAddEmbassy) {
      this.embassyAdd.countryId = this.selectedCountryAddEmbassy.countryId;
      this.addService.addEmbassy(this.embassyAdd).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();

          console.log(response), localStorage.getItem('authToken');
          form.reset();
          this.alertAddEmbassy = !this.alertAddEmbassy;

          setTimeout(() => {
            this.alertAddEmbassy = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();

          console.log('There was an error!', error.message);
          this.alertAddEmbassyError = !this.alertAddEmbassyError;
          setTimeout(() => {
            this.alertAddEmbassyError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar();

      console.error('No country selected for the CountryGroup');
      this.alertAddEmbassyError = !this.alertAddEmbassyError;
      setTimeout(() => {
        this.alertAddEmbassyError = false;
      }, 2000);
    }
  }
  deleteEmbassy(form: NgForm) {
    this.loadingService.showProgressBar();
    if (this.selectedDeleteEmbassy) {
      this.embassyDelelte.embassiesName =
        this.selectedDeleteEmbassy.embassiesName;
      this.deleteService.deleteEmbassy(this.embassyDelelte).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();

          console.log(response), localStorage.getItem('authToken');
          form.reset();
          this.alertDelelteEmbassy = !this.alertDelelteEmbassy;

          setTimeout(() => {
            this.alertDelelteEmbassy = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();

          console.log('There was an error!', error.message);
          this.alertDeleteEmbassyError = !this.alertDeleteEmbassyError;
          setTimeout(() => {
            this.alertDeleteEmbassyError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar();

      console.error('No country selected for the CountryGroup');
      this.alertDeleteEmbassyError = !this.alertDeleteEmbassyError;
      setTimeout(() => {
        this.alertDeleteEmbassyError = false;
      }, 2000);
    }
  }

  editEmbassy(form: NgForm) {
    this.loadingService.showProgressBar();
    if (this.selectedCountryEditEmbassy) {
      this.embassyEdit.countryId = this.selectedCountryEditEmbassy.countryId;
      this.editService.editEmbassy(this.embassyEdit).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();

          console.log(response);
          localStorage.getItem('authToken');

          form.reset();
          this.alertEditEmbassy = !this.alertEditEmbassy;

          setTimeout(() => {
            this.alertEditEmbassy = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();

          console.log('There was an error!', error.message);
          this.alertEditEmbassyError = !this.alertEditEmbassyError;
          setTimeout(() => {
            this.alertEditEmbassyError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar();

      console.error('No country selected for editing');
      this.alertEditEmbassyError = !this.alertEditEmbassyError;
      setTimeout(() => {
        this.alertEditEmbassyError = false;
      }, 2000);
    }
  }
  addPaper(form: NgForm) {
    this.loadingService.showProgressBar();
    if (this.selectedCountryAddPaper && this.selectedPurposeAddPaper) {
      this.paperAdd.countryId = this.selectedCountryAddPaper.countryId;
      this.paperAdd.purposeId = this.selectedPurposeAddPaper.purposeId;

      this.addService.addPaper(this.paperAdd).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();

          console.log(response), localStorage.getItem('authToken');
          form.reset();
          this.alertAddPaper = !this.alertAddPaper;

          setTimeout(() => {
            this.alertAddPaper = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();

          console.log('There was an error!', error.message);
          this.alertAddPaperError = !this.alertAddPaperError;
          setTimeout(() => {
            this.alertAddPaperError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar();

      console.error('No country selected for the CountryGroup');
      this.alertAddPaperError = !this.alertAddPaperError;
      setTimeout(() => {
        this.alertAddPaperError = false;
      }, 2000);
    }
  }
  deletePaper(form: NgForm) {
    this.loadingService.showProgressBar();
    if (
      this.selectedCountryDeletePaper &&
      this.selectedPurposeDeletePaper &&
      this.selectedDeletePaper
    ) {
      this.paperDelete.countryId = this.selectedCountryDeletePaper.countryId;
      this.paperDelete.purposeId = this.selectedPurposeDeletePaper.purposeId;
      this.paperDelete.paperName = this.selectedDeletePaper.paperName;

      this.deleteService.deletePaper(this.paperDelete).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();

          console.log(response), localStorage.getItem('authToken');
          form.reset();
          this.alertDeletePaper = !this.alertDeletePaper;

          setTimeout(() => {
            this.alertDeletePaper = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();

          console.log('There was an error!', error.message);
          this.alertDeletePaperError = !this.alertDeletePaperError;
          setTimeout(() => {
            this.alertDeletePaperError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar();

      console.error('No country selected for the CountryGroup');
      this.alertDeletePaperError = !this.alertDeletePaperError;
      setTimeout(() => {
        this.alertDeletePaperError = false;
      }, 2000);
    }
  }
  editPaper(form: NgForm) {
    this.loadingService.showProgressBar();
    if (
      this.selectedCountryEditPaper &&
      this.selectedPurposeEditPaper &&
      this.selectedEditPaper
    ) {
      this.paperEdit.countryId = this.selectedCountryEditPaper.countryId;
      this.paperEdit.purposeId = this.selectedPurposeEditPaper.purposeId;
      this.paperEdit.paperName = this.selectedEditPaper.paperName;

      this.editService.editPaper(this.paperEdit).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();

          console.log(response), localStorage.getItem('authToken');
          form.reset();
          this.alertEditPaper = !this.alertEditPaper;

          setTimeout(() => {
            this.alertEditPaper = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();

          console.log('There was an error!', error.message);
          this.alertEditPaperError = !this.alertEditPaperError;
          setTimeout(() => {
            this.alertEditPaperError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar();

      console.error('No country selected for the CountryGroup');
      this.alertEditPaperError = !this.alertEditPaperError;
      setTimeout(() => {
        this.alertEditPaperError = false;
      }, 2000);
    }
  }
  addLink(form: NgForm) {
    this.loadingService.showProgressBar();
    if (this.selectedCountryAddLink && this.selectedPurposeAddLink) {
      this.linkAdd.countryId = this.selectedCountryAddLink.countryId;
      this.linkAdd.purposeId = this.selectedPurposeAddLink.purposeId;
      this.addService.addLink(this.linkAdd).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar();

          console.log(response), localStorage.getItem('authToken');
          form.reset();
          this.alertAddLink = !this.alertAddLink;

          setTimeout(() => {
            this.alertAddLink = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar();

          console.log('There was an error!', error.message);
          this.alertAddLinkError = !this.alertAddLinkError;
          setTimeout(() => {
            this.alertAddLinkError = false;
          }, 2000);
        },
      });
    } else {
                this.loadingService.hideProgressBar();

      console.error('No country selected for the CountryGroup');
      this.alertAddLinkError = !this.alertAddLinkError;
      setTimeout(() => {
        this.alertAddLinkError = false;
      }, 2000);
    }
  }
  deleteLink(form: NgForm) {
    this.loadingService.showProgressBar();
    if (this.selectedDeleteLink) {
      this.linkDelete.linksId = this.selectedDeleteLink.linksId;
      this.deleteService.deleteLink(this.linkDelete).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar()
          console.log(response), localStorage.getItem('authToken');
          form.reset();
          this.alertDeleteLink = !this.alertDeleteLink;

          setTimeout(() => {
            this.alertDeleteLink = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar()

          console.log('There was an error!', error.message);
          this.alertDeleteLinkError = !this.alertDeleteLinkError;
          setTimeout(() => {
            this.alertDeleteLinkError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar()

      console.error('No country selected for the CountryGroup');
      this.alertDeleteLinkError = !this.alertDeleteLinkError;
      setTimeout(() => {
        this.alertDeleteLinkError = false;
      }, 2000);
    }
  }
  editLink(form: NgForm) {
    this.loadingService.showProgressBar()

    if (
      this.selectedCountryEditLink &&
      this.selectedPurposeEditLink &&
      this.selectedEditLink
    ) {
      this.linkEdit.countryId = this.selectedCountryEditLink.countryId;
      this.linkEdit.purposeId = this.selectedPurposeEditLink.purposeId;
      this.linkEdit.linksId = this.selectedEditLink.linksId;
      this.editService.editLink(this.linkEdit).subscribe({
        next: (response) => {
          this.loadingService.hideProgressBar()

          console.log(response), localStorage.getItem('authToken');
          form.reset();
          this.alertEditLink = !this.alertEditLink;

          setTimeout(() => {
            this.alertEditLink = false;
          }, 2000);
        },
        error: (error) => {
          this.loadingService.hideProgressBar()

          console.log('There was an error!', error.message);
          this.alertEditLinkError = !this.alertEditLinkError;
          setTimeout(() => {
            this.alertEditLinkError = false;
          }, 2000);
        },
      });
    } else {
      this.loadingService.hideProgressBar()

      console.error('No country selected for the CountryGroup');
      this.alertEditLinkError = !this.alertEditLinkError;
      setTimeout(() => {
        this.alertEditLinkError = false;
      }, 2000);
    }
  }
  // ... fetchCountries logic to populate countries array
  selectCountryDelete(selectCountry: ICountry) {
    this.selectedDeleteCountry = selectCountry;
    this.countryDelete.countryId = selectCountry?.countryId;
  }
  selectCountryEdit(selectCountry: ICountry) {
    this.selectedEditCountry = selectCountry;
    this.countryEdit.countryId = selectCountry?.countryId;
    if (selectCountry) {
      // Update form fields with selected country data
      this.countryEdit = {
        ...selectCountry, // Spread operator to copy all properties
      };
    } else {
      // Clear form fields if no country selected
      this.countryEdit = {
        countryId: 0,
        countryName: '',
        countryContinent: '',
        countryNotes: '',
        countryDescription: '',
        favoriteCountry: false,
      };
    }
  }
  selectCountryCityAdd(country: ICountry) {
    this.selectedCountryAddCity = country;
    this.cityAdd.countryId = country?.countryId;
  }
  selectCityDelete(city: ICity) {
    this.selectedDeleteCity = city;
    this.cityDelete.countryCity1 = city?.countryCity1;
  }
  selectCountryCityEdit(country: ICountry) {
    this.selectedCountryEditCity = country;
    this.cityEdit.countryId = country?.countryId;
    if (country) {
      this.filteredCities = this.cities.filter(
        (city) => city.countryId === country.countryId
      );
      if (this.filteredCities.length > 0) {
        this.selectedEditCity = this.filteredCities[0];
        this.cityEdit.countryCity1 = this.selectedEditCity.countryCity1;
        this.cityEdit.cityImage = this.selectedEditCity.cityImage; // Assuming cityImage exists in ICity interface
      } else {
        this.selectedEditCity = null;
        this.cityEdit.countryCity1 = null;
        this.cityEdit.cityImage = ''; // Clear city image if no city is selected
      }
    } else {
      this.filteredCities = [];
      this.selectedEditCity = null;
      this.cityEdit.countryCity1 = null;
      this.cityEdit.cityImage = ''; // Clear city image if no city is selected
    }
  }

  selectCityEdit(city: ICity) {
    this.selectedEditCity = city;
    this.cityEdit.countryCity1 = city?.countryCity1;
    this.cityEdit.cityImage = this.selectedEditCity?.cityImage; // Assuming cityImage exists in ICity interface
  }
  selectCountryTouristicPlaceAdd(country: ICountry) {
    this.selectedCountryAddTouristicPlace = country;
    this.touristicPlaceAdd.countryId = country?.countryId; // Ensure the city has the correct country ID
  }
  selectTouristicPlaceDelete(touristicplace: ITouristicPlace) {
    this.selectedDeleteTouristicPlace = touristicplace;
    this.touristicPlaceDelete.touristicPlaceId =
      touristicplace?.touristicPlaceId;
  }
  selectCountryTouristicPlaceEdit(country: ICountry) {
    this.selectedCountryEditTouristicPlace = country;
    this.touristicPlaceEdit.countryId = country?.countryId;
    if (country) {
      this.filteredTouristicPlaces = this.touristicPlaces.filter(
        (touristicplace) => touristicplace.countryId === country.countryId
      );
      if (this.filteredTouristicPlaces.length > 0) {
        this.selectedEditTouristicPlace = this.filteredTouristicPlaces[0];
        this.touristicPlaceEdit.touristicPlaceId =
          this.selectedEditTouristicPlace.touristicPlaceId;
        this.touristicPlaceEdit.placeName =
          this.selectedEditTouristicPlace.placeName;
        this.touristicPlaceEdit.placeImage =
          this.selectedEditTouristicPlace.placeImage;
      } else {
        this.selectedEditTouristicPlace = null;
        this.touristicPlaceEdit.placeName = '';
        this.touristicPlaceEdit.placeImage = '';
      }
    } else {
      this.filteredTouristicPlaces = [];
      this.touristicPlaceEdit.placeName = '';
      this.touristicPlaceEdit.placeImage = '';
    }
  }

  selectTouristicPlaceEdit(touristicplace: ITouristicPlace) {
    this.selectedEditTouristicPlace = touristicplace;
    this.touristicPlaceEdit = { ...touristicplace };
  }
  selectCountryCountryGroupAdd(country: ICountry) {
    this.selectedCountryAddCountryGroup = country;
    this.countryGroupAdd.countryId = country?.countryId;
  }
  selectCountryCountryGroupDelete(country: ICountry) {
    this.selectedCountryDeleteCountryGroup = country;
    this.countryGroupDelete.countryId = country?.countryId;
    if (country) {
      this.filteredDeleteCountryGroups = this.countryGroups.filter(
        (countrygroup) => countrygroup.countryId === country.countryId
      );
      if (this.filteredDeleteCountryGroups.length > 0) {
        this.selectedDeleteCountryGroup = this.filteredDeleteCountryGroups[0];
      } else {
        this.selectedDeleteCountryGroup = null;
      }
    } else {
      this.filteredDeleteCountryGroups = [];
    }
  }
  selectCountryGroupDelete(countryGroup: ICountryGroup) {
    this.selectedDeleteCountryGroup = countryGroup;
    this.countryGroupDelete.id = countryGroup?.id;
  }
  selectCountryCountryGroupEdit(country: ICountry) {
    this.selectedCountryEditCountryGroup = country;
    this.countryGroupEdit.countryId = country?.countryId;
    if (country) {
      this.filteredEditCountryGroups = this.countryGroups.filter(
        (countrygroup) => countrygroup.countryId === country.countryId
      );
      if (this.filteredEditCountryGroups.length > 0) {
        this.selectedEditCountryGroup = this.filteredEditCountryGroups[0];
        this.countryGroupEdit.id = this.selectedEditCountryGroup.id;
        this.countryGroupEdit.countryGroup1 =
          this.selectedEditCountryGroup.countryGroup1;
      } else {
        this.selectedEditCountryGroup = null;
        this.countryGroupEdit.id = 0;
        this.countryGroupEdit.countryGroup1 = '';
      }
    } else {
      this.filteredEditCountryGroups = [];
      this.countryGroupEdit.id = 0;
      this.countryGroupEdit.countryGroup1 = '';
    }
  }
  selectCountryGroupEdit(countryGroup: ICountryGroup) {
    this.selectedEditCountryGroup = countryGroup;
    this.countryGroupEdit = { ...countryGroup };
  }
  selectCountryPurposeAdd(country: ICountry) {
    this.selectedCountryAddPurpose = country;
    this.purposeAdd.countryId = country?.countryId;
  }
  selectPurposeDelete(purpose: IPurpose) {
    this.selectedDeletePurpose = purpose;
    this.purposeDelete.purposeId = purpose?.purposeId;
  }
  selectCountryPurposeEdit(country: ICountry) {
    this.selectedCountryEditPurpose = country;
    this.purposeEdit.countryId = country?.countryId;
    if (country) {
      this.filteredEditPurposes = this.purposes.filter(
        (purpose) => purpose.countryId === country.countryId
      );
      if (this.filteredEditPurposes.length > 0) {
        this.selectedEditPurpose = this.filteredEditPurposes[0];
        this.purposeEdit.purposeName = this.selectedEditPurpose.purposeName;
        this.purposeEdit.purposeType = this.selectedEditPurpose.purposeType; // Assuming cityImage exists in ICity interface
      } else {
        this.selectedEditPurpose = null;
        this.purposeEdit.purposeName = null;
        this.purposeEdit.purposeType = '';
      }
    } else {
      this.filteredEditPurposes = [];
      this.selectedEditPurpose = null;
      this.purposeEdit.purposeName = null;
      this.purposeEdit.purposeType = '';
    }
  }
  selectPurposeEdit(purpose: IPurpose) {
    this.selectedEditPurpose = purpose;
    this.purposeEdit.purposeId = purpose?.purposeId;
    this.purposeEdit.purposeType = this.selectedEditPurpose?.purposeType; // Assuming cityImage exists in ICity interface
  }
  selectCountryEmbassyAdd(country: ICountry) {
    this.selectedCountryAddEmbassy = country;
    this.embassyAdd.countryId = country?.countryId;
  }
  selectEmbassyDelete(embassy: IEmbassy) {
    this.selectedDeleteEmbassy = embassy;
    this.embassyDelelte.embassiesId = embassy?.embassiesId;
  }
  selectCountryEmbassyEdit(country: ICountry) {
    this.selectedCountryEditEmbassy = country;
    this.embassyEdit.countryId = country?.countryId;
    if (country) {
      this.filteredEmbassies = this.embassies.filter(
        (embassy) => embassy.countryId === country.countryId
      );
      if (this.filteredEmbassies.length > 0) {
        this.selectedEditEmbassy = this.filteredEmbassies[0];
        this.embassyEdit.embassiesName = this.selectedEditEmbassy.embassiesName;
        this.embassyEdit.embassiesId = this.selectedEditEmbassy.embassiesId;
        this.embassyEdit.embassiesFax = this.selectedEditEmbassy.embassiesFax;
        this.embassyEdit.embassiesMail = this.selectedEditEmbassy.embassiesMail;
        this.embassyEdit.embassiesPhone =
          this.selectedEditEmbassy.embassiesPhone;
        this.embassyEdit.embassiesLocation =
          this.selectedEditEmbassy.embassiesLocation;
      } else {
        this.selectedEditEmbassy = null;
        this.embassyEdit.embassiesName = '';
        this.embassyEdit.embassiesId = 0;
        this.embassyEdit.embassiesFax = '';
        this.embassyEdit.embassiesMail = '';
        this.embassyEdit.embassiesPhone = '';
        this.embassyEdit.embassiesLocation = '';
      }
    } else {
      this.filteredEmbassies = [];
      this.selectedEditEmbassy = null;
      this.embassyEdit.embassiesName = '';
      this.embassyEdit.embassiesId = 0;
      this.embassyEdit.embassiesFax = '';
      this.embassyEdit.embassiesMail = '';
      this.embassyEdit.embassiesPhone = '';
      this.embassyEdit.embassiesLocation = '';
    }
  }
  selectEmbassyEdit(embassy: IEmbassy) {
    this.selectedEditEmbassy = embassy;
    this.embassyEdit = { ...embassy };
  }
  selectCountryPaperAdd(country: ICountry) {
    this.selectedCountryAddPaper = country;
    this.paperAdd.countryId = country?.countryId;
    if (country) {
      this.filteredPurposesAddPaper = this.purposes.filter(
        (purpose) => purpose.countryId === country.countryId
      );
      if (this.filteredPurposesAddPaper.length > 0) {
        this.selectedPurposeAddPaper = this.filteredPurposesAddPaper[0];
      } else {
        this.selectedPurposeAddPaper = null;
      }
    } else {
      this.filteredPurposesAddPaper = [];
    }
  }

  selectPurposePaperAdd(purpose: IPurpose) {
    this.selectedPurposeAddPaper = purpose;
    this.paperAdd.purposeId = purpose?.purposeId;
  }
  selectCountryPaperDelete(country: ICountry) {
    this.selectedCountryDeletePaper = country;
    this.paperDelete.countryId = country?.countryId;
    if (country) {
      this.filteredPurposesDeletePaper = this.purposes.filter(
        (purpose) => purpose.countryId === country.countryId
      );
      if (this.filteredPurposesDeletePaper.length > 0) {
        this.selectedPurposeDeletePaper = this.filteredPurposesDeletePaper[0];
      } else {
        this.selectedPurposeDeletePaper = null;
      }
    } else {
      this.filteredPurposesDeletePaper = [];
    }
  }
  selectPurposePaperDelete(purpose: IPurpose) {
    this.selectedPurposeDeletePaper = purpose;
    this.paperDelete.purposeId = purpose?.purposeId;
    if (purpose) {
      this.filteredDeletePaper = this.papers.filter(
        (paper) => paper.purposeId === paper.purposeId
      );
      if (this.filteredDeletePaper.length > 0) {
        this.selectedDeletePaper = this.filteredDeletePaper[0];
      } else {
        this.selectedDeletePaper = null;
      }
    } else {
      this.filteredDeletePaper = [];
    }
  }
  selectPaperDelete(paper: IPaper) {
    this.selectedDeletePaper = paper;
    this.paperDelete.paperId = paper?.paperId;
  }
  selectCountryPaperEdit(country: ICountry) {
    this.selectedCountryEditPaper = country;
    this.paperEdit.countryId = country?.countryId;
    if (country) {
      this.filteredPurposesEditPaper = this.purposes.filter(
        (purpose) => purpose.countryId === country.countryId
      );
      if (this.filteredPurposesEditPaper.length > 0) {
        this.selectedPurposeEditPaper = this.filteredPurposesEditPaper[0];
      } else {
        this.selectedPurposeEditPaper = null;
      }
    } else {
      this.filteredPurposesEditPaper = [];
    }
  }
  selectPurposePaperEdit(purpose: IPurpose) {
    this.selectedPurposeEditPaper = purpose;
    this.paperEdit.purposeId = purpose?.purposeId;
    if (purpose) {
      this.filteredEditPaper = this.papers.filter(
        (paper) => paper.purposeId === paper.purposeId
      );
      if (this.filteredEditPaper.length > 0) {
        this.selectedEditPaper = this.filteredEditPaper[0];
        this.paperEdit.paperId = this.selectedEditPaper.paperId;
        this.paperEdit.paperName = this.selectedEditPaper.paperName;
        this.paperEdit.paperPlace = this.selectedEditPaper.paperPlace;
      } else {
        this.selectedEditPaper = null;
        this.paperEdit.paperId = 0;
        this.paperEdit.paperName = '';
        this.paperEdit.paperPlace = '';
      }
    } else {
      this.filteredEditPaper = [];
      this.paperEdit.paperId = 0;
      this.paperEdit.paperName = '';
      this.paperEdit.paperPlace = '';
    }
  }
  selectPaperEdit(paper: IPaper) {
    this.selectedEditPaper = paper;
    this.paperEdit = { ...paper };
  }
  selectCountryLinkAdd(country: ICountry) {
    this.selectedCountryAddLink = country;
    this.linkAdd.countryId = country?.countryId;
    if (country) {
      this.filteredPurposesAddLink = this.purposes.filter(
        (purpose) => purpose.countryId === country.countryId
      );
      if (this.filteredPurposesAddLink.length > 0) {
        this.selectedPurposeAddLink = this.filteredPurposesAddLink[0];
      } else {
        this.selectedPurposeAddLink = null;
      }
    } else {
      this.filteredPurposesAddLink = [];
    }
  }
  selectPurposeLinkAdd(purpose: IPurpose) {
    this.selectedPurposeAddLink = purpose;
    this.linkAdd.purposeId = purpose?.purposeId;
  }
  selectLinkDelete(link: ILinks) {
    this.selectedDeleteLink = link;
    this.linkDelete.linksId = link?.linksId;
  }
  selectCountryLinkEdit(country: ICountry) {
    this.selectedCountryEditLink = country;
    this.linkEdit.countryId = country?.countryId;
    if (country) {
      this.filteredPurposesEditLink = this.purposes.filter(
        (purpose) => purpose.countryId === country.countryId
      );
      this.filteredEditLink = this.links.filter(
        (link) => link.countryId === country.countryId
      );
      if (
        this.filteredPurposesEditLink.length > 0 &&
        this.filteredEditLink.length > 0
      ) {
        this.selectedPurposeEditLink = this.filteredPurposesEditLink[0];
        this.selectedEditLink = this.filteredEditLink[0];
        this.linkEdit.linksId = this.selectedEditLink.linksId;
        this.linkEdit.linksTitle = this.selectedEditLink.linksTitle;
        this.linkEdit.links = this.selectedEditLink.links;
      } else {
        this.selectedPurposeEditLink = null;
        this.selectedEditLink = null;
        this.linkEdit.linksTitle = '';
        this.linkEdit.links = '';
      }
    } else {
      this.filteredPurposesEditLink = [];
      this.filteredEditLink = [];
      this.linkEdit.linksTitle = '';
      this.linkEdit.links = '';
    }
  }
  selectPurposeLinkEdit(purpose: IPurpose) {
    this.selectedPurposeEditLink = purpose;
    this.linkEdit.purposeId = purpose?.purposeId;
    if (purpose) {
      this.filteredEditLink = this.links.filter(
        (link) => link.purposeId === purpose.purposeId
      );
      if (this.filteredEditLink.length > 0) {
        this.selectedEditLink = this.filteredEditLink[0];
        this.linkEdit.linksId = this.selectedEditLink.linksId;
        this.linkEdit.linksTitle = this.selectedEditLink.linksTitle;
        this.linkEdit.links = this.selectedEditLink.links;
      } else {
        this.linkEdit.linksTitle = '';
        this.linkEdit.links = '';
      }
    } else {
      this.filteredEditLink = [];
      this.linkEdit.linksTitle = '';
      this.linkEdit.links = '';
    }
  }

  selectLinkEdit(link: ILinks) {
    this.selectedEditLink = link;
    this.linkEdit = { ...link };
  }
}
