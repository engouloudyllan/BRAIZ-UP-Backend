import * as Yup from "yup";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../models/index.js";

export const getByIdShippingZoneSchema = Yup.object({
  id: Yup.string().required(),
});

export const createShippingZoneSchema = Yup.object({
  name: Yup.string().required().label("Name"),
  description: Yup.string().label("Description"),
  fee: Yup.number().required().label("Fee"),
  districtId: Yup.string()
    .required()
    .test(
      "verifiedExistingDistrict",
      `The district with this ID doesn't exist`,
      async (value) => {
        if (!value) return false;
        const data = await prisma.district.findUnique({
          where: { id: +value },
        });
        return !!data;
      },
    ),
  neighborhoodId: Yup.string().test(
    "verifiedExistingNeighborhood",
    `The neighborhood with this ID doesn't exist`,
    async (value) => {
      if (!value) return false;
      const data = await prisma.neighborhood.findUnique({
        where: { id: +value },
      });
      return !!data;
    },
  ),
});

export const updateShippingZoneSchema = Yup.object({
  id: Yup.string().required(),
  name: Yup.string().required().label("Name"),
  description: Yup.string().label("Description"),
  fee: Yup.number().required().label("Fee"),
  districtId: Yup.string()
    .required()
    .test(
      "verifiedExistingDistrict",
      `The district with this ID doesn't exist`,
      async (value) => {
        if (!value) return false;
        const data = await prisma.district.findUnique({
          where: { id: +value },
        });
        return !!data;
      },
    ),
  neighborhoodId: Yup.string().test(
    "verifiedExistingNeighborhood",
    `The neighborhood with this ID doesn't exist`,
    async (value) => {
      if (!value) return false;
      const data = await prisma.neighborhood.findUnique({
        where: { id: +value },
      });
      return !!data;
    },
  ),
});

export const deleteShippingZoneSchema = Yup.object({
  id: Yup.string().required(),
});
