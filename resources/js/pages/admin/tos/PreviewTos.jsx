import MarkDown from "@/js/components/MarkDown";
import { Divider, Typography } from "antd";


const { Title } = Typography

export default function PreviewTOS({ tos })
{
    return (
        <div>
            <Title level={2}>Terms of Services</Title>
            <Divider/>
            <MarkDown>{tos}</MarkDown>
        </div>
    )
}