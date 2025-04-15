//JSON Import해서 아래 PhysicalCanvas에 데이터를 넘겨주는 컴포넌트
import { useState, useEffect } from "react";
import styled from "styled-components";
import PhysicalCanvas from "../components/PhysicalCanvas";
import physicalCanvasData from "./PhysicalCanvasDummyData.json";

const ArrayMapping = () => {
  const [physicalData, setPhysicalData] = useState(physicalCanvasData); //JSON DATA
  const [time, setTime] = useState<string>();
  const [temperature, setTemperature] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      // Weather data
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.9780&current_weather=true"
      );
      const data = await res.json();
      setTime(new Date(data.current_weather.time).toLocaleString());
      setTemperature(data.current_weather.temperature);

      // Physical data
      setPhysicalData(physicalCanvasData);
    };

    fetchData();
  }, [physicalCanvasData]); // physicalCanvasData가 변경될 때마다 호출

  return (
    <Container>
      <Title>Array & Mapping</Title>
      <WeatherContainer>
        <p>Time: {time}</p>
        <p>Temperature: {temperature}</p>
      </WeatherContainer>
      <CanvasWrapper>
        <PhysicalCanvas physicalData={physicalData} />
      </CanvasWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 50px 50px;
  border-radius: 30px;
  border: 1px solid #e2e3d1;
`;

const Title = styled.p`
  font-size: 35px;
  font-weight: bold;
  color: #01c6c1;
  width: 100%;
`;
const WeatherContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
`;

const CanvasWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ArrayMapping;
