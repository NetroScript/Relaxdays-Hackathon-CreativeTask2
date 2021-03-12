export enum Anlass {
  'Sonstiges',
  'Geburtstag',
  'Weihnachten',
  'Promotion',
  'Hochzeit',
  'Schulabschluss',
  'Valentinstag',
  'Muttertag',
  'Zwischendurch',
  'Jubiläum',
  'Ostern',
  'Geburt',
  'Jahrestag',
}

export enum Empfaenger {
  Baby,
  Kleinkind,
  Jugendlicher,
  JungerErwachsener,
  Erwachsener,
  Erwachsener45,
  Erwachsener60,
}

export enum EmpfaengerVerfeinerung {
  Maennlich,
  Weiblich,
}

export enum Verhaeltnis {
  Freund,
  Paar,
  Bekannter,
  Schwager,
  Mutter,
  Vater,
  Eltern,
  Großeltern,
}

export interface Geschenk {
  name: string
  internalID: string
  details: string
  vorschauBild: string
  anlass: Anlass
  preis: number | null
  schwierigkeit?: number
  empfaenger?: Empfaenger
  verfeinerung?: EmpfaengerVerfeinerung
  verhaeltnis?: Verhaeltnis
  beliebtheit: number
  anzahlBewertungen: number
  tags: string[]
}
