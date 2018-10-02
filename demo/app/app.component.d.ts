import { OnInit } from '@angular/core';
export declare class AppComponent implements OnInit {
    name: string;
    middle: string;
    last: string;
    countryOptions: Country[];
    selectedCountry: Country;
    disselectedCountry: Country;
    emptyselectedCountry: string;
    textArea: string;
    distextArea: string;
    emptyTextArea: string;
    langOptions: Language[];
    selectedLang: string[];
    disselectedLang: string[];
    genderOptions: Gender[];
    selectedGender: string;
    emptySelectedGender: string;
    checkboxValue: boolean;
    checkedboxValue: boolean;
    emptycheckedboxValue: boolean;
    tags: string[];
    distags: string[];
    emptytags: string[];
    defaultdatesample: Date;
    disdatesample: Date;
    emptydatesample: Date;
    timeSample: Date;
    distimeSample: Date;
    emptytimeSample: Date;
    states: string[];
    countries: Country[];
    selectedTypeahead: Country;
    disselectedTypeahead: Country;
    emptyselectedTypeahead: Country;
    numbers: number;
    disnumbers: number;
    renumber: number;
    defaultdatetime: Date;
    disdatetime: Date;
    reqdatetime: Date;
    constructor();
    ngOnInit(): void;
    sampleClick(): void;
}
export declare class Gender {
    constructor(short: string, long: string);
    shortName: string;
    longName: string;
}
export declare class Language {
    constructor(short: string, long: string);
    shortName: string;
    longName: string;
}
export declare class Country {
    constructor(short: string, long: string);
    shortName: string;
    longName: string;
}
