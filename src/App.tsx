import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import ProductList from "./components/productList.tsx";

function App() {
    return (
        <Provider store={store}>
            <div>
                <ProductList/>
            </div>
        </Provider>
    );
}

export default App;