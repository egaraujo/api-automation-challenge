import { Order } from "../tests/classes/order";
import { Pet } from "../tests/classes/pet"

import playwrightConfig from '../playwright.config';
let baseURL = playwrightConfig.use?.baseURL;

export const createPet = async (request: any, pet: Pet) => {
    return await request.post(`${baseURL!}/pet`, {
        data: {
            "id": 0,
            "category": {
              "id": 0,
              "name": pet.category.name
            },
            "name": pet.name,
            "photoUrls": [
              pet.photoUrls[0]
            ],
            "tags": [
              {
                "id": 0,
                "name": pet.tags[0].name
              }
            ],
            "status": pet.status
          }
    });
}

export const getPetByStatus = async (request: any, petStatus: string) => {
  return await request.get(`${baseURL}/pet/findByStatus/?status=${petStatus}`, {
  });
}

export const createOrder = async (request: any, order: Order) => {
  return await request.post(`${baseURL}/store/order` , {
    data : {
      "id": order.id,
      "petId": order.petId,
      "quantity": order.quantity,
      "shipDate": order.shipDate,
      "status": order.status,
      "complete": order.complete
    }
 })
}
