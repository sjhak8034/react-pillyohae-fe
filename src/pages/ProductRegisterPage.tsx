import React, { useState } from "react";
import { Camera, X } from "lucide-react";
import "tailwindcss";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import {
  registerProduct,
  ProductCreateRequest,
  ProductCreateResponse,
  uploadProductImages,
  craeteAiImage,
} from "../api/products";

type ImageFile = {
  file: File;
  preview: string;
};

const ProductRegisterPage = () => {
  const [productInfo, setProductInfo] = useState<ProductCreateRequest>({
    productName: "",
    companyName: "",
    price: 0,
    stock: 0,
    nutrientId: 1,
    categoryId: 1,
    description: "",
  });

  const nutrients = useSelector((state: RootState) => state.nutrient);
  const categories = useSelector((state: RootState) => state.category);

  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);

  // productInfo에서 필드별로 바뀐것을 감지하고 그 필드의 값을 변경해줌
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProductInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 이미지 서버에 저장하기전에 임시저장 + 화면에 띄워줌
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    // 최대 5장까지만 허용
    const newImages = files.slice(0, 5 - imageFiles.length);

    const newImageFiles = newImages.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImageFiles((prevImages) => [...prevImages, ...newImageFiles]);
  };

  const removeImage = (indexToRemove: number) => {
    setImageFiles((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = async () => {
    // 상품 등록 로직 (예: API 호출)
    const productCreateResponse: ProductCreateResponse = await registerProduct(
      productInfo
    );

    const productId = productCreateResponse.productId;
    // 이미지 파일 추가
    await uploadProductImages(productId, imageFiles);

    craeteAiImage(productId);

    console.log("상품 정보:", productCreateResponse);

    alert("상품이 등록되었습니다!");
    window.location.href = "/";
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">상품 등록</h2>
      <div>
        {/* 이미지 업로드 섹션 */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            {/* 이미지 미리보기 컨테이너 */}
            <div className="flex space-x-2">
              {imageFiles.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.preview}
                    alt={`상품 이미지 ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg border-2 border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* 이미지 업로드 버튼 (5장 제한) */}
            {imageFiles.length < 5 && (
              <div>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
                    <Camera className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">
                      {imageFiles.length}/5
                    </span>
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-gray-700 font-bold mb-2"
          >
            상품명
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={productInfo.productName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="companyName"
            className="block text-gray-700 font-bold mb-2"
          >
            제조 회사
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={productInfo.companyName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            가격
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productInfo.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            상품 설명
          </label>
          <textarea
            id="description"
            name="description"
            value={productInfo.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="nutrient"
            className="block text-gray-700 font-bold mb-2"
          >
            영양성분
          </label>
          <select
            id="nutrientId"
            name="nutrientId"
            value={productInfo.nutrientId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {nutrients.nutrient?.map((nutrient) => (
              <option key={nutrient.nutrientId} value={nutrient.nutrientId}>
                {nutrient.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="categoryId"
            className="block text-gray-700 font-bold mb-2"
          >
            카테고리
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={productInfo.categoryId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {categories.category?.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="stock" className="block text-gray-700 font-bold mb-2">
            재고 수량
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={productInfo.stock}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          상품 등록
        </button>
      </div>
    </div>
  );
};

export default ProductRegisterPage;
