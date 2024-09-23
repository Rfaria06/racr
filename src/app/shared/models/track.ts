export class Track {
    constructor(
      public id: string,
      public id_users: string,
      public name: string,
      public description: string,
      public image: string,
      public website: URL,
      public created: Date,
      public updated: Date,
    ) {}
  }

  export class New_Track {
    constructor(
      public id: string,
      public id_users: string,
      public name: string,
      public description: string,
      public image: FormData = new FormData(),
      public website: URL,
      public created: Date,
      public updated: Date,
    ) {}
  }