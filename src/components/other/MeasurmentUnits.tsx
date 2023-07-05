import styled from "styled-components";
import { shortMeasurementUnitsLabels } from "../../utils/texts";

export const Meter = () => (
  <Container>
    <MeasurementUnit>{shortMeasurementUnitsLabels.METER}</MeasurementUnit>
  </Container>
);

export const Kilometer = () => (
  <Container>
    <MeasurementUnit>{shortMeasurementUnitsLabels.KILOMETER}</MeasurementUnit>
  </Container>
);

export const Hectares = () => (
  <Container>
    <MeasurementUnit>{shortMeasurementUnitsLabels.HECTARES}</MeasurementUnit>
  </Container>
);

export const CubicMeterPerSecond = () => (
  <Container>
    <MeasurementUnit>
      {shortMeasurementUnitsLabels.METER}
      <Sup>3</Sup>
      {"/s"}
    </MeasurementUnit>
  </Container>
);

export const SquareMeter = () => (
  <Container>
    <MeasurementUnit>
      {shortMeasurementUnitsLabels.METER}
      <Sup>2</Sup>
    </MeasurementUnit>
  </Container>
);

export const ThousandsPerCubicMeter = () => (
  <Container>
    <MeasurementUnit>
      {shortMeasurementUnitsLabels.THOUSANDS_PER_METER}
      <Sup>3</Sup>
    </MeasurementUnit>
  </Container>
);

export const Kilowatt = () => (
  <Container>
    <MeasurementUnit>{shortMeasurementUnitsLabels.KILOWATT}</MeasurementUnit>
  </Container>
);

const MeasurementUnit = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 13px;
  font-size: 1.4rem;
  color: #9aa4b2;
`;

const Sup = styled.sup``;
