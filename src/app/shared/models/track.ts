export class Track {
  constructor(
    public id: string,
    public user: string,
    public name: string,
    public description: string,
    public image: string,
    public website: string,
    public created: Date,
    public updated: Date,
  ) {}
}

export class New_Track {
  constructor(
    public id: string,
    public user: string,
    public name: string,
    public description: string,
    public image: FormData = new FormData(),
    public website: string,
    public created: Date,
    public updated: Date,
  ) {}
}
