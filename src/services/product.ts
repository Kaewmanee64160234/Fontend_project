import type Product from "@/store/types/product.type";
import http from "./axios";
function getProducts(params:any) {
  return http.get("/products",{params:params});
}

function getProductByCatagory(id: string){
  return http.get("/products/catagory/" + id);
}

async function saveProduct(product: Product & { files: File[] }) {
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

const findProductByName = (name: string) => {
  return http.get(`/products/search/name/${name}`);
}
const getAllProductNotPageinate = () => {
  return http.get(`/reports/products`);
}


export default { getAllProductNotPageinate,findProductByName,getProducts, saveProduct, updateProduct, deleteProduct, getProductByCatagory };
