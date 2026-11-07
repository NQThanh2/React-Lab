import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";

export function ProductDetail() {
    const {id} = useParams();
    const product = useSelector((state: any) => state.product);
}