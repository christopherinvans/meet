import React from 'react';
import { shallow, mount } from "enzyme";
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import App from "../App";
import { extractLocations } from '../api';

const locations = extractLocations(mockData);

describe("<CitySearch /> component", () => {
    let CitySearchWrapper;
    beforeAll(() => {
      locations.push("See all cities");
      CitySearchWrapper = shallow(
        <CitySearch updateEvents={() => {}} locations={locations} />
      );
    });
  
    test("renders text input", () => {
      expect(CitySearchWrapper.find(".city")).toHaveLength(1);
    });
  
    test("renders text input correctly", () => {
      const query = CitySearchWrapper.state("query");
      expect(CitySearchWrapper.find(".city").prop("value")).toBe(query);
    });
  
    test("updates the input correctly", () => {
      CitySearchWrapper.find('input[type="text"]').simulate("change", {
        target: {
          value: "Berlin",
        },
      });
      expect(CitySearchWrapper.find('input[type="text"]').prop("value")).toEqual(
        "Berlin"
      );
    });
  
    test("render list of suggestions correctly", () => {
      const CitySearchWrapper = shallow(
        <CitySearch updateEvents={() => {}} locations={locations} />
      );
      const suggestions = CitySearchWrapper.state("suggestions");
      expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(
        suggestions.length
      );
    });
  
    test("renders a list of suggestions correctly", () => {
      const CitySearchWrapper = shallow(
        <CitySearch updateEvents={() => {}} locations={locations} />
      );
      CitySearchWrapper.find('input[type="text"]').simulate("change", {
        target: {
          value: "Berlin",
        },
      });
      expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(2);
    }); 
  
    test("clicking a suggestion must initiate a search", () => {
      const mockUpdateEvents = jest.fn();
      const CitySearchWrapper = shallow(
        <CitySearch updateEvents={mockUpdateEvents} locations={locations} />
      );
      CitySearchWrapper.find('input[type="text"]').simulate("change", {
        target: {
          value: "Berlin",
        },
      });
      CitySearchWrapper.find(".suggestions li").at(0).simulate("click");
      expect(mockUpdateEvents).toHaveBeenCalledWith("Berlin, Germany");
      expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(0);
    });
  });
  
  describe("<CitySearch /> integration", () => {
    test("get a list of cities when user searches for Berlin", () => {
      const CitySearchWrapper = shallow(<CitySearch locations={locations} />);
      CitySearchWrapper.find(".city").simulate("change", {
        target: { value: "Berlin" },
      });
      expect(CitySearchWrapper.state("suggestions")).toEqual(["Berlin, Germany"]);
    });
  
    test("get list of events after user selects a city", async () => {
      const AppWrapper = mount(<App />);
      AppWrapper.instance().updateEvents = jest.fn();
      AppWrapper.instance().forceUpdate();
      const CitySearchWrapper = AppWrapper.find(CitySearch);
      CitySearchWrapper.instance().handleItemClicked("value");
      expect(AppWrapper.instance().updateEvents).toHaveBeenCalledTimes(1);
    });
  });