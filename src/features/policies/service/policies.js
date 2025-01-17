import { http } from "@src/features/api/api.js";

const createPolicy = async (params) => {
  try {
    const { data } = await http.post("/policies/create-policy", params);
    return data || null;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getPolicies = async (params) => {
  try {
    const { data } = await http.get("/policies/get-policies", { params });
    return data || null;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getPolicy = async (id) => {
  try {
    const { data } = await http.get("/policies/find-policy/" + id);
    return data || null;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getLatestPolicy = async () => {
  try {
    const { data } = await http.get("/policies/get-current-policy");
    return data || null;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getPolicyByPath = async (path) => {
  try {
    const { data } = await http.get("/policies/find-policy-path/" + path);
    return data || null;
  } catch (error) {
    return Promise.reject(error);
  }
};

const createPolicyVersion = async (params) => {
  try {
    const { data } = await http.post("/policies/create-policy-version", params);
    return data || null;
  } catch (error) {
    return Promise.reject(error);
  }
};

const updatePolicy = async (payload) => {
  const { params, policyId } = payload;
  try {
    const { data } = await http.put(
      `/policies/update-policy/${policyId}`,
      params
    );
    return data || null;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {
  createPolicy,
  updatePolicy,
  getPolicies,
  getPolicy,
  getPolicyByPath,
  getLatestPolicy,
  createPolicyVersion,
};
