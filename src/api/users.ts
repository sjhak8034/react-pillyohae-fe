import axios from "axios";
import api from "./auth";

// ShippingAddress.ts
export interface ShippingAddress {
  receiverName: string;
  phoneNumber: string;
  postCode: string;
  roadAddress: string;
  detailAddress: string;
}

export interface UserProfileResponseDto {
  userId: number;
  name: string;
  email: string;
  address: ShippingAddress;
  createdAt: Date; // or Date, depending on usage
  updatedAt: Date; // or Date
}

export const getUserProfile = async (): Promise<UserProfileResponseDto> => {
  const userProfileResponse = api.get("/users/profile");
  console.log((await userProfileResponse).data);
  return (await userProfileResponse).data;
};
