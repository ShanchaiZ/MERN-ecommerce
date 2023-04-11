import { Row, Col } from "react-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";

// Recharts Import:
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminAnalyticsPage = () => {

    // ReCharts sample data:
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];


    return (

        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>

            {/* Analytics Chart */}
            <Col md={10} width="100%" height="100%">
                <h1>Christmas Sale</h1>
            </Col>
        </Row>

    )
};

export default AdminAnalyticsPage;