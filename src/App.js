import Layout from "./components/layout/Layout";
import { ConfigProvider } from "antd";
function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: "Poppins",
                    fontWeightStrong: 500,
                },
            }}
        >
            <Layout />
        </ConfigProvider>
    );
}

export default App;
