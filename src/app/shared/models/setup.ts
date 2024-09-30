export class Setup {
    constructor(
      public id: string,
      public id_users: string,
      public name: string,
      public description: string,
      public weatherConditions: weatherConditions,
    ) {}
  }

enum weatherConditions{
    wet, 
    mixed,
    dry,
}