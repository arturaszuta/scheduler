import React from "react";
import { act } from "react-dom/test-utils";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByAltText, getAllByAltText, getByPlaceholderText } from "@testing-library/react";



import Application from "components/Application";
import { tsExternalModuleReference } from "@babel/types";
import Appointment from "components/Appointment";

afterEach(cleanup);


describe("Application", () => {

  
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday"));
  });
  
  it("defaults to Monday and changes the schedule when a new day is selected",async  () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
    
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // const appointments = getAllByTestId(container, "appointment");

    // const appointment = getAllByTestId(container, "appointment")[0];

    
    // fireEvent.click(getByAltText("Add"));

    // console.log(prettyDOM(container));
    // console.log(prettyDOM(appointments));
    // console.log(prettyDOM(appointment));
  });

  it("opens appointment, enters student name and saves it", async () => {

    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));



      })

})
