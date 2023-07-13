import { Row, Col, Form } from "react-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";

// Recharts Import:
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from "react";

const AnalyticsPageComponent = ({ fetchOrdersForFirstDate, fetchOrdersForSecondDate, socketIOClient }) => {

    // React Initial State:
    const [firstDateToCompare, setFirstDateToCompare] = useState(new Date().toISOString().substring(0, 10));
    var previousDay = new Date();
    previousDay.setDate(previousDay.getDate() - 1);
    const [secondDateToCompare, setSecondDateToCompare] = useState(new Date(previousDay).toISOString().substring(0, 10));

    const [dataForFirstSet, setDataForFirstSet] = useState([]); //Initially data for first chart line is empty array
    const [dataForSecondSet, setDataForSecondSet] = useState([]); //Initially data for first chart line is empty array


    // Real Time update to the Charts using Socket Io Client
    useEffect(() => {
        const socket = socketIOClient();
        socket.on("newOrder", (data) => console.log(data));
    }, [setDataForFirstSet, setDataForSecondSet, firstDateToCompare, secondDateToCompare])


    //UseEffect: Fetch Orders Data between two dates:
    useEffect(() => {
        const abctrl = new AbortController();
        fetchOrdersForFirstDate(abctrl, firstDateToCompare)
            .then((data) => {
                let orderSum = 0;
                const orders = data.map((order) => {
                    orderSum += order.orderTotal.cartSubtotal;
                    var date = new Date(order.createdAt).toLocaleString("en-US", {
                        hour: "numeric", hour12: true, timeZone: "UTC"
                    });
                    return { name: date, [firstDateToCompare]: orderSum };
                })
                setDataForFirstSet(orders);
            })
            .catch((er) => console.log(er.response.data.message ? er.response.data.message : er.response.data))


        fetchOrdersForSecondDate(abctrl, secondDateToCompare)
            .then((data) => {
                let orderSum = 0;
                const orders = data.map((order) => {
                    orderSum += order.orderTotal.cartSubtotal;
                    var date = new Date(order.createdAt).toLocaleString("en-US", {
                        hour: "numeric", hour12: true, timeZone: "UTC"
                    });
                    return { name: date, [secondDateToCompare]: orderSum };
                })
                setDataForSecondSet(orders);
            })
            // .catch((er) => er)
            .catch((er) => console.log(er.response.data.message ? er.response.data.message : er.response.data))
        return () => abctrl.abort();
    }, [firstDateToCompare, secondDateToCompare])


    // First Date Handler:
    const firstDateHandler = (e) => {
        setFirstDateToCompare(e.target.value);
    }

    // Second Date Handler:
    const secondDateHandler = (e) => {
        setSecondDateToCompare(e.target.value);
    }


    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>
            {/* Analytics Chart */}
            <Col md={10}>
                <h1>Christmas Sale from {firstDateToCompare} to {secondDateToCompare}</h1>
                {/* Date Range to Compare Sales Revenue */}
                <Form.Group controlId="firstDateToCompare">
                    <Form.Label>Select First Date to Compare</Form.Label>
                    <Form.Control onChange={firstDateHandler} type="date" name="firstDateToCompare" placeholder="First Date to Compare" defaultValue={firstDateToCompare} />
                </Form.Group>
                <br />
                <Form.Group controlId="secondDateToCompare">
                    <Form.Label>Select Second Date to Compare</Form.Label>
                    <Form.Control onChange={secondDateHandler} type="date" name="secondDateToCompare" placeholder="Second Date to Compare" defaultValue={secondDateToCompare} />
                </Form.Group>
                {/* Chart Functionalities: */}
                <ResponsiveContainer width="100%" height={500}>
                    <LineChart
                        width={500}
                        height={300}

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
                        {dataForFirstSet.length > dataForSecondSet.length ? (
                            <>
                                <Line
                                    data={dataForFirstSet}
                                    type="monotone"
                                    dataKey={firstDateToCompare}
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                    strokeWidth={4}
                                />
                                <Line
                                    data={dataForSecondSet}
                                    type="monotone"
                                    dataKey={secondDateToCompare}
                                    stroke="#82ca9d"
                                    strokeWidth={4}
                                />
                            </>
                        ) : (
                            <>
                                <Line
                                    data={dataForSecondSet}
                                    type="monotone"
                                    dataKey={secondDateToCompare}
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                    strokeWidth={4}
                                />
                                <Line
                                    data={dataForFirstSet}
                                    type="monotone"
                                    dataKey={firstDateToCompare}
                                    stroke="#82ca9d"
                                    strokeWidth={4}
                                />
                            </>
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </Col>
        </Row>

    )
};

export default AnalyticsPageComponent;