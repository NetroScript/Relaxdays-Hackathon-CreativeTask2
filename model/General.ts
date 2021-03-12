export enum Anlass {
  'Sonstiges' = 'Sonstiges',
  'Geburtstag' = 'Geburtstag',
  'Weihnachten' = 'Weihnachten',
  'Promotion' = 'Promotion',
  'Hochzeit' = 'Hochzeit',
  'Schulabschluss' = 'Schulabschluss',
  'Valentinstag' = 'Valentinstag',
  'Muttertag' = 'Muttertag',
  'Zwischendurch' = 'Zwischendurch',
  'Jubilaeum' = 'Jubiläum',
  'Ostern' = 'Ostern',
  'Geburt' = 'Geburt',
  'Jahrestag' = 'Jahrestag',
  'Schulanfang' = 'Schulanfang',
  'Konfirmation' = 'Konfirmation',
  'Fuehrerschein' = 'Führerschein',
}

export enum Empfaenger {
  Baby = 'Baby',
  Kleinkind = 'Kleinkind',
  Jugendlicher = 'Jugendlicher',
  JungerErwachsener = '20-29',
  Erwachsener = '30-44',
  Erwachsener45 = '45-59',
  Erwachsener60 = '60-X',
}

export enum EmpfaengerVerfeinerung {
  Maennlich = 'Männlich',
  Weiblich = 'Weiblich',
}

export enum Verhaeltnis {
  Freund = 'Freund',
  Paar = 'Paar',
  Bekannter = 'Bekannter',
  Schwager = 'Schwager',
  Mutter = 'Mutter',
  Vater = 'Vater',
  Eltern = 'Eltern',
  Großeltern = 'Großeltern',
}

interface Attribute {
  romantisch: number
  edel: number
  nuetzlich: number
  lustig: number
  besonders: number
}

export interface Geschenk {
  name: string
  internalID: string
  details: string
  vorschauBilder: string[]
  anlass: Anlass[]
  preis: number | null
  schwierigkeit?: number
  empfaengerAlter?: Empfaenger
  verfeinerung?: EmpfaengerVerfeinerung
  verhaeltnis?: Verhaeltnis
  beliebtheit: number
  anzahlBewertungen: number
  attribute: Attribute
  tags: string[]
}
