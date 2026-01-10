import api from "./api";

export interface ShoppingList {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface CreateShoppingListData {
    name: string;
}

class ShoppingListService {
    async create(data: CreateShoppingListData) {
        return api.post<{shopping_list: ShoppingList, message: string}>('/add-shopping-list', data);
    }

    async getAll() {
        return api.get<{shopping_list: ShoppingList[]}>('/shopping-lists');
    }

    async getShoppingList(id: number) {
        return api.get<{shopping_list: ShoppingList}>(`/shopping-list/${id}`);
    }
}

export default new ShoppingListService;