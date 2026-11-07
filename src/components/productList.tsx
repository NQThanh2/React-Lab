import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Sử dụng 'import type' tách biệt riêng cho RootState và Product
import type { RootState } from "../store/store.ts";
import type { Product } from "../store/productSlice.ts";

import {
    addProduct,
    updateProduct,
    deleteProduct,
    setKeyword,
    setCategory,
    setSortOrder,
} from "../store/productSlice.ts";

const formatPrice = (price: number): string => {
    return price.toLocaleString("vi-VN") + " ₫";
};

const ProductList: React.FC = () => {
    const dispatch = useDispatch();

    const { products, keyword, category, sortOrder } = useSelector(
        (state: RootState) => state.productState
    );

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const emptyProduct: Product = {
        id: 0,
        name: "",
        price: 0,
        category: "Điện thoại",
        quantity: 0,
        image: "",
        description: "",
    };

    const [formData, setFormData] = useState<Product>(emptyProduct);

    let filteredProducts = products.filter((product) => {
        const matchKeyword =
            product.name.toLowerCase().includes(keyword.toLowerCase()) ||
            product.description.toLowerCase().includes(keyword.toLowerCase());

        const matchCategory =
            category === "Tất cả" || product.category === category;

        return matchKeyword && matchCategory;
    });

    if (sortOrder === "asc") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    }

    const handleAdd = () => {
        setEditingId(null);
        setFormData({
            ...emptyProduct,
            id: Date.now(),
        });
        setShowForm(true);
    };

    const handleEdit = (product: Product) => {
        setEditingId(product.id);
        setFormData({ ...product });
        setShowForm(true);
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name.trim() || formData.price <= 0 || formData.quantity < 0) {
            alert("Vui lòng nhập thông tin sản phẩm hợp lệ!");
            return;
        }

        if (editingId !== null) {
            dispatch(updateProduct(formData));
        } else {
            dispatch(addProduct({ ...formData, id: Date.now() }));
        }

        setShowForm(false);
        setFormData(emptyProduct);
        setEditingId(null);
    };

    const handleDelete = (id: number) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
        if (confirmed) {
            dispatch(deleteProduct(id));
        }
    };

    return (
        <div style={styles.container}>
            <h1>Quản lý sản phẩm</h1>

            <div style={styles.toolbar}>
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={keyword}
                    onChange={(e) => dispatch(setKeyword(e.target.value))}
                    style={styles.input}
                />

                <select
                    value={category}
                    onChange={(e) => dispatch(setCategory(e.target.value))}
                    style={styles.input}
                >
                    <option value="Tất cả">Tất cả danh mục</option>
                    <option value="Điện thoại">Điện thoại</option>
                    <option value="Laptop">Laptop</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => dispatch(setSortOrder(e.target.value))}
                    style={styles.input}
                >
                    <option value="default">Mặc định</option>
                    <option value="asc">Giá tăng dần</option>
                    <option value="desc">Giá giảm dần</option>
                </select>

                <button onClick={handleAdd} style={styles.addButton}>
                    + Thêm sản phẩm
                </button>
            </div>

            <p>
                Tổng số sản phẩm: <strong>{filteredProducts.length}</strong>
            </p>

            <div style={styles.grid}>
                {filteredProducts.map((product) => (
                    <div key={product.id} style={styles.card}>
                        <img
                            src={product.image || "https://placehold.co/300x200"}
                            alt={product.name}
                            style={styles.image}
                        />

                        <div style={styles.cardContent}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>
                                Danh mục: <strong>{product.category}</strong>
                            </p>
                            <p>
                                Số lượng: <strong>{product.quantity}</strong>
                            </p>
                            <p style={styles.price}>{formatPrice(product.price)}</p>

                            <div style={styles.actions}>
                                <button
                                    onClick={() => handleEdit(product)}
                                    style={styles.editButton}
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    style={styles.deleteButton}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <p style={styles.empty}>Không tìm thấy sản phẩm nào!</p>
            )}

            {showForm && (
                <div style={styles.overlay}>
                    <form onSubmit={handleSave} style={styles.form}>
                        <h2>
                            {editingId !== null ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                        </h2>

                        <label>Tên sản phẩm</label>
                        <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            style={styles.input}
                        />

                        <label>Giá sản phẩm</label>
                        <input
                            required
                            type="number"
                            min="1"
                            value={formData.price}
                            onChange={(e) =>
                                setFormData({ ...formData, price: Number(e.target.value) })
                            }
                            style={styles.input}
                        />

                        <label>Danh mục</label>
                        <select
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({ ...formData, category: e.target.value })
                            }
                            style={styles.input}
                        >
                            <option value="Điện thoại">Điện thoại</option>
                            <option value="Laptop">Laptop</option>
                        </select>

                        <label>Số lượng</label>
                        <input
                            required
                            type="number"
                            min="0"
                            value={formData.quantity}
                            onChange={(e) =>
                                setFormData({ ...formData, quantity: Number(e.target.value) })
                            }
                            style={styles.input}
                        />

                        <label>Hình ảnh (URL)</label>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) =>
                                setFormData({ ...formData, image: e.target.value })
                            }
                            style={styles.input}
                        />

                        <label>Mô tả</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            style={styles.input}
                        />

                        <div style={styles.actions}>
                            <button type="submit" style={styles.addButton}>
                                Lưu
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                style={styles.deleteButton}
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
    },
    toolbar: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginBottom: "20px",
    },
    input: {
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        flex: 1,
        minWidth: "150px",
        boxSizing: "border-box",
    },
    addButton: {
        padding: "10px 16px",
        backgroundColor: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "20px",
    },
    card: {
        border: "1px solid #ddd",
        borderRadius: "10px",
        overflow: "hidden",
        backgroundColor: "#fff",
    },
    image: {
        width: "100%",
        height: "180px",
        objectFit: "cover",
    },
    cardContent: {
        padding: "15px",
    },
    price: {
        color: "#dc2626",
        fontSize: "18px",
        fontWeight: "bold",
    },
    actions: {
        display: "flex",
        gap: "10px",
        marginTop: "12px",
    },
    editButton: {
        flex: 1,
        padding: "9px",
        backgroundColor: "#f59e0b",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    deleteButton: {
        flex: 1,
        padding: "9px",
        backgroundColor: "#dc2626",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    empty: {
        textAlign: "center",
        padding: "30px",
        color: "#888",
    },
    overlay: {
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        zIndex: 1000,
        overflowY: "auto",
    },
    form: {
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "450px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxHeight: "90vh",
        overflowY: "auto",
    },
};

export default ProductList;