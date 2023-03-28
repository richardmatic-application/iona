import http from "./index";

const getCatBreeds = async () => {
  return await http.get("/breeds");
};

interface getCatsByBreedType {
  id: string;
  page: number;
}

const getCatsByBreed = async ({ id, page }: getCatsByBreedType) => {
  return await http.get(`/images/search?page=${page}&limit=10&breed_id=${id}`);
};

const catService = {
  getCatBreeds,
  getCatsByBreed,
};

export default catService;
