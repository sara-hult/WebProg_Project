import { Dish } from './dish';
export function trim(dish:Object){
  let finished: Dish;
  finished = {
    title: "",
    readyInMinutes: -1,
    spoonacularScore: -1,
    pricePerServing: -1,
    image: "",
    id: -1
  }
  Object.entries(dish).forEach(
  ([key, value]) => {
    switch(key){
      case "title":
        finished.title = value;
        break;
      case "readyInMinutes":
        finished.readyInMinutes = value;
        break;
      case "spoonacularScore":
        finished.spoonacularScore = value;
        break;
      case "pricePerServing":
        finished.pricePerServing = value;
        break;
      case "image":
        finished.image = value;
        break;
    }
  }
);
return finished
}
