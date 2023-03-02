import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
  let event, EventWrapper;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });
  test("event details should be collapsed by default", () => {
    expect(EventWrapper.state("isExpanded")).toBe(false);
  });
  test("should render event summary when collapsed", () => {
    expect(EventWrapper.find(".summary").text()).toBe(event.summary);
  });
  test("should render date when collapsed", () => {
    expect(EventWrapper.find(".startDate").text()).toBe(event.start.dateTime);
  });
  test("should render event time zone when collapsed", () => {
    expect(EventWrapper.find(".timeZone").text()).toBe(event.start.timeZone);
  });
  test("should render event location when collapsed", () => {
    expect(EventWrapper.find(".location").text()).toBe(event.location);
  });
  test("should render show details button", () => {
    expect(EventWrapper.find(".showDetails")).toHaveLength(1);
  });
  test("show details button should expand event when clicked", () => {
    EventWrapper.find(".showDetails").simulate("click");
    expect(EventWrapper.state("isExpanded")).toBe(true);
  });
  test("should render event link when expanded", () => {
    EventWrapper.setState({ isExpanded: true });
    expect(EventWrapper.find(".event-link").prop("href")).toBe(event.htmlLink);
  });
  test("should render event description when expanded", () => {
    EventWrapper.setState({ isExpanded: true });
    expect(EventWrapper.find(".description").text()).toBe(event.description);
  });
  test("details button should toggle when clicked", () => {
    EventWrapper.setState({ isExpanded: true });
    expect(EventWrapper.find(".showDetails").text()).toBe("Hide Details");
  });
  test("event details should be collapsed when button is clicked again", () => {
    EventWrapper.find(".showDetails").simulate("click");
    expect(EventWrapper.state("isExpanded")).toBe(false);
  });
});