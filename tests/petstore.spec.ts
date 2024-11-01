import { expect, test } from "@playwright/test";
import * as apiHelper from "../helpers/apiHelper";
import { Pet } from "./classes/pet";

import { PetDataHelper } from "../helpers/petDataHelper";
import { Order } from "./classes/order";

test.describe("petstore", () => {

  test("should create ten pets and get the sold one", async ({ request }) => {

    // Parte 1
    // Crear 10 mascotas:
    // 5 en estado available, 4 en estado pending y 1 en estado sold.

    let petDataHelper: PetDataHelper = new PetDataHelper();
    let createPetsList: Pet[] = petDataHelper.createPets();
    let createdPets: Pet[] = new Array();

    let responses = new Array();

    // create 10 pets
    for (let index = 0; index < 10; index++) {
      let onePet = createPetsList[index];
      let response = await apiHelper.createPet(request, onePet);
      responses.push(response);
    }

    // assertions for 10 created pets
    for (let index = 0; index < 10; index++) {
      let response = await responses[index];
      let pet = await responses[index].json();

      expect(response.status()).toBe(200);

      expect(pet.id).toBeGreaterThan(0);
      expect(pet.name).toEqual(createPetsList[index].name);
      expect(pet.photoUrls).toEqual(createPetsList[index].photoUrls);
      expect(pet.status).toEqual(createPetsList[index].status);
      expect(pet.tags).toEqual(createPetsList[index].tags);
      expect(pet.category).toEqual(createPetsList[index].category);
    
      createdPets.push(pet);
    }

    // Parte 1 (Continuación)
    // Obtener los detalles de la mascota en estado sold.

    let petStatus = "sold";
    let response = await apiHelper.getPetByStatus(request, petStatus);

    let pets = await response.json();

    let soldPetResponse = pets.find(pet => pet.id === createdPets[createdPets.length - 1].id);
    let soldPetIndex = createPetsList.findIndex(soldPet => soldPet.status === petStatus);
    
    // assertions for sold pet
    expect(response.status()).toBe(200);

    expect(soldPetResponse.id).toBeGreaterThan(0);
    expect(soldPetResponse.name).toEqual(createPetsList[soldPetIndex!].name);
    expect(soldPetResponse.photoUrls).toEqual(createPetsList[soldPetIndex!].photoUrls);
    expect(soldPetResponse.status).toEqual(createPetsList[soldPetIndex!].status);
    expect(soldPetResponse.tags).toEqual(createPetsList[soldPetIndex!].tags);
    expect(soldPetResponse.category).toEqual(createPetsList[soldPetIndex!].category);
  });

  test("should list available pets and create an order for each one", async ({ request }) => {
  
  // Parte 2
  // Listar mascotas disponibles y guardar 5 de ellas en una estructura de datos.

    let petStatus = "available";
    let petByStatusResponse = await apiHelper.getPetByStatus(request, petStatus);

    let availableStatusPets = await petByStatusResponse.json();

    // assertions for available pets
    expect(petByStatusResponse.status()).toBe(200);
    expect(availableStatusPets.length).toBeGreaterThan(0);

    // get five available pets to create orders
    let orderPets = availableStatusPets.slice(0, 5);

    // Parte 2 (Continuación)
    // Crear una orden para cada una de las 5 mascotas obtenidas en el punto anterior.

    let orderRequests = new Array();
    let orderResponses = new Array();
    let orderDate = new Date().toISOString();
    let orderStatus: string = "placed";

    for (let index = 0; index < 5; index++) {
       let order: Order = new Order();

       order.id = 0;
       order.petId = orderPets[index].id;
       order.quantity = 1;
       order.shipDate = orderDate;
       order.status = orderStatus;
       order.complete = true;

       orderRequests.push(order);

       let orderResponse = await apiHelper.createOrder(request, order);
       orderResponses.push(orderResponse);
    }

    // assertions for created orders
    for (let index = 0; index < 5; index++) {
      let response = await orderResponses[index];
      let order = await orderResponses[index].json();

      expect(response.status()).toBe(200);

      let orderShipDate = new Date(order.shipDate);
      let requestShipDate = new Date(order.shipDate);

      expect(order.id).toBeGreaterThan(0);
      expect(order.petId).toEqual(orderRequests[index].petId);
      expect(order.quantity).toEqual(orderRequests[index].quantity);
      expect(orderShipDate).toEqual(requestShipDate);
      expect(order.status).toEqual(orderRequests[index].status);
      expect(order.complete).toEqual(orderRequests[index].complete);
    }
  });

});
