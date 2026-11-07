import {Link} from "react-router-dom";

export function Error() {
    return (
        <div style={{textAlign:"center", padding:"50px"}}>
            <h2>Có lỗi xảy ra !!!</h2>
            <p>Đường dẫn k hợp lệ </p>
            <Link to="/">Trang chủ</Link>
        </div>

    );
}