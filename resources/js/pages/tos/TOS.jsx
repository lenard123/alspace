import LoadingPage from "@/js/components/LoadingPage";
import MarkDown from "@/js/components/MarkDown";
import useTOSQuery from "@/js/query/queries/useTOSQuery";
import { Typography } from "antd";
import GuestTopbar from "../index/components/GuestTopbar";

const { Title } = Typography

export default function TOS() {
    const { data, isLoading } = useTOSQuery()
    return (
        <div className="min-h-screen flex flex-col">
            {isLoading
                ? <LoadingPage />
                : (
                    <>
                        <GuestTopbar />
                        <div className="page-wrapper">
                            <div className="max-w-screen-md py-8">
                                <Title level={2}>Terms of Services</Title>
                                <MarkDown>{data.value}</MarkDown>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}