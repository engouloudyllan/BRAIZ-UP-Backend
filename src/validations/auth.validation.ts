import * as Yup from "yup";

export const registerSchema = Yup.object({
  firstName: Yup.string().optional(),
  lastName: Yup.string().optional(),
  email: Yup.string().email().required(),
  username: Yup.string().required(),
  phone: Yup.string().optional(),
  password: Yup.string()
    .required("Le mot de passe est requis")
    .min(6, "Le mot de passe doit contenir au moins 8 caractères")
    .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .matches(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
    .matches(/\d/, "Le mot de passe doit contenir au moins un chiffre")
    .matches(
      /[@$!%*?&#^+=]/,
      "Le mot de passe doit contenir au moins un caractère spécial",
    ),
  profile: Yup.mixed()
    .test(
      "fileType",
      "Only .jpg, .jpeg, and .png files are accepted.",
      (file: any) => {
        if (!file) return true;
        const allowed = ["image/jpeg", "image/jpg", "image/png"];
        return allowed.includes(file.mimetype);
      },
    )
    .test("fileSize", `The image must be less than 5 MB.`, (file: any) => {
      if (!file) return true;
      return file.size <= 5 * 1024 * 1024;
    })
    .optional(),
});
