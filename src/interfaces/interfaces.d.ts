/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IResponse<T = undefined> {
  data?: T;
  message?: string;
  status?: number;
}

export interface IDoctor {
  name: string;
  specialty: string;
}
export interface IPatient {
  name: string;
  age: string;
  email: string;
  phone: string;
}

export interface IChatMessage {
  role: "user" | "assistant";
  content: string;
}
