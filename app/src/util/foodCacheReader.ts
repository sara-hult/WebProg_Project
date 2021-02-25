import { cuisineResult } from './cuisineResult';
import { Dish } from './dish';
import { Countries } from './countries';
import recipeBulk from '../app/APICache/recipebulk';
import americanInfo from '../app/APICache/americanInfo';

//import info from '../app/APICache/americanInfo'

interface infoResult{
    result:Dish[]
  }

export class FoodCacheReader{
  private basePath:string = "../app/APICache/";
  private callback:Function = ()=>{};

  private ids:number[];
  private dishes: Dish[];

  constructor(cuisine:Countries, callback?: Function){ // Call back kan eventuellt tas bort senare eftersom import() inte används
    if(callback){
      this.callback = callback;
    }

    this.ids = [];
    this.dishes = [];

    this.generateInfo(cuisine);
    // Använder if för att förhindra datafel
    /* if(this.generateInfoPath(cuisine) && this.generateBulkPath(cuisine)){
      this.generateInfo(couisine);
    } */
  }
  generateInfo(cuisine: Countries) {
    let info:cuisineResult[] = [];
    switch(cuisine){
      case Countries.USA:
        info = americanInfo;
        break;
      case Countries.Italy:
        //info = italianInfo;
        break;
      case Countries.Scotland:
        //info = scottishInfo;
        break;
      default:
        throw new Error ("Food for "+ cuisine +" not implemented")
    }
    this.generateIDs(info, (ids:number[]) =>{
          this.generateDishes(ids, ()=>{
            this.callback(this);
          })
        });
  }

  generateDishes(ids: number[], callback: Function = () => {}) {
    this.dishes = recipeBulk.filter((recipe) => ids.includes(recipe.id));
    callback()
  }
  generateIDs(info: cuisineResult[], callback:Function = ()=>{}) {
    let ids:number[] = []
    info.map((result) => ids.push(result.id))
    this.ids = ids;
    callback(ids);
  }


 /*  generateInfo(cuisine:Countries) {
    import("../app/APICache/americanInfo").then((res) =>{
      this.generateIds(res.default.results, cuisine);
    })
  }

  generateIds(res: cuisineResult[], cuisine:Countries): void{
    let ids:number[] = []
    res.map((result) => ids.push(result.id))
    this.ids = ids;
    this.generateDishes(cuisine, ids)
  }

  generateDishes(cuisine:Countries, ids: number[]): void {
    import("../app/APICache/"+cuisine+"Bulk").then((res) =>{ // Fungerar inte på grund av variabel i sökväg!
      console.log(res);
      this.callback();
    })
  } */

 /*  generateInfoPath(cuisine: Countries):boolean{
    this.infoPath = cuisine + "Info";
    return true;
  }
  generateBulkPath(cuisine: Countries):boolean {
    this.bulkPath = cuisine+"Bulk";
    return true;
  } */

  getIds():number[]{
    return this.ids;
  }

  getDishes():Dish[]{
    return this.dishes;
  }

}
