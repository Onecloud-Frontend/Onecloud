import type { Offer } from "../types/offer.types";
import { offersMock } from "../mocks/offers.mock";

export const getOffers = async (): Promise<Offer[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return offersMock;
};

export const getOfferById = async (id: string): Promise<Offer | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return offersMock.find((offer) => offer.id === id);
};

export const createOffer = async (offer: Offer): Promise<Offer> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  offersMock.push(offer);

  return offer;
};

export const updateOffer = async (updatedOffer: Offer): Promise<Offer> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const index = offersMock.findIndex(
    (offer) => offer.id === updatedOffer.id,
  );

  if (index === -1) {
    throw new Error("Offer not found");
  }

  offersMock[index] = updatedOffer;

  return updatedOffer;
};