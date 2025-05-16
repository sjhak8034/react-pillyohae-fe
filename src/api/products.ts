import api from "./auth";
const baseURL = import.meta.env.VITE_API_URL;
export interface Product {
  productId: number;
  productName: string;
  companyName: string;
  category: string;
  price: number;
  status: string;
  stock: number;
  thumbnailImage: string | null;
  personaMessages: string[];
}

export interface ProductResponse {
  content: Product[];
  totalElements: number;
  totalPages: number;
  // 생략 가능: pageable, sort 등
}

export interface Category {
  categoryId: number;
  name: string;
}

export interface Nutrient {
  nutrientId: number;
  name: string;
  description: string;
}

export interface ProductCreateResponse {
  productId: number;
  productName: string;
  category: string;
  description: string;
  companyName: string;
  price: number;
  status: string;
  stock: number;
  nutrientName: string;
  personaMessages: string[];
}

export interface ProductCreateRequest {
  productName: string;
  companyName: string;
  price: number;
  stock: number;
  nutrientId: number;
  categoryId: number;
  description: string;
}

export const registerProduct = async (
  request: ProductCreateRequest
): Promise<ProductCreateResponse> => {
  const response = await api.post<ProductCreateResponse>(
    baseURL + "/products",
    request
  );
  return response.data;
};

type ImageFile = {
  file: File;
  preview: string;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>(baseURL + "/products/categories");
  return response.data;
};

export const getNutrients = async (): Promise<Nutrient[]> => {
  const response = await api.get<Nutrient[]>(baseURL + "/products/nutrients");
  return response.data;
};

export const getProducts = async (): Promise<ProductResponse> => {
  const response = await api.get<ProductResponse>(baseURL + "/products/search");
  return response.data;
};

export const uploadProductImages = async (
  productId: number,
  images: ImageFile[]
) => {
  for (const imageFile of images) {
    const formData = new FormData();
    formData.append("image", imageFile.file);

    // 하나씩 순서대로 업로드 (position 보장)
    await api.post(`/products/${productId}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
};

// AI이미지 생성 및 S3 업로드
export const craeteAiImage = async (productId: number) => {
  await api.post(`/products/${productId}/ai-image`);
};
