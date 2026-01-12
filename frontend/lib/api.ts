import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000',
});

export const fetchNavigation = async () => {
    const { data } = await api.get('/navigation');
    return data;
};

export const fetchCategories = async (navId: number) => {
    const { data } = await api.get(`/categories/${navId}`);
    return data;
};

export const fetchProducts = async (categoryId?: number, page = 1) => {
    const params = { categoryId, page, limit: 20 };
    const { data } = await api.get('/products', { params });
    return data;
};

export const fetchProduct = async (id: number) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
};

export const triggerScrape = async () => {
    const { data } = await api.post('/refresh');
    return data;
};
