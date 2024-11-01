import { Pet } from "../tests/classes/pet";
import { Category } from "../tests/classes/category";
import { Tag } from "../tests/classes/tag";

import petData from "../data/petData.json";

export class PetDataHelper {

  public createPets(): Pet[] {
    const tenPets: Pet[] = new Array();

    petData.forEach( (petInfo) => {
      let pet: Pet = new Pet();

      pet.id = 0;
  
      let petCategory: Category = new Category();
      petCategory.id = 0;
      petCategory.name = petInfo.CategoryName;
      pet.category = petCategory;

      pet.name = petInfo.Name;

      pet.photoUrls = new Array(petInfo.PhotoUrls);
      
      let petTag: Tag = new Tag();
      petTag.id = 0;
      petTag.name = petInfo.TagName;
      pet.tags = new Array(petTag);

      pet.status = petInfo.Status;

      tenPets.push(pet);
    })

    return tenPets;
  }
}