import * as Yup from "yup";

export const getByIdCategorySchema = Yup.object({
  id: Yup.string().required(),
});

export const createCategorySchema = Yup.object({
  name: Yup.string().required().label("Name"),
  description: Yup.string().label("Description"),
  image: Yup.mixed()
    .test("required", "The image is required", (value) => {
      if (value) {
        return true;
      } else {
        return false;
      }
    })
    .test("fileFormat", "Format incorrect", (value) => {
      if (value && typeof (value as any).mimetype === "string") {
        return ["image/jpeg", "image/png", "image/webp"].includes(
          (value as any).mimetype,
        );
      }
      return false;
    })
    .label("Image"),
});

export const updateCategorySchema = Yup.object({
  id: Yup.string().required(),
  name: Yup.string().required().label("Name"),
  description: Yup.string().label("Description"),
  image: Yup.mixed()
    .optional()
    .test("fileFormat", "Format incorrect", (value) => {
      if (value && typeof (value as any).mimetype === "string") {
        return ["image/jpeg", "image/png", "image/webp"].includes(
          (value as any).mimetype,
        );
      }
      return false;
    })
    .label("Image"),
});

export const deleteCategorySchema = Yup.object({
  id: Yup.string().required(),
});
