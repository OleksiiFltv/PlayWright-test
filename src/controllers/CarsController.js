export default class CarsController {
  #GET_CARS_BRANDS_PATH = "/api/cars/brands";
  #GET_CARS_BRAND_BY_ID_PATH = (id) => `/api/cars/brands/${id}`;
  #GET_CARS_MODELS_PATH = "/api/cars/models";
  #GET_CARS_MODEL_BY_ID_PATH = (id) => `/api/cars/models/${id}`;
  #GET_CARS_PATH = "/api/cars";
  #CREATE_CAR_PATH = "/api/cars";
  #GET_CAR_BY_ID_PATH = (id) => `/api/cars/${id}`;
  #PUT_CAR_BY_ID_PATH = (id) => `/api/cars/${id}`;
  #DELETE_CAR_PATH = (id) => `/api/cars/${id}`;

  constructor(request) {
    this._request = request;
  }

  async getCarsBrands() {
    console.log("get all car brands");
    return this._request.get(this.#GET_CARS_BRANDS_PATH);
  }

  async getCarsBrandByID(id) {
    console.log("get car brand by id");
    return this._request.get(this.#GET_CARS_BRAND_BY_ID_PATH(id));
  }

  async getCarsModels() {
    console.log("get all car models");
    return this._request.get(this.#GET_CARS_MODELS_PATH);
  }

  async getCarsModelByID(id) {
    console.log("get car model by id");
    return this._request.get(this.#GET_CARS_MODEL_BY_ID_PATH(id));
  }

  async getCars() {
    console.log("Get all user's cars");
    return this._request.get(this.#GET_CARS_PATH);
  }

  async createCar() {
    console.log("Create car with data: ", requestBody);
    return this._request.post(this.#CREATE_CAR_PATH, { data: requestBody });
  }

  async getCurrentUserCarByID(id) {
    console.log("Get current user car by id");
    return this._request.get(this.#GET_CAR_BY_ID_PATH(id));
  }

  async updateCar(id, requestBody) {
    console.log("Upadate car with data: ", requestBody);
    return this._request.put(this.#PUT_CAR_BY_ID_PATH(id), {
      data: requestBody,
    });
  }

  async deleteCar(id) {
    console.log(`Delete car bt id: ${id}`);
    return this._request.delete(this.#DELETE_CAR_PATH(id));
  }
}
