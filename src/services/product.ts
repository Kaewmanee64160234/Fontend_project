import type Product from "@/store/types/product.type";
import http from "./axios";
function getProducts() {
  return http.get("/products");
}

function saveProduct(product: Product & { files: File[] }) {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("type", `${product.type}`);
    formData.append("size", `${product.size}`);
    formData.append("price", `${product.price}`);
    formData.append("file", product.files[0]);
    formData.append("catagoryId", `${product.catagoryId}`);
    return http.post("/products", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
}

async function updateProduct(id: number, product: Product & { files: File[] }) {
  const formData = new FormData();
  formData.append("name", product.name);
    formData.append("type", `${product.type}`);
    formData.append("size", `${product.size}`);
    formData.append("price", `${product.price}`);
    if(product.files) {
    formData.append("file", product.files[0]);
    }
  return await http.patch(`/products/${id}`, formData, {headers: {'Content-Type': 'multipart/form-data'}
  });
}

function deleteProduct(id: number) {
  return http.delete(`/products/${id}`);
}

export default { getProducts, saveProduct, updateProduct, deleteProduct };
