import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    quantity: number;
    image: string;
    description: string;
}

interface ProductState {
    products: Product[];
    keyword: string;
    category: string;
    sortOrder: string;
}

const initialProducts: Product[] = [
    {
        id: 1,
        name: "iPhone 16 Pro Max",
        price: 34990000,
        category: "Điện thoại",
        quantity: 10,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop",
        description: "Điện thoại Apple iPhone 16 Pro Max 256GB Titanium",
    },
    {
        id: 2,
        name: "Samsung Galaxy S25 Ultra",
        price: 31990000,
        category: "Điện thoại",
        quantity: 15,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop",
        description: "Điện thoại Samsung Galaxy S25 Ultra AI 512GB",
    },
    {
        id: 3,
        name: "MacBook Air M3 15 inch",
        price: 32990000,
        category: "Laptop",
        quantity: 5,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop",
        description: "Laptop Apple MacBook Air M3 16GB RAM 512GB SSD",
    },
    {
        id: 4,
        name: "iPad Pro M4 11 inch",
        price: 28990000,
        category: "Máy tính bảng",
        quantity: 9,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop",
        description: "Máy tính bảng iPad Pro M4 Ultra Retina XDR",
    },
    {
        id: 5,
        name: "Sony WH-1000XM5",
        price: 7990000,
        category: "Tai nghe",
        quantity: 18,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop",
        description: "Tai nghe chụp tai Sony WH-1000XM5 chống ồn chủ động",
    },
];

const initialState: ProductState = {
    products: initialProducts,
    keyword: "",
    category: "Tất cả",
    sortOrder: "default",
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(p => p.id !== action.payload);
        },
        setKeyword: (state, action: PayloadAction<string>) => {
            state.keyword = action.payload;
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },
        setSortOrder: (state, action: PayloadAction<string>) => {
            state.sortOrder = action.payload;
        },
    },
});

export const {
    addProduct,
    updateProduct,
    deleteProduct,
    setKeyword,
    setCategory,
    setSortOrder,
} = productSlice.actions;

export default productSlice.reducer;