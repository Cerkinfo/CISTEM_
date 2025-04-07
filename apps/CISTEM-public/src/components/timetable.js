import React from "react";
import moment from "moment";
import { LocalUser } from "./user";
import { Col, Row, Table } from "reactstrap";
import styled from "styled-components";

const Style = styled.div`
    th {
        text-align: center;
        justify-content: center;
        vertical-align: middle;
    }
    tr {
        vertical-align: middle;
    }
    td {
        padding: 0.5rem 1rem 0.5rem 1rem;
    }
`;

const Cell = ({ children, color, size }) => {
    return (
        <span
            style={{
                backgroundColor: color,
                height: "50px",
                display: "flex",
                color: "#000",
                fontSize: "0.75rem",
                borderRadius: "0.75rem",
            }}
        >
            <span style={{
                display:'flex',
                justifyContent: "center",
                text: "center",
                verticalAlign: "middle",
                whiteSpace: 'nowrap',
                padding: '0.85rem',
              }}
            >
              {children}
            </span>
        </span>
    );
};

export const GlobalTimetable = ({ data, dates, entities, left_title }) => {
  return (
      <div style={{ overflowX: 'auto', width: '100%', height:'100vh', display:'block' }}>
          <Style>
          <Table striped>
              <thead>
                <tr>
                  <th style={{textAlign:"start"}}>{left_title}</th>
                  {Object.keys(dates).map((day, index) => (
                      <th key={index}>{moment(dates[day]).format('dddd D MMM')}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                  {Object.keys(data).map((person, personIndex) => (
                      <tr key={personIndex}>
                          <td><LocalUser name={data[person]['user']} /></td>
                          {Object.keys(dates).map((day, dayIndex) => (
                              <td key={dayIndex}>
                                  {data[person]['schedule'].find(d => d.day === moment(dates[day]).toString())?.perms.length > 0 ? (
                                      <Row>
                                          {data[person]['schedule'].find(d => d.day === moment(dates[day]).toString()).perms.map((perm, permIndex) => {
                                              const durationInHours = moment(perm['end']).diff(moment(perm['start']), 'hours');
                                              return (
                                                  <Col key={permIndex} className="g-1">
                                                      <Cell
                                                          color={entities[perm['title']] || "#ccc"}
                                                          size={durationInHours}
                                                      >
                                                          <span>{moment(perm['start']).format('HH')}h - {moment(perm['end']).format('HH')}h | {perm['title']}</span>
                                                      </Cell>
                                                  </Col>
                                              );
                                          })}
                                      </Row>
                                  ) : null}
                              </td>
                          ))}
                      </tr>
                  ))}
              </tbody>
          </Table>
          </Style>
      </div>
  );
};

export const PersonalTimetable = ({ data, dates, entities, left_title }) => {
  const entities_ = ["Montage", ...Object.keys(entities), "Démontage"];
  return (
    <div style={{ overflowX: 'auto', width: '100%', height:'100vh', display:'block' }}>
      <Style>
      <Table striped>
          <thead>
            <tr>
              <th style={{textAlign:"start"}}>{left_title}</th>
              {Object.keys(dates).map((day, index) => (
                  <th key={index}>{moment(dates[day]).format('dddd D MMM')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
                  {entities_.filter(point => 
                        data.some(dayData => 
                            dayData.perms.some(perm => perm.title === point)
                        )
                    ).map((point, pointIndex) => (
                  <tr key={pointIndex}>
                      <td><LocalUser name={point} img={`${process.env.PUBLIC_URL}/static/fosdem_ci_purple.png`}/></td>
                      {Object.keys(dates).map((day, dayIndex) => (
                                <td key={dayIndex}><Row>
                                    {data[dayIndex] && data[dayIndex]['perms'].length > 0 ? (
                                        data[dayIndex]['perms'].map((perm, permIndex) => (
                                            perm['title'] !== point ? (
                                                null
                                            ) : (
                                                <Col className="g-1"><Cell
                                                    key={permIndex}
                                                    color={entities[perm['title']] || "#ccc"}
                                                >
                                                    <span>{moment(perm['start']).format('HH')}h - {moment(perm['end']).format('HH')}h</span>
                                                </Cell></Col>
                                            )
                                        ))
                                    ) : null}
                                </Row></td>
                            ))}
                  </tr>
              ))}
          </tbody>
      </Table>
      </Style>
    </div>
  );
};

export const BarTimetable = ({ data, dates, entities, left_title }) => {
  const { VENDREDI, LUNDI, ...filtered } = dates
    return (
        <div style={{ overflowX: 'auto', width: '100%', height:'100vh', display:'block' }}>
            <Style>
            <Table striped>
                <thead>
                    <tr>
                    <th style={{textAlign:"start"}}>{left_title}</th>
                    {Object.keys(filtered).map((day, index) => (
                        <th key={index}>{moment(filtered[day]).format('dddd D MMM')}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map((person, personIndex) => (
                        <tr key={personIndex}>
                            <td><LocalUser name={data[person].name} /></td>
                            {Object.keys(filtered).map((day, dayIndex) => (
                                <td key={dayIndex}>
                                    {data[person].perms[moment(filtered[day])] ? (
                                        <Row>
                                            {data[person].perms[moment(filtered[day])].map((perm, permIndex) => {
                                                const durationInHours = moment(perm['end']).diff(moment(perm['start']), 'hours');
                                                return (
                                                    <Col key={permIndex} className="g-1">
                                                        <Cell
                                                            color={entities[perm['title']] || " #a569bd "}
                                                            size={durationInHours}
                                                        >
                                                            <span>{moment(perm['start']).format('HH')}h - {moment(perm['end']).format('HH')}h</span>
                                                        </Cell>
                                                    </Col>
                                                );
                                            })}
                                        </Row>
                                    ) : null}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            </Style>
        </div>
    );
};