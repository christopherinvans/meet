import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import App from "../App";
import Event from "../Event";
import { mockData } from "../mock-data";
import { mount } from "enzyme";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  test("An event element is collapsed by default", ({ given, when, then }) => {
    given("the user opens the app", () => {});

    let AppWrapper;
    when("the user scrolls through a list of events", () => {
      AppWrapper = mount(<App />);
    });

    then("the user will not see the details of each event", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".expanded-event-details")).toHaveLength(0);
    });
  });

  test("User can expand an event to see its details", ({
    given,
    when,
    then,
  }) => {
    let EventWrapper;
    given("the main page is open", async () => {
      EventWrapper = await mount(<Event event={mockData[0]} />);
    });

    when("the user selects the details button in the app", () => {
      EventWrapper.find(".showDetails").at(0).simulate("click");
    });

    then("the user will see the event details", () => {
      expect(EventWrapper.find(".expanded-event-details")).toHaveLength(1);
    });
  });

  test("User can collapse an event to hide its details", ({
    given,
    when,
    then,
  }) => {
    let EventWrapper;
    given("the user has read an event's details", async () => {
      EventWrapper = await mount(<Event event={mockData[0]} />);
      EventWrapper.find(".showDetails").at(0).simulate("click");
      expect(EventWrapper.state("isExpanded")).toBe(true);
    });

    when("the user selects the details button in the app", () => {
      EventWrapper.find(".showDetails").at(0).simulate("click");
    });

    then("the event's details will be hidden from the user", () => {
      expect(EventWrapper.find(".expanded-event-details")).toHaveLength(0);
    });
  });
});