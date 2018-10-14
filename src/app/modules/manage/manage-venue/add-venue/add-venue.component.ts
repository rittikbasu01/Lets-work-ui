import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import {Venue} from '../../../../models/venue.model';
import { HTTPRequestService } from "../../../../services/httprequest.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { IndianState } from "src/app/models/indian-states";
import { startWith } from "rxjs/operators";
import { map } from "rxjs/internal/operators/map";
import { SharedDialogBoxComponent } from "../../../../shared/shared-dialog-box/shared-dialog-box.component";
import { MatDialog } from "@angular/material/dialog";
import { LogoutService } from "../../../../shared/logout.service";
@Component({
  selector: 'app-add-venue',
  templateUrl: './add-venue.component.html',
  styleUrls: ['./add-venue.component.css']
})
export class AddVenueComponent implements OnInit {
  title = 'AddVenuePage';
  AddVenueForm:FormGroup;
  roomTypes = ['Meeting Room', 'Board Room', 'Conference Room'];
  acTypes = ['Central', 'Split', 'Window', 'None'];
  formData : FormData ;
  venueCity : FormControl;
  filterCities : Observable<Array<string>>;
  fileCount : number = 0;
  previewImages : string[];
  //spin
  spin : boolean = false;
  public indianStates : Array<IndianState> = new Array<IndianState>();
  public indianCititesByStateList : Array<string> = new Array<string>();
  public MAX_FILE_SIZE_BYTES : number = 5242880;
  fileCountStatus : boolean = true;
  
  validContactNumberStatus : boolean = false; 
     constructor(private fb:FormBuilder,private httpClient : HttpClient,private httpservice:HTTPRequestService, private router : Router, public dialog : MatDialog, private logoutSvc : LogoutService) {
      this.formData = new  FormData();
      this.venueCity = new FormControl('', [Validators.required]);
      
   }
   private filterCity(value: string): string[] {
    
    return this.indianCititesByStateList.filter(x => x.toLowerCase().indexOf(value.toLowerCase()) > -1);
  }
  checkNumber()
  {
    let arr = this.GetContactNumber.value.toString().match(/^[0-9]+$/);  
    if(arr && this.GetContactNumber.value.length === 10)
    {
        let token : string = localStorage.getItem('access_token');
        let header: HttpHeaders = new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
        this.httpservice.get(`/api/v1/Venue/duplicate-venue-contact-number/${this.GetContactNumber.value}`,header).subscribe((data : any) =>{
            if(data)
            {
                if(data.message === 'true')
                {
                  this.validContactNumberStatus = true;
                  this.dialog.open(SharedDialogBoxComponent, {
                    data :{
                        value : `Contact Number is available for registration`
                    }
                });
                } 
                else
                {
                    this.dialog.open(SharedDialogBoxComponent, {
                        data :{
                            value : `Contact number already registered`
                        }
                    });
                    
                    this.validContactNumberStatus = false;
                }   
            }
        }, error => {
            
            if(error.staus === 401)
            {
                this.dialog.open(SharedDialogBoxComponent, {
                    data : {
                        value : `Session timed Out. Login again`
                    }
                })   
            }
            else
            {
                this.dialog.open(SharedDialogBoxComponent, {
                    data : {
                        value : `Re-enter the Contact Number`
                    }
                })   
            }
    
        });    
    }
    
  }
  loadCities(selectedState : string) 
  {
    
     this.indianCititesByStateList =  this.indianStates.filter(x => x.StateName === selectedState)[0].Cities;
     this.filterCities = this.venueCity.valueChanges.pipe(startWith(''), map(x => x ? this.filterCity(x) : this.indianCititesByStateList.slice()));
     if(this.VenueState.valid)
        {
            this.venueCity.enable();
        }
        else
        {
            this.venueCity.disable();
        }
  }
  ngOnInit() {
    
    
    let stateCityMapping : string = `[
      {
          "State": "Andaman and Nicobar Islands",
          "Cities": [
              "Port Blair"
          ]
      },
      {
          "State": "Andhra Pradesh",
          "Cities": [
              "Adoni",
              "Amalapuram",
              "Anakapalle",
              "Anantapur",
              "Bapatla",
              "Bheemunipatnam",
              "Bhimavaram",
              "Bobbili",
              "Chilakaluripet",
              "Chirala",
              "Chittoor",
              "Dharmavaram",
              "Eluru",
              "Gooty",
              "Gudivada",
              "Gudur",
              "Guntakal",
              "Guntur",
              "Hindupur",
              "Jaggaiahpet",
              "Jammalamadugu",
              "Kadapa",
              "Kadiri",
              "Kakinada",
              "Kandukur",
              "Kavali",
              "Kovvur",
              "Kurnool",
              "Macherla",
              "Machilipatnam",
              "Madanapalle",
              "Mandapeta",
              "Markapur",
              "Nagari",
              "Naidupet",
              "Nandyal",
              "Narasapuram",
              "Narasaraopet",
              "Narsipatnam",
              "Nellore",
              "Nidadavole",
              "Nuzvid",
              "Ongole",
              "Palacole",
              "Palasa Kasibugga",
              "Parvathipuram",
              "Pedana",
              "Peddapuram",
              "Pithapuram",
              "Ponnur",
              "Proddatur",
              "Punganur",
              "Puttur",
              "Rajahmundry",
              "Rajam",
              "Rajampet",
              "Ramachandrapuram",
              "Rayachoti",
              "Rayadurg",
              "Renigunta",
              "Repalle",
              "Salur",
              "Samalkot",
              "Sattenapalle",
              "Srikakulam",
              "Srikalahasti",
              "Srisailam Project (Right Flank Colony) Township",
              "Sullurpeta",
              "Tadepalligudem",
              "Tadpatri",
              "Tanuku",
              "Tenali",
              "Tirupati",
              "Tiruvuru",
              "Tuni",
              "Uravakonda",
              "Venkatagiri",
              "Vijayawada",
              "Vinukonda",
              "Visakhapatnam",
              "Vizianagaram",
              "Yemmiganur",
              "Yerraguntla"
          ]
      },
      {
          "State": "Arunachal Pradesh",
          "Cities": [
              "Naharlagun",
              "Pasighat"
          ]
      },
      {
          "State": "Assam",
          "Cities": [
              "Barpeta",
              "Bongaigaon City",
              "Dhubri",
              "Dibrugarh",
              "Diphu",
              "Goalpara",
              "Guwahati",
              "Jorhat",
              "Karimganj",
              "Lanka",
              "Lumding",
              "Mangaldoi",
              "Mankachar",
              "Margherita",
              "Mariani",
              "Marigaon",
              "Nagaon",
              "Nalbari",
              "North Lakhimpur",
              "Rangia",
              "Sibsagar",
              "Silapathar",
              "Silchar",
              "Tezpur",
              "Tinsukia"
          ]
      },
      {
          "State": "Bihar",
          "Cities": [
              "Araria",
              "Arrah",
              "Arwal",
              "Asarganj",
              "Aurangabad",
              "Bagaha",
              "Barh",
              "Begusarai",
              "Bettiah",
              "Bhabua",
              "Bhagalpur",
              "Buxar",
              "Chhapra",
              "Darbhanga",
              "Dehri-on-Sone",
              "Dumraon",
              "Forbesganj",
              "Gaya",
              "Gopalganj",
              "Hajipur",
              "Jamalpur",
              "Jamui",
              "Jehanabad",
              "Katihar",
              "Kishanganj",
              "Lakhisarai",
              "Lalganj",
              "Madhepura",
              "Madhubani",
              "Maharajganj",
              "Mahnar Bazar",
              "Makhdumpur",
              "Maner",
              "Manihari",
              "Marhaura",
              "Masaurhi",
              "Mirganj",
              "Mokameh",
              "Motihari",
              "Motipur",
              "Munger",
              "Murliganj",
              "Muzaffarpur",
              "Narkatiaganj",
              "Naugachhia",
              "Nawada",
              "Nokha",
              "Patna*",
              "Piro",
              "Purnia",
              "Rafiganj",
              "Rajgir",
              "Ramnagar",
              "Raxaul Bazar",
              "Revelganj",
              "Rosera",
              "Saharsa",
              "Samastipur",
              "Sasaram",
              "Sheikhpura",
              "Sheohar",
              "Sherghati",
              "Silao",
              "Sitamarhi",
              "Siwan",
              "Sonepur",
              "Sugauli",
              "Sultanganj",
              "Supaul",
              "Warisaliganj"
          ]
      },
      {
          "State": "Chandigarh",
          "Cities": [
              "Chandigarh"
          ]
      },
      {
          "State": "Chhattisgarh",
          "Cities": [
              "Ambikapur",
              "Bhatapara",
              "Bhilai Nagar",
              "Bilaspur",
              "Chirmiri",
              "Dalli-Rajhara",
              "Dhamtari",
              "Durg",
              "Jagdalpur",
              "Korba",
              "Mahasamund",
              "Manendragarh",
              "Mungeli",
              "Naila Janjgir",
              "Raigarh",
              "Raipur*",
              "Rajnandgaon",
              "Sakti",
              "Tilda Newra"
          ]
      },
      {
          "State": "Dadra and Nagar Haveli",
          "Cities": [
              "Silvassa"
          ]
      },
      {
          "State": "Delhi",
          "Cities": [
              "Delhi",
              "New Delhi"
          ]
      },
      {
          "State": "Goa",
          "Cities": [
              "Mapusa",
              "Margao",
              "Marmagao",
              "Panaji"
          ]
      },
      {
          "State": "Gujarat",
          "Cities": [
              "Adalaj",
              "Ahmedabad",
              "Amreli",
              "Anand",
              "Anjar",
              "Ankleshwar",
              "Bharuch",
              "Bhavnagar",
              "Bhuj",
              "Chhapra",
              "Deesa",
              "Dhoraji",
              "Godhra",
              "Jamnagar",
              "Kadi",
              "Kapadvanj",
              "Keshod",
              "Khambhat",
              "Lathi",
              "Limbdi",
              "Lunawada",
              "Mahesana",
              "Mahuva",
              "Manavadar",
              "Mandvi",
              "Mangrol",
              "Mansa",
              "Mahemdabad",
              "Modasa",
              "Morvi",
              "Nadiad",
              "Navsari",
              "Padra",
              "Palanpur",
              "Palitana",
              "Pardi",
              "Patan",
              "Petlad",
              "Porbandar",
              "Radhanpur",
              "Rajkot",
              "Rajpipla",
              "Rajula",
              "Ranavav",
              "Rapar",
              "Salaya",
              "Sanand",
              "Savarkundla",
              "Sidhpur",
              "Sihor",
              "Songadh",
              "Surat",
              "Talaja",
              "Thangadh",
              "Tharad",
              "Umbergaon",
              "Umreth",
              "Una",
              "Unjha",
              "Upleta",
              "Vadnagar",
              "Vadodara",
              "Valsad",
              "Vapi",
              "Vapi",
              "Veraval",
              "Vijapur",
              "Viramgam",
              "Visnagar",
              "Vyara",
              "Wadhwan",
              "Wankaner"
          ]
      },
      {
          "State": "Haryana",
          "Cities": [
              "Bahadurgarh",
              "Bhiwani",
              "Charkhi Dadri",
              "Faridabad",
              "Fatehabad",
              "Gohana",
              "Gurgaon",
              "Hansi",
              "Hisar",
              "Jind",
              "Kaithal",
              "Karnal",
              "Ladwa",
              "Mahendragarh",
              "Mandi Dabwali",
              "Narnaul",
              "Narwana",
              "Palwal",
              "Panchkula",
              "Panipat",
              "Pehowa",
              "Pinjore",
              "Rania",
              "Ratia",
              "Rewari",
              "Rohtak",
              "Safidon",
              "Samalkha",
              "Sarsod",
              "Shahbad",
              "Sirsa",
              "Sohna",
              "Sonipat",
              "Taraori",
              "Thanesar",
              "Tohana",
              "Yamunanagar"
          ]
      },
      {
          "State": "Himachal Pradesh",
          "Cities": [
              "Mandi",
              "Nahan",
              "Palampur",
              "Shimla",
              "Solan",
              "Sundarnagar"
          ]
      },
      {
          "State": "Jammu and Kashmir",
          "Cities": [
              "Anantnag",
              "Baramula",
              "Jammu",
              "Kathua",
              "Punch",
              "Rajauri",
              "Sopore",
              "Srinagar",
              "Udhampur"
          ]
      },
      {
          "State": "Jharkhand",
          "Cities": [
              "Adityapur",
              "Bokaro Steel City",
              "Chaibasa",
              "Chatra",
              "Chirkunda",
              "Medininagar (Daltonganj)",
              "Deoghar",
              "Dhanbad",
              "Dumka",
              "Giridih",
              "Gumia",
              "Hazaribag",
              "Jamshedpur",
              "Jhumri Tilaiya",
              "Lohardaga",
              "Madhupur",
              "Mihijam",
              "Musabani",
              "Pakaur",
              "Patratu",
              "Phusro",
              "Ramgarh",
              "Ranchi",
              "Sahibganj",
              "Saunda",
              "Simdega",
              "Tenu dam-cum-Kathhara"
          ]
      },
      {
          "State": "Karnataka",
          "Cities": [
              "Adyar",
              "Afzalpur",
              "Arsikere",
              "Athni",
              "Bengaluru",
              "Belagavi",
              "Ballari",
              "Chikkamagaluru",
              "Davanagere",
              "Gokak",
              "Hubli-Dharwad",
              "Karwar",
              "Kolar",
              "Lakshmeshwar",
              "Lingsugur",
              "Maddur",
              "Madhugiri",
              "Madikeri",
              "Magadi",
              "Mahalingapura",
              "Malavalli",
              "Malur",
              "Mandya",
              "Mangaluru",
              "Manvi",
              "Mudalagi",
              "Mudabidri",
              "Muddebihal",
              "Mudhol",
              "Mulbagal",
              "Mundargi",
              "Nanjangud",
              "Nargund",
              "Navalgund",
              "Nelamangala",
              "Pavagada",
              "Piriyapatna",
              "Puttur",
              "Rabkavi Banhatti",
              "Raayachuru",
              "Ranebennuru",
              "Ramanagaram",
              "Ramdurg",
              "Ranibennur",
              "Robertson Pet",
              "Ron",
              "Sadalagi",
              "Sagara",
              "Sakaleshapura",
              "Sindagi",
              "Sanduru",
              "Sankeshwara",
              "Saundatti-Yellamma",
              "Savanur",
              "Sedam",
              "Shahabad",
              "Shahpur",
              "Shiggaon",
              "Shikaripur",
              "Shivamogga",
              "Surapura",
              "Shrirangapattana",
              "Sidlaghatta",
              "Sindhagi",
              "Sindhnur",
              "Sira",
              "Sirsi",
              "Siruguppa",
              "Srinivaspur",
              "Tarikere",
              "Tekkalakote",
              "Terdal",
              "Talikota",
              "Tiptur",
              "Tumkur",
              "Udupi",
              "Vijayapura",
              "Wadi",
              "Yadgir",
              "Mysore"
          ]
      },
      {
          "State": "Kerala",
          "Cities": [
              "Adoor",
              "Alappuzha",
              "Attingal",
              "Chalakudy",
              "Changanassery",
              "Cherthala",
              "Chittur-Thathamangalam",
              "Guruvayoor",
              "Kanhangad",
              "Kannur",
              "Kasaragod",
              "Kayamkulam",
              "Kochi",
              "Kodungallur",
              "Kollam",
              "Kottayam",
              "Kozhikode",
              "Kunnamkulam",
              "Malappuram",
              "Mattannur",
              "Mavelikkara",
              "Mavoor",
              "Muvattupuzha",
              "Nedumangad",
              "Neyyattinkara",
              "Nilambur",
              "Ottappalam",
              "Palai",
              "Palakkad",
              "Panamattom",
              "Panniyannur",
              "Pappinisseri",
              "Paravoor",
              "Pathanamthitta",
              "Peringathur",
              "Perinthalmanna",
              "Perumbavoor",
              "Ponnani",
              "Punalur",
              "Puthuppally",
              "Koyilandy",
              "Shoranur",
              "Taliparamba",
              "Thiruvalla",
              "Thiruvananthapuram",
              "Thodupuzha",
              "Thrissur",
              "Tirur",
              "Vaikom",
              "Varkala",
              "Vatakara"
          ]
      },
      {
          "State": "Madhya Pradesh",
          "Cities": [
              "Alirajpur",
              "Ashok Nagar",
              "Balaghat",
              "Bhopal",
              "Ganjbasoda",
              "Gwalior",
              "Indore",
              "Itarsi",
              "Jabalpur",
              "Lahar",
              "Maharajpur",
              "Mahidpur",
              "Maihar",
              "Malaj Khand",
              "Manasa",
              "Manawar",
              "Mandideep",
              "Mandla",
              "Mandsaur",
              "Mauganj",
              "Mhow Cantonment",
              "Mhowgaon",
              "Morena",
              "Multai",
              "Mundi",
              "Murwara (Katni)",
              "Nagda",
              "Nainpur",
              "Narsinghgarh",
              "Narsinghgarh",
              "Neemuch",
              "Nepanagar",
              "Niwari",
              "Nowgong",
              "Nowrozabad (Khodargama)",
              "Pachore",
              "Pali",
              "Panagar",
              "Pandhurna",
              "Panna",
              "Pasan",
              "Pipariya",
              "Pithampur",
              "Porsa",
              "Prithvipur",
              "Raghogarh-Vijaypur",
              "Rahatgarh",
              "Raisen",
              "Rajgarh",
              "Ratlam",
              "Rau",
              "Rehli",
              "Rewa",
              "Sabalgarh",
              "Sagar",
              "Sanawad",
              "Sarangpur",
              "Sarni",
              "Satna",
              "Sausar",
              "Sehore",
              "Sendhwa",
              "Seoni",
              "Seoni-Malwa",
              "Shahdol",
              "Shajapur",
              "Shamgarh",
              "Sheopur",
              "Shivpuri",
              "Shujalpur",
              "Sidhi",
              "Sihora",
              "Singrauli",
              "Sironj",
              "Sohagpur",
              "Tarana",
              "Tikamgarh",
              "Ujjain",
              "Umaria",
              "Vidisha",
              "Vijaypur",
              "Wara Seoni"
          ]
      },
      {
          "State": "Maharashtra",
          "Cities": [
              "Ahmednagar",
              "Akola",
              "Akot",
              "Amalner",
              "Ambejogai",
              "Amravati",
              "Anjangaon",
              "Arvi",
              "Aurangabad",
              "Bhiwandi",
              "Dhule",
              "Kalyan-Dombivali",
              "Ichalkaranji",
              "Kalyan-Dombivali",
              "Karjat",
              "Latur",
              "Loha",
              "Lonar",
              "Lonavla",
              "Mahad",
              "Malegaon",
              "Malkapur",
              "Mangalvedhe",
              "Mangrulpir",
              "Manjlegaon",
              "Manmad",
              "Manwath",
              "Mehkar",
              "Mhaswad",
              "Mira-Bhayandar",
              "Morshi",
              "Mukhed",
              "Mul",
              "Mumbai",
              "Murtijapur",
              "Nagpur",
              "Nanded-Waghala",
              "Nandgaon",
              "Nandura",
              "Nandurbar",
              "Narkhed",
              "Nashik",
              "Navi Mumbai",
              "Nawapur",
              "Nilanga",
              "Osmanabad",
              "Ozar",
              "Pachora",
              "Paithan",
              "Palghar",
              "Pandharkaoda",
              "Pandharpur",
              "Panvel",
              "Parbhani",
              "Parli",
              "Partur",
              "Pathardi",
              "Pathri",
              "Patur",
              "Pauni",
              "Pen",
              "Phaltan",
              "Pulgaon",
              "Pune",
              "Purna",
              "Pusad",
              "Rahuri",
              "Rajura",
              "Ramtek",
              "Ratnagiri",
              "Raver",
              "Risod",
              "Sailu",
              "Sangamner",
              "Sangli",
              "Sangole",
              "Sasvad",
              "Satana",
              "Satara",
              "Savner",
              "Sawantwadi",
              "Shahade",
              "Shegaon",
              "Shendurjana",
              "Shirdi",
              "Shirpur-Warwade",
              "Shirur",
              "Shrigonda",
              "Shrirampur",
              "Sillod",
              "Sinnar",
              "Solapur",
              "Soyagaon",
              "Talegaon Dabhade",
              "Talode",
              "Tasgaon",
              "Thane",
              "Tirora",
              "Tuljapur",
              "Tumsar",
              "Uchgaon",
              "Udgir",
              "Umarga",
              "Umarkhed",
              "Umred",
              "Uran",
              "Uran Islampur",
              "Vadgaon Kasba",
              "Vaijapur",
              "Vasai-Virar",
              "Vita",
              "Wadgaon Road",
              "Wai",
              "Wani",
              "Wardha",
              "Warora",
              "Warud",
              "Washim",
              "Yavatmal",
              "Yawal",
              "Yevla"
          ]
      },
      {
          "State": "Manipur",
          "Cities": [
              "Imphal",
              "Lilong",
              "Mayang Imphal",
              "Thoubal"
          ]
      },
      {
          "State": "Meghalaya",
          "Cities": [
              "Nongstoin",
              "Shillong",
              "Tura"
          ]
      },
      {
          "State": "Mizoram",
          "Cities": [
              "Aizawl",
              "Lunglei",
              "Saiha"
          ]
      },
      {
          "State": "Nagaland",
          "Cities": [
              "Dimapur",
              "Kohima",
              "Mokokchung",
              "Tuensang",
              "Wokha",
              "Zunheboto"
          ]
      },
      {
          "State": "Odisha",
          "Cities": [
              "Balangir",
              "Baleshwar Town",
              "Barbil",
              "Bargarh",
              "Baripada Town",
              "Bhadrak",
              "Bhawanipatna",
              "Bhubaneswar",
              "Brahmapur",
              "Byasanagar",
              "Cuttack",
              "Dhenkanal",
              "Jatani",
              "Jharsuguda",
              "Kendrapara",
              "Kendujhar",
              "Malkangiri",
              "Nabarangapur",
              "Paradip",
              "Parlakhemundi",
              "Pattamundai",
              "Phulabani",
              "Puri",
              "Rairangpur",
              "Rajagangapur",
              "Raurkela",
              "Rayagada",
              "Sambalpur",
              "Soro",
              "Sunabeda",
              "Sundargarh",
              "Talcher",
              "Tarbha",
              "Titlagarh"
          ]
      },
      {
          "State": "Puducherry",
          "Cities": [
              "Karaikal",
              "Mahe",
              "Pondicherry",
              "Yanam"
          ]
      },
      {
          "State": "Punjab",
          "Cities": [
              "Amritsar",
              "Barnala",
              "Batala",
              "Bathinda",
              "Dhuri",
              "Faridkot",
              "Fazilka",
              "Firozpur",
              "Firozpur Cantt.",
              "Gobindgarh",
              "Gurdaspur",
              "Hoshiarpur",
              "Jagraon",
              "Jalandhar Cantt.",
              "Jalandhar",
              "Kapurthala",
              "Khanna",
              "Kharar",
              "Kot Kapura",
              "Longowal",
              "Ludhiana",
              "Malerkotla",
              "Malout",
              "Mansa",
              "Moga",
              "Mohali",
              "Morinda, India",
              "Mukerian",
              "Muktsar",
              "Nabha",
              "Nakodar",
              "Nangal",
              "Nawanshahr",
              "Pathankot",
              "Patiala",
              "Pattran",
              "Patti",
              "Phagwara",
              "Phillaur",
              "Qadian",
              "Raikot",
              "Rajpura",
              "Rampura Phul",
              "Rupnagar",
              "Samana",
              "Sangrur",
              "Sirhind Fatehgarh Sahib",
              "Sujanpur",
              "Sunam",
              "Talwara",
              "Tarn Taran",
              "Urmar Tanda",
              "Zira",
              "Zirakpur"
          ]
      },
      {
          "State": "Rajasthan",
          "Cities": [
              "Ajmer",
              "Alwar",
              "Bikaner",
              "Bharatpur",
              "Bhilwara",
              "Jaipur",
              "Jodhpur",
              "Lachhmangarh",
              "Ladnu",
              "Lakheri",
              "Lalsot",
              "Losal",
              "Makrana",
              "Malpura",
              "Mandalgarh",
              "Mandawa",
              "Mangrol",
              "Merta City",
              "Mount Abu",
              "Nadbai",
              "Nagar",
              "Nagaur",
              "Nasirabad",
              "Nathdwara",
              "Neem-Ka-Thana",
              "Nimbahera",
              "Nohar",
              "Nokha",
              "Pali",
              "Phalodi",
              "Phulera",
              "Pilani",
              "Pilibanga",
              "Pindwara",
              "Pipar City",
              "Prantij",
              "Pratapgarh",
              "Raisinghnagar",
              "Rajakhera",
              "Rajaldesar",
              "Rajgarh (Alwar)",
              "Rajgarh (Churu)",
              "Rajsamand",
              "Ramganj Mandi",
              "Ramngarh",
              "Ratangarh",
              "Rawatbhata",
              "Rawatsar",
              "Reengus",
              "Sadri",
              "Sadulshahar",
              "Sadulpur",
              "Sagwara",
              "Sambhar",
              "Sanchore",
              "Sangaria",
              "Sardarshahar",
              "Sawai Madhopur",
              "Shahpura",
              "Shahpura",
              "Sheoganj",
              "Sikar",
              "Sirohi",
              "Sojat",
              "Sri Madhopur",
              "Sujangarh",
              "Sumerpur",
              "Suratgarh",
              "Taranagar",
              "Todabhim",
              "Todaraisingh",
              "Tonk",
              "Udaipur",
              "Udaipurwati",
              "Vijainagar, Ajmer"
          ]
      },
      {
          "State": "Tamil Nadu",
          "Cities": [
              "Arakkonam",
              "Aruppukkottai",
              "Chennai",
              "Coimbatore",
              "Erode",
              "Gobichettipalayam",
              "Kancheepuram",
              "Karur",
              "Lalgudi",
              "Madurai",
              "Manachanallur",
              "Nagapattinam",
              "Nagercoil",
              "Namagiripettai",
              "Namakkal",
              "Nandivaram-Guduvancheri",
              "Nanjikottai",
              "Natham",
              "Nellikuppam",
              "Neyveli (TS)",
              "O' Valley",
              "Oddanchatram",
              "P.N.Patti",
              "Pacode",
              "Padmanabhapuram",
              "Palani",
              "Palladam",
              "Pallapatti",
              "Pallikonda",
              "Panagudi",
              "Panruti",
              "Paramakudi",
              "Parangipettai",
              "Pattukkottai",
              "Perambalur",
              "Peravurani",
              "Periyakulam",
              "Periyasemur",
              "Pernampattu",
              "Pollachi",
              "Polur",
              "Ponneri",
              "Pudukkottai",
              "Pudupattinam",
              "Puliyankudi",
              "Punjaipugalur",
              "Ranipet",
              "Rajapalayam",
              "Ramanathapuram",
              "Rameshwaram",
              "Rasipuram",
              "Salem",
              "Sankarankoil",
              "Sankari",
              "Sathyamangalam",
              "Sattur",
              "Shenkottai",
              "Sholavandan",
              "Sholingur",
              "Sirkali",
              "Sivaganga",
              "Sivagiri",
              "Sivakasi",
              "Srivilliputhur",
              "Surandai",
              "Suriyampalayam",
              "Tenkasi",
              "Thammampatti",
              "Thanjavur",
              "Tharamangalam",
              "Tharangambadi",
              "Theni Allinagaram",
              "Thirumangalam",
              "Thirupuvanam",
              "Thiruthuraipoondi",
              "Thiruvallur",
              "Thiruvarur",
              "Thuraiyur",
              "Tindivanam",
              "Tiruchendur",
              "Tiruchengode",
              "Tiruchirappalli",
              "Tirukalukundram",
              "Tirukkoyilur",
              "Tirunelveli",
              "Tirupathur",
              "Tirupathur",
              "Tiruppur",
              "Tiruttani",
              "Tiruvannamalai",
              "Tiruvethipuram",
              "Tittakudi",
              "Udhagamandalam",
              "Udumalaipettai",
              "Unnamalaikadai",
              "Usilampatti",
              "Uthamapalayam",
              "Uthiramerur",
              "Vadakkuvalliyur",
              "Vadalur",
              "Vadipatti",
              "Valparai",
              "Vandavasi",
              "Vaniyambadi",
              "Vedaranyam",
              "Vellakoil",
              "Vellore",
              "Vikramasingapuram",
              "Viluppuram",
              "Virudhachalam",
              "Virudhunagar",
              "Viswanatham"
          ]
      },
      {
          "State": "Telangana",
          "Cities": [
              "Adilabad",
              "Bellampalle",
              "Bhadrachalam",
              "Bhainsa",
              "Bhongir",
              "Bodhan",
              "Farooqnagar",
              "Gadwal",
              "Hyderabad",
              "Jagtial",
              "Jangaon",
              "Kagaznagar",
              "Kamareddy",
              "Karimnagar",
              "Khammam",
              "Koratla",
              "Kothagudem",
              "Kyathampalle",
              "Mahbubnagar",
              "Mancherial",
              "Mandamarri",
              "Manuguru",
              "Medak",
              "Miryalaguda",
              "Nagarkurnool",
              "Narayanpet",
              "Nirmal",
              "Nizamabad",
              "Palwancha",
              "Ramagundam",
              "Sadasivpet",
              "Sangareddy",
              "Siddipet",
              "Sircilla",
              "Suryapet",
              "Tandur",
              "Vikarabad",
              "Wanaparthy",
              "Warangal",
              "Yellandu"
          ]
      },
      {
          "State": "Tripura",
          "Cities": [
              "Agartala",
              "Belonia",
              "Dharmanagar",
              "Kailasahar",
              "Khowai",
              "Pratapgarh",
              "Udaipur"
          ]
      },
      {
          "State": "Uttar Pradesh",
          "Cities": [
              "Achhnera",
              "Agra",
              "Aligarh",
              "Allahabad",
              "Amroha",
              "Azamgarh",
              "Bahraich",
              "Chandausi",
              "Etawah",
              "Firozabad",
              "Fatehpur Sikri",
              "Hapur",
              "Hardoi",
              "Jhansi",
              "Kalpi",
              "Kanpur",
              "Khair",
              "Laharpur",
              "Lakhimpur",
              "Lal Gopalganj Nindaura",
              "Lalitpur",
              "Lalganj",
              "Lar",
              "Loni",
              "Lucknow",
              "Mathura",
              "Meerut",
              "Modinagar",
              "Moradabad",
              "Nagina",
              "Najibabad",
              "Nakur",
              "Nanpara",
              "Naraura",
              "Naugawan Sadat",
              "Nautanwa",
              "Nawabganj",
              "Nehtaur",
              "Niwai",
              "Noida",
              "Noorpur",
              "Obra",
              "Orai",
              "Padrauna",
              "Palia Kalan",
              "Parasi",
              "Phulpur",
              "Pihani",
              "Pilibhit",
              "Pilkhuwa",
              "Powayan",
              "Pukhrayan",
              "Puranpur",
              "Purquazi",
              "Purwa",
              "Rae Bareli",
              "Rampur",
              "Rampur Maniharan",
              "Rasra",
              "Rath",
              "Renukoot",
              "Reoti",
              "Robertsganj",
              "Rudauli",
              "Rudrapur",
              "Sadabad",
              "Safipur",
              "Saharanpur",
              "Sahaspur",
              "Sahaswan",
              "Sahawar",
              "Sahjanwa",
              "Saidpur",
              "Sambhal",
              "Samdhan",
              "Samthar",
              "Sandi",
              "Sandila",
              "Sardhana",
              "Seohara",
              "Shahabad, Hardoi",
              "Shahabad, Rampur",
              "Shahganj",
              "Shahjahanpur",
              "Shamli",
              "Shamsabad, Agra",
              "Shamsabad, Farrukhabad",
              "Sherkot",
              "Shikarpur, Bulandshahr",
              "Shikohabad",
              "Shishgarh",
              "Siana",
              "Sikanderpur",
              "Sikandra Rao",
              "Sikandrabad",
              "Sirsaganj",
              "Sirsi",
              "Sitapur",
              "Soron",
              "Suar",
              "Sultanpur",
              "Sumerpur",
              "Tanda",
              "Thakurdwara",
              "Thana Bhawan",
              "Tilhar",
              "Tirwaganj",
              "Tulsipur",
              "Tundla",
              "Ujhani",
              "Unnao",
              "Utraula",
              "Varanasi",
              "Vrindavan",
              "Warhapur",
              "Zaidpur",
              "Zamania"
          ]
      },
      {
          "State": "Uttarakhand",
          "Cities": [
              "Bageshwar",
              "Dehradun",
              "Haldwani-cum-Kathgodam",
              "Hardwar",
              "Kashipur",
              "Manglaur",
              "Mussoorie",
              "Nagla",
              "Nainital",
              "Pauri",
              "Pithoragarh",
              "Ramnagar",
              "Rishikesh",
              "Roorkee",
              "Rudrapur",
              "Sitarganj",
              "Srinagar",
              "Tehri"
          ]
      },
      {
          "State": "West Bengal",
          "Cities": [
              "Adra",
              "Alipurduar",
              "Arambagh",
              "Asansol",
              "Baharampur",
              "Balurghat",
              "Bankura",
              "Darjiling",
              "English Bazar",
              "Gangarampur",
              "Habra",
              "Hugli-Chinsurah",
              "Jalpaiguri",
              "Jhargram",
              "Kalimpong",
              "Kharagpur",
              "Kolkata",
              "Mainaguri",
              "Malda",
              "Mathabhanga",
              "Medinipur",
              "Memari",
              "Monoharpur",
              "Murshidabad",
              "Nabadwip",
              "Naihati",
              "Panchla",
              "Pandua",
              "Paschim Punropara",
              "Purulia",
              "Raghunathpur",
              "Raghunathganj",
              "Raiganj",
              "Rampurhat",
              "Ranaghat",
              "Sainthia",
              "Santipur",
              "Siliguri",
              "Sonamukhi",
              "Srirampore",
              "Suri",
              "Taki",
              "Tamluk",
              "Tarakeswar"
          ]
      }
    ]`;
  
    this.indianStates = JSON.parse(stateCityMapping)
                            .map(x => ({StateName: x.State,
                               Cities: x.Cities 
                              }));

   
    this.createForm();
  }
  
  generateHttpHeaders() : HttpHeaders
  {
    let token : string = "";
    if(localStorage.getItem('access_token'))
    {
      token = localStorage.getItem('access_token');
    }
   
    return new HttpHeaders().set('Authorization',`Bearer ${token}`).set('Access-Control-Allow-Origin','*');
  }
  public createForm()
  {
    this.AddVenueForm=this.fb.group({
      VenueName: new FormControl('',[Validators.required]),
      VenueCity: this.venueCity,
      VenueState:new FormControl('', [Validators.required]),
      NumberOfProjectors: new FormControl('',[Validators.required, Validators.min(0)]),
      SeatCapacity: new FormControl('', [Validators.required, Validators.min(0)]),
      RoomType: new FormControl('', [Validators.required]),
      NumberOfMicroPhones: new FormControl('', [Validators.required, Validators.min(0)]),
      NumberOfPhones : new FormControl('',[Validators.required, Validators.min(0)]),
      Description : new FormControl('',[Validators.required]),
      HourlyRate : new FormControl('',[Validators.required, Validators.min(0)]),
      AirConditioningType: new FormControl('', [Validators.required]),
      IsFoodVendingMachineAvailable: new FormControl(false),
      IsWaterVendingMachineAvailable: new FormControl(false),
      IsCoffeeVendingMachineAvailable: new FormControl(false),
      WirelessNetworkType: new FormControl('', [Validators.required]),
      ContactNumber : new FormControl('', [Validators.required,Validators.min(1),Validators.minLength(10), Validators.maxLength(10)])     
    })
    if(this.VenueState.valid)
        {
            this.venueCity.enable();
        }
        else
        {
            this.venueCity.disable();
        }
  }
  
  // Getters
  get VenueName() : FormControl
  {
    return this.AddVenueForm.get('VenueName') as FormControl;
  }
  get VenueCity() : FormControl
  {
    return this.AddVenueForm.get('VenueCity') as FormControl;
  }
  get VenueState() : FormControl
  {
    return this.AddVenueForm.get('VenueState') as FormControl;
  }
  get NumberOfProjectors() : FormControl
  {
    return this.AddVenueForm.get('NumberOfProjectors') as FormControl;
  }
  get Description() : FormControl
  {
    return this.AddVenueForm.get('Description') as FormControl;
  }
  get NumberOfPhones () : FormControl
  {
    return this.AddVenueForm.get('NumberOfPhones') as FormControl;
  }
  get SeatCapacity() : FormControl
  {
    return this.AddVenueForm.get('SeatCapacity') as FormControl;
  }
  get RoomType() : FormControl
  {
    return this.AddVenueForm.get('RoomType') as FormControl;
  }
  get NumberOfMicroPhones() : FormControl
  {
    return this.AddVenueForm.get('NumberOfMicroPhones') as FormControl;
  }
  get AirConditioningType() : FormControl
  {
    return this.AddVenueForm.get('AirConditioningType') as FormControl;
  }
  get IsFoodVendingMachineAvailable() : FormControl
  {
    return this.AddVenueForm.get('IsFoodVendingMachineAvailable') as FormControl;
  }
  get IsWaterVendingMachineAvailable() : FormControl
  {
    return this.AddVenueForm.get('IsWaterVendingMachineAvailable') as FormControl;
  }
  get IsCoffeeVendingMachineAvailable() : FormControl
  {
    return this.AddVenueForm.get('IsWaterVendingMachineAvailable') as FormControl;
  }
  get WirelessNetworkType() : FormControl
  {
    return this.AddVenueForm.get('IsWaterVendingMachineAvailable') as FormControl;
  }
  get HourlyRate() : FormControl
  {
    return this.AddVenueForm.get('HourlyRate') as FormControl;
  }
  get GetContactNumber() : FormControl
  {
    return this.AddVenueForm.get('ContactNumber') as FormControl;
  }
  spinOn()
  {
      this.spin = true;
  }
  spinOff()
  {
      this.spin = false;
  }
  // File Submit
  OnFileUpload(Files : File[], event)
  {
      
        //Guard clause for checking empty files
    if (Files.length === 0)
        return;
    this.formData=new FormData();
    this.previewImages=new Array(); 
    if(Files.length > 0 && Files.length < 5)
    {
        this.fileCount = Files.length;
        event.preventDefault();
        this.fileCountStatus = true;
      

        for  (let  file  of  Files) {
            if  (file.size  <=  this.MAX_FILE_SIZE_BYTES)
                this.formData.append(file.name, file);
            let  fileReader = new  FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload =  (event: any)  => {
                this.previewImages.push(event.target.result);
            }
        } 
    }
    else
    {
        this.fileCount = 0;
        this.fileCountStatus = false;
        this.dialog.open(SharedDialogBoxComponent, {
            data : {
                value : `File count limit exceeded. Limit to 5 files`
            }
        })
           
    }
  }
 
  // Form Submit
  OnSubmit()
  {      
    let venue = new Venue(this.AddVenueForm.value);
    let res : string = JSON.stringify(venue);
    this.formData.set('formValue', res);
    let token: string = localStorage.getItem('access_token');
    this.spinOn();
    let header: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    
    this.httpservice.post("/api/v1/Venue",res, header).subscribe(data=>
    {
      this.spinOff();
      this.dialog.open(SharedDialogBoxComponent, {
          data : {
              value : 'Successfully added the venue!'
          }
      });
      this.router.navigate(['/manage/venue']);
    },
    error=>{
        this.spinOff();
        if(error.status === 401)
            {
              this.dialog.open(SharedDialogBoxComponent, {
                data : {
                  value : `Session Timed Out. Please login again`
                }
              });
              this.logoutSvc.logout();
            }
        else
            {
                this.dialog.open(SharedDialogBoxComponent, {
                    data : {
                        value : 'Failed to add the venue'
                    }
                });
            }
      
    });

  }

}
