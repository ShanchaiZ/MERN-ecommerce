import { Row, Col, Form } from "react-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";

// Recharts Import:
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminAnalyticsPage = () => {

    // ReCharts Sample data:
    const data = [
        {
            name: "12:00 PM", //x-axis = Hours
            "2022 year": 4000, //Sales year 2022 : total revenue in $
            "2021 year": 4100, //Sales year 2022 : total revenue in $
        },
        {
            name: "1:00 PM",
            "2022 year": 3500,
            "2021 year": 3000,
        },
        {
            name: "2:00 PM",
            "2022 year": 1500,
            "2021 year": 2500,
        },
        {
            name: "3:00 PM",
            "2022 year": 6500,
            "2021 year": 5000,
        },
        {
            name: "4:00 PM",
            "2022 year": 2500,
            "2021 year": 3100,
        },
        {
            name: "5:00 PM",
            "2022 year": 8500,
            "2021 year": 8100,
        },
        {
            name: "6:00 PM",
            "2022 year": 9500,
            "2021 year": 8500,
        },
        {
            name: "7:00 PM",
            "2022 year": 10000,
            "2021 year": 9000,
        },
    ];

    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>
            {/* Analytics Chart */}
            <Col md={10}>
                <h1>Christmas Sale on Friday Afternoon</h1>
                {/* Date Range to Compare Sales Revenue */}
                <Form.Group controlId="firstDateToCompare">
                    <Form.Label>Select First Date to Compare</Form.Label>
                    <Form.Control type="date" name="firstDateToCompare" placeholder="First Date to Compare" />
                </Form.Group>
                <br />
                <Form.Group controlId="secondDateToCompare">
                    <Form.Label>Select Second Date to Compare</Form.Label>
                    <Form.Control type="date" name="secondDateToCompare" placeholder="Second Date to Compare" />
                </Form.Group>
                {/* Chart Functionalities: */}
                <ResponsiveContainer width="100%" height={500}>
                    <LineChart
                        width={500}
                        height={300}
                        data={data} //all data comes from this {data} line!
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        {/* Chart Properties */}
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" label={{ value: "Time in Hours", offset: 50, position: "insideBottomRight" }} allowDuplicatedCategory={false} />
                        <YAxis label={{ value: "Revenue in $$", angle: -90, position: "insideLeft" }} />
                        <Tooltip />
                        <Legend verticalAlign="top" height={50} />
                        <Line type="monotone" dataKey="2022 year" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={4} />
                        <Line type="monotone" dataKey="2021 year" stroke="#82ca9d" strokeWidth={4} />
                    </LineChart>
                </ResponsiveContainer>
            </Col>
        </Row>

    )
};

export default AdminAnalyticsPage;