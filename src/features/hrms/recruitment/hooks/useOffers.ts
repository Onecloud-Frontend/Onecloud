import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOffers,
  getOfferById,
  createOffer,
  updateOffer,
} from "../services/offerService";
//import type { Offer } from "../types/offer.types";

const OFFERS_QUERY_KEY = ["hrms", "recruitment", "offers"];

export const useOffers = () => {
  const queryClient = useQueryClient();

  const offersQuery = useQuery({
    queryKey: OFFERS_QUERY_KEY,
    queryFn: getOffers,
  });

  const createOfferMutation = useMutation({
    mutationFn: createOffer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: OFFERS_QUERY_KEY,
      });
    },
  });

  const updateOfferMutation = useMutation({
    mutationFn: updateOffer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: OFFERS_QUERY_KEY,
      });
    },
  });

  return {
    offers: offersQuery.data ?? [],
    isLoading: offersQuery.isLoading,
    isError: offersQuery.isError,

    createOffer: createOfferMutation.mutateAsync,
    isCreating: createOfferMutation.isPending,

    updateOffer: updateOfferMutation.mutateAsync,
    isUpdating: updateOfferMutation.isPending,
  };
};

export const useOffer = (id: string) => {
  return useQuery({
    queryKey: [...OFFERS_QUERY_KEY, id],
    queryFn: () => getOfferById(id),
    enabled: Boolean(id),
  });
};