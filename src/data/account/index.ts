export type EmailVerificationStatus = "unspecified" | "verified";
export type Gender = "male" | "female" | "other";

export type Account = {
  id: string;
  email: string;
  emailVerificationStatus: EmailVerificationStatus;
  firstName: string;
  lastName: string;
  firstNameKana: string;
  lastNameKana: string;
  gender: Gender;
  birthday: string;
  avatarUrl: string;
};
